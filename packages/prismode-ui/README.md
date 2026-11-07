# Prismode UI

React 19, MUI 9 and Emotion themes with live Material 3 and Liquid Glass switching,
HCT seed colors and light/dark/system mode. Independent from
Apple, Google and md3-next. MIT; see [NOTICE.md](NOTICE.md) for provenance.

## Install

```sh
npm install @qbit.click/prismode-ui@0.1.1 react@^19 react-dom@^19 @mui/material@^9 @emotion/react@^11.14 @emotion/styled@^11.14
```

The public npm package is distributed under the @qbit.click organization scope.
For offline evaluation, you can also build a local tarball:

```sh
bun install --frozen-lockfile
bun run build
cd packages/prismode-ui
npm pack --ignore-scripts
# In the consumer, install the copied artifact alongside the peer dependencies above:
npm install ./qbit.click-prismode-ui-0.1.1.tgz
```

The repository root is the private `prismode-workspace` Bun workspace, not the
public library package. A direct GitHub dependency on this repository is not a
verified installation path. For distribution, publish the packed library to a
registry or distribute it as a GitHub Release asset. Consumer manifests should
use a published registry version or release artifact URL, never absolute local paths.

```tsx
import { Button } from "@mui/material";
import {
  PrismodeProvider,
  GlassSurface,
  usePrismode,
} from "@qbit.click/prismode-ui";

function Controls() {
  const { setDesignSystem, setMode, setSeed } = usePrismode();
  return (
    <GlassSurface sx={{ p: 3 }}>
      <Button variant="tonal" onClick={() => setDesignSystem("liquidGlass")}>
        Glass
      </Button>
      <Button onClick={() => setMode("dark")}>Dark</Button>
      <Button onClick={() => setSeed("#0088ff")}>Blue seed</Button>
    </GlassSurface>
  );
}

export function App() {
  return (
    <PrismodeProvider initialMode="system">
      <Controls />
    </PrismodeProvider>
  );
}
```

## API and behavior

- `PrismodeProvider`: `initialDesignSystem` (`material3` default or `liquidGlass`),
  `initialMode` (`system` default, `light`, `dark`), `initialSeed` (`#6750A4` default),
  `storageKey` (`prismode-mode` default; `null` disables persistence), and optional
  `transformTheme: (theme: Theme) => Theme` for arbitrary application customization.
- `usePrismode()`: `designSystem`, `setDesignSystem`, `mode`, `setMode`,
  `resolvedMode`, `seed`, `setSeed`. Must be inside the provider. Only mode persists.
  Initial props initialize state. SSR and the first render resolve system to light;
  after mounting, system follows the OS preference and subsequent changes.
- `createPrismodeTheme({ designSystem, seed, mode })`: a standalone MUI theme.
  Material 3 returns the original upstream light or dark Theme without token
  reinterpretation. Standalone system resolves to light; use the provider for live mode.
- `GlassSurface`: div-based MUI Box, forwarding its ref and accepting Box props,
  `sx`, and `enhanced` for stronger blur and a static reflective gradient.
- `generateColorTokens(seed, 'light' | 'dark')`, `generateAllTokens(seed)`:
  MD3 functional roles. Seeds must be six-digit hex strings; invalid input throws.
- Exported types include `DesignSystem`, `ColorMode`, `ResolvedMode`,
  `PrismodeThemeOptions`, `MD3ColorTokens`, provider/context and
  surface props. MUI Button gains `tonal` and `elevated` variants.

Material 3 uses exactly the eight unmodified TypeScript source files from
md3-next@0.1.3, vendored in `src/vendor/md3-next` in the library. The SHA256SUMS.json
manifest and portable hash test protect their original bytes. `createMD3Theme`,
`MD3Provider`, `useMD3`, `md3Typography`, `md3ComponentOverrides`, `NavigationRail`,
`SegmentedButton`, and `SearchBar` are also available through
`@qbit.click/prismode-ui/md3-next`, with their upstream public types. Liquid Glass
is separate original Prismode styling; GlassSurface works with either system.

Switching preserves mounted component state. The library has no direction option,
RTL exports, RTL cache, RTL dependencies, or document direction/color-scheme mutations.
RTL belongs to the consuming application. The playground demonstrates the official
MUI setup: an application-owned Emotion CacheProvider with `createCache`,
`stylisPlugins: [prefixer, rtlPlugin]` from `stylis` and `@mui/stylis-plugin-rtl`,
a `dir="rtl"` wrapper, and `transformTheme={(theme) => ({ ...theme, direction: "rtl" })}`.
LTR uses a separate cache with `[prefixer]`. Portals do not inherit wrapper direction:
pass `slotProps={{ paper: { dir: direction } }}` to Dialog and equivalent MenuProps
to Select. English strings use `<bdi dir="ltr">` to isolate punctuation.
Install these RTL dependencies in your application only. Use distinct storage keys
across applications. Add MUI CssBaseline if your app needs a global reset.

MUI 9 removed some slots used by the original MD3Next source, including Alert
`standardError`, `standardWarning`, `standardInfo`, `standardSuccess`, and ButtonGroup
`groupedOutlined`. The separate `md3-compat.ts` shim only supplies types; these old
slots are ignored at runtime. Pixel parity with MD3Next under its original MUI
version is not guaranteed. Vendor sources are never rewritten to conceal this limitation.

## Compatibility and accessibility

Targets modern evergreen Chrome/Edge, Firefox and Safari with CSS variables.
Backdrop blur requires `backdrop-filter` or its WebKit equivalent. Without it,
surfaces remain solid. Liquid Glass is a web-only Prismode adaptation of an MIT-licensed
cult/ui decorative glass highlight (see NOTICE.md), using
translucency, bounded blur and specular gradients, without native Apple refraction,
background sampling or distortion. No CDN or external fonts are required.

Solid fallback rules honor reduced transparency and forced colors; reduced motion
removes surface animations/transitions. Controls retain MUI keyboard behavior and
focus outlines. Check contrast over your actual background and test keyboard,
screen reader, zoom and user preferences before shipping. HCT roles do not ensure
contrast for arbitrary content or custom `sx`. This is a themed subset of MUI,
not complete Material 3 specification conformance or a native Apple engine.

Imports and server rendering require no DOM globals. For production SSR, integrate
Emotion cache/style extraction and an application mode initialization strategy in your framework
to avoid hydration flashes; the playground is a client-rendered example.

## Development

```sh
bun install --frozen-lockfile
bun run build
bun run dev
bun run typecheck
bun run test
bun run format:check
bun run smoke
bun run test:e2e
```

Build before opening the playground: its workspace dependency resolves the package
exports in `dist`. CI installs Chromium; local E2E requires an existing Playwright
Chromium installation (or `PLAYWRIGHT_CHANNEL=chrome` with installed Chrome).
The smoke check packs and imports the actual archive offline, reusing installed
third-party dependencies. It does not prove a fresh registry dependency install.

See the repository CONTRIBUTING.md. React/MUI remain upstream dependencies;
Prismode adds themes and surfaces rather than forking a framework.
