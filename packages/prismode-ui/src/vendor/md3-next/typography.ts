import type { ThemeOptions } from "@mui/material/styles";

/**
 * MD3 type scale mapped to MUI typography variants.
 *
 * h1  → Display Large     h4  → Headline Large
 * h2  → Display Medium    h5  → Headline Medium
 * h3  → Display Small     h6  → Headline Small
 * subtitle1 → Title Large      body1 → Body Large
 * subtitle2 → Title Medium     body2 → Body Medium
 * button → Label Large         caption → Body Small
 * overline → Label Small
 */
export const md3Typography: ThemeOptions["typography"] = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

  h1: {
    fontSize: "3.5625rem",
    fontWeight: 400,
    lineHeight: 1.12,
    letterSpacing: "-0.25px",
  },
  h2: {
    fontSize: "2.8125rem",
    fontWeight: 400,
    lineHeight: 1.16,
    letterSpacing: "0px",
  },
  h3: {
    fontSize: "2.25rem",
    fontWeight: 400,
    lineHeight: 1.22,
    letterSpacing: "0px",
  },
  h4: {
    fontSize: "2rem",
    fontWeight: 400,
    lineHeight: 1.25,
    letterSpacing: "0px",
  },
  h5: {
    fontSize: "1.75rem",
    fontWeight: 400,
    lineHeight: 1.29,
    letterSpacing: "0px",
  },
  h6: {
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: 1.33,
    letterSpacing: "0px",
  },
  subtitle1: {
    fontSize: "1.375rem",
    fontWeight: 400,
    lineHeight: 1.27,
    letterSpacing: "0px",
  },
  subtitle2: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.15px",
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.5px",
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: "0.25px",
  },
  button: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.43,
    letterSpacing: "0.1px",
    textTransform: "none",
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.33,
    letterSpacing: "0.4px",
  },
  overline: {
    fontSize: "0.6875rem",
    fontWeight: 500,
    lineHeight: 1.45,
    letterSpacing: "0.5px",
    textTransform: "none",
  },
};
