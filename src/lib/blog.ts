import fs from "node:fs";
import path from "node:path";
import { format } from "date-fns";
import type { BlogPostPreview } from "@/components/content/blog/BlogPostCard";
import { extractBody } from "@/lib/mdx";

export interface BlogMeta {
  title: string;
  excerpt: string;
  date: string; // ISO date, e.g. "2026-06-01"
  readTime: string;
  tags: string[];
  relatedProject?: string; // slug of a ProjectDetail, see src/lib/projects.ts
}

const CONTENT_DIR = path.join(process.cwd(), "src/content");

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPostDates(): Promise<Record<string, string>> {
  const slugs = getAllSlugs();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const { meta }: { meta: BlogMeta } = await import(
        `@/content/${slug}.mdx`
      );
      return [slug, meta.date] as const;
    }),
  );

  return Object.fromEntries(entries);
}

export async function getAllTags(): Promise<string[]> {
  const slugs = getAllSlugs();
  const tagLists = await Promise.all(
    slugs.map(async (slug) => {
      const { meta }: { meta: BlogMeta } = await import(
        `@/content/${slug}.mdx`
      );
      return meta.tags;
    }),
  );

  return [...new Set(tagLists.flat())].sort();
}

async function getAllPosts(): Promise<
  (BlogPostPreview & { rawDate: string; relatedProject?: string })[]
> {
  const slugs = getAllSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { meta }: { meta: BlogMeta } = await import(
        `@/content/${slug}.mdx`
      );

      return {
        slug,
        title: meta.title,
        excerpt: meta.excerpt,
        date: format(new Date(meta.date), "MMM yyyy"),
        readTime: meta.readTime,
        tags: meta.tags,
        rawDate: meta.date,
        relatedProject: meta.relatedProject,
      };
    }),
  );

  return posts.sort((a, b) => (a.rawDate < b.rawDate ? 1 : -1));
}

function toPreview({
  rawDate,
  relatedProject,
  ...preview
}: BlogPostPreview & {
  rawDate: string;
  relatedProject?: string;
}): BlogPostPreview {
  return preview;
}

export async function getLatestPosts(
  limit: number,
): Promise<BlogPostPreview[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit).map(toPreview);
}

export async function getPostMeta(
  slug: string,
): Promise<BlogMeta & { formattedDate: string }> {
  const { meta }: { meta: BlogMeta } = await import(`@/content/${slug}.mdx`);
  return { ...meta, formattedDate: format(new Date(meta.date), "MMM yyyy") };
}

/** Raw MDX body of a post — everything after the `meta` export. */
export function getPostBody(slug: string): string {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  return extractBody(source, filePath);
}

export async function getPaginatedPosts(
  page: number,
  perPage: number,
  tag?: string,
): Promise<{ posts: BlogPostPreview[]; totalPages: number }> {
  const allPosts = await getAllPosts();
  const posts = tag
    ? allPosts.filter((post) => post.tags.includes(tag))
    : allPosts;
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const start = (page - 1) * perPage;

  return {
    posts: posts.slice(start, start + perPage).map(toPreview),
    totalPages,
  };
}

/**
 * Pure filter, extracted so the actual matching logic is unit-testable with
 * plain in-memory fixtures — `getAllPosts` goes through fs + dynamic
 * `import()`, which Bun resolves against a module map built when blog.ts is
 * first loaded, so a fixture file written at test time never becomes
 * reachable through that path.
 */
export function filterPostsByProject<T extends { relatedProject?: string }>(
  posts: T[],
  projectSlug: string,
): T[] {
  return posts.filter((post) => post.relatedProject === projectSlug);
}

/** Posts that name the given project slug as their `relatedProject`. */
export async function getPostsByProject(
  projectSlug: string,
): Promise<BlogPostPreview[]> {
  const posts = await getAllPosts();
  return filterPostsByProject(posts, projectSlug).map(toPreview);
}
