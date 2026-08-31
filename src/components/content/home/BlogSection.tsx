import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Section from "@/components/common/Section";
import { buttonVariants } from "@/components/ui/button";
import { getLatestPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";
import BlogPostCard from "../blog/BlogPostCard";

export default async function BlogSection() {
  const posts = await getLatestPosts(4);

  return (
    <Section
      tag="writing"
      title="Notes on UX, architecture, and building SaaS."
      action={
        <Link
          href="/blog"
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: cn("w-fit", "hover:gap-2"),
            }),
          )}
        >
          All posts
          <ArrowRight className="size-4" />
        </Link>
      }
    >
      <div className="lg:-mb-12 divide-y">
        {posts.map((p) => (
          <BlogPostCard key={p.slug} post={p} />
        ))}
      </div>
    </Section>
  );
}
