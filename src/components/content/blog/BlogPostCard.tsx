import FadeContent from "@/components/common/animated/FadeContent";
import FadeIn from "@/components/common/animated/FadeIn";
import SplitText from "@/components/common/animated/SplitText";
import LinkCard from "@/components/common/LinkCard";
import MetaRow from "@/components/common/MetaRow";
import { Badge } from "@/components/ui/badge";
import { EASE_POWER2_OUT } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface BlogPostPreview {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

interface Props {
  post: BlogPostPreview;
}

export default function BlogPostCard({ post }: Props) {
  const delay = 0.2;

  return (
    <LinkCard
      href={`/blog/${post.slug}`}
      className="flex justify-between sm:flex-row flex-col gap-6"
    >
      <div className="flex sm:max-w-md">
        <div className="flex flex-col gap-1.5">
          <SplitText
            text={post.title}
            tag="h2"
            splitType="words"
            textAlign="left"
            duration={0.4}
            delay={20}
            startDelay={delay}
            className={cn(
              "font-medium tracking-tight",
              "transition-all duration-300 group-hover/link-card:translate-x-1",
            )}
          />
          <FadeIn delay={delay + 0.15}>
            <p className="text-sm text-balance text-muted-foreground">
              {post.excerpt}
            </p>
          </FadeIn>
          <FadeContent
            transition={{
              duration: 0.6,
              ease: EASE_POWER2_OUT,
              delay: delay + 0.3,
            }}
          >
            <div className="flex flex-wrap gap-2 pt-1">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="font-mono text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </FadeContent>
        </div>
      </div>
      <FadeContent
        transition={{
          duration: 0.6,
          ease: EASE_POWER2_OUT,
          delay: delay + 0.45,
        }}
        className="flex items-center"
      >
        <MetaRow
          className="gap-2"
          items={[
            { key: "date", content: <span>{post.date}</span> },
            { key: "readTime", content: <span>{post.readTime}</span> },
          ]}
        />
      </FadeContent>
    </LinkCard>
  );
}
