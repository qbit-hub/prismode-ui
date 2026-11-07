import { describe, expect, it } from "vitest";
import type { CSSObject } from "@emotion/react";
import {
  glassPaintStyles,
  glassStyles,
} from "../packages/prismode-ui/src/glass";
import { liquidGlass } from "../packages/prismode-ui/src/systems";

const layoutKeys = [
  "position",
  "isolation",
  "width",
  "minWidth",
  "maxWidth",
  "height",
  "top",
  "right",
  "bottom",
  "left",
  "inset",
  "transform",
  "display",
  "overflow",
  "zIndex",
] as const;

describe("Liquid Glass MUI overlay contract", () => {
  it.each([true, false])(
    "never overrides popover geometry in dark=%s",
    (dark) => {
      const paint = glassPaintStyles(dark, true);
      const menuPaper = liquidGlass(dark).components?.MuiMenu?.styleOverrides
        ?.paper as CSSObject;
      for (const key of layoutKeys) {
        expect(paint, key).not.toHaveProperty(key);
        expect(menuPaper, key).not.toHaveProperty(key);
      }
      expect(menuPaper).toHaveProperty("borderRadius", 16);
      expect(paint).not.toHaveProperty("backdropFilter");
      expect(
        paint[
          "@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))"
        ],
      ).toMatchObject({
        backdropFilter: "blur(20px) saturate(1.5)",
      });
    },
  );

  it("uses an explicit pixel radius for the compositional surface", () => {
    const panel = glassStyles(true, true);
    expect(panel).toMatchObject({
      position: "relative",
      isolation: "isolate",
      borderRadius: "22px",
    });
    expect(panel["&::before"]).toMatchObject({
      pointerEvents: "none",
      position: "absolute",
    });
  });

  it("preserves real fallback surfaces, high contrast and reduced motion", () => {
    const panel = glassStyles(true, true);
    expect(panel.backgroundColor).toBe("#202630");
    expect(
      panel["@media (prefers-reduced-transparency: reduce)"],
    ).toMatchObject({
      backgroundColor: "#202630",
      backgroundImage: "none",
      backdropFilter: "none",
    });
    expect(panel["@media (forced-colors: active)"]).toMatchObject({
      backgroundColor: "Canvas",
      color: "CanvasText",
      boxShadow: "none",
    });
    expect(panel["@media (prefers-reduced-motion: reduce)"]).toMatchObject({
      animation: "none",
    });
  });

  it("registers custom button variants on MUI component, not root style overrides", () => {
    const button = liquidGlass(true).components?.MuiButton;
    expect(button?.variants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ props: { variant: "tonal" } }),
        expect.objectContaining({ props: { variant: "elevated" } }),
      ]),
    );
    expect(button?.styleOverrides?.root).not.toHaveProperty("variants");
  });
});
