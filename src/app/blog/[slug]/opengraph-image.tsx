import { getPostMeta } from "@/lib/blog";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Blog post — Taner Kampa";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = await getPostMeta(slug);

  return renderOgImage({
    title: meta.title,
    subtitle: meta.excerpt,
  });
}
