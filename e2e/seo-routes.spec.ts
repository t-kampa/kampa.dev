import { expect, test } from "@playwright/test";

test("sitemap.xml is served and references the site", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain("<urlset");
  expect(body).toContain("https://kampa.dev");
});

test("robots.txt is served and points to the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain("Sitemap: https://kampa.dev/sitemap.xml");
});

test("llms.txt links to llms-full.txt, which serves full post content", async ({
  request,
}) => {
  const summary = await request.get("/llms.txt");
  expect(summary.status()).toBe(200);
  expect(await summary.text()).toContain("https://kampa.dev/llms-full.txt");

  const full = await request.get("/llms-full.txt");
  expect(full.status()).toBe(200);
  const body = await full.text();
  expect(body).toContain("## Projects");
  expect(body).toContain("## Blog");
  expect(body).not.toContain("export const meta");
});
