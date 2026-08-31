import { describe, expect, test } from "bun:test";
import { extractBody, extractMetaSource, parseMeta } from "./mdx";

const SAMPLE = [
  "export const meta = {",
  '  title: "A \\"quoted\\" title with a `};` inside a string",',
  "  tags: [{ nested: true }, { deep: { deeper: 1 } }],",
  "};",
  "",
  "The actual body content.",
  "",
  "More body content on another line.",
  "",
].join("\n");

describe("extractMetaSource", () => {
  test("extracts the full object literal even with a fake '};' in a string", () => {
    const source = extractMetaSource(SAMPLE);
    expect(source).toContain("nested");
    expect(source).toContain("`};`");
  });

  test("throws when no meta export exists", () => {
    expect(() => extractMetaSource("just some content")).toThrow(
      /No "meta" export found/,
    );
  });

  test("throws on an unbalanced object literal", () => {
    expect(() =>
      extractMetaSource('export const meta = { title: "unterminated"'),
    ).toThrow(/Unbalanced/);
  });
});

describe("parseMeta", () => {
  test("evaluates the object literal into a real object", () => {
    const meta = parseMeta(SAMPLE);
    expect(meta.title).toBe('A "quoted" title with a `};` inside a string');
    expect(meta.tags).toEqual([{ nested: true }, { deep: { deeper: 1 } }]);
  });
});

describe("extractBody", () => {
  test("returns everything after the meta export, trimmed", () => {
    expect(extractBody(SAMPLE)).toBe(
      "The actual body content.\n\nMore body content on another line.",
    );
  });

  test("does not include any part of the meta object", () => {
    expect(extractBody(SAMPLE)).not.toContain("export const meta");
    expect(extractBody(SAMPLE)).not.toContain("nested");
  });
});
