import type { Metadata } from "next";
import PagePagination from "@/components/common/PagePagination";
import Section from "@/components/common/Section";
import ProjectCard from "@/components/content/projects/ProjectCard";
import PageHeader from "@/components/layout/PageHeader";
import { getPaginatedProjects } from "@/lib/projects";
import { buildPageMetadata, PAGINATION_PER_PAGE } from "@/lib/site";
import { cn } from "@/lib/utils";

const DESCRIPTION =
  "Selected work with the problem, approach, and outcome behind it.";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects",
  description: DESCRIPTION,
  path: "/projects",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const { projects, totalPages } = getPaginatedProjects(
    page,
    PAGINATION_PER_PAGE,
  );

  return (
    <>
      <PageHeader
        title="Case studies, not a tech stack list."
        description={DESCRIPTION}
      />
      <Section grow>
        <div className={cn("-mt-12 divide-y", totalPages <= 1 && "-mb-12")}>
          {projects.map((item, i) => (
            <ProjectCard
              key={item.id}
              project={item}
              index={(page - 1) * PAGINATION_PER_PAGE + i + 1}
            />
          ))}
        </div>

        <PagePagination
          page={page}
          totalPages={totalPages}
          basePath="/projects"
          className="mt-auto"
        />
      </Section>
    </>
  );
}
