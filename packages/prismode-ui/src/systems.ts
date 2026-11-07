import type { ThemeOptions } from "@mui/material/styles";
import type { CSSObject } from "@emotion/react";
import { glassPaintStyles } from "./glass";

type SystemFactory = (
  dark: boolean,
) => Pick<ThemeOptions, "shape" | "typography" | "components">;

const focus: CSSObject = {
  "&.Mui-focusVisible": { outline: "3px solid currentColor", outlineOffset: 3 },
};

/**
 * Liquid Glass styles are deliberately paint-only on MUI overlays.
 * Popover/Menu must retain their absolute positioning and measured width.
 */
export const liquidGlass: SystemFactory = (dark) => {
  const paint = glassPaintStyles(dark);
  const highlighted = glassPaintStyles(dark, true);
  return {
    shape: { borderRadius: 20 },
    typography: {
      fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: { fontSize: "3.5rem", fontWeight: 650, letterSpacing: "-0.04em" },
      h4: { fontWeight: 650 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 20, boxShadow: "0 6px 24px #00000014" },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            ...focus,
            borderRadius: 999,
            minHeight: 42,
            padding: "9px 20px",
          },
          outlined: paint,
        },
        variants: [
          { props: { variant: "tonal" }, style: highlighted },
          { props: { variant: "elevated" }, style: highlighted },
        ],
      },
      MuiIconButton: {
        styleOverrides: { root: { ...focus, borderRadius: 14 } },
      },
      MuiAppBar: { styleOverrides: { root: highlighted } },
      MuiDrawer: { styleOverrides: { paper: highlighted } },
      MuiMenu: {
        styleOverrides: {
          paper: {
            ...highlighted,
            borderRadius: 16,
            // No position/isolation/width/transform here. MUI owns geometry.
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: { ...highlighted, borderRadius: 22 },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            backgroundColor: dark ? "#ffffff14" : "#0000000a",
          },
          indicator: { height: 3, borderRadius: 3 },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: { ...focus, textTransform: "none", fontWeight: 600 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { ...paint, borderRadius: 999 },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: { border: `2px solid ${dark ? "#202630" : "#ffffff"}` },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: { root: { borderRadius: 14 } },
      },
      MuiTooltip: { styleOverrides: { tooltip: { borderRadius: 10 } } },
    },
  };
};
