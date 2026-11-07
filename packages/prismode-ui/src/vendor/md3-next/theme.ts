import { createTheme, type Theme } from "@mui/material/styles";
import { generateAllTokens, type MD3ColorTokens } from "./color";
import { md3Typography } from "./typography";
import { md3ComponentOverrides } from "./components";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type MD3Mode = "light" | "dark" | "system";

export interface MD3ThemeOptions {
  /** Seed color in hex (e.g. "#6750A4"). */
  seed: string;
  /** Colour-scheme preference. Defaults to "system". */
  mode?: MD3Mode;
}

export interface MD3Theme {
  /** MUI theme configured for light mode. */
  light: Theme;
  /** MUI theme configured for dark mode. */
  dark: Theme;
  /** The requested mode preference ("light" | "dark" | "system"). */
  mode: MD3Mode;
  /** The original seed colour that was used to derive all tokens. */
  seed: string;
  /** Raw MD3 colour tokens for both schemes. */
  tokens: {
    light: MD3ColorTokens;
    dark: MD3ColorTokens;
  };
}

// ---------------------------------------------------------------------------
// Internal – build a single MUI theme from a set of MD3 tokens
// ---------------------------------------------------------------------------

function buildMuiTheme(tokens: MD3ColorTokens, mode: "light" | "dark"): Theme {
  return createTheme({
    palette: {
      mode,
      primary: { main: tokens.primary, contrastText: tokens.onPrimary },
      secondary: { main: tokens.secondary, contrastText: tokens.onSecondary },
      error: { main: tokens.error, contrastText: tokens.onError },
      background: {
        default: tokens.surface,
        paper: tokens.surfaceContainerLow,
      },
      text: {
        primary: tokens.onSurface,
        secondary: tokens.onSurfaceVariant,
      },
      divider: tokens.outlineVariant,
    },
    shape: { borderRadius: 12 },
    typography: md3Typography,
    components: md3ComponentOverrides(tokens),
  });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generate a full MD3-themed configuration from a single seed colour.
 *
 * ```ts
 * import { createMD3Theme } from "md3-next";
 *
 * const theme = createMD3Theme({ seed: "#6750A4", mode: "system" });
 * ```
 *
 * Pass the returned object to `<MD3Provider theme={theme}>` for automatic
 * light/dark switching and access to colour tokens via `useMD3()`.
 */
export function createMD3Theme(options: MD3ThemeOptions): MD3Theme {
  const { seed, mode = "system" } = options;
  const allTokens = generateAllTokens(seed);

  return {
    light: buildMuiTheme(allTokens.light, "light"),
    dark: buildMuiTheme(allTokens.dark, "dark"),
    mode,
    seed,
    tokens: allTokens,
  };
}
