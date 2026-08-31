import { expect, test } from "@playwright/test";

test("home page loads with the hero heading and no console errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  const response = await page.goto("/");
  expect(response?.status()).toBe(200);

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Taner Kampa",
  );
  expect(errors).toEqual([]);
});
