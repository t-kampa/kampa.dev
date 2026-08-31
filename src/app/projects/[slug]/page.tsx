import { Github } from "@thesvg/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactCTA from "@/components/common/ContactCTA";
import MetaRow from "@/components/common/MetaRow";
import ProjectContent from "@/components/content/projects/ProjectContent";
import PageHeader from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getPostsByProject } from "@/lib/blog";
import { breadcrumbList, jsonLdText, softwareApplication } from "@/lib/jsonld";
import { getAllProjectSlugs, getProject } from "@/lib/projects";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project" };

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.name,
      description: project.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const relatedPosts = await getPostsByProject(project.slug);

  return (
    <>
      <script type="application/ld+json">
        {jsonLdText(
          softwareApplication({
            name: project.name,
            description: project.description,
            url: `${SITE_URL}/projects/${slug}`,
            datePublished: project.date,
            keywords: project.techStack,
            creator: SITE_NAME,
            repoUrl: project.repoUrl,
          }),
        )}
      </script>
      <script type="application/ld+json">
        {jsonLdText(
          breadcrumbList([
            { name: "Home", url: SITE_URL },
            { name: "Projects", url: `${SITE_URL}/projects` },
            { name: project.name, url: `${SITE_URL}/projects/${slug}` },
          ]),
        )}
      </script>
      <PageHeader
        title={project.name}
        description={project.description}
        backHref="/projects"
        backLabel="cd .."
        meta={
          <MetaRow
            items={[
              { key: "date", content: <span>{project.date}</span> },
              {
                key: "techStack",
                content: (
                  <>
                    {project.techStack.map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="font-mono text-muted-foreground"
                      >
                        {item}
                      </Badge>
                    ))}
                  </>
                ),
              },
            ]}
            end={
              project.repoUrl && (
                <div className="ml-auto flex items-center gap-2">
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source on GitHub"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                    )}
                  >
                    <Github variant="mono" className="size-3.5" />
                  </Link>
                </div>
              )
            }
          />
        }
      />
      <ProjectContent project={project} relatedPosts={relatedPosts} />
      <ContactCTA />
    </>
  );
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;
