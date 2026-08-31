import { describe, expect, test } from "bun:test";
import { SITE_URL } from "@/lib/site";
import robots from "./robots";

describe("robots", () => {
  test("points to the sitemap and allows crawling for everyone", () => {
    const config = robots();
    expect(config.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(config.rules).toContainEqual({ userAgent: "*", allow: "/" });
  });

  test("explicitly allows known AI crawlers", () => {
    const rules = robots().rules;
    const rulesArray = Array.isArray(rules) ? rules : [rules];

    for (const userAgent of [
      "GPTBot",
      "ClaudeBot",
      "PerplexityBot",
      "Google-Extended",
    ]) {
      expect(rulesArray).toContainEqual({ userAgent, allow: "/" });
    }
  });
});
