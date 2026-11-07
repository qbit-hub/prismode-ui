import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ThemeProvider, type Theme } from "@mui/material/styles";
import { createPrismodeTheme } from "./theme";
import type { ColorMode, DesignSystem, ResolvedMode } from "./types";
export interface PrismodeContextValue {
  designSystem: DesignSystem;
  setDesignSystem: (system: DesignSystem) => void;
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
  resolvedMode: ResolvedMode;
  seed: string;
  setSeed: (seed: string) => void;
}
export interface PrismodeProviderProps {
  children: ReactNode;
  initialDesignSystem?: DesignSystem;
  initialMode?: ColorMode;
  initialSeed?: string;
  /** Separate key per application. Pass null to disable preference persistence. */
  storageKey?: string | null;
  /** Optional application-owned MUI theme customization. */
  transformTheme?: (theme: Theme) => Theme;
}
const Context = createContext<PrismodeContextValue | null>(null);
const isMode = (value: unknown): value is ColorMode =>
  value === "light" || value === "dark" || value === "system";
export function PrismodeProvider({
  children,
  initialDesignSystem = "material3",
  initialMode = "system",
  initialSeed = "#6750A4",
  storageKey = "prismode-mode",
  transformTheme,
}: PrismodeProviderProps) {
  const [designSystem, setDesignSystem] = useState(initialDesignSystem);
  const [seed, updateSeed] = useState(initialSeed);
  const [mode, updateMode] = useState(initialMode);
  const [systemMode, setSystemMode] = useState<ResolvedMode>("light");
  // A deterministic first render also works during SSR and hydration.
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setSystemMode(media.matches ? "dark" : "light");
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (storageKey === null) return;
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (isMode(saved)) updateMode(saved);
    } catch {
      /* Storage may be unavailable in private or sandboxed contexts. */
    }
    const sync = (event: StorageEvent) => {
      if (event.key === storageKey && isMode(event.newValue))
        updateMode(event.newValue);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [storageKey]);
  const setMode = useCallback(
    (next: ColorMode) => {
      updateMode(next);
      if (storageKey !== null) {
        try {
          window.localStorage.setItem(storageKey, next);
        } catch {
          /* Optional persistence. */
        }
      }
    },
    [storageKey],
  );
  const setSeed = useCallback((next: string) => {
    if (!/^#[0-9a-f]{6}$/i.test(next))
      throw new TypeError(
        "Prismode seed must be a six-digit hex color (#RRGGBB)",
      );
    updateSeed(next);
  }, []);
  const resolvedMode = mode === "system" ? systemMode : mode;
  const theme = useMemo(() => {
    const base = createPrismodeTheme({
      designSystem,
      seed,
      mode: resolvedMode,
    });
    return transformTheme ? transformTheme(base) : base;
  }, [designSystem, seed, resolvedMode, transformTheme]);
  const value = useMemo(
    () => ({
      designSystem,
      setDesignSystem,
      seed,
      setSeed,
      mode,
      setMode,
      resolvedMode,
    }),
    [designSystem, seed, setSeed, mode, setMode, resolvedMode],
  );
  return (
    <Context.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Context.Provider>
  );
}
export function usePrismode(): PrismodeContextValue {
  const value = useContext(Context);
  if (!value) throw new Error("usePrismode requires PrismodeProvider");
  return value;
}
