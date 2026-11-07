import { expect, test, type Page } from "@playwright/test";

async function choose(page: Page, name: string, option: string) {
  await page.getByRole("combobox", { name, exact: true }).click();
  await page.getByRole("option", { name: option, exact: true }).click();
}

for (const colorMode of ["Light", "Dark"] as const) {
  for (const direction of ["LTR", "RTL"] as const) {
    test(`Liquid Glass menu stays anchored: ${colorMode}, ${direction}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 850 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("/");
      await choose(page, "Design system", "Liquid Glass");
      await choose(page, "Color mode", colorMode);
      await choose(page, "Direction", direction);

      const trigger = page.getByRole("combobox", {
        name: "Color mode",
        exact: true,
      });
      const triggerBox = await trigger.boundingBox();
      await trigger.click();
      const paper = page.locator(".MuiMenu-paper").last();
      await expect(paper).toBeVisible();
      const menuBox = await paper.boundingBox();
      expect(triggerBox).not.toBeNull();
      expect(menuBox).not.toBeNull();
      if (!triggerBox || !menuBox) return;

      const viewport = page.viewportSize();
      expect(viewport).not.toBeNull();
      if (!viewport) return;

      expect(menuBox.width).toBeGreaterThan(triggerBox.width * 0.65);
      expect(menuBox.width).toBeLessThan(
        Math.min(viewport.width * 0.75, triggerBox.width * 2.6),
      );
      expect(menuBox.x).toBeGreaterThanOrEqual(-1);
      expect(menuBox.x + menuBox.width).toBeLessThanOrEqual(viewport.width + 1);
      expect(menuBox.y).toBeGreaterThanOrEqual(-1);
      expect(menuBox.y + menuBox.height).toBeLessThanOrEqual(
        viewport.height + 1,
      );
      expect(
        Math.min(
          Math.abs(menuBox.x - triggerBox.x),
          Math.abs(
            menuBox.x + menuBox.width - (triggerBox.x + triggerBox.width),
          ),
        ),
      ).toBeLessThan(90);
      await expect(paper).toHaveCSS("position", "absolute");
      await expect(page.getByRole("option", { name: "System" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(paper).not.toBeVisible();

      const surface = page.getByTestId("glass");
      await expect(surface).toHaveCSS("border-radius", "22px");
      expect(errors).toEqual([]);
    });
  }
}
