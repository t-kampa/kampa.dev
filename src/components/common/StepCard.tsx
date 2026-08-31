import type { ReactNode } from "react";
import { EASE_POWER2_OUT } from "@/lib/animations";
import { cn, zeroPad } from "@/lib/utils";
import DecryptedText from "./animated/DecryptText";
import FadeContent from "./animated/FadeContent";

export interface Step {
  index: number;
  title: string;
  description: ReactNode;
}

interface Props {
  step: Step;
}

export default function StepCard({ step }: Props) {
  return (
    <div className="w-full justify-start py-6 sm:flex sm:divide-x">
      <div className="flex min-w-48 gap-1 text-balance">
        <FadeContent transition={{ duration: 0.6, ease: EASE_POWER2_OUT }}>
          <span
            className={cn(
              "mt-0.5 font-mono text-sm font-semibold text-muted-foreground",
            )}
          >
            {zeroPad(step.index, 2)}.
          </span>
        </FadeContent>
        <h4 className={cn("font-mono font-semibold uppercase")}>
          <DecryptedText
            text={step.title}
            revealDirection="start"
            sequential
            useOriginalCharsOnly={false}
            animateOn="view"
            maxIterations={100}
            speed={35}
          />
        </h4>
      </div>

      <FadeContent
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8, ease: EASE_POWER2_OUT, delay: 0.2 }}
      >
        <div className="pt-6 pl-6 text-sm font-light sm:pt-0">
          {step.description}
        </div>
      </FadeContent>
    </div>
  );
}
