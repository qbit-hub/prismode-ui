import "./md3-compat";
import { createTheme } from "@mui/material/styles";
import { createMD3Theme } from "./vendor/md3-next/theme";
import { generateColorTokens } from "./color";
import type { PrismodeThemeOptions } from "./types";
import { liquidGlass } from "./systems";
export function createPrismodeTheme({
  designSystem = "material3",
  seed = "#6750A4",
  mode = "system",
}: PrismodeThemeOptions = {}) {
  if (!/^#[0-9a-f]{6}$/i.test(seed))
    throw new TypeError(
      "Prismode seed must be a six-digit hex color (#RRGGBB)",
    );
  const resolvedMode = mode === "dark" ? "dark" : "light";
  if (designSystem === "material3")
    return createMD3Theme({ seed, mode })[resolvedMode];
  const dark = resolvedMode === "dark";
  const t = generateColorTokens(seed, resolvedMode);
  return createTheme({
    palette: {
      mode: resolvedMode,
      primary: { main: t.primary, contrastText: t.onPrimary },
      secondary: { main: t.secondary, contrastText: t.onSecondary },
      error: { main: t.error, contrastText: t.onError },
      background: {
        default: dark ? "#10151e" : "#edf2fa",
        paper: dark ? "#202630" : "#ffffff",
      },
      text: { primary: t.onSurface, secondary: t.onSurfaceVariant },
      divider: t.outlineVariant,
    },
    ...liquidGlass(dark),
  });
}
