const META_MARKER = "export const meta = ";

interface MetaBounds {
  metaSource: string;
  bodyStart: number;
}

/**
 * Locates the `export const meta = {...}` object literal in raw MDX source,
 * tracking brace depth and string literals instead of anchoring on a
 * literal `};` — so a nested object/array or a multi-line string
 * containing that sequence doesn't cut the match short. Returns the object
 * literal source and the index where content after the meta export starts.
 */
function locateMeta(source: string, filePath = "<mdx>"): MetaBounds {
  const markerIndex = source.indexOf(META_MARKER);
  if (markerIndex === -1) {
    throw new Error(`No "meta" export found in ${filePath}`);
  }

  let i = markerIndex + META_MARKER.length;
  while (i < source.length && source[i] !== "{") i++;
  if (source[i] !== "{") {
    throw new Error(`"meta" export is not an object literal in ${filePath}`);
  }
  const objStart = i;

  let depth = 0;
  let stringChar: string | null = null;
  let escaped = false;

  for (; i < source.length; i++) {
    const char = source[i];

    if (stringChar) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === stringChar) stringChar = null;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      stringChar = char;
      continue;
    }

    if (char === "{") depth++;
    else if (char === "}") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }

  if (depth !== 0) {
    throw new Error(`Unbalanced "meta" object literal in ${filePath}`);
  }

  const metaSource = source.slice(objStart, i);
  if (source[i] === ";") i++;

  return { metaSource, bodyStart: i };
}

export function extractMetaSource(source: string, filePath = "<mdx>"): string {
  return locateMeta(source, filePath).metaSource;
}

/** Evaluates the `meta` object literal of an MDX file into a real object. */
export function parseMeta(
  source: string,
  filePath = "<mdx>",
): Record<string, unknown> {
  const { metaSource } = locateMeta(source, filePath);
  return new Function(`"use strict"; return (${metaSource});`)();
}

/** Raw MDX body — everything after the `meta` export, trimmed. */
export function extractBody(source: string, filePath = "<mdx>"): string {
  const { bodyStart } = locateMeta(source, filePath);
  return source.slice(bodyStart).trim();
}
