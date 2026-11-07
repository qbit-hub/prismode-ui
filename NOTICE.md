# Third-party notices

Prismode UI is an independent MIT project (see LICENSE). It is not affiliated
with or endorsed by Apple, Google, MUI, md3-next, or cult/ui. No framework
history is forked.

## md3-next 0.1.3 - MIT

Eight original source files from the published md3-next@0.1.3 source maps are
vendored byte-for-byte in the library's src/vendor/md3-next directory:
color.ts, components.ts, typography.ts, theme.ts, provider.tsx,
NavigationRail.tsx, SegmentedButton.tsx, and SearchBar.tsx.
Provenance: https://www.npmjs.com/package/md3-next/v/0.1.3
SHA256SUMS.json records their SHA-256 digests; tests verify all eight files.
These original sources and the checksum manifest are included in the package.
The development reference archive and .ai-bridge directory are excluded.

Material 3 calls the original createMD3Theme directly. Prismode's wrappers
provide seed validation, theme selection, persistence, and exports.
md3-compat.ts is a separate type-only MUI 9 shim; removed upstream Alert and
ButtonGroup slots remain ignored at runtime, so pixel parity with the original
MUI version is not guaranteed. The vendored files are unmodified.
The package metadata declares MIT; the available source headers and metadata
give no named copyright holder or copyright notice. No attribution is invented.
The MIT permission and warranty terms are reproduced in the accompanying LICENSE.

## cult/ui Distorted Glass - MIT

The decorative repeating-radial glass highlight and translucent edge treatment
in src/glass.ts were adapted for MUI/Emotion from the MIT-licensed cult/ui
Distorted Glass implementation. The original Tailwind/Next.js component,
its SVG distortion filter, images, and assets are not distributed in Prismode.
The adaptation preserves only the glass surface treatment and does not claim
to reproduce the original shader or native Apple refraction.

Source: https://github.com/nolly-studio/cult-ui/blob/main/apps/www/registry/default/ui/distorted-glass.tsx
License: https://github.com/nolly-studio/cult-ui/blob/main/LICENSE.md
Copyright (c) 2023 Jordan-Gilliam.
Related 21st.dev glass collection: https://21st.dev/community/components/explore/react-liquid-glass

The original MIT copyright and permission notice are retained here. Permission
is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions: the above copyright
notice and this permission notice shall be included in all copies or substantial
portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY
OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.

## Material Color Utilities - Apache-2.0

@material/material-color-utilities supplies HCT and tonal palette calculations
as a separately distributed runtime dependency under Apache License 2.0:
https://github.com/material-foundation/material-color-utilities
Its source headers identify Copyright 2021 Google LLC. Its own license and
notices accompany that dependency; Prismode's MIT license does not replace them.

React, MUI and Emotion retain their licenses in their separately distributed
packages. Stylis and the MUI RTL plugin are playground/application dependencies
only; the Prismode library does not implement or depend on RTL.
