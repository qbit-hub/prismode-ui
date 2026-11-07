// @vitest-environment node
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
const directory = new URL(
  "../packages/prismode-ui/src/vendor/md3-next/",
  import.meta.url,
);
it("preserves all eight original md3-next 0.1.3 source files byte for byte", () => {
  const manifest = JSON.parse(
    readFileSync(new URL("SHA256SUMS.json", directory), "utf8"),
  );
  expect(manifest.package).toBe("md3-next");
  expect(manifest.version).toBe("0.1.3");
  expect(Object.keys(manifest.files)).toHaveLength(8);
  for (const [file, hash] of Object.entries(manifest.files)) {
    expect(
      createHash("sha256")
        .update(readFileSync(new URL(file, directory)))
        .digest("hex"),
      file,
    ).toBe(hash);
  }
});
