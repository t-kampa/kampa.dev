import type { ProjectPreview } from "@/components/content/projects/ProjectCard";

export interface ProjectDecision {
  title: string;
  context: string;
  decision: string;
  consequence: string;
}

export interface ProjectDetail extends ProjectPreview {
  slug: string;
  role: string;
  challenge: string;
  contributions: string[];
  approach: string;
  outcome: string;
  /** Contested technical calls: what the alternative was, why this one won, what it cost. */
  decisions?: ProjectDecision[];
}

const PROJECTS: ProjectDetail[] = [
  {
    id: "1",
    slug: "creator-analytics-platform",
    name: "Creator Analytics Platform",
    description:
      "Analytics platform for Instagram, TikTok, and Threads creators and agencies. Track performance, spot trends, and manage multiple profiles. All from one dashboard.",
    date: "2025",
    role: "Founding Engineer & Product Owner",
    challenge:
      "Agencies managing dozens of creator accounts had no single view of performance across platforms. Data lived in spreadsheets, exports were manual, and decisions were made days after the trend had already passed.",
    contributions: [
      "Designed and built the full data pipeline that ingests Instagram, TikTok, and Threads metrics on a schedule and normalizes them into one queryable model.",
      "Owned the product decisions end to end, from the first user interviews to the dashboard layout that shipped.",
      "Built the multi-profile workspace so an agency can move between managed creators without losing context.",
      "Set up billing and subscription logic with Stripe, including plan limits tied to tracked profiles.",
    ],
    approach:
      "Started with a handful of agencies as design partners before writing a line of dashboard code. Their workflows shaped the data model, especially the split between tracking your own accounts and researching competitors on the same underlying profile data. Background sync runs as a daily batch job (Trigger.dev): one cron finds every stale profile belonging to an active subscriber, then fans out per-profile jobs that fetch new posts and compute engagement deltas. The stack (Next.js, Prisma, Zustand) was chosen to keep iteration fast while the product direction was still moving weekly.",
    outcome:
      "Now used by agencies to monitor millions of followers and views across managed profiles, replacing manual spreadsheet reporting with a live dashboard.",
    improvements: [
      {
        value: "+10.000.000",
        label: "views tracked across managed profiles",
      },
      {
        value: "+1.000.000",
        label: "followers monitored",
      },
      {
        value: "+2.000.000",
        label: "more Interactions",
      },
    ],
    techStack: [
      "TypeScript",
      "Next.js",
      "Tailwind",
      "Zustand",
      "Prisma",
      "Stripe",
      "Trigger.dev",
    ],
    decisions: [
      {
        title: "Batch discovery, then per-profile fan-out",
        context:
          "A single job walking every tracked profile in sequence would either time out or take hours as the profile count grew, and one slow or failing profile would risk stalling the entire run for everyone.",
        decision:
          "Split sync into two job types: one lightweight daily job that only finds stale profiles belonging to active subscribers, and a separate per-profile job, triggered once per profile found, that does the actual fetch-and-compute work.",
        consequence:
          "Adding the thousandth tracked profile doesn't change how fast the first 999 sync. One profile's API failure or timeout stays isolated to that profile instead of blocking or corrupting anyone else's data for the day.",
      },
      {
        title: "One profile model, two contexts",
        context:
          "Agencies wanted to track their own clients' accounts. The same users also wanted to track competitor accounts for research, without mixing the two into one undifferentiated list.",
        decision:
          "Modeled both as the same underlying profile, linked through two separate grouping entities (one for general tracking, one for research) with independent tags and subscription limits, instead of duplicating the profile model or bolting a flag onto one table.",
        consequence:
          "Every analytics, filtering, and metrics feature built for one context works for the other automatically. The cost is an extra layer of indirection that has to be kept in mind on every profile-related query.",
      },
      {
        title: "Centralized, cached query helpers over ad-hoc Prisma calls",
        context:
          "Analytics pages pull the same underlying data (a user's creators, their linked profiles, tag associations) from several different routes and components. Without discipline, that turns into the same expensive query written slightly differently in five places, each with its own caching, or none at all.",
        decision:
          "Every database read goes through a named, cached query helper (queryCreators, queryCreatorsWithProfiles, and similar), enforced by a documented rule against calling Prisma directly from a route handler or component.",
        consequence:
          "A caching fix or query optimization made once applies everywhere that data gets used. The cost is an extra function to write for every new query shape, instead of just calling Prisma inline and moving on.",
      },
    ],
  },
  {
    id: "2",
    slug: "creator-crm",
    name: "Creator CRM & Automation",
    description:
      "Chrome Extension + CRM Dashboard for content creator agencies. Manages subscriber communication, automates messaging, and tracks revenue performance across multiple creators.",
    date: "2023",
    role: "Freelance Lead Engineer",
    challenge:
      "Creator agencies were messaging subscribers manually inside platform-native inboxes, with no shared history, no automation, and no visibility into which messages actually drove revenue.",
    contributions: [
      "Took over and extended the existing Chrome Extension, deepening its platform-inbox integration and hardening the sync into the central CRM.",
      "Designed the automated messaging engine, including rules for when a message should send and how outcomes get attributed.",
      "Rebuilt the revenue dashboard from scratch with new features (per-conversation revenue attribution, per-creator and per-agency breakdowns) that gave users a direct, measurable revenue lift.",
      "Migrated the initial prototype to a proper Vite + shadcn/ui frontend as the team and feature set grew.",
    ],
    approach:
      "The extension had to feel invisible, agencies were not going to change their workflow to adopt a new tool. So the CRM layer was built around their existing inbox, not instead of it. Automation rules were kept simple and inspectable so agency staff could trust and adjust them.",
    outcome:
      "Adopted by hundreds of agencies globally, with measurable revenue lift attributed directly to the automated messaging flows.",
    improvements: [
      {
        value: ">$175.000.000",
        label: "revenue generated last month by users",
      },
      {
        value: "+43%",
        label: "average revenue increase in the first month",
      },
      {
        value: ">891",
        label: "agencies globally using the platform",
      },
    ],
    techStack: [
      "TypeScript",
      "Vite",
      "Webpack",
      "Tailwind",
      "shadcn/ui",
      "Chart.js",
    ],
    decisions: [
      {
        title: "Rebuilding the dashboard on Vite instead of extending Webpack",
        context:
          "The dashboard prototype had grown into a large application on the same build setup as the browser extension, and slow rebuilds were costing real development time as the feature set expanded.",
        decision:
          "Migrated the dashboard to Vite as part of the rewrite, while leaving the browser extension on its original build tool, where it was already stable and not the bottleneck.",
        consequence:
          "Local dev feedback loops dropped from seconds to near-instant, letting the team ship new automation features noticeably faster during the product's highest-growth period.",
      },
      {
        title: "Introducing TypeScript in the rewrite, not the extension",
        context:
          "The dashboard's feature surface was growing fast (automations, billing, team accounts), and silent type mismatches were becoming a real source of production bugs. The browser extension's codebase was smaller and already stable.",
        decision:
          "Added TypeScript to the new dashboard as part of the rewrite, and left the extension on plain JavaScript rather than retrofitting types onto working code for marginal benefit.",
        consequence:
          "The growing dashboard caught a meaningful share of bugs at build time instead of in production, while engineering time didn't get spent adding type coverage where it wouldn't have paid off.",
      },
      {
        title: "shadcn/ui and Tailwind over a component library dependency",
        context:
          "The original dashboard leaned on a heavier, opinionated UI library, and every visual tweak meant fighting its defaults or waiting on its release cycle.",
        decision:
          "Rebuilt the UI on shadcn/ui, owned component code rather than an installed package, on top of Tailwind.",
        consequence:
          "Design changes that used to require workarounds became direct edits to code the team already owned, and the dashboard's look could evolve on the product's own timeline instead of a dependency's.",
      },
    ],
  },
  {
    id: "3",
    slug: "this-portfolio",
    name: "This Portfolio",
    description:
      "This site. The only case study here you can verify yourself: read the source, run the tests, check the Lighthouse scores.",
    date: "2026",
    role: "Solo Engineer",
    repoUrl: "https://github.com/t-kampa/kampa.dev",
    challenge:
      "A personal site needs to double as evidence: SEO and AI-crawler discoverability, real Core Web Vitals, and a test suite and CI pipeline that actually catch regressions, without turning into a framework showcase that says nothing about how I actually build things.",
    contributions: [
      "Built the test suite from zero: 41 bun test cases plus 8 Playwright E2E flows, all checked against independent oracles (the real App Router file structure, raw MDX frontmatter, Math.ceil directly) instead of re-importing values from the code under test.",
      'Set up CI (lint, typecheck, test, e2e, build as parallel GitHub Actions jobs) and fixed a sitemap.ts bug where lastModified was always "now" regardless of actual content changes.',
      "Ran a Lighthouse audit against a production build, found and fixed two real accessibility bugs (icon-only links with no accessible name, a heading level skipped from h1 to h4). Accessibility went from 94-96 to 100 on every route.",
      "Diagnosed a sitewide LCP regression caused by Framer Motion hiding above-the-fold text until JS hydration, and fixed it with a CSS-only entrance animation for exactly the content that mattered, without flattening the animation everywhere else.",
    ],
    approach:
      "Audit-driven: measure first (Lighthouse baseline, test coverage baseline), fix what the measurement actually showed, re-measure to confirm. Every fix that touched visible behavior was checked in a real production build, not just in dev mode, since dev-mode Lighthouse numbers are meaningless.",
    outcome:
      "SEO and Best Practices both at 100 on every route, Accessibility at 100 (up from 94-96), CI green on lint/typecheck/41 unit tests/8 e2e tests/build. Performance improved unevenly across routes (see decisions below), reported as measured, not rounded up.",
    improvements: [
      {
        value: "100",
        label: "SEO, Best Practices & Accessibility, every route",
      },
      { value: "49", label: "automated tests: 41 unit, 8 e2e, gated in CI" },
      { value: "70→89", label: "performance score, weakest route (LCP fix)" },
    ],
    techStack: [
      "TypeScript",
      "Next.js",
      "Bun",
      "Biome",
      "Playwright",
      "GitHub Actions",
    ],
    decisions: [
      {
        title: "CSS animation instead of removing the entrance effect",
        context:
          "Framer Motion's initial={{opacity: 0}} renders into the server HTML, so above-the-fold text was invisible until JS hydration ran the reveal animation: 1-2s of pure render delay, worst on the projects list at a 3.7s LCP.",
        decision:
          "Rebuilt the same fade+blur look as a CSS animation (tw-animate-css) for exactly the above-the-fold text that was affected, instead of cutting the animation to chase a better score. The entrance motion is part of the site's design, not incidental decoration.",
        consequence:
          "The projects list went from 70 to 89 performance. Other routes stayed roughly flat, because a correctly-timed CSS delay costs close to what the old render-blocking did. That trade-off was accepted deliberately rather than shipping a visually broken (blinking) animation for a bigger number.",
      },
      {
        title: "bun test over adding Vitest",
        context:
          "Bun was already the runtime and package manager; adding Vitest would mean a second JS toolchain just for tests.",
        decision:
          "Used bun test, which meant writing a small Bun plugin to parse MDX frontmatter for tests, since Bun has no MDX loader and dynamic import() of .mdx files needed a stand-in.",
        consequence:
          "One fewer dependency and a consistent toolchain, at the cost of about 60 lines of test infrastructure a bundler-aware runner would have handled for free.",
      },
      {
        title:
          "Tests assert against independent oracles, not the code under test",
        context:
          "An early version of the sitemap test imported its expected route list from sitemap.ts itself, meaning the implementation silently dropping a route would never fail the test written to catch exactly that.",
        decision:
          "Rewrote weak tests to check against something independent of the implementation: the real App Router file structure on disk, the Math.ceil formula directly, raw frontmatter read straight from the MDX file, never a value re-imported from the module being tested.",
        consequence:
          "Caught real gaps during the rewrite (a pagination test that couldn't actually distinguish ceil from floor, an assertion that was trivially always true) that the original, weaker tests had missed.",
      },
    ],
  },
];

export function getAllProjects(): ProjectDetail[] {
  return PROJECTS;
}

export function getPaginatedProjects(
  page: number,
  perPage: number,
): { projects: ProjectDetail[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(PROJECTS.length / perPage));
  const start = (page - 1) * perPage;

  return {
    projects: PROJECTS.slice(start, start + perPage),
    totalPages,
  };
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}

export function getProject(slug: string): ProjectDetail | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
