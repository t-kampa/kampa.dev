import { expect, test } from "@playwright/test";

test("a project card links to a working detail page", async ({ page }) => {
  await page.goto("/projects");

  const firstProjectLink = page.locator('a[href^="/projects/"]').first();
  const href = await firstProjectLink.getAttribute("href");
  expect(href).toBeTruthy();

  await firstProjectLink.click();
  await expect(page).toHaveURL(href as string);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
