import {
  Hct,
  TonalPalette,
  argbFromHex,
  hexFromArgb,
} from "@material/material-color-utilities";

// ---------------------------------------------------------------------------
// MD3 Color Tokens – every role defined by the Material Design 3 spec
// ---------------------------------------------------------------------------

export interface MD3ColorTokens {
  // Primary
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  inversePrimary: string;

  // Secondary
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  // Tertiary
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  // Error
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  // Surface
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;

  // Background
  background: string;
  onBackground: string;

  // Outline
  outline: string;
  outlineVariant: string;

  // Inverse
  inverseSurface: string;
  inverseOnSurface: string;

  // Other
  shadow: string;
  scrim: string;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

interface MD3Palettes {
  primary: TonalPalette;
  secondary: TonalPalette;
  tertiary: TonalPalette;
  neutral: TonalPalette;
  neutralVariant: TonalPalette;
  error: TonalPalette;
}

function palettesFromSeed(seedHex: string): MD3Palettes {
  const source = argbFromHex(seedHex);
  const hct = Hct.fromInt(source);

  return {
    primary: TonalPalette.fromHueAndChroma(hct.hue, Math.max(48, hct.chroma)),
    secondary: TonalPalette.fromHueAndChroma(hct.hue, 16),
    tertiary: TonalPalette.fromHueAndChroma(hct.hue + 60, 24),
    neutral: TonalPalette.fromHueAndChroma(hct.hue, 4),
    neutralVariant: TonalPalette.fromHueAndChroma(hct.hue, 8),
    error: TonalPalette.fromHueAndChroma(25, 84),
  };
}

const hex = (p: TonalPalette, t: number) => hexFromArgb(p.tone(t));

// ---------------------------------------------------------------------------
// Light scheme tokens (tone mapping per MD3 spec)
// ---------------------------------------------------------------------------

function lightTokens(p: MD3Palettes): MD3ColorTokens {
  return {
    primary: hex(p.primary, 40),
    onPrimary: hex(p.primary, 100),
    primaryContainer: hex(p.primary, 90),
    onPrimaryContainer: hex(p.primary, 10),
    inversePrimary: hex(p.primary, 80),

    secondary: hex(p.secondary, 40),
    onSecondary: hex(p.secondary, 100),
    secondaryContainer: hex(p.secondary, 90),
    onSecondaryContainer: hex(p.secondary, 10),

    tertiary: hex(p.tertiary, 40),
    onTertiary: hex(p.tertiary, 100),
    tertiaryContainer: hex(p.tertiary, 90),
    onTertiaryContainer: hex(p.tertiary, 10),

    error: hex(p.error, 40),
    onError: hex(p.error, 100),
    errorContainer: hex(p.error, 90),
    onErrorContainer: hex(p.error, 10),

    surface: hex(p.neutral, 98),
    onSurface: hex(p.neutral, 10),
    surfaceVariant: hex(p.neutralVariant, 90),
    onSurfaceVariant: hex(p.neutralVariant, 30),
    surfaceDim: hex(p.neutral, 87),
    surfaceBright: hex(p.neutral, 98),
    surfaceContainerLowest: hex(p.neutral, 100),
    surfaceContainerLow: hex(p.neutral, 96),
    surfaceContainer: hex(p.neutral, 94),
    surfaceContainerHigh: hex(p.neutral, 92),
    surfaceContainerHighest: hex(p.neutral, 90),

    background: hex(p.neutral, 98),
    onBackground: hex(p.neutral, 10),

    outline: hex(p.neutralVariant, 50),
    outlineVariant: hex(p.neutralVariant, 80),

    inverseSurface: hex(p.neutral, 20),
    inverseOnSurface: hex(p.neutral, 95),

    shadow: hex(p.neutral, 0),
    scrim: hex(p.neutral, 0),
  };
}

// ---------------------------------------------------------------------------
// Dark scheme tokens
// ---------------------------------------------------------------------------

function darkTokens(p: MD3Palettes): MD3ColorTokens {
  return {
    primary: hex(p.primary, 80),
    onPrimary: hex(p.primary, 20),
    primaryContainer: hex(p.primary, 30),
    onPrimaryContainer: hex(p.primary, 90),
    inversePrimary: hex(p.primary, 40),

    secondary: hex(p.secondary, 80),
    onSecondary: hex(p.secondary, 20),
    secondaryContainer: hex(p.secondary, 30),
    onSecondaryContainer: hex(p.secondary, 90),

    tertiary: hex(p.tertiary, 80),
    onTertiary: hex(p.tertiary, 20),
    tertiaryContainer: hex(p.tertiary, 30),
    onTertiaryContainer: hex(p.tertiary, 90),

    error: hex(p.error, 80),
    onError: hex(p.error, 20),
    errorContainer: hex(p.error, 30),
    onErrorContainer: hex(p.error, 90),

    surface: hex(p.neutral, 6),
    onSurface: hex(p.neutral, 90),
    surfaceVariant: hex(p.neutralVariant, 30),
    onSurfaceVariant: hex(p.neutralVariant, 80),
    surfaceDim: hex(p.neutral, 6),
    surfaceBright: hex(p.neutral, 24),
    surfaceContainerLowest: hex(p.neutral, 4),
    surfaceContainerLow: hex(p.neutral, 10),
    surfaceContainer: hex(p.neutral, 12),
    surfaceContainerHigh: hex(p.neutral, 17),
    surfaceContainerHighest: hex(p.neutral, 22),

    background: hex(p.neutral, 6),
    onBackground: hex(p.neutral, 90),

    outline: hex(p.neutralVariant, 60),
    outlineVariant: hex(p.neutralVariant, 30),

    inverseSurface: hex(p.neutral, 90),
    inverseOnSurface: hex(p.neutral, 20),

    shadow: hex(p.neutral, 0),
    scrim: hex(p.neutral, 0),
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function generateColorTokens(
  seedColor: string,
  mode: "light" | "dark",
): MD3ColorTokens {
  const palettes = palettesFromSeed(seedColor);
  return mode === "light" ? lightTokens(palettes) : darkTokens(palettes);
}

export function generateAllTokens(seedColor: string) {
  const palettes = palettesFromSeed(seedColor);
  return {
    light: lightTokens(palettes),
    dark: darkTokens(palettes),
  };
}
