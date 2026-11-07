"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SearchBarProps {
  /** Current search value. */
  value: string;
  /** Callback fired on input change. */
  onChange: (value: string) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Element rendered on the left (e.g. a search icon). */
  leadingIcon?: React.ReactNode;
  /** Element rendered on the right (e.g. an avatar or microphone icon). */
  trailingIcon?: React.ReactNode;
  /** Callback fired when Enter is pressed. */
  onSubmit?: () => void;
  /** Full width mode. */
  fullWidth?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * MD3 Search Bar — a rounded search input with leading/trailing icons.
 *
 * ```tsx
 * import { SearchBar } from "md3-next";
 * import SearchIcon from "@mui/icons-material/Search";
 *
 * <SearchBar
 *   value={query}
 *   onChange={setQuery}
 *   placeholder="Search..."
 *   leadingIcon={<SearchIcon />}
 * />
 * ```
 */
export function SearchBar({
  value,
  onChange,
  placeholder = "Search",
  leadingIcon,
  trailingIcon,
  onSubmit,
  fullWidth = false,
}: SearchBarProps) {
  const theme = useTheme();
  const p = theme.palette;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: p.background.paper,
        borderRadius: 28,
        height: 56,
        px: 1,
        width: fullWidth ? "100%" : 360,
        boxShadow: `0 1px 3px 1px ${
          p.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"
        }, 0 1px 2px 0 ${
          p.mode === "dark" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.06)"
        }`,
      }}
    >
      {leadingIcon && (
        <IconButton
          size="small"
          sx={{ color: p.text.secondary, ml: 0.5 }}
          tabIndex={-1}
          aria-hidden
        >
          {leadingIcon}
        </IconButton>
      )}

      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        sx={{
          flex: 1,
          ml: leadingIcon ? 0.5 : 2,
          mr: trailingIcon ? 0.5 : 2,
          fontSize: 16,
          color: p.text.primary,
          "& ::placeholder": {
            color: p.text.secondary,
            opacity: 1,
          },
        }}
        inputProps={{
          "aria-label": placeholder,
        }}
      />

      {trailingIcon && (
        <IconButton size="small" sx={{ color: p.text.secondary, mr: 0.5 }}>
          {trailingIcon}
        </IconButton>
      )}
    </Box>
  );
}
