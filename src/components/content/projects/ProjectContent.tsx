"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Section from "@/components/common/Section";
import type { BlogPostPreview } from "@/components/content/blog/BlogPostCard";
import { EASE_POWER2_OUT } from "@/lib/animations";
import type { ProjectDetail } from "@/lib/projects";
import { cn } from "@/lib/utils";

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

interface Props {
  project: ProjectDetail;
  relatedPosts?: BlogPostPreview[];
}

export default function ProjectContent({ project, relatedPosts = [] }: Props) {
  const decisions = project.decisions ?? [];

  return (
    <>
      <Section tag="the challenge" title="What problem needed solving.">
        <motion.p
          className="max-w-lg text-muted-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={line}
        >
          {project.challenge}
        </motion.p>
      </Section>

      <Section tag="my role" title={`${project.role}.`} isHighlighted>
        <motion.ul
          className="flex flex-col gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {project.contributions.map((item, i) => (
            <motion.li
              key={item}
              variants={line}
              className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0"
            >
              <span className="shrink-0 font-mono text-sm text-muted-foreground">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <span className="text-sm leading-relaxed text-pretty">
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Section>

      <Section tag="the approach" title="How it got built.">
        <motion.p
          className="max-w-lg text-muted-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={line}
        >
          {project.approach}
        </motion.p>
      </Section>

      <Section tag="impact" title="What it changed.">
        <motion.p
          className="max-w-lg text-muted-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={line}
        >
          {project.outcome}
        </motion.p>
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {project.improvements.map((imp) => (
            <motion.div
              key={imp.label}
              variants={line}
              className={cn("flex flex-col gap-1 border-t pt-4")}
            >
              <span className="font-mono text-2xl font-medium tabular-nums">
                {imp.value}
              </span>
              <span className="text-sm text-muted-foreground">{imp.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {decisions.length > 0 && (
        <Section tag="the trade-offs" title="What was actually contested.">
          <motion.div
            className="flex flex-col gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
          >
            {decisions.map((d) => (
              <motion.div
                key={d.title}
                variants={line}
                className="flex flex-col gap-2 border-b pb-8 last:border-b-0 last:pb-0"
              >
                <h4 className="font-medium tracking-tight">{d.title}</h4>
                <p className="max-w-lg text-sm text-muted-foreground">
                  <span className="text-foreground">Context: </span>
                  {d.context}
                </p>
                <p className="max-w-lg text-sm text-muted-foreground">
                  <span className="text-foreground">Decision: </span>
                  {d.decision}
                </p>
                <p className="max-w-lg text-sm text-muted-foreground">
                  <span className="text-foreground">Consequence: </span>
                  {d.consequence}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}

      {relatedPosts.length > 0 && (
        <Section tag="further reading" title="Written from this work.">
          <motion.ul
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
          >
            {relatedPosts.map((post) => (
              <motion.li key={post.slug} variants={line}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground"
                >
                  {post.title}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </Section>
      )}
    </>
  );
}
