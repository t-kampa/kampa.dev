"use client";

import type { ReactNode } from "react";
import DecryptedText from "@/components/common/animated/DecryptText";
import FadeContent from "@/components/common/animated/FadeContent";
import SplitText from "@/components/common/animated/SplitText";
import { Separator } from "@/components/ui/separator";
import { EASE_POWER3_OUT } from "@/lib/animations";
import type { BasicProps } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props extends BasicProps {
  tag?: string;
  title?: string;
  action?: ReactNode;
  isHighlighted?: boolean;
  grow?: boolean;
}

export default function Section({
  tag,
  title,
  action,
  isHighlighted,
  grow,
  children,
  className,
}: Props) {
  return (
    <section
      className={cn(
        isHighlighted && "bg-accent/70 dark:bg-background/70 border-y",
        grow && "flex flex-1 flex-col",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full lg:max-w-4xl",
          "flex flex-col",
          "gap-8 px-6 py-12",
          "lg:border-x",
          "backdrop-blur-xs backdrop-opacity-50",
          grow && "flex-1",
          className,
        )}
      >
        {tag && (
          <div className="flex items-center gap-3">
            <Separator className="max-w-6" orientation="horizontal" />
            <h2
              className={cn(
                "font-mono text-xs text-muted-foreground uppercase",
                "tracking-[0.18em]",
              )}
            >
              <DecryptedText
                text={`// ${tag}`}
                revealDirection="start"
                sequential
                useOriginalCharsOnly={false}
                animateOn="view"
                maxIterations={100}
                speed={35}
              />
            </h2>
            <Separator className="flex-1" orientation="horizontal" />
          </div>
        )}
        {title && (
          <div className="flex">
            <SplitText
              text={title}
              duration={0.8}
              startDelay={0.25}
              threshold={0.1}
              ease={EASE_POWER3_OUT}
              splitType="words"
              from={{ opacity: 0, y: 10 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="start"
              tag="h3"
              className={cn(
                "font-medium tracking-tight text-balance",
                "text-2xl sm:text-3xl",
                "max-w-lg",
                "whitespace-pre-line",
              )}
            />
            {action && (
              <FadeContent
                className="ml-auto hidden md:block"
                transition={{
                  duration: 0.8,
                  ease: EASE_POWER3_OUT,
                  delay: 0.5,
                }}
              >
                {action}
              </FadeContent>
            )}
          </div>
        )}
        {children}
        {action && (
          <FadeContent
            className="ml-auto md:hidden"
            transition={{ duration: 0.8, ease: EASE_POWER3_OUT, delay: 0.15 }}
          >
            {action}
          </FadeContent>
        )}
      </div>
    </section>
  );
}
