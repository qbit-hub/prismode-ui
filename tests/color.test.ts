import { describe, expect, it } from "vitest";
import {
  generateAllTokens,
  generateColorTokens,
  createPrismodeTheme,
} from "../packages/prismode-ui/src";

describe("HCT tokens", () => {
  it("matches the Material baseline purple tonal fixture", () => {
    const { light, dark } = generateAllTokens("#6750A4");
    expect(light.primary).toBe("#6750a4");
    expect(light.onPrimary).toBe("#ffffff");
    expect(light.primaryContainer).toBe("#e9ddff");
    expect(dark.primary).toBe("#cfbcff");
    expect(dark.onPrimary).toBe("#381e72");
  });
  it.each(["red", "#fff", "#gg0000", "", "#12345678"])(
    "rejects invalid seed %s",
    (seed) => expect(() => generateAllTokens(seed)).toThrow(TypeError),
  );
  it("generates all roles and selects the requested palette", () => {
    for (const seed of ["#000000", "#ffffff", "#ff0000", "#0088ff"]) {
      const tokens = generateAllTokens(seed);
      expect(Object.keys(tokens.light)).toHaveLength(36);
      expect(generateColorTokens(seed, "dark")).toEqual(tokens.dark);
      for (const color of Object.values(tokens.light))
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
    }
    const theme = createPrismodeTheme({ mode: "dark" });
    expect(theme.palette.mode).toBe("dark");
    expect(theme.direction).toBe("ltr");
    expect(theme.palette.primary.main).toBe(
      generateColorTokens("#6750A4", "dark").primary,
    );
  });
});

function contrast(a: string, b: string) {
  const luminance = (hex: string) => {
    const channels = hex
      .slice(1)
      .match(/../g)!
      .map((value) => {
        const c = parseInt(value, 16) / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
it("keeps core foreground pairs readable across saturated and neutral seeds", () => {
  for (const seed of [
    "#6750A4",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#000000",
    "#ffffff",
  ]) {
    for (const tokens of Object.values(generateAllTokens(seed))) {
      for (const [background, foreground] of [
        [tokens.primary, tokens.onPrimary],
        [tokens.secondary, tokens.onSecondary],
        [tokens.tertiary, tokens.onTertiary],
        [tokens.error, tokens.onError],
        [tokens.surface, tokens.onSurface],
        [tokens.primaryContainer, tokens.onPrimaryContainer],
      ])
        expect(contrast(background, foreground)).toBeGreaterThanOrEqual(4.5);
    }
  }
});
