# kampa.dev

Personal site and portfolio, built as a working example of the engineering practices it talks about — not just a page describing them.

**[kampa.dev](https://kampa.dev)**

<table>
<tr>
<td><img src="docs/screenshots/home-light.png" alt="Home page, light mode" width="420"/></td>
<td><img src="docs/screenshots/home-dark.png" alt="Home page, dark mode" width="420"/></td>
</tr>
</table>

## Why this repo

Most portfolios describe good engineering. This one tries to demonstrate it: a real test suite, CI that actually gates merges, structured data and AI-crawler policy for discoverability, and one case study (["This Portfolio"](https://kampa.dev/projects/this-portfolio)) you can verify yourself by reading the source and running the checks below.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · shadcn/ui · motion (Framer Motion) · next-themes · Bun · Biome · Playwright

Rationale for the less obvious choices (Bun as the whole toolchain, Biome over ESLint+Prettier, why a second CSS-only animation system exists alongside Framer Motion) is in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Structure

- `src/app` — routes (`/`, `/about`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/imprint`, `/privacy`)
- `src/components` — `content/*` (page-specific sections), `layout/*` (header/footer/page shell), `ui/*` (shadcn/ui), `common/*` (shared + animated primitives)
- `src/content/*.mdx` — blog posts, read via `src/lib/blog.ts`
- `src/lib/projects.ts` — project case-study data
- `e2e/` — Playwright end-to-end tests
- `docs/ARCHITECTURE.md` — rendering strategy, content pipeline, stack rationale

## Getting started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing & CI

```bash
bun run lint       # Biome — lint + format check
bun run typecheck  # tsc --noEmit
bun run test       # bun test (unit, src/**/*.test.ts)
bun run test:e2e   # playwright test (needs: bunx playwright install --with-deps chromium)
bun run build
```

All five run in CI on every push and PR (`.github/workflows/ci.yml`).

## License

This project is licensed under the [`GNU General Public License v3.0`](LICENSE).
