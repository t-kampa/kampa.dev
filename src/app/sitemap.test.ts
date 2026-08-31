import { describe, expect, test } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { getAllSlugs, getPostDates } from "@/lib/blog";
import { getAllProjectSlugs, getAllProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";
import sitemap from "./sitemap";

const APP_DIR = path.join(process.cwd(), "src/app");

/**
 * Derives the expected static routes straight from the App Router's own
 * file structure, independent of sitemap.ts's internal route list — so a
 * route silently dropped from the sitemap still fails this test. Walks the
 * full tree (not just depth 1) so a nested static page can't slip through.
 */
function discoverStaticRoutes(
  dir: string = APP_DIR,
  segments: string[] = [],
): string[] {
  const routes: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("[")) continue;

    const childDir = path.join(dir, entry.name);
    const childSegments = entry.name.startsWith("(")
      ? segments
      : [...segments, entry.name];

    if (fs.existsSync(path.join(childDir, "page.tsx"))) {
      routes.push(childSegments.length ? `/${childSegments.join("/")}` : "");
    }

    routes.push(...discoverStaticRoutes(childDir, childSegments));
  }

  return routes;
}

describe("sitemap", () => {
  test("includes every static route, project, and blog post exactly once", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);

    const staticRoutes = discoverStaticRoutes();
    expect(staticRoutes.length).toBeGreaterThan(0);
    for (const route of staticRoutes) {
      expect(urls).toContain(`${SITE_URL}${route}`);
    }
    for (const slug of getAllProjectSlugs()) {
      expect(urls).toContain(`${SITE_URL}/projects/${slug}`);
    }
    for (const slug of getAllSlugs()) {
      expect(urls).toContain(`${SITE_URL}/blog/${slug}`);
    }
  });

  test("project and blog entries carry their real content date, not build time", async () => {
    const entries = await sitemap();
    const byUrl = new Map(entries.map((entry) => [entry.url, entry]));

    for (const project of getAllProjects()) {
      const entry = byUrl.get(`${SITE_URL}/projects/${project.slug}`);
      expect(entry?.lastModified).toEqual(new Date(`${project.date}-01-01`));
    }

    const postDates = await getPostDates();
    for (const [slug, date] of Object.entries(postDates)) {
      const entry = byUrl.get(`${SITE_URL}/blog/${slug}`);
      expect(entry?.lastModified).toEqual(new Date(date));
    }
  });
});
