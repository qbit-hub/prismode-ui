"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NavigationRailItem {
  /** Unique key for this item. */
  key: string;
  /** Material icon element to display. */
  icon: React.ReactNode;
  /** Text label beneath the icon. */
  label: string;
}

export interface NavigationRailProps {
  /** The items to render. */
  items: NavigationRailItem[];
  /** The currently selected item key. */
  value: string;
  /** Callback fired when an item is selected. */
  onChange: (key: string) => void;
  /** Optional FAB element rendered at the top of the rail. */
  fab?: React.ReactNode;
  /** Alignment of items: top (default), center, or bottom. */
  align?: "top" | "center" | "bottom";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * MD3 Navigation Rail — a compact vertical navigation bar.
 *
 * ```tsx
 * import { NavigationRail } from "md3-next";
 *
 * <NavigationRail
 *   items={[
 *     { key: "home", icon: <HomeIcon />, label: "Home" },
 *     { key: "search", icon: <SearchIcon />, label: "Search" },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 * ```
 */
export function NavigationRail({
  items,
  value,
  onChange,
  fab,
  align = "top",
}: NavigationRailProps) {
  const theme = useTheme();
  const p = theme.palette;

  const justifyContent =
    align === "center" ? "center" : align === "bottom" ? "flex-end" : "flex-start";

  return (
    <Box
      component="nav"
      role="navigation"
      sx={{
        width: 80,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: p.background.paper,
        borderRight: `1px solid ${p.divider}`,
        py: 2,
      }}
    >
      {fab && <Box sx={{ mb: 2 }}>{fab}</Box>}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          flexGrow: 1,
          justifyContent,
        }}
      >
        {items.map((item) => {
          const selected = item.key === value;
          return (
            <ButtonBase
              key={item.key}
              onClick={() => onChange(item.key)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.25,
                p: 1,
                borderRadius: 2,
                width: 64,
                transition: "background-color 0.15s",
                "&:hover": { bgcolor: `${p.primary.main}08` },
              }}
            >
              {/* Indicator pill */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: selected ? 56 : 56,
                  height: 32,
                  borderRadius: 16,
                  bgcolor: selected ? p.secondary?.main ?? p.primary.main : "transparent",
                  color: selected
                    ? p.secondary?.contrastText ?? p.primary.contrastText
                    : p.text.secondary,
                  transition: "background-color 0.2s, color 0.2s",
                  "& .MuiSvgIcon-root": { fontSize: 24 },
                }}
              >
                {item.icon}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontSize: 12,
                  fontWeight: selected ? 600 : 400,
                  color: selected ? p.text.primary : p.text.secondary,
                  lineHeight: 1.2,
                }}
              >
                {item.label}
              </Typography>
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
}
