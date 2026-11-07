import { createHash } from "node:crypto";
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  realpathSync,
  symlinkSync,
  rmSync,
  existsSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
const root = resolve(import.meta.dirname, "..");
const temp = mkdtempSync(join(tmpdir(), "prismode-smoke-"));
function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    env: { ...process.env, npm_config_cache: join(temp, "npm-cache") },
    encoding: "utf8",
    shell: process.platform === "win32" && command === "npm",
  });
  if (result.error || result.status !== 0)
    throw new Error(
      `${command} failed: ${result.error ?? result.stderr ?? result.stdout}`,
    );
  return result.stdout;
}
function packResult(stdout) {
  const output = JSON.parse(stdout);
  const results = Array.isArray(output)
    ? output
    : output && typeof output === "object"
      ? Object.values(output)
      : [];
  assert.equal(results.length, 1, "Expected exactly one packed package");
  const result = results[0];
  assert(
    result && typeof result.filename === "string",
    "Missing pack filename",
  );
  assert(Array.isArray(result.files), "Missing pack file list");
  assert(
    result.files.every((file) => file && typeof file.path === "string"),
    "Invalid pack file list",
  );
  return result;
}
try {
  const pkg = join(root, "packages/prismode-ui");
  const dry = packResult(
    run("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], pkg),
  );
  const names = dry.files.map((file) => file.path);
  for (const name of [
    "LICENSE",
    "NOTICE.md",
    "README.md",
    "dist/index.js",
    "dist/index.d.ts",
    "dist/md3-next.js",
    "dist/md3-next.d.ts",
    "src/vendor/md3-next/SHA256SUMS.json",
    "package.json",
  ])
    assert(names.includes(name), `Missing ${name}`);
  assert(
    names.every(
      (name) =>
        name === "package.json" ||
        ["LICENSE", "NOTICE.md", "README.md"].includes(name) ||
        name.startsWith("dist/") ||
        name.startsWith("src/vendor/md3-next/"),
    ),
    "Unexpected package content",
  );
  assert(
    !names.some((name) =>
      /\.map$|\.tgz$|source-references|\.ai-bridge/.test(name),
    ),
    "Reference or source map leaked",
  );
  const packed = packResult(
    run(
      "npm",
      ["pack", "--json", "--ignore-scripts", "--pack-destination", temp],
      pkg,
    ),
  );
  run("tar", ["-xf", join(temp, packed.filename), "-C", temp], temp);
  const extracted = join(temp, "package");
  // Reuse only third-party dependencies, never a workspace package link.
  mkdirSync(join(temp, "node_modules"));
  const manifest = JSON.parse(
    readFileSync(join(extracted, "package.json"), "utf8"),
  );
  for (const name of Object.keys({
    ...manifest.dependencies,
    ...manifest.peerDependencies,
  })) {
    const source = realpathSync(
      existsSync(join(pkg, "node_modules", name))
        ? join(pkg, "node_modules", name)
        : join(root, "node_modules", name),
    );
    const target = join(temp, "node_modules", name);
    mkdirSync(resolve(target, ".."), { recursive: true });
    symlinkSync(
      source,
      target,
      process.platform === "win32" ? "junction" : "dir",
    );
  }
  assert(!existsSync(join(temp, "node_modules/@qbit/prismode-ui")));
  const entry = resolve(extracted, manifest.exports["."].import);
  assert(
    realpathSync(entry).startsWith(realpathSync(temp)),
    "Import escapes packed consumer",
  );
  const code = `import { createPrismodeTheme, generateAllTokens, PrismodeProvider, GlassSurface } from ${JSON.stringify(pathToFileURL(entry).href)}; import {createElement} from 'react'; import {renderToString} from 'react-dom/server'; if (!createPrismodeTheme().palette.primary.main || !generateAllTokens('#6750A4').dark.primary) throw Error('Invalid exports'); if (!renderToString(createElement(PrismodeProvider, null, createElement(GlassSurface, null, 'Packed consumer'))).includes('Packed consumer')) throw Error('SSR failed');`;
  run("node", ["--input-type=module", "-e", code], temp);
  const upstreamEntry = resolve(
    extracted,
    manifest.exports["./md3-next"].import,
  );
  run(
    "node",
    [
      "--input-type=module",
      "-e",
      `import { createMD3Theme, MD3Provider, NavigationRail, SegmentedButton, SearchBar } from ${JSON.stringify(pathToFileURL(upstreamEntry).href)}; if (!createMD3Theme({seed: "#6750A4"}).dark.palette.primary.main || !MD3Provider || !NavigationRail || !SegmentedButton || !SearchBar) throw Error("Invalid upstream exports");`,
    ],
    temp,
  );
  const vendorManifest = JSON.parse(
    readFileSync(
      join(extracted, "src/vendor/md3-next/SHA256SUMS.json"),
      "utf8",
    ),
  );
  assert.equal(Object.keys(vendorManifest.files).length, 8);
  for (const [file, hash] of Object.entries(vendorManifest.files)) {
    assert.equal(
      createHash("sha256")
        .update(readFileSync(join(extracted, "src/vendor/md3-next", file)))
        .digest("hex"),
      hash,
    );
  }
  mkdirSync(join(temp, "node_modules/@qbit"), { recursive: true });
  symlinkSync(
    extracted,
    join(temp, "node_modules/@qbit/prismode-ui"),
    process.platform === "win32" ? "junction" : "dir",
  );
  writeFileSync(
    join(temp, "consumer.mts"),
    `import {createPrismodeTheme, PrismodeProvider, type PrismodeProviderProps} from "@qbit/prismode-ui"; import {createMD3Theme, NavigationRail, type MD3ThemeOptions} from "@qbit/prismode-ui/md3-next"; const options: MD3ThemeOptions = {seed: "#6750A4"}; const props: PrismodeProviderProps = {children: null, transformTheme: theme => theme}; createPrismodeTheme(); createMD3Theme(options); void PrismodeProvider; void NavigationRail; void props;`,
  );
  run(
    "node",
    [
      join(root, "node_modules/typescript/bin/tsc"),
      "--noEmit",
      "--strict",
      "--skipLibCheck",
      "--module",
      "NodeNext",
      "--moduleResolution",
      "NodeNext",
      "--target",
      "ES2022",
      join(temp, "consumer.mts"),
    ],
    temp,
  );
  console.log(
    `Package smoke passed: ${names.length} files; packed ESM, declarations, notices and SSR verified.`,
  );
} finally {
  rmSync(temp, { recursive: true, force: true });
}
