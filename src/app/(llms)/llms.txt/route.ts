import { getAllSlugs, getPostMeta } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export async function GET() {
  const projects = getAllProjects();
  const posts = await Promise.all(
    getAllSlugs().map((slug) =>
      getPostMeta(slug).then((meta) => ({ slug, meta })),
    ),
  );

  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `Full content (every project and blog post in full, not just summaries): ${SITE_URL}/llms-full.txt`,
    "",
    "## Pages",
    "",
    `- [About](${SITE_URL}/about): Background, role, skills`,
    `- [Projects](${SITE_URL}/projects): Case studies with problem, approach, and outcome`,
    `- [Blog](${SITE_URL}/blog): Technical writing`,
    "",
    "## Projects",
    "",
    ...projects.map(
      (project) =>
        `- [${project.name}](${SITE_URL}/projects/${project.slug}): ${project.description}`,
    ),
    "",
    "## Blog",
    "",
    ...posts.map(
      ({ slug, meta }) =>
        `- [${meta.title}](${SITE_URL}/blog/${slug}): ${meta.excerpt} [${meta.tags.join(", ")}]`,
    ),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
