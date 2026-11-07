import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button, Box } from "@mui/material";
import {
  GlassSurface,
  PrismodeProvider,
  usePrismode,
} from "../packages/prismode-ui/src";
import { glassStyles } from "../packages/prismode-ui/src/glass";
function Consumer() {
  const p = usePrismode();
  const [n, setN] = useState(0);
  return (
    <>
      <output>
        {p.designSystem}:{p.mode}:{p.resolvedMode}:{p.seed}
      </output>
      <Button onClick={() => setN(n + 1)}>Count {n}</Button>
      <Button
        onClick={() =>
          p.setDesignSystem(
            p.designSystem === "material3" ? "liquidGlass" : "material3",
          )
        }
      >
        Design
      </Button>
      <Button onClick={() => p.setMode("dark")}>Dark</Button>
      <Button onClick={() => p.setMode("light")}>Light</Button>
      <Button onClick={() => p.setSeed("#0088ff")}>Seed</Button>
      <GlassSurface enhanced data-testid="glass" sx={{ padding: "13px" }}>
        Surface
      </GlassSurface>
      <Box data-testid="asymmetric" sx={{ marginLeft: "17px" }} />
    </>
  );
}
describe("provider integration", () => {
  it("switches theme, seed and mode without losing consumer state", async () => {
    const user = userEvent.setup();
    render(
      <PrismodeProvider initialMode="light">
        <Consumer />
      </PrismodeProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Count 0" }));
    await user.click(screen.getByRole("button", { name: "Design" }));
    await user.click(screen.getByRole("button", { name: "Dark" }));
    await user.click(screen.getByRole("button", { name: "Seed" }));
    expect(screen.getByRole("button", { name: "Count 1" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "liquidGlass:dark:dark:#0088ff",
    );
    expect(localStorage.getItem("prismode-mode")).toBe("dark");
    expect(screen.getByTestId("glass")).toHaveAttribute(
      "data-prismode-glass",
      "enhanced",
    );
    expect(screen.getByTestId("glass")).toHaveStyle({ padding: "13px" });
  });
  it("restores persisted mode and can disable persistence", async () => {
    localStorage.setItem("custom-mode", "dark");
    const first = render(
      <PrismodeProvider storageKey="custom-mode">
        <Consumer />
      </PrismodeProvider>,
    );
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(":dark:dark:"),
    );
    first.unmount();
    render(
      <PrismodeProvider storageKey={null} initialMode="light">
        <Consumer />
      </PrismodeProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Dark" }));
    expect(localStorage.getItem("prismode-mode")).toBeNull();
  });
  it("allows application theme customization without remounting or host mutation", async () => {
    const view = render(
      <PrismodeProvider>
        <Consumer />
      </PrismodeProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Count 0" }));
    view.rerender(
      <PrismodeProvider
        transformTheme={(theme) => ({ ...theme, direction: "rtl" })}
      >
        <Consumer />
      </PrismodeProvider>,
    );
    expect(screen.getByRole("button", { name: "Count 1" })).toBeInTheDocument();
    expect(screen.getByTestId("glass").closest("[dir]")).toBeNull();
    expect(document.documentElement).not.toHaveAttribute("dir");
    expect(document.documentElement).not.toHaveAttribute(
      "data-prismode-color-scheme",
    );
  });
  it("provides solid fallback and user preference rules", () => {
    const styles = glassStyles(true, true);
    expect(styles.backgroundColor).toBe("#202630");
    expect(
      styles["@media (prefers-reduced-transparency: reduce)"],
    ).toMatchObject({ backdropFilter: "none", backgroundColor: "#202630" });
    expect(styles["@media (forced-colors: active)"]).toMatchObject({
      color: "CanvasText",
      boxShadow: "none",
    });
    expect(styles["@media (prefers-reduced-motion: reduce)"]).toMatchObject({
      animation: "none",
    });
  });
  it("requires a provider for the hook", () =>
    expect(() => render(<Consumer />)).toThrow(
      "usePrismode requires PrismodeProvider",
    ));
});
