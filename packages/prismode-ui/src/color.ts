import {
  generateAllTokens as upstreamAll,
  generateColorTokens as upstreamColor,
} from "./vendor/md3-next/color";
import type { ResolvedMode } from "./types";
export type { MD3ColorTokens } from "./vendor/md3-next/color";
function validateSeed(seed: string) {
  if (!/^#[0-9a-f]{6}$/i.test(seed))
    throw new TypeError(
      "Prismode seed must be a six-digit hex color (#RRGGBB)",
    );
}
export function generateAllTokens(seed: string) {
  validateSeed(seed);
  return upstreamAll(seed);
}
export function generateColorTokens(seed: string, mode: ResolvedMode) {
  validateSeed(seed);
  return upstreamColor(seed, mode);
}
