import type { ThemeOptions } from "@mui/material/styles";
import type { MD3ColorTokens } from "./color";

/**
 * Returns MUI component overrides that apply Material Design 3 styling to
 * every relevant MUI component. Called once per light/dark theme build.
 */
export function md3ComponentOverrides(
  tokens: MD3ColorTokens,
): ThemeOptions["components"] {
  return {
    // ------------------------------------------------------------------
    // Baseline
    // ------------------------------------------------------------------
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.surface,
          color: tokens.onSurface,
        },
      },
    },

    // ------------------------------------------------------------------
    // Button – MD3 Filled / Outlined / Text + custom tonal & elevated
    // ------------------------------------------------------------------
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: "none" as const,
          fontWeight: 500,
          fontSize: "0.875rem",
          letterSpacing: "0.1px",
          lineHeight: "20px",
          padding: "10px 24px",
          minHeight: 40,
        },
        contained: {
          backgroundColor: tokens.primary,
          color: tokens.onPrimary,
          "&:hover": {
            backgroundColor: tokens.primary,
            boxShadow: `0 1px 2px 0 ${tokens.shadow}4d`,
          },
        },
        outlined: {
          borderColor: tokens.outline,
          color: tokens.primary,
          "&:hover": {
            backgroundColor: `${tokens.primary}14`,
            borderColor: tokens.outline,
          },
        },
        text: {
          color: tokens.primary,
          padding: "10px 12px",
          "&:hover": {
            backgroundColor: `${tokens.primary}14`,
          },
        },
      },
      variants: [
        {
          props: { variant: "tonal" as never },
          style: {
            backgroundColor: tokens.secondaryContainer,
            color: tokens.onSecondaryContainer,
            "&:hover": {
              backgroundColor: tokens.secondaryContainer,
              boxShadow: `0 1px 2px 0 ${tokens.shadow}4d`,
            },
          },
        },
        {
          props: { variant: "elevated" as never },
          style: {
            backgroundColor: tokens.surfaceContainerLow,
            color: tokens.primary,
            boxShadow: `0 1px 2px 0 ${tokens.shadow}4d`,
            "&:hover": {
              boxShadow: `0 1px 3px 1px ${tokens.shadow}33, 0 1px 2px 0 ${tokens.shadow}4d`,
            },
          },
        },
      ],
    },

    // ------------------------------------------------------------------
    // Icon Button
    // ------------------------------------------------------------------
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: tokens.onSurfaceVariant,
          "&:hover": { backgroundColor: `${tokens.onSurfaceVariant}14` },
        },
      },
    },

    // ------------------------------------------------------------------
    // FAB
    // ------------------------------------------------------------------
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: `0 1px 3px 1px ${tokens.shadow}33, 0 1px 2px 0 ${tokens.shadow}4d`,
          backgroundColor: tokens.primaryContainer,
          color: tokens.onPrimaryContainer,
          textTransform: "none" as const,
          "&:hover": {
            boxShadow: `0 2px 6px 2px ${tokens.shadow}33, 0 1px 2px 0 ${tokens.shadow}4d`,
          },
          "&:active": {
            boxShadow: `0 1px 3px 1px ${tokens.shadow}33, 0 1px 2px 0 ${tokens.shadow}4d`,
          },
        },
        extended: { borderRadius: 16, padding: "0 16px", gap: 8 },
      },
    },

    // ------------------------------------------------------------------
    // Card
    // ------------------------------------------------------------------
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12, backgroundImage: "none" },
      },
      variants: [
        {
          props: { variant: "elevation" },
          style: {
            backgroundColor: tokens.surfaceContainerLow,
            boxShadow: `0 1px 2px 0 ${tokens.shadow}4d`,
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.outlineVariant,
          },
        },
      ],
    },

    // ------------------------------------------------------------------
    // Paper
    // ------------------------------------------------------------------
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
        rounded: { borderRadius: 12 },
      },
    },

    // ------------------------------------------------------------------
    // App Bar
    // ------------------------------------------------------------------
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: tokens.surface,
          color: tokens.onSurface,
        },
      },
    },

    // ------------------------------------------------------------------
    // Drawer
    // ------------------------------------------------------------------
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: tokens.surfaceContainerLow,
          borderColor: tokens.outlineVariant,
        },
      },
    },

    // ------------------------------------------------------------------
    // Text Fields
    // ------------------------------------------------------------------
    MuiTextField: { defaultProps: { variant: "outlined" } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.onSurface,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.primary,
            borderWidth: 2,
          },
        },
        notchedOutline: { borderColor: tokens.outline },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: "4px 4px 0 0",
          backgroundColor: tokens.surfaceContainerHighest,
          "&:hover": { backgroundColor: tokens.surfaceContainerHighest },
          "&.Mui-focused": { backgroundColor: tokens.surfaceContainerHighest },
          "&::before": { borderBottomColor: tokens.onSurfaceVariant },
          "&::after": { borderBottomColor: tokens.primary },
        },
      },
    },

    // ------------------------------------------------------------------
    // Chip
    // ------------------------------------------------------------------
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, height: 32 },
        outlined: { borderColor: tokens.outline },
        filled: {
          backgroundColor: tokens.secondaryContainer,
          color: tokens.onSecondaryContainer,
        },
      },
    },

    // ------------------------------------------------------------------
    // Switch (MD3 wide-track style)
    // ------------------------------------------------------------------
    MuiSwitch: {
      styleOverrides: {
        root: { width: 52, height: 32, padding: 0 },
        switchBase: {
          padding: 6,
          "&.Mui-checked": {
            transform: "translateX(20px)",
            color: tokens.onPrimary,
            "& + .MuiSwitch-track": {
              backgroundColor: tokens.primary,
              opacity: 1,
              border: "none",
            },
            "& .MuiSwitch-thumb": { width: 24, height: 24, margin: -2 },
          },
        },
        thumb: {
          width: 16,
          height: 16,
          boxShadow: "none",
          backgroundColor: tokens.outline,
        },
        track: {
          borderRadius: 16,
          backgroundColor: tokens.surfaceContainerHighest,
          opacity: 1,
          border: `2px solid ${tokens.outline}`,
        },
      },
    },

    // ------------------------------------------------------------------
    // Dialog
    // ------------------------------------------------------------------
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 28,
          backgroundColor: tokens.surfaceContainerHigh,
          backgroundImage: "none",
        },
      },
    },

    // ------------------------------------------------------------------
    // Menu
    // ------------------------------------------------------------------
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 4,
          backgroundColor: tokens.surfaceContainer,
          backgroundImage: "none",
        },
      },
    },

    // ------------------------------------------------------------------
    // List / Navigation
    // ------------------------------------------------------------------
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "0 28px 28px 0",
          "&.Mui-selected": {
            backgroundColor: tokens.secondaryContainer,
            color: tokens.onSecondaryContainer,
            "&:hover": { backgroundColor: tokens.secondaryContainer },
          },
        },
      },
    },

    // ------------------------------------------------------------------
    // Bottom Navigation
    // ------------------------------------------------------------------
    MuiBottomNavigation: {
      styleOverrides: {
        root: { backgroundColor: tokens.surfaceContainer, height: 80 },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: tokens.onSurfaceVariant,
          "&.Mui-selected": { color: tokens.onSecondaryContainer },
          "& .MuiBottomNavigationAction-label": {
            fontSize: "0.75rem",
            fontWeight: 500,
            "&.Mui-selected": { fontSize: "0.75rem", fontWeight: 700 },
          },
        },
      },
    },

    // ------------------------------------------------------------------
    // Tabs
    // ------------------------------------------------------------------
    MuiTabs: {
      styleOverrides: {
        root: { minHeight: 48 },
        indicator: {
          height: 3,
          borderRadius: "3px 3px 0 0",
          backgroundColor: tokens.primary,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none" as const,
          fontWeight: 500,
          fontSize: "0.875rem",
          letterSpacing: "0.1px",
          color: tokens.onSurfaceVariant,
          "&.Mui-selected": { color: tokens.primary },
        },
      },
    },

    // ------------------------------------------------------------------
    // Miscellaneous
    // ------------------------------------------------------------------
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: tokens.inverseSurface,
          color: tokens.inverseOnSurface,
          borderRadius: 4,
          fontSize: "0.75rem",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.inverseSurface,
          color: tokens.inverseOnSurface,
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: tokens.outlineVariant } },
    },
    MuiBadge: {
      styleOverrides: {
        badge: { backgroundColor: tokens.error, color: tokens.onError },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 4, backgroundColor: tokens.primaryContainer },
        bar: { borderRadius: 4, backgroundColor: tokens.primary },
      },
    },
    MuiCircularProgress: {
      styleOverrides: { root: { color: tokens.primary } },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 12 },
        standardError: {
          backgroundColor: tokens.errorContainer,
          color: tokens.onErrorContainer,
        },
        standardWarning: {
          backgroundColor: tokens.tertiaryContainer,
          color: tokens.onTertiaryContainer,
        },
        standardInfo: {
          backgroundColor: tokens.secondaryContainer,
          color: tokens.onSecondaryContainer,
        },
        standardSuccess: {
          backgroundColor: tokens.primaryContainer,
          color: tokens.onPrimaryContainer,
        },
      },
    },

    // ------------------------------------------------------------------
    // Button Group – MD3 segmented button
    // ------------------------------------------------------------------
    MuiButtonGroup: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 20 },
        grouped: {
          borderColor: tokens.outline,
          "&:not(:last-of-type)": { borderRightColor: tokens.outline },
        },
        groupedOutlined: {
          color: tokens.onSurface,
          "&.Mui-selected, &.active": {
            backgroundColor: tokens.secondaryContainer,
            color: tokens.onSecondaryContainer,
          },
        },
      },
    },

    // ------------------------------------------------------------------
    // Toggle Button – MD3 segmented button item
    // ------------------------------------------------------------------
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: tokens.outline,
          color: tokens.onSurface,
          textTransform: "none" as const,
          fontWeight: 500,
          "&.Mui-selected": {
            backgroundColor: tokens.secondaryContainer,
            color: tokens.onSecondaryContainer,
            "&:hover": { backgroundColor: tokens.secondaryContainer },
          },
          "&:hover": { backgroundColor: `${tokens.onSurface}08` },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: { borderRadius: 20 },
        grouped: {
          borderRadius: 20,
          "&:not(:first-of-type)": {
            borderLeft: `1px solid ${tokens.outline}`,
            marginLeft: 0,
          },
        },
      },
    },

    // ------------------------------------------------------------------
    // Checkbox
    // ------------------------------------------------------------------
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: tokens.onSurfaceVariant,
          "&.Mui-checked": { color: tokens.primary },
          "&.Mui-disabled": { color: `${tokens.onSurface}38` },
          "&:hover": { backgroundColor: `${tokens.primary}14` },
        },
      },
    },

    // ------------------------------------------------------------------
    // Radio
    // ------------------------------------------------------------------
    MuiRadio: {
      styleOverrides: {
        root: {
          color: tokens.onSurfaceVariant,
          "&.Mui-checked": { color: tokens.primary },
          "&.Mui-disabled": { color: `${tokens.onSurface}38` },
          "&:hover": { backgroundColor: `${tokens.primary}14` },
        },
      },
    },

    // ------------------------------------------------------------------
    // Slider
    // ------------------------------------------------------------------
    MuiSlider: {
      styleOverrides: {
        root: { color: tokens.primary, height: 4 },
        thumb: {
          width: 20,
          height: 20,
          backgroundColor: tokens.primary,
          "&::before": { boxShadow: "none" },
          "&:hover, &.Mui-focusVisible": {
            boxShadow: `0 0 0 8px ${tokens.primary}28`,
          },
          "&.Mui-active": {
            boxShadow: `0 0 0 14px ${tokens.primary}28`,
          },
        },
        track: { backgroundColor: tokens.primary, border: "none" },
        rail: { backgroundColor: tokens.surfaceContainerHighest, opacity: 1 },
        valueLabel: {
          backgroundColor: tokens.primary,
          color: tokens.onPrimary,
          borderRadius: 8,
          "& *": { background: "transparent" },
        },
        mark: {
          backgroundColor: tokens.onPrimary,
          width: 4,
          height: 4,
          borderRadius: 2,
        },
        markActive: { backgroundColor: tokens.primaryContainer },
      },
    },

    // ------------------------------------------------------------------
    // Rating
    // ------------------------------------------------------------------
    MuiRating: {
      styleOverrides: {
        root: { color: tokens.primary },
        iconEmpty: { color: tokens.onSurfaceVariant },
      },
    },

    // ------------------------------------------------------------------
    // Select
    // ------------------------------------------------------------------
    MuiSelect: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        icon: { color: tokens.onSurfaceVariant },
      },
    },
    MuiNativeSelect: {
      styleOverrides: {
        icon: { color: tokens.onSurfaceVariant },
      },
    },

    // ------------------------------------------------------------------
    // Form controls
    // ------------------------------------------------------------------
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: tokens.onSurfaceVariant,
          "&.Mui-focused": { color: tokens.primary },
          "&.Mui-error": { color: tokens.error },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: tokens.onSurfaceVariant,
          "&.Mui-focused": { color: tokens.primary },
          "&.Mui-error": { color: tokens.error },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: tokens.onSurfaceVariant,
          "&.Mui-error": { color: tokens.error },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: { color: tokens.onSurface },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: { color: tokens.onSurfaceVariant },
      },
    },

    // ------------------------------------------------------------------
    // List (expanded)
    // ------------------------------------------------------------------
    MuiList: {
      styleOverrides: {
        root: { padding: 0 },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: { color: tokens.onSurface },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: { color: tokens.onSurfaceVariant, minWidth: 40 },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: { color: tokens.onSurface },
        secondary: { color: tokens.onSurfaceVariant },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          color: tokens.onSurfaceVariant,
          fontWeight: 500,
          fontSize: "0.875rem",
          letterSpacing: "0.1px",
          lineHeight: "20px",
        },
      },
    },

    // ------------------------------------------------------------------
    // Menu Item
    // ------------------------------------------------------------------
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: tokens.onSurface,
          minHeight: 48,
          "&:hover": { backgroundColor: `${tokens.onSurface}08` },
          "&.Mui-selected": {
            backgroundColor: `${tokens.onSurface}12`,
            "&:hover": { backgroundColor: `${tokens.onSurface}16` },
          },
          "&.Mui-focusVisible": { backgroundColor: `${tokens.onSurface}12` },
        },
      },
    },

    // ------------------------------------------------------------------
    // Dialog (expanded)
    // ------------------------------------------------------------------
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: tokens.onSurface,
          fontSize: "1.5rem",
          fontWeight: 400,
          padding: "24px 24px 16px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          color: tokens.onSurfaceVariant,
          padding: "0 24px 24px",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: { color: tokens.onSurfaceVariant },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: { padding: "0 24px 24px" },
      },
    },

    // ------------------------------------------------------------------
    // Accordion
    // ------------------------------------------------------------------
    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: tokens.surface,
          borderBottom: `1px solid ${tokens.outlineVariant}`,
          "&::before": { display: "none" },
          "&.Mui-expanded": { margin: 0 },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          color: tokens.onSurface,
          minHeight: 48,
          "&.Mui-expanded": { minHeight: 48 },
        },
        content: {
          margin: "12px 0",
          "&.Mui-expanded": { margin: "12px 0" },
        },
        expandIconWrapper: { color: tokens.onSurfaceVariant },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: { padding: "0 16px 16px", color: tokens.onSurfaceVariant },
      },
    },

    // ------------------------------------------------------------------
    // Stepper
    // ------------------------------------------------------------------
    MuiStepper: {
      styleOverrides: {
        root: { backgroundColor: "transparent" },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: tokens.onSurfaceVariant,
          "&.Mui-active": { color: tokens.onSurface, fontWeight: 500 },
          "&.Mui-completed": { color: tokens.onSurface },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: tokens.surfaceContainerHighest,
          "&.Mui-active": { color: tokens.primary },
          "&.Mui-completed": { color: tokens.primary },
        },
        text: { fill: tokens.onSurfaceVariant },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: { borderColor: tokens.outlineVariant },
      },
    },
    MuiMobileStepper: {
      styleOverrides: {
        root: { backgroundColor: tokens.surfaceContainer },
        dotActive: { backgroundColor: tokens.primary },
        dot: { backgroundColor: tokens.outlineVariant },
      },
    },

    // ------------------------------------------------------------------
    // Breadcrumbs
    // ------------------------------------------------------------------
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: { color: tokens.onSurfaceVariant },
        li: {
          "& a": { color: tokens.primary, textDecoration: "none" },
          "& p": { color: tokens.onSurfaceVariant },
        },
      },
    },

    // ------------------------------------------------------------------
    // Pagination
    // ------------------------------------------------------------------
    MuiPagination: {
      defaultProps: { shape: "rounded" },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: tokens.onSurface,
          borderRadius: 20,
          "&.Mui-selected": {
            backgroundColor: tokens.secondaryContainer,
            color: tokens.onSecondaryContainer,
            "&:hover": { backgroundColor: tokens.secondaryContainer },
          },
          "&:hover": { backgroundColor: `${tokens.onSurface}08` },
        },
        outlined: { borderColor: tokens.outline },
      },
    },

    // ------------------------------------------------------------------
    // Link
    // ------------------------------------------------------------------
    MuiLink: {
      styleOverrides: {
        root: { color: tokens.primary, textDecorationColor: tokens.primary },
      },
    },

    // ------------------------------------------------------------------
    // Avatar
    // ------------------------------------------------------------------
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.primaryContainer,
          color: tokens.onPrimaryContainer,
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        avatar: {
          borderColor: tokens.surface,
          backgroundColor: tokens.secondaryContainer,
          color: tokens.onSecondaryContainer,
        },
      },
    },

    // ------------------------------------------------------------------
    // Skeleton
    // ------------------------------------------------------------------
    MuiSkeleton: {
      styleOverrides: {
        root: { backgroundColor: `${tokens.onSurface}11` },
      },
    },

    // ------------------------------------------------------------------
    // Backdrop
    // ------------------------------------------------------------------
    MuiBackdrop: {
      styleOverrides: {
        root: { backgroundColor: `${tokens.scrim}52` },
      },
    },

    // ------------------------------------------------------------------
    // Toolbar
    // ------------------------------------------------------------------
    MuiToolbar: {
      styleOverrides: {
        root: { color: tokens.onSurface },
      },
    },

    // ------------------------------------------------------------------
    // Snackbar (wrapper – content is styled above)
    // ------------------------------------------------------------------
    MuiSnackbar: {
      styleOverrides: {
        root: { borderRadius: 4 },
      },
    },

    // ------------------------------------------------------------------
    // Popover
    // ------------------------------------------------------------------
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 4,
          backgroundColor: tokens.surfaceContainer,
          backgroundImage: "none",
          boxShadow: `0 2px 6px 2px ${tokens.shadow}26, 0 1px 2px 0 ${tokens.shadow}4d`,
        },
      },
    },

    // ------------------------------------------------------------------
    // Speed Dial
    // ------------------------------------------------------------------
    MuiSpeedDial: {
      styleOverrides: {
        fab: {
          backgroundColor: tokens.primaryContainer,
          color: tokens.onPrimaryContainer,
          boxShadow: `0 1px 3px 1px ${tokens.shadow}33, 0 1px 2px 0 ${tokens.shadow}4d`,
          "&:hover": {
            backgroundColor: tokens.primaryContainer,
            boxShadow: `0 2px 6px 2px ${tokens.shadow}33, 0 1px 2px 0 ${tokens.shadow}4d`,
          },
        },
      },
    },
    MuiSpeedDialAction: {
      styleOverrides: {
        fab: {
          backgroundColor: tokens.surfaceContainerHigh,
          color: tokens.onSurfaceVariant,
          boxShadow: `0 1px 3px 1px ${tokens.shadow}33, 0 1px 2px 0 ${tokens.shadow}4d`,
          "&:hover": { backgroundColor: tokens.surfaceContainerHighest },
        },
      },
    },

    // ------------------------------------------------------------------
    // Table
    // ------------------------------------------------------------------
    MuiTableContainer: {
      styleOverrides: {
        root: { backgroundColor: tokens.surface },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: tokens.surfaceContainerLow,
            color: tokens.onSurface,
            fontWeight: 500,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: tokens.outlineVariant,
          color: tokens.onSurface,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: `${tokens.onSurface}08` },
          "&.Mui-selected": {
            backgroundColor: `${tokens.primary}14`,
            "&:hover": { backgroundColor: `${tokens.primary}1a` },
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: tokens.onSurface,
          "&:hover": { color: tokens.onSurface },
          "&.Mui-active": { color: tokens.onSurface },
        },
        icon: { color: `${tokens.onSurfaceVariant} !important` },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: { color: tokens.onSurface },
        selectIcon: { color: tokens.onSurfaceVariant },
      },
    },

    // ------------------------------------------------------------------
    // Image List
    // ------------------------------------------------------------------
    MuiImageListItemBar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(to top, ${tokens.scrim}cc 0%, transparent 100%)`,
        },
        title: { color: tokens.inverseSurface },
        subtitle: { color: `${tokens.inverseSurface}b3` },
      },
    },

    // ------------------------------------------------------------------
    // Autocomplete
    // ------------------------------------------------------------------
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: tokens.surfaceContainer,
          backgroundImage: "none",
          borderRadius: 4,
          boxShadow: `0 2px 6px 2px ${tokens.shadow}26, 0 1px 2px 0 ${tokens.shadow}4d`,
        },
        listbox: {
          "& .MuiAutocomplete-option": {
            "&:hover": { backgroundColor: `${tokens.onSurface}08` },
            "&[aria-selected='true']": {
              backgroundColor: `${tokens.primary}14`,
            },
            "&.Mui-focused": { backgroundColor: `${tokens.onSurface}12` },
          },
        },
        tag: {
          backgroundColor: tokens.secondaryContainer,
          color: tokens.onSecondaryContainer,
        },
      },
    },
  };
}
