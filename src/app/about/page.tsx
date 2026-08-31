import type { Metadata } from "next";
import AboutSections from "@/components/content/about/AboutSections";
import PageHeader from "@/components/layout/PageHeader";
import { getAllProjects } from "@/lib/projects";
import { buildPageMetadata } from "@/lib/site";

const DESCRIPTION =
  "Full-stack engineer with a firmware background and a product habit that never went away.";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description: DESCRIPTION,
  path: "/about",
});

export default function Page() {
  const skills = getAllProjects().map(({ slug, name, techStack }) => ({
    slug,
    name,
    techStack,
  }));

  return (
    <>
      <PageHeader
        title="The full story"
        description={DESCRIPTION}
        backHref="/"
      />
      <AboutSections skills={skills} />
    </>
  );
}
