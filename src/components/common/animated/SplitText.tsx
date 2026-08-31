"use client";

import { motion, type Target, type Transition } from "motion/react";

import { cn } from "@/lib/utils";

const TEXT_ALIGN_CLASS = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  start: "text-start",
  end: "text-end",
} as const;

interface Props {
  text: string;
  className?: string;
  delay?: number;
  startDelay?: number;
  duration?: number;
  ease?: Transition["ease"];
  splitType?: "chars" | "words";
  from?: Target;
  to?: Target;
  threshold?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: keyof typeof TEXT_ALIGN_CLASS;
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = "",
  delay = 50,
  startDelay = 0,
  duration = 0.5,
  ease = "easeOut",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  tag = "p",
  textAlign = "center",
  onLetterAnimationComplete,
}: Props) {
  const Tag = motion[tag];
  const parts = splitType === "words" ? text.split(/(\s+)/) : Array.from(text);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: delay / 1000, delayChildren: startDelay },
    },
  };

  const item = {
    hidden: from,
    visible: { ...to, transition: { duration, ease } as Transition },
  };

  return (
    <Tag
      className={cn(
        "inline-block whitespace-normal",
        TEXT_ALIGN_CLASS[textAlign],
        className,
      )}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      onAnimationComplete={onLetterAnimationComplete}
    >
      {parts.map((part, i) =>
        /^\s+$/.test(part) ? (
          part
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: parts are positional text fragments with no stable identity
          <span key={i} className="inline-block overflow-hidden">
            <motion.span variants={item} className="inline-block">
              {part}
            </motion.span>
          </span>
        ),
      )}
    </Tag>
  );
}
