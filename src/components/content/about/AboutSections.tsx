"use client";

import { motion } from "motion/react";
import Link from "next/link";
import FadeIn from "@/components/common/animated/FadeIn";
import Section from "@/components/common/Section";
import { EASE_POWER2_OUT } from "@/lib/animations";

interface Skill {
  slug: string;
  name: string;
  techStack: string[];
}

interface AboutSectionsProps {
  skills: Skill[];
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};

const line = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_POWER2_OUT },
  },
};

const PRINCIPLES = [
  {
    title: "Ownership over tickets.",
    description:
      "I follow a feature from the first user conversation to the metric it was supposed to move. A ticket closed is not the same as a problem solved.",
    project: {
      slug: "creator-analytics-platform",
      name: "Creator Analytics Platform",
    },
  },
  {
    title: "Talk to users before you talk to Figma.",
    description:
      "Most bad software isn't badly built, it's built for the wrong problem. I'd rather spend a day in user interviews than a week rebuilding the wrong feature.",
    project: { slug: "creator-crm", name: "Creator CRM & Automation" },
  },
  {
    title: "Clean enough that nobody has to ask me.",
    description:
      "Architecture and naming are a courtesy to whoever reads the code next, including me in six months. No clever tricks that only make sense today.",
    project: { slug: "this-portfolio", name: "This Portfolio" },
  },
];

export default function AboutSections({ skills }: AboutSectionsProps) {
  return (
    <>
      <Section
        tag="background"
        title={"It started with a soldering iron,\nnot a text editor."}
      >
        <div className="flex max-w-lg flex-col gap-4">
          <FadeIn delay={0.15}>
            <p className="text-muted-foreground">
              I started out in embedded systems, writing firmware close to the
              metal, wiring up sensors, and debugging protocols like UART, SPI,
              and CAN with an oscilloscope instead of a browser console.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-muted-foreground">
              Hardware doesn't forgive sloppy thinking. Limited memory, no
              garbage collector to bail you out, and bugs that only show up at
              -10°C in a customer's warehouse. It taught me to understand a
              system fully before touching it, a habit that never left.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section
        tag="the turn"
        title={
          "I cared more about the people using it\nthan the chip running it."
        }
      >
        <motion.div
          className="flex max-w-lg flex-col gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
        >
          <motion.p variants={line} className="text-muted-foreground">
            The turning point wasn't a framework, it was watching someone use
            software I'd helped build and struggle with a screen that made
            perfect sense to me and no sense to them.
          </motion.p>
          <motion.p variants={line} className="text-muted-foreground">
            That pulled me toward product and SaaS, where the feedback loop is
            fast and brutal: you ship, you watch what people actually do, and
            you find out immediately whether your mental model matched theirs.
            I've been chasing that gap between code that works and software that
            feels right ever since.
          </motion.p>
        </motion.div>
      </Section>

      <Section
        tag="what I value"
        title="A few things I don't compromise on."
        isHighlighted
      >
        <motion.div
          className="flex flex-col divide-y"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.title}
              variants={line}
              className="flex flex-col gap-1.5 py-6 first:pt-0 last:pb-0"
            >
              <h4 className="font-medium tracking-tight">{p.title}</h4>
              <p className="max-w-lg text-sm text-muted-foreground">
                {p.description}
              </p>
              <Link
                href={`/projects/${p.project.slug}`}
                className="w-fit text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                → {p.project.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section tag="skills" title="Only listing what's shipped, not studied.">
        <motion.div
          className="flex flex-col divide-y"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {skills.map((project) => (
            <motion.div
              key={project.slug}
              variants={line}
              className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="w-fit shrink-0 text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground"
              >
                {project.name}
              </Link>
              <span className="text-sm text-muted-foreground">
                {project.techStack.join(", ")}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section tag="today" title="Full-stack, product-minded, based in Munich.">
        <motion.div
          className="flex max-w-lg flex-col gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
        >
          <motion.p variants={line} className="text-muted-foreground">
            These days I work across the stack, architecture, backend, frontend,
            and the interaction details in between, on products where the
            outcome, not the tech stack, is the point.
          </motion.p>
          <motion.p variants={line} className="text-muted-foreground">
            If that sounds like a fit, I'm reachable at{" "}
            <a
              href="mailto:me@kampa.dev"
              className="text-foreground underline underline-offset-4"
            >
              me@kampa.dev
            </a>
            .
          </motion.p>
        </motion.div>
      </Section>
    </>
  );
}
