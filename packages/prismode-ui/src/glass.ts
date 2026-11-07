import type { CSSObject } from "@emotion/react";

/**
 * Paint-only glass treatment suitable for MUI overlay Paper elements.
 *
 * Provenance of the decorative radial highlight: the MIT-licensed
 * cult/ui Distorted Glass component by nolly-studio, translated to
 * Emotion without Tailwind, SVG/Next.js dependencies or layout rules:
 * https://github.com/nolly-studio/cult-ui/blob/main/apps/www/registry/default/ui/distorted-glass.tsx
 *
 * Do not add positioning, isolation, widths or transforms here: Menu and
 * Popover own their anchor geometry.
 */
export function glassPaintStyles(dark: boolean, enhanced = false): CSSObject {
  const solid = dark ? "#202630" : "#f4f7fc";
  const tint = dark ? "rgba(43, 59, 82, 0.47)" : "rgba(247, 251, 255, 0.57)";
  const highlight = dark
    ? "rgba(255, 255, 255, 0.30)"
    : "rgba(255, 255, 255, 0.90)";
  const edge = dark ? "rgba(229, 242, 255, 0.48)" : "rgba(255, 255, 255, 0.96)";
  return {
    color: dark ? "#f4f7fc" : "#172033",
    backgroundColor: solid,
    border: `1px solid ${edge}`,
    boxShadow: `0 12px 32px rgba(13, 24, 44, ${dark ? "0.26" : "0.12"}), inset 0 1px 0 ${highlight}, inset 0 -1px 0 rgba(255, 255, 255, 0.10)`,
    "@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))":
      {
        backgroundColor: tint,
        // A softly lit transparent layer, adapted from cult/ui's radial
        // glass highlight; never filter the actual text or control contents.
        backgroundImage: enhanced
          ? "radial-gradient(ellipse at 14% 0%, rgba(255,255,255,0.24), transparent 54%), linear-gradient(145deg, rgba(255,255,255,0.12), transparent 50%, rgba(130,195,255,0.10))"
          : "linear-gradient(145deg, rgba(255,255,255,0.11), transparent 52%, rgba(130,195,255,0.06))",
        backdropFilter: `blur(${enhanced ? 20 : 12}px) saturate(${enhanced ? 1.5 : 1.25})`,
        WebkitBackdropFilter: `blur(${enhanced ? 20 : 12}px) saturate(${enhanced ? 1.5 : 1.25})`,
      },
    "@media (prefers-reduced-transparency: reduce)": {
      backgroundColor: solid,
      backgroundImage: "none",
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
    },
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
      animation: "none",
    },
    "@media (forced-colors: active)": {
      color: "CanvasText",
      backgroundColor: "Canvas",
      border: "1px solid CanvasText",
      backgroundImage: "none",
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      boxShadow: "none",
    },
  };
}

/** The compositional glass panel may establish its own containing block. */
export function glassStyles(dark: boolean, enhanced = false): CSSObject {
  return {
    ...glassPaintStyles(dark, enhanced),
    position: "relative",
    isolation: "isolate",
    borderRadius: "22px",
    ...(enhanced
      ? {
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            // cult/ui's repeating-radial lens sheen, softened to avoid
            // interfering with readable React content.
            background:
              "repeating-radial-gradient(circle at 50% 50%, rgb(255 255 255 / 0), rgba(255,255,255,0.035) 10px, rgba(255,255,255,0.08) 31px)",
            opacity: 0.34,
          },
          "@media (forced-colors: active)": {
            "&::before": { display: "none" },
            backgroundColor: "Canvas",
            color: "CanvasText",
            border: "1px solid CanvasText",
            boxShadow: "none",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
          },
          "@media (prefers-reduced-transparency: reduce)": {
            "&::before": { display: "none" },
            backgroundColor: dark ? "#202630" : "#f4f7fc",
            backgroundImage: "none",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
          },
        }
      : {}),
  };
}
