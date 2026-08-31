import { describe, expect, test } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { parseMeta } from "@/lib/mdx";
import {
  filterPostsByProject,
  getAllSlugs,
  getAllTags,
  getLatestPosts,
  getPaginatedPosts,
  getPostBody,
  getPostMeta,
  getPostsByProject,
} from "./blog";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

function readRawMeta(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  return parseMeta(source, filePath);
}

/** Reads the raw frontmatter date straight from disk, independent of blog.ts. */
function readRawDate(slug: string): string {
  return readRawMeta(slug).date as string;
}

describe("getAllSlugs", () => {
  test("returns slugs without the .mdx extension", () => {
    const slugs = getAllSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    expect(slugs.every((slug) => !slug.endsWith(".mdx"))).toBe(true);
  });

  test("has no duplicate slugs", () => {
    const slugs = getAllSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("getAllTags", () => {
  test("returns the deduplicated, sorted union of every post's tags", async () => {
    const expected = [
      ...new Set(
        getAllSlugs().flatMap((slug) => readRawMeta(slug).tags as string[]),
      ),
    ].sort();

    expect(await getAllTags()).toEqual(expected);
  });
});

describe("getPostMeta", () => {
  test("resolves meta for an existing slug", async () => {
    const [slug] = getAllSlugs();
    const meta = await getPostMeta(slug);
    expect(meta.title).toBeTruthy();
    expect(meta.formattedDate).toBeTruthy();
  });

  test("rejects for an unknown slug", () => {
    expect(getPostMeta("does-not-exist")).rejects.toBeTruthy();
  });
});

describe("getPostBody", () => {
  test("returns the tail of the raw file, without the meta export", () => {
    const [slug] = getAllSlugs();
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const rawSource = fs.readFileSync(filePath, "utf-8");
    const body = getPostBody(slug);

    expect(body.length).toBeGreaterThan(0);
    expect(body).not.toContain("export const meta");
    expect(rawSource.trimEnd().endsWith(body)).toBe(true);
  });

  test("throws for an unknown slug", () => {
    expect(() => getPostBody("does-not-exist")).toThrow();
  });
});

describe("getLatestPosts", () => {
  test("sorts posts newest first by raw frontmatter date", async () => {
    const allSlugs = getAllSlugs();
    const posts = await getLatestPosts(allSlugs.length);
    const rawDates = posts.map((post) => readRawDate(post.slug));

    for (let i = 1; i < rawDates.length; i++) {
      expect(rawDates[i - 1] >= rawDates[i]).toBe(true);
    }
  });

  test("limits results to the requested count", async () => {
    const posts = await getLatestPosts(2);
    expect(posts).toHaveLength(2);
  });
});

describe("getPaginatedPosts", () => {
  test("matches Math.ceil(total / perPage) for representative page sizes", async () => {
    const total = getAllSlugs().length;
    const samplePerPages = [
      ...new Set(
        [
          1,
          2,
          Math.floor(total / 2),
          total - 1,
          total,
          total + 1,
          total + 2,
        ].filter((n) => n >= 1),
      ),
    ];

    for (const perPage of samplePerPages) {
      const { totalPages } = await getPaginatedPosts(1, perPage);
      expect(totalPages).toBe(Math.ceil(total / perPage));
    }
  });

  test("paginates all posts exactly once, without gaps or overlap", async () => {
    const total = getAllSlugs().length;
    const perPage = 4;
    expect(total % perPage).not.toBe(0); // only exercises the gap/overlap case if it stays uneven
    const { totalPages } = await getPaginatedPosts(1, perPage);
    expect(totalPages).toBe(Math.ceil(total / perPage));

    const seen = new Set<string>();
    for (let page = 1; page <= totalPages; page++) {
      const { posts } = await getPaginatedPosts(page, perPage);
      for (const post of posts) seen.add(post.slug);
    }
    expect(seen.size).toBe(total);
  });

  test("returns an empty page past the last page", async () => {
    const total = getAllSlugs().length;
    const { posts } = await getPaginatedPosts(total + 1, 1);
    expect(posts).toHaveLength(0);
  });

  test("filters by tag, independent of the raw frontmatter", async () => {
    const [slug] = getAllSlugs();
    const [tag] = readRawMeta(slug).tags as string[];
    const expectedSlugs = getAllSlugs().filter((s) =>
      (readRawMeta(s).tags as string[]).includes(tag),
    );

    const { posts, totalPages } = await getPaginatedPosts(
      1,
      expectedSlugs.length,
      tag,
    );

    expect(totalPages).toBe(1);
    expect(posts.map((p) => p.slug).sort()).toEqual(expectedSlugs.sort());
    expect(posts.every((p) => p.tags.includes(tag))).toBe(true);
  });

  test("returns nothing for a tag no post has", async () => {
    const { posts, totalPages } = await getPaginatedPosts(
      1,
      10,
      "does-not-exist-as-a-tag",
    );
    expect(posts).toHaveLength(0);
    expect(totalPages).toBe(1);
  });
});

describe("filterPostsByProject", () => {
  const posts = [
    { slug: "a", relatedProject: "creator-crm" },
    { slug: "b", relatedProject: "creator-analytics-platform" },
    { slug: "c" },
  ];

  test("keeps only posts whose relatedProject matches the given slug", () => {
    expect(filterPostsByProject(posts, "creator-crm")).toEqual([posts[0]]);
  });

  test("returns an empty array when nothing matches", () => {
    expect(filterPostsByProject(posts, "does-not-exist")).toEqual([]);
  });
});

describe("getPostsByProject", () => {
  test("returns an empty array — none of the current posts set relatedProject", async () => {
    expect(await getPostsByProject("creator-crm")).toEqual([]);
  });
});
