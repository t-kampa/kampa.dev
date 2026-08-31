import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  duration?: number;
  blur?: boolean;
}

/**
 * Same fade+blur entrance look as FadeContent, but pure CSS (tw-animate-css)
 * instead of Framer Motion — the animation starts at paint time, not after
 * JS hydration, so it doesn't hide LCP-critical text behind a script-load
 * delay.
 *
 * Not a drop-in replacement for FadeContent: this has no scroll trigger, it
 * always plays once on mount. Below the fold that means it finishes fading
 * in before the user ever scrolls to it, so use it only for above-the-fold
 * content; FadeContent's `whileInView` is the right choice everywhere else.
 *
 * Animation classes are `motion-safe:`-gated so `prefers-reduced-motion:
 * reduce` renders the content at its normal, final state immediately.
 */
export default function FadeIn({
  delay = 0,
  duration = 0.6,
  blur = true,
  className,
  style,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-backwards motion-safe:ease-[cubic-bezier(0.215,0.61,0.355,1)]",
        blur && "motion-safe:blur-in-10",
        className,
      )}
      style={
        {
          "--tw-animation-duration": `${duration}s`,
          "--tw-animation-delay": `${delay}s`,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
