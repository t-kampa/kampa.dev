import type { Metadata } from "next";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import Article from "@/components/common/Article";
import ContactCTA from "@/components/common/ContactCTA";
import MetaRow from "@/components/common/MetaRow";
import Section from "@/components/common/Section";
import PageHeader from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { getPostMeta } from "@/lib/blog";
import { breadcrumbList, jsonLdText } from "@/lib/jsonld";
import { getProject } from "@/lib/projects";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getPostMeta(slug);

  return {
    title: meta.title,
    description: meta.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      type: "article",
      publishedTime: meta.date,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.excerpt,
    },
  };
}

export default async function MdxLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const meta = await getPostMeta(slug);
  const relatedProject = meta.relatedProject
    ? getProject(meta.relatedProject)
    : undefined;

  return (
    <>
      <script type="application/ld+json">
        {jsonLdText({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: meta.title,
          description: meta.excerpt,
          datePublished: meta.date,
          author: { "@type": "Person", name: SITE_NAME },
          url: `${SITE_URL}/blog/${slug}`,
        })}
      </script>
      <script type="application/ld+json">
        {jsonLdText(
          breadcrumbList([
            { name: "Home", url: SITE_URL },
            { name: "Blog", url: `${SITE_URL}/blog` },
            { name: meta.title, url: `${SITE_URL}/blog/${slug}` },
          ]),
        )}
      </script>
      <PageHeader
        title={meta.title}
        description={meta.excerpt}
        backHref="/blog"
        meta={
          <MetaRow
            items={[
              { key: "date", content: <span>{meta.formattedDate}</span> },
              { key: "readTime", content: <span>{meta.readTime}</span> },
              {
                key: "tags",
                content:
                  meta.tags.length > 0 &&
                  meta.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="font-mono text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  )),
              },
              {
                key: "relatedProject",
                content: relatedProject && (
                  <Link
                    href={`/projects/${relatedProject.slug}`}
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    from work on: {relatedProject.name}
                  </Link>
                ),
              },
            ]}
          />
        }
      />
      <Section grow>
        <Article>{children}</Article>
      </Section>
      <ContactCTA />
    </>
  );
}
