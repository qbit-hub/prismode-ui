"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SegmentedButtonItem {
  /** Unique value for this segment. */
  value: string;
  /** Label text. */
  label: string;
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
}

export interface SegmentedButtonProps {
  /** Segment items. */
  items: SegmentedButtonItem[];
  /** Currently selected value. */
  value: string;
  /** Callback fired when selection changes. */
  onChange: (value: string) => void;
  /** Full width mode. */
  fullWidth?: boolean;
  /** Size variant. */
  size?: "small" | "medium";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * MD3 Segmented Button — a horizontal set of mutually exclusive options.
 *
 * ```tsx
 * import { SegmentedButton } from "md3-next";
 *
 * <SegmentedButton
 *   items={[
 *     { value: "day", label: "Day" },
 *     { value: "week", label: "Week" },
 *     { value: "month", label: "Month" },
 *   ]}
 *   value={period}
 *   onChange={setPeriod}
 * />
 * ```
 */
export function SegmentedButton({
  items,
  value,
  onChange,
  fullWidth = false,
  size = "medium",
}: SegmentedButtonProps) {
  const theme = useTheme();
  const p = theme.palette;

  const height = size === "small" ? 32 : 40;

  return (
    <Box
      role="group"
      sx={{
        display: "inline-flex",
        borderRadius: 20,
        border: `1px solid ${p.divider}`,
        overflow: "hidden",
        width: fullWidth ? "100%" : "auto",
      }}
    >
      {items.map((item, i) => {
        const selected = item.value === value;
        return (
          <ButtonBase
            key={item.value}
            onClick={() => onChange(item.value)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.75,
              height,
              px: size === "small" ? 1.5 : 2.5,
              flex: fullWidth ? 1 : "0 0 auto",
              bgcolor: selected
                ? p.secondary?.main ?? p.primary.main
                : "transparent",
              color: selected
                ? p.secondary?.contrastText ?? p.primary.contrastText
                : p.text.primary,
              borderRight: i < items.length - 1 ? `1px solid ${p.divider}` : "none",
              transition: "background-color 0.15s, color 0.15s",
              "&:hover": {
                bgcolor: selected
                  ? p.secondary?.main ?? p.primary.main
                  : `${p.primary.main}08`,
              },
              "& .MuiSvgIcon-root": { fontSize: size === "small" ? 16 : 18 },
            }}
          >
            {selected && (
              <Box
                component="svg"
                viewBox="0 0 24 24"
                sx={{ width: size === "small" ? 14 : 18, height: size === "small" ? 14 : 18, fill: "currentColor" }}
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </Box>
            )}
            {item.icon && !selected && item.icon}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                fontSize: size === "small" ? 13 : 14,
                letterSpacing: "0.1px",
                lineHeight: 1,
              }}
            >
              {item.label}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
