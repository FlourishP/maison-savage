import { test, expect } from "@playwright/test";

const GOWN = "Savanna Drape Gown";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("no horizontal overflow on mobile", async ({ page }) => {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth - clientWidth).toBeLessThanOrEqual(2);
});

test("mobile menu opens, navigates to a filter and closes", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  await page.getByRole("button", { name: "Open menu" }).click();

  const menu = page.getByRole("dialog", { name: "Navigation menu" });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("button", { name: "High Jewelry" })).toBeVisible();

  await menu.getByRole("button", { name: "Men's Tailoring" }).click();
  await expect(menu).not.toBeVisible();
  await expect(
    page.locator("#collection").getByRole("heading", { name: "Cinder Jacquard Suit" })
  ).toBeVisible();
  await expect(
    page.locator("#collection").getByRole("heading", { name: GOWN })
  ).toHaveCount(0);
});

test("hero slider advances on mobile", async ({ page }) => {
  await page.getByRole("button", { name: "Pause slideshow" }).click();
  const heroH2 = page.locator('section[aria-roledescription="carousel"] h2').first();
  await expect(heroH2).toBeVisible();
  const currentTitle = await heroH2.textContent();
  await page.getByRole("button", { name: "Next slide" }).click();
  await expect(heroH2).not.toHaveText(currentTitle!);
});

test("product grid renders and quick view add to bag works on mobile", async ({
  page,
}) => {
  await expect(page.locator("#collection article")).toHaveCount(22);

  await page
    .getByRole("button", { name: `Quick view ${GOWN}` })
    .first()
    .click();
  const modal = page.getByRole("dialog", { name: `Quick view: ${GOWN}` });
  await expect(modal).toBeVisible();

  await modal.getByRole("button", { name: /Add to Bag/ }).click();
  const drawer = page.getByRole("dialog", { name: "Shopping bag" });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByText(GOWN)).toBeVisible();
});

test("concierge newsletter works on mobile", async ({ page }) => {
  const section = page.locator("#concierge");
  await section.getByLabel("Email address").fill("bad");
  await section.getByRole("button", { name: "Subscribe" }).click();
  await expect(section.getByRole("alert")).toContainText(
    "Please enter a valid email address."
  );

  await section.getByLabel("Email address").fill("mobile@client.com");
  await section.getByRole("button", { name: "Subscribe" }).click();
  await expect(section.getByRole("alert")).toContainText("Bienvenue", {
    timeout: 12000,
  });
});