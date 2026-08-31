import { expect, test } from "@playwright/test";

test("an unknown route renders the 404 page", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("404")).toBeVisible();
});

test("an unknown blog slug renders the 404 page, not a 500", async ({
  page,
}) => {
  const response = await page.goto("/blog/does-not-exist");
  expect(response?.status()).toBe(404);
});
