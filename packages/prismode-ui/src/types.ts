export type DesignSystem = "material3" | "liquidGlass";
export type ColorMode = "light" | "dark" | "system";
export type ResolvedMode = Exclude<ColorMode, "system">;
export interface PrismodeThemeOptions {
  designSystem?: DesignSystem;
  seed?: string;
  /** Standalone system preference resolves predictably to light. */
  mode?: ColorMode;
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    tonal: true;
    elevated: true;
  }
}
