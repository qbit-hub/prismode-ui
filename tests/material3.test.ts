import { describe, expect, it } from "vitest";
import { createPrismodeTheme } from "../packages/prismode-ui/src/theme";
import { createMD3Theme } from "../packages/prismode-ui/src/md3-next";
describe("original MD3Next themes", () => {
  it.each(["#6750A4", "#0088ff", "#ff0000"])(
    "matches upstream output for %s",
    (seed) => {
      const upstream = createMD3Theme({ seed });
      for (const mode of ["light", "dark"] as const) {
        const actual = createPrismodeTheme({ seed, mode });
        expect(JSON.parse(JSON.stringify(actual.palette))).toEqual(
          JSON.parse(JSON.stringify(upstream[mode].palette)),
        );
        // MUI creates pxToRem separately for every theme instance. Keep every
        // typography data field under strict comparison and test the function.
        const { pxToRem, ...typography } = actual.typography;
        const { pxToRem: upstreamPxToRem, ...upstreamTypography } =
          upstream[mode].typography;
        expect(typography).toEqual(upstreamTypography);
        expect(pxToRem).toBeTypeOf("function");
        for (const size of [0, 1, 12, 14, 16, 24, 57, 96, -4, 12.5]) {
          expect(pxToRem(size)).toBe(upstreamPxToRem(size));
        }
        expect(actual.components).toEqual(upstream[mode].components);
        expect(actual.shape).toEqual(upstream[mode].shape);
        const tokens = upstream.tokens[mode];
        expect(actual.components?.MuiButton?.styleOverrides).toMatchObject({
          root: { borderRadius: 20, textTransform: "none", minHeight: 40 },
          contained: {
            backgroundColor: tokens.primary,
            color: tokens.onPrimary,
          },
          outlined: { borderColor: tokens.outline, color: tokens.primary },
          text: { color: tokens.primary, padding: "10px 12px" },
        });
        expect(actual.components?.MuiButton?.variants).toEqual([
          {
            props: { variant: "tonal" },
            style: {
              backgroundColor: tokens.secondaryContainer,
              color: tokens.onSecondaryContainer,
              "&:hover": {
                backgroundColor: tokens.secondaryContainer,
                boxShadow: `0 1px 2px 0 ${tokens.shadow}4d`,
              },
            },
          },
          {
            props: { variant: "elevated" },
            style: {
              backgroundColor: tokens.surfaceContainerLow,
              color: tokens.primary,
              boxShadow: `0 1px 2px 0 ${tokens.shadow}4d`,
              "&:hover": {
                boxShadow: `0 1px 3px 1px ${tokens.shadow}33, 0 1px 2px 0 ${tokens.shadow}4d`,
              },
            },
          },
        ]);
      }
    },
  );
  it("resolves standalone system deterministically and keeps Glass independent", () => {
    expect(createPrismodeTheme({ mode: "system" }).palette.mode).toBe("light");
    expect(
      createPrismodeTheme({ designSystem: "liquidGlass" }).shape.borderRadius,
    ).toBe(20);
  });
});
