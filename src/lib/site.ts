import type { Metadata } from "next";

export const SITE_URL = "https://kampa.dev";
export const SITE_NAME = "Taner Kampa | kampa.dev";
export const SITE_DESCRIPTION =
  "Portfolio of Taner Kampa — founding engineer and product owner building SaaS products, from data pipelines to dashboards.";

export const PAGINATION_PER_PAGE = 4;

/** Shared title/description/openGraph/twitter shape for top-level pages. */
export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
