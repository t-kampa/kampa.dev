import type { Metadata } from "next";
import Link from "next/link";
import PagePagination from "@/components/common/PagePagination";
import Section from "@/components/common/Section";
import BlogPostCard from "@/components/content/blog/BlogPostCard";
import PageHeader from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getAllTags, getPaginatedPosts } from "@/lib/blog";
import { buildPageMetadata, PAGINATION_PER_PAGE } from "@/lib/site";
import { cn } from "@/lib/utils";

const DESCRIPTION = "Notes on UX, architecture, and building SaaS.";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description: DESCRIPTION,
  path: "/blog",
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string }>;
}) {
  const { page: pageParam, tag } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const [{ posts, totalPages }, tags] = await Promise.all([
    getPaginatedPosts(page, PAGINATION_PER_PAGE, tag),
    getAllTags(),
  ]);

  const isCurrentTag = (current?: string) => tag === current;
  const currentTagClass = "underline underline-offset-2";

  return (
    <>
      <PageHeader title="Blog Posts" description={DESCRIPTION} />
      <Section grow>
        <div className="-mt-6 mb-6 flex flex-wrap gap-2">
          <Badge
            variant={"secondary"}
            render={<Link href="/blog" />}
            className={cn("cursor-pointer", !tag && currentTagClass)}
          >
            all
          </Badge>
          {tags.map((t) => (
            <div key={t} className="flex gap-2">
              <Separator orientation="vertical" />
              <Badge
                variant={isCurrentTag(t) ? "default" : "outline"}
                render={<Link href={`/blog?tag=${t}`} />}
                className={cn(
                  "cursor-pointer",
                  isCurrentTag(t) && currentTagClass,
                )}
              >
                {t}
              </Badge>
            </div>
          ))}
        </div>

        <div className={cn("-mt-6 divide-y", totalPages <= 1 && "-mb-12")}>
          {posts.map((p) => (
            <BlogPostCard key={p.slug} post={p} />
          ))}
        </div>

        <PagePagination
          page={page}
          totalPages={totalPages}
          basePath={tag ? `/blog?tag=${tag}` : "/blog"}
          className="mt-auto"
        />
      </Section>
    </>
  );
}
