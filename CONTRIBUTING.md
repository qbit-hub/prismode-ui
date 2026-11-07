# Contributing

Use Bun 1.4.4 and the committed lockfile. Run `bun install --frozen-lockfile`, then
`bun run --filter @qbit-hub/prismode-ui build` (refresh declarations before typecheck),
`bun run build` and `bun run dev`. Make focused changes with behavior tests for
regressions. Preserve third-party notices when adapting code.

Before a pull request run `bun run typecheck`, `bun run build`, `bun run test`,
`bun run format:check`, `bun run smoke`, and `bun run test:e2e`. E2E needs an
installed Playwright Chromium browser; CI installs it automatically. Use
`bun run format` to apply formatting. Generated dist, caches, test reports and
.ai-bridge references are ignored and must not be included in releases.

Describe the behavior changed and checks performed. Include accessibility and
RTL checks when changing surfaces or components. Contributions are under MIT.
Release publication is a separate maintainer action; checks never publish.

Never format or edit the eight original files in packages/prismode-ui/src/vendor/md3-next.
The hash manifest protects their exact bytes. npm pack includes those sources,
MIT license, notices, both ESM exports and declarations. Smoke checks the actual
archive and a TypeScript consumer; .ai-bridge is never distributed.
