import { test, expect, type Page } from "@playwright/test";

const GOWN = "Savanna Drape Gown";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

async function openQuickView(page: Page, title: string) {
  await page
    .getByRole("button", { name: `Quick view ${title}` })
    .first()
    .click();
  await expect(
    page.getByRole("dialog", { name: `Quick view: ${title}` })
  ).toBeVisible();
}

test("renders all sections with no uncaught errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });

  await expect(
    page.getByRole("button", { name: /Maison Savage/ })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Collections" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "VIP Client Login" })
  ).toBeVisible();

  await expect(page.locator('section[aria-roledescription="carousel"] h2').first()).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "The Savage Edit" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Craft, not production" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Enter the Savage Inner Circle" })
  ).toBeVisible();

  await expect(page.locator("#collection article")).toHaveCount(22);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(900);

  expect(errors).toEqual([]);
});

test("hero slider advances, reverses and pauses", async ({ page }) => {
  await page.getByRole("button", { name: "Pause slideshow" }).click();
  const heroH2 = page.locator('section[aria-roledescription="carousel"] h2').first();
  await expect(heroH2).toBeVisible();
  const currentTitle = await heroH2.textContent();

  await page.getByRole("button", { name: "Next slide" }).click();
  await expect(heroH2).not.toHaveText(currentTitle!);

  await page.getByRole("button", { name: "Next slide" }).click();
  const thirdTitle = await heroH2.textContent();
  expect(thirdTitle).not.toBe(currentTitle);

  await page.getByRole("button", { name: "Previous slide" }).click();
  await expect(heroH2).toHaveText(thirdTitle!);
});

test("category filter updates the product grid", async ({ page }) => {
  const collection = page.locator("#collection");
  await expect(collection.getByRole("heading", { name: GOWN })).toBeVisible();

  await collection.getByRole("tab", { name: /Men's Tailoring/ }).click();
  await expect(
    collection.getByRole("heading", { name: "Cinder Jacquard Suit" })
  ).toBeVisible();
  await expect(collection.getByRole("heading", { name: GOWN })).toHaveCount(0);

  await collection.getByRole("tab", { name: /High Jewelry/ }).click();
  await expect(
    collection.getByRole("heading", { name: "Emerald-Eyed Panther Bracelet" })
  ).toBeVisible();
  await expect(
    collection.getByRole("heading", { name: "Cinder Jacquard Suit" })
  ).toHaveCount(0);

  await collection.getByRole("tab", { name: /^All/ }).click();
  await expect(collection.getByRole("heading", { name: GOWN })).toBeVisible();
});

test("quick view opens, add to bag updates badge and cart", async ({ page }) => {
  await openQuickView(page, GOWN);

  const modal = page.getByRole("dialog", { name: `Quick view: ${GOWN}` });
  await expect(modal.getByText("$12,400", { exact: true })).toBeVisible();

  await modal.getByRole("button", { name: "M", exact: true }).click();
  await modal.getByRole("button", { name: /Add to Bag/ }).click();

  const drawer = page.getByRole("dialog", { name: "Shopping bag" });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByText(GOWN)).toBeVisible();
  await expect(drawer.getByText("Size M")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open shopping bag, 1 items" })
  ).toBeVisible();
  await expect(drawer.getByRole("button", { name: "Proceed to Checkout" })).toBeVisible();
});

test("cart quantities merge, update subtotal and remove line items", async ({
  page,
}) => {
  // Add same gown twice -> merges to quantity 2
  await openQuickView(page, GOWN);
  await page
    .getByRole("dialog", { name: `Quick view: ${GOWN}` })
    .getByRole("button", { name: /Add to Bag/ })
    .click();
  await page.getByRole("button", { name: "Close shopping bag" }).click();

  await openQuickView(page, GOWN);
  await page
    .getByRole("dialog", { name: `Quick view: ${GOWN}` })
    .getByRole("button", { name: /Add to Bag/ })
    .click();

  const drawer = page.getByRole("dialog", { name: "Shopping bag" });
  await expect(
    page.getByRole("button", { name: "Open shopping bag, 2 items" })
  ).toBeVisible();
  await expect(drawer.getByText("$24,800", { exact: true }).first()).toBeVisible();

  // Increment -> 3
  await drawer.getByRole("button", { name: `Increase quantity of ${GOWN}` }).click();
  await expect(drawer.getByText("$37,200", { exact: true }).first()).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open shopping bag, 3 items" })
  ).toBeVisible();

  // Decrement -> 2
  await drawer.getByRole("button", { name: `Decrease quantity of ${GOWN}` }).click();
  await expect(drawer.getByText("$24,800", { exact: true }).first()).toBeVisible();

  // Remove -> empty bag
  await drawer.getByRole("button", { name: `Remove ${GOWN} from bag` }).click();
  await expect(drawer.getByText("Your bag is empty")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open shopping bag, 0 items" })
  ).toBeVisible();
});

test("wishlist toggles favorite state on product card", async ({ page }) => {
  const addBtn = page.getByRole("button", { name: `Add ${GOWN} to wishlist` });
  await addBtn.click();
  await expect(
    page.getByRole("button", { name: `Remove ${GOWN} from wishlist` })
  ).toBeVisible();

  await page
    .getByRole("button", { name: `Remove ${GOWN} from wishlist` })
    .click();
  await expect(
    page.getByRole("button", { name: `Add ${GOWN} to wishlist` })
  ).toBeVisible();
});

test("search overlay filters and opens quick view", async ({ page }) => {
  await page.getByRole("button", { name: "Search", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Search" });
  await dialog.getByRole("searchbox", { name: "Search the maison" }).fill("panther");

  await expect(dialog.getByText("La Panthère Bag", { exact: true })).toBeVisible();
  await expect(
    dialog.getByText("Emerald-Eyed Panther Bracelet", { exact: true })
  ).toBeVisible();

  await dialog.getByText("La Panthère Bag", { exact: true }).click();
  await expect(
    page.getByRole("dialog", { name: "Quick view: La Panthère Bag" })
  ).toBeVisible();
});

test("concierge newsletter validates email and confirms", async ({ page }) => {
  const section = page.locator("#concierge");
  const input = section.getByLabel("Email address");

  await input.fill("not-an-email");
  await section.getByRole("button", { name: "Subscribe" }).click();
  await expect(section.getByRole("alert")).toContainText(
    "Please enter a valid email address."
  );

  await input.fill("");
  await section.getByRole("button", { name: "Subscribe" }).click();
  await expect(section.getByRole("alert")).toContainText(
    "Please enter a valid email address."
  );

  await input.fill("client@savagesuite.com");
  await section.getByRole("button", { name: "Subscribe" }).click();
  await expect(section.getByRole("alert")).toContainText("Bienvenue", {
    timeout: 12000,
  });
});