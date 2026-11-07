"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import type { MD3Theme, MD3Mode } from "./theme";
import type { MD3ColorTokens } from "./color";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export interface MD3ContextValue {
  /** The currently resolved mode ("light" or "dark"). */
  mode: "light" | "dark";
  /** The user's preference (may be "system"). */
  preference: MD3Mode;
  /** Set the mode preference. */
  setMode: (mode: MD3Mode) => void;
  /** Convenience toggle between light ↔ dark. */
  toggleMode: () => void;
  /** The active MD3 colour tokens for the current mode. */
  tokens: MD3ColorTokens;
  /** The seed colour used to derive the palette. */
  seed: string;
}

const MD3Context = createContext<MD3ContextValue | null>(null);

/**
 * Access the current MD3 context (mode, tokens, toggle helpers).
 * Must be used inside an `<MD3Provider>`.
 */
export function useMD3(): MD3ContextValue {
  const ctx = useContext(MD3Context);
  if (!ctx) {
    throw new Error("useMD3 must be used within an <MD3Provider>");
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// System preference detection
// ---------------------------------------------------------------------------

function useSystemPreference(): "light" | "dark" {
  const [pref, setPref] = useState<"light" | "dark">("light");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setPref(mq.matches ? "dark" : "light");

    const handler = (e: MediaQueryListEvent) => {
      setPref(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return pref;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface MD3ProviderProps {
  theme: MD3Theme;
  children: React.ReactNode;
}

/**
 * Wraps your app with the MD3 MUI theme and provides light/dark mode
 * switching driven by the user's system preference or explicit choice.
 *
 * ```tsx
 * <MD3Provider theme={theme}>{children}</MD3Provider>
 * ```
 */
export function MD3Provider({ theme, children }: MD3ProviderProps) {
  const [preference, setPreference] = useState<MD3Mode>(theme.mode);
  const systemPref = useSystemPreference();

  const resolvedMode: "light" | "dark" =
    preference === "system" ? systemPref : preference;

  const muiTheme = resolvedMode === "dark" ? theme.dark : theme.light;
  const tokens = theme.tokens[resolvedMode];

  const toggleMode = useCallback(() => {
    setPreference((prev) => {
      if (prev === "system") {
        return systemPref === "dark" ? "light" : "dark";
      }
      return prev === "dark" ? "light" : "dark";
    });
  }, [systemPref]);

  const value = useMemo<MD3ContextValue>(
    () => ({
      mode: resolvedMode,
      preference,
      setMode: setPreference,
      toggleMode,
      tokens,
      seed: theme.seed,
    }),
    [resolvedMode, preference, toggleMode, tokens, theme.seed],
  );

  return (
    <MD3Context.Provider value={value}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </MD3Context.Provider>
  );
}
