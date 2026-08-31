import { describe, expect, test } from "bun:test";
import {
  breadcrumbList,
  jsonLdText,
  softwareApplication,
  website,
} from "./jsonld";

describe("jsonLdText", () => {
  test("serializes to valid JSON", () => {
    const data = { a: 1, b: "two" };
    expect(JSON.parse(jsonLdText(data))).toEqual(data);
  });

  test("escapes '<' to prevent breaking out of the surrounding <script> tag", () => {
    const output = jsonLdText({ value: "</script><script>alert(1)</script>" });
    expect(output).not.toContain("</script>");
    expect(output).toContain("\\u003c/script>");
  });
});

describe("breadcrumbList", () => {
  test("builds a BreadcrumbList with 1-based positions", () => {
    const list = breadcrumbList([
      { name: "Home", url: "https://kampa.dev" },
      { name: "Blog", url: "https://kampa.dev/blog" },
    ]);

    expect(list["@type"]).toBe("BreadcrumbList");
    expect(list.itemListElement).toHaveLength(2);
    expect(list.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://kampa.dev",
    });
    expect(list.itemListElement[1].position).toBe(2);
  });

  test("returns an empty list for empty input", () => {
    expect(breadcrumbList([]).itemListElement).toEqual([]);
  });
});

describe("softwareApplication", () => {
  const base = {
    name: "Creator CRM",
    description: "CRM for creator agencies.",
    url: "https://kampa.dev/projects/creator-crm",
    datePublished: "2023",
    keywords: ["TypeScript", "Vite"],
    creator: "Taner Kampa",
  };

  test("builds a SoftwareApplication with joined keywords and a Person creator", () => {
    const schema = softwareApplication(base);

    expect(schema["@type"]).toBe("SoftwareApplication");
    expect(schema.keywords).toBe("TypeScript, Vite");
    expect(schema.creator).toEqual({ "@type": "Person", name: "Taner Kampa" });
    expect(schema).not.toHaveProperty("sameAs");
  });

  test("includes sameAs only when a repo URL is given", () => {
    const withRepo = softwareApplication({
      ...base,
      repoUrl: "https://github.com/t-kampa/example",
    });

    expect(withRepo.sameAs).toBe("https://github.com/t-kampa/example");
  });
});

describe("website", () => {
  test("builds a WebSite schema", () => {
    const schema = website({ name: "Taner Kampa", url: "https://kampa.dev" });

    expect(schema).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Taner Kampa",
      url: "https://kampa.dev",
    });
  });
});
