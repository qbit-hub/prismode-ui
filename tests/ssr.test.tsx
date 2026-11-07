// @vitest-environment node
import { renderToString } from "react-dom/server";
import { expect, it } from "vitest";
import { Button } from "@mui/material";
import {
  PrismodeProvider,
  GlassSurface,
  generateColorTokens,
} from "../packages/prismode-ui/src";
it("imports and renders both systems without browser globals", () => {
  for (const initialDesignSystem of ["material3", "liquidGlass"] as const) {
    const html = renderToString(
      <PrismodeProvider initialDesignSystem={initialDesignSystem}>
        <GlassSurface>
          <Button variant="tonal">Server content</Button>
        </GlassSurface>
      </PrismodeProvider>,
    );
    expect(html).toContain("Server content");
  }
});
it("emits original MD3 variant colors inside application-owned direction", () => {
  const html = renderToString(
    <div dir="rtl">
      <PrismodeProvider initialMode="light">
        <Button variant="contained">
          <bdi dir="ltr">Count: 0</bdi>
        </Button>
        <Button variant="tonal">Tonal</Button>
        <Button variant="elevated">Elevated</Button>
      </PrismodeProvider>
    </div>,
  );
  const tokens = generateColorTokens("#6750A4", "light");
  expect(html).toContain('<bdi dir="ltr">Count: 0</bdi>');
  for (const color of [
    tokens.primary,
    tokens.secondaryContainer,
    tokens.surfaceContainerLow,
  ])
    expect(html).toContain("background-color:" + color);
});
