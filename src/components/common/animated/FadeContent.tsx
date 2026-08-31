"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import { EASE_POWER2_OUT } from "@/lib/animations";

interface Props extends HTMLMotionProps<"div"> {
  blur?: boolean;
}

/**
 * Fade+blur entrance triggered by Framer Motion's `whileInView` — animation
 * only plays once the element scrolls into the viewport. Requires JS
 * hydration first, so use it for below-the-fold content; above-the-fold
 * content should use the CSS-only FadeIn instead, which doesn't wait on
 * hydration and doesn't need a scroll trigger.
 */
export default function FadeContent({
  children,
  blur = true,
  initial,
  whileInView = { opacity: 1, filter: "none" },
  transition = { duration: 1, ease: EASE_POWER2_OUT },
  viewport = { once: true, amount: 0.1 },
  className = "",
  ...props
}: Props) {
  return (
    <motion.div
      initial={initial ?? { opacity: 0, filter: blur ? "blur(10px)" : "none" }}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
