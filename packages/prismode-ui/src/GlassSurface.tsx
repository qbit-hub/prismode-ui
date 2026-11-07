import { forwardRef } from "react";
import Box, { type BoxProps } from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { glassStyles } from "./glass";
export interface GlassSurfaceProps extends Omit<BoxProps, "component"> {
  /** Adds stronger saturation and a static reflective gradient, never distortion. */
  enhanced?: boolean;
}
export const GlassSurface = forwardRef<HTMLDivElement, GlassSurfaceProps>(
  function GlassSurface({ enhanced = false, sx, ...props }, ref) {
    const theme = useTheme();
    return (
      <Box
        ref={ref}
        data-prismode-glass={enhanced ? "enhanced" : "standard"}
        {...props}
        sx={[
          {
            ...glassStyles(theme.palette.mode === "dark", enhanced),
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    );
  },
);
