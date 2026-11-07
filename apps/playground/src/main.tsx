import { StrictMode, useCallback, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Radio,
  RadioGroup,
  IconButton,
  Paper,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  GlassSurface,
  PrismodeProvider,
  usePrismode,
  type ColorMode,
  type DesignSystem,
} from "@qbit-hub/prismode-ui";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { prefixer } from "stylis";
import type { Theme } from "@mui/material/styles";
import "./style.css";
type Direction = "ltr" | "rtl";
const english = (text: React.ReactNode) => <bdi dir="ltr">{text}</bdi>;

function Showcase({
  direction,
  onDirection,
}: {
  direction: Direction;
  onDirection: (value: Direction) => void;
}) {
  const {
    designSystem,
    setDesignSystem,
    mode,
    setMode,
    seed,
    setSeed,
    resolvedMode,
  } = usePrismode();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [checked, setChecked] = useState(true);
  const [count, setCount] = useState(0);
  const [favorite, setFavorite] = useState(false);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography dir="ltr" className="english" component="h1" variant="h6">
            Prismode UI
          </Typography>
          <Chip
            label={english("React + MUI")}
            sx={{ marginInlineStart: "auto" }}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ maxWidth: 1100, mx: "auto", p: { xs: 2, md: 4 } }}
      >
        <Typography
          dir="ltr"
          className="english"
          variant="h2"
          component="h2"
          gutterBottom
        >
          One library. Two expressions.
        </Typography>
        <Typography dir="ltr" className="english" component="p" sx={{ mb: 2 }}>
          Explore Material 3 color and an original glass treatment. Your work
          stays in place as the theme changes.
        </Typography>
        <Paper
          component="section"
          aria-label="Theme controls"
          sx={{ p: 3, mb: 3 }}
        >
          <div className="controls">
            <FormControl fullWidth>
              <InputLabel id="design-label">
                {english("Design system")}
              </InputLabel>
              <Select
                labelId="design-label"
                label="Design system"
                value={designSystem}
                onChange={(e) =>
                  setDesignSystem(e.target.value as DesignSystem)
                }
                MenuProps={{ slotProps: { paper: { dir: direction } } }}
              >
                <MenuItem value="material3">{english("Material 3")}</MenuItem>
                <MenuItem value="liquidGlass">
                  {english("Liquid Glass")}
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="mode-label">{english("Color mode")}</InputLabel>
              <Select
                labelId="mode-label"
                label="Color mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as ColorMode)}
                MenuProps={{ slotProps: { paper: { dir: direction } } }}
              >
                <MenuItem value="light">{english("Light")}</MenuItem>
                <MenuItem value="dark">{english("Dark")}</MenuItem>
                <MenuItem value="system">{english("System")}</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="direction-label">
                {english("Direction")}
              </InputLabel>
              <Select
                labelId="direction-label"
                label="Direction"
                value={direction}
                onChange={(e) => onDirection(e.target.value as Direction)}
                MenuProps={{ slotProps: { paper: { dir: direction } } }}
              >
                <MenuItem value="ltr">{english("LTR")}</MenuItem>
                <MenuItem value="rtl">{english("RTL")}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="color"
              label={english("Seed color")}
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { "aria-label": "Seed color" },
              }}
            />
          </div>
          <Typography
            dir="ltr"
            className="english"
            component="p"
            variant="body2"
            role="status"
            sx={{ mt: 2 }}
          >
            Resolved mode: {resolvedMode ?? "initializing"}
          </Typography>
        </Paper>
        <div className="showcase">
          <Card>
            <CardContent>
              <Typography
                dir="ltr"
                className="english"
                variant="h5"
                component="h3"
                gutterBottom
              >
                Stay in the flow
              </Typography>
              <Typography
                dir="ltr"
                className="english"
                variant="body2"
                sx={{ mb: 3 }}
              >
                Color roles, shaped surfaces, and clear interaction states.
              </Typography>
              <TextField
                fullWidth
                label={english("Your note")}
                slotProps={{ htmlInput: { dir: "ltr" } }}
                defaultValue="A little clarity"
                sx={{ mb: 2 }}
              />
              <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>
                <Button variant="contained" onClick={() => setCount(count + 1)}>
                  {english(`Count: ${count}`)}
                </Button>
                <Button variant="tonal" onClick={() => setOpen(true)}>
                  {english("Open dialog")}{" "}
                </Button>
                <Button variant="elevated">{english("Elevated")} </Button>
                <Button
                  data-testid="asymmetric"
                  sx={{ marginLeft: "17px" }}
                  variant="text"
                >
                  {english("Text")}
                </Button>
                <Button variant="outlined">{english("Outlined")} </Button>
                <Button disabled variant="tonal">
                  {english("Unavailable")}{" "}
                </Button>
              </Stack>
              <Stack
                direction="row"
                sx={{ gap: 2, alignItems: "center", flexWrap: "wrap", my: 2 }}
              >
                <IconButton
                  aria-label="Favorite"
                  onClick={() => setFavorite(!favorite)}
                  aria-pressed={favorite}
                >
                  <svg
                    aria-hidden="true"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={favorite ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 21 3.5 12.5a5.3 5.3 0 0 1 7.5-7.5l1 1 1-1a5.3 5.3 0 0 1 7.5 7.5Z" />
                  </svg>
                </IconButton>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={english("Saved")}
                />
                <RadioGroup row defaultValue="personal" aria-label="Workspace">
                  <FormControlLabel
                    value="personal"
                    control={<Radio />}
                    label={english("Personal")}
                  />
                  <FormControlLabel
                    value="team"
                    control={<Radio />}
                    label={english("Team")}
                  />
                </RadioGroup>
              </Stack>
              <FormControlLabel
                sx={{ gap: 1, mx: 0, mb: 2 }}
                control={
                  <Switch
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                }
                label={english("Notifications")}
              />
              <Tabs
                value={tab}
                onChange={(_, value: number) => setTab(value)}
                aria-label="Example views"
              >
                <Tab
                  label={english("Overview")}
                  id="tab-overview"
                  aria-controls="panel-overview"
                />
                <Tab
                  label={english("Details")}
                  id="tab-details"
                  aria-controls="panel-details"
                />
              </Tabs>
              <Box
                role="tabpanel"
                id={tab === 0 ? "panel-overview" : "panel-details"}
                aria-labelledby={tab === 0 ? "tab-overview" : "tab-details"}
                sx={{ py: 2 }}
              >
                {english(
                  tab === 0
                    ? "A reusable theme, with your existing MUI components."
                    : "Original MD3Next themes and application-owned MUI configuration.",
                )}
              </Box>
              <Alert severity="info">
                {english("Changes apply live without resetting your note.")}
              </Alert>
            </CardContent>
          </Card>
          <div className="glass-stage">
            <GlassSurface enhanced sx={{ p: 3 }} data-testid="glass">
              <Typography
                dir="ltr"
                className="english"
                variant="h5"
                component="h3"
                gutterBottom
              >
                A softer surface
              </Typography>
              <Typography
                dir="ltr"
                className="english"
                component="p"
                sx={{ mb: 2 }}
              >
                Static reflections and bounded backdrop blur. Readable solid
                surfaces when transparency is unavailable or reduced.
              </Typography>
              <Button variant="contained" onClick={() => setOpen(true)}>
                {english("Explore surface")}{" "}
              </Button>
            </GlassSurface>
          </div>
        </div>
        <Typography
          dir="ltr"
          className="english"
          component="footer"
          variant="body2"
          sx={{ mt: 4 }}
        >
          Independent open-source project. Apple-inspired web approximation; no
          native refraction or affiliation with Apple or Google.
        </Typography>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { dir: direction } }}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">
          {english("A moment of focus")}
        </DialogTitle>
        <DialogContent>
          {english(
            "The same public theme styles real MUI dialogs, including portaled surfaces.",
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{english("Close")} </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
function App() {
  const [direction, setDirection] = useState<Direction>("ltr");
  // Official MUI setup is owned entirely by this consuming application.
  const cache = useMemo(
    () =>
      createCache({
        key: `playground-${direction}`,
        stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [prefixer],
      }),
    [direction],
  );
  const transformTheme = useCallback(
    (theme: Theme): Theme => ({ ...theme, direction }),
    [direction],
  );
  return (
    <CacheProvider value={cache}>
      <div dir={direction} data-playground-root>
        <PrismodeProvider transformTheme={transformTheme}>
          <Showcase direction={direction} onDirection={setDirection} />
        </PrismodeProvider>
      </div>
    </CacheProvider>
  );
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
