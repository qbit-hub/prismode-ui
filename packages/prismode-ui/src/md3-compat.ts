// Type-only compatibility for verbatim md3-next 0.1.3 on MUI 9.
// MUI 9 ignores these removed override slots at runtime. This declaration
// preserves upstream options; it does not restore their former styling.
import type {} from "@mui/material/Alert";
import type {} from "@mui/material/ButtonGroup";
declare module "@mui/material/Alert" {
  interface AlertClasses {
    standardError: string;
    standardWarning: string;
    standardInfo: string;
    standardSuccess: string;
  }
}
declare module "@mui/material/ButtonGroup" {
  interface ButtonGroupClasses {
    groupedOutlined: string;
  }
}
export {};
