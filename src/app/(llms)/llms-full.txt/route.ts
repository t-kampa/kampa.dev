import { getAllSlugs, getPostBody, getPostMeta } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export async function GET() {
  const projects = getAllProjects();
  const posts = await Promise.all(
    getAllSlugs().map(async (slug) => ({
      slug,
      meta: await getPostMeta(slug),
      body: getPostBody(slug),
    })),
  );

  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Full content for every project case study and blog post on this site, for LLMs and AI crawlers that want more than the summaries in /llms.txt.",
    "",
    "## Projects",
    "",
    ...projects.flatMap((project) => [
      `### ${project.name}`,
      "",
      `${SITE_URL}/projects/${project.slug}`,
      "",
      project.description,
      "",
      `**The challenge:** ${project.challenge}`,
      "",
      `**The approach:** ${project.approach}`,
      "",
      `**The outcome:** ${project.outcome}`,
      "",
      "---",
      "",
    ]),
    "## Blog",
    "",
    ...posts.flatMap(({ slug, meta, body }) => [
      `### ${meta.title}`,
      "",
      `${SITE_URL}/blog/${slug}`,
      "",
      `Tags: ${meta.tags.join(", ")}`,
      "",
      body,
      "",
      "---",
      "",
    ]),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
