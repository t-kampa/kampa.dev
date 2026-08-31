"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import Section from "@/components/common/Section";
import { buttonVariants } from "@/components/ui/button";
import { EASE_POWER3_OUT } from "@/lib/animations";
import { cn } from "@/lib/utils";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
};

const line = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_POWER3_OUT },
  },
};

export default function AboutMeSection() {
  return (
    <Section
      tag="about me"
      title={"Engineer by training. \nProduct thinker by obsession."}
      action={
        <Link
          href="/about"
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: cn("w-fit", "hover:gap-2"),
            }),
          )}
        >
          The full story
          <ArrowRight className="size-4" />
        </Link>
      }
    >
      <motion.div
        className="flex max-w-120 flex-col gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <motion.p variants={line} className="text-muted-foreground">
          I started in embedded systems, firmware, protocols, hardware.
        </motion.p>
        <motion.p
          variants={line}
          className={cn(
            "font-medium text-foreground ",
            "tracking-tight text-lg",
          )}
        >
          Then I noticed: I cared more about the people using the software than
          the chips running it.
        </motion.p>
        <motion.p variants={line} className="text-muted-foreground">
          That shift took me through product development, SaaS, and one
          obsession that never left, the gap between code that works and
          software that feels right.
        </motion.p>
      </motion.div>
    </Section>
  );
}
