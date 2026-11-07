import { test, expect, type Page } from "@playwright/test";
async function select(page: Page, label: string, option: string) {
  await page.getByRole("combobox", { name: label, exact: true }).click();
  await page.getByRole("option", { name: option, exact: true }).click();
}
test("live themes, computed styles, keyboard dialog, seed, RTL and persistence", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto("/");
  await select(page, "Color mode", "Light");
  const filled = page.getByRole("button", { name: "Count: 0" });
  const tonal = page.getByRole("button", { name: "Open dialog" });
  const elevated = page.getByRole("button", { name: "Elevated", exact: true });
  const background = (el: Element) => getComputedStyle(el).backgroundColor;
  expect(await tonal.evaluate(background)).not.toBe(
    await filled.evaluate(background),
  );
  expect(await elevated.evaluate(background)).not.toBe(
    await filled.evaluate(background),
  );
  await expect(elevated).not.toHaveCSS("box-shadow", "none");
  await expect(filled).toHaveCSS("border-radius", "20px");
  const primary = await filled.evaluate(background);
  await page.getByLabel("Seed color").fill("#0088ff");
  await expect.poll(() => filled.evaluate(background)).not.toBe(primary);
  await page.getByRole("button", { name: "Favorite" }).click();
  await expect(page.getByRole("button", { name: "Favorite" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(
    page.getByRole("switch", { name: "Notifications" }),
  ).toBeChecked();
  await filled.click();
  await page.getByLabel("Your note").fill("Keep my work");
  const surface = page.getByTestId("glass");
  const light = await surface.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  await select(page, "Design system", "Liquid Glass");
  await select(page, "Color mode", "Dark");
  await expect(page.getByRole("status")).toContainText("dark");
  await expect(page.getByRole("button", { name: "Count: 1" })).toBeVisible();
  await expect(page.getByLabel("Your note")).toHaveValue("Keep my work");
  expect(
    await surface.evaluate((el) => getComputedStyle(el).backgroundColor),
  ).not.toBe(light);
  const oldPrimary = await page
    .getByRole("button", { name: "Count: 1" })
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  await page.getByLabel("Seed color").fill("#ff0000");
  await expect
    .poll(() =>
      page
        .getByRole("button", { name: "Count: 1" })
        .evaluate((el) => getComputedStyle(el).backgroundColor),
    )
    .not.toBe(oldPrimary);
  await select(page, "Direction", "RTL");
  await expect(page.locator("[data-playground-root]")).toHaveCSS(
    "direction",
    "rtl",
  );
  await expect(page.getByTestId("asymmetric")).toHaveCSS(
    "margin-right",
    "17px",
  );
  await expect(page.getByTestId("asymmetric")).toHaveCSS("margin-left", "0px");
  await expect(page.locator("html")).not.toHaveAttribute("dir");
  await select(page, "Design system", "Material 3");
  await expect(page.getByRole("button", { name: "Count: 1" })).toBeVisible();
  await expect(page.getByLabel("Your note")).toHaveValue("Keep my work");
  await expect(
    page.getByRole("heading", { name: "One library. Two expressions." }),
  ).toHaveCSS("direction", "ltr");
  await expect(
    page.getByRole("button", { name: "Count: 1" }).locator("bdi"),
  ).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("status")).toHaveText("Resolved mode: dark");
  await expect(page.getByRole("status")).toHaveCSS("direction", "ltr");
  await page.getByRole("button", { name: "Open dialog" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCSS("direction", "rtl");
  await expect(page.getByRole("dialog").locator("bdi").first()).toHaveCSS(
    "direction",
    "ltr",
  );
  await page.screenshot({
    path: "test-results/rtl-dialog.png",
    fullPage: true,
  });
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("combobox", { name: "Color mode", exact: true }),
  ).toHaveText("Dark");
  expect(errors).toEqual([]);
});
test("system preference, reduced motion and forced colors", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/");
  await select(page, "Color mode", "System");
  await expect(page.getByRole("status")).toContainText("dark");
  await expect(page.getByTestId("glass")).toHaveCSS("animation-name", "none");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.getByRole("status")).toContainText("light");
  await page.emulateMedia({ forcedColors: "active" });
  await expect(page.getByTestId("glass")).toHaveCSS("backdrop-filter", "none");
});
test("responsive controls stay within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(375);
  await expect(
    page.getByRole("combobox", { name: "Design system", exact: true }),
  ).toBeVisible();
});
