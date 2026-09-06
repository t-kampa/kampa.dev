# Architecture

## Rendering strategy

Everything is static. `/blog/[slug]` and `/projects/[slug]` both set `dynamicParams = false` and export `generateStaticParams()`, so every route is pre-rendered at build time — no on-demand SSR fallback, no ISR. A slug that isn't in the static params list 404s instead of hitting the server.

Content lives as files, not a database: MDX per blog post (`src/content/*.mdx`, read through `src/lib/blog.ts`), a plain TS array for project case studies (`src/lib/projects.ts`). New content is a commit, not a migration.

## Content pipeline

`src/lib/blog.ts` reads `src/content/*.mdx` off disk at build time. Each post exports a `meta` object (title, excerpt, date, tags, optional `relatedProject` linking to a `src/lib/projects.ts` slug) alongside the MDX body. `getAllSlugs()` drives `generateStaticParams()`; `getPostDates()` / `getAllTags()` do a dynamic `import()` per slug to pull just the `meta` export without evaluating the full component tree — cheap enough at this content volume, and it keeps sitemap/tag-listing code from importing render logic it doesn't need.

## SEO & AI discoverability

`src/app/robots.ts` allow-lists `GPTBot`, `ClaudeBot`, `PerplexityBot`, and `Google-Extended` explicitly alongside the wildcard `*` rule — a deliberate statement of AI-crawler policy rather than the default of leaving it to whatever a wildcard rule implies. Covered by `robots.test.ts`, which asserts each of those user agents is present, not just that the route renders.

`src/app/(llms)/llms.txt` and `llms-full.txt` are route handlers (not static files) that build a machine-readable site index from the same data the rest of the site renders from — `src/lib/blog.ts` and `src/lib/projects.ts` — following the [llms.txt convention](https://llmstxt.org/). `llms.txt` lists pages, projects, and posts with one-line descriptions; `llms-full.txt` inlines the full body of every project case study and blog post. Both are generated from the same source of truth as the human-facing pages, so they can't drift out of sync with actual content.

`src/lib/jsonld.ts` provides schema.org structured data (`SoftwareApplication`, `WebSite`, `BreadcrumbList`) embedded via `<script type="application/ld+json">` in layout, project, and blog pages. `jsonLdText()` replaces every `<` with its JS unicode escape (backslash-u-zero-zero-3-c) before embedding — without it, an untrusted or unusual value containing `</script>` inside the JSON could break out of the script tag.

## Why Bun as the whole toolchain

One binary for package manager, script runner, and test runner (`bun test`) instead of npm/pnpm + a separate Jest/Vitest setup. Fewer config files, one lockfile format, faster installs and test runs. The tradeoff is a smaller ecosystem than Node for edge-case native modules — not a concern here, the dependency surface is standard web-app packages.

## Why Biome over ESLint + Prettier

Biome (`biome.json`) does linting and formatting in one Rust binary with one config file, no plugin resolution, no ESLint/Prettier conflict rules to reconcile. `bun run lint` runs `biome check` — lint and format-check in a single pass, both in CI and locally. The cost is a smaller rule set than ESLint's plugin ecosystem; the project doesn't lean on any ESLint plugin Biome lacks an equivalent for.

## Why two animation systems (Framer Motion + CSS-only)

`src/components/common/animated/` has two families of entrance animation with the same fade+blur look, deliberately kept separate:

- **`FadeContent`** — Framer Motion, `whileInView`. Needs JS hydration before it can trigger, so it's for below-the-fold content where a hydration delay before the scroll-trigger arms is invisible to the user.
- **`FadeIn`** — pure CSS (`tw-animate-css`), always plays once on mount, no scroll trigger. Above-the-fold content uses this: the animation starts at paint time, not after JS hydration, so LCP-critical text never sits hidden behind a script-load delay.

They aren't interchangeable — `FadeIn` has no scroll trigger, so using it below the fold means it finishes before the user scrolls there; `FadeContent` requires hydration, so using it above the fold means a hydration-gated delay on first paint. Both are `motion-safe:`-gated / respect `prefers-reduced-motion`.
