import { expect, test } from "@playwright/test";

test("a blog card links to a working post page", async ({ page }) => {
  await page.goto("/blog");

  const firstPostLink = page.locator('a[href^="/blog/"]').first();
  const href = await firstPostLink.getAttribute("href");
  expect(href).toBeTruthy();

  await firstPostLink.click();
  await expect(page).toHaveURL(href as string);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
