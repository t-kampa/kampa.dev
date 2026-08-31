import type { MetadataRoute } from "next";
import { getPostDates } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  "",
  "/about",
  "/projects",
  "/blog",
  "/imprint",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postDates = await getPostDates();

  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const projectEntries = getAllProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(`${project.date}-01-01`),
  }));

  const blogEntries = Object.entries(postDates).map(([slug, date]) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(date),
  }));

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
