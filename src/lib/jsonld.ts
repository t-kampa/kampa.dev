export function jsonLdText(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function softwareApplication(data: {
  name: string;
  description: string;
  url: string;
  datePublished: string;
  keywords: string[];
  creator: string;
  repoUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: data.name,
    description: data.description,
    url: data.url,
    applicationCategory: "BusinessApplication",
    datePublished: data.datePublished,
    keywords: data.keywords.join(", "),
    creator: { "@type": "Person", name: data.creator },
    ...(data.repoUrl ? { sameAs: data.repoUrl } : {}),
  };
}

export function website(data: { name: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: data.name,
    url: data.url,
  };
}

export function breadcrumbList(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
