import { DollarSign } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import FadeContent from "@/components/common/animated/FadeContent";
import FadeIn from "@/components/common/animated/FadeIn";
import SplitText from "@/components/common/animated/SplitText";
import { EASE_POWER2_OUT } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface Props {
  title: string;
  description?: ReactNode;
  meta?: ReactNode;
  backHref?: string;
  backLabel?: string;
}

export default function PageHeader({
  title,
  description,
  meta,
  backHref = "/",
  backLabel = "cd ..",
}: Props) {
  return (
    <div className="border-b">
      <div
        className={cn(
          "mx-auto w-full lg:max-w-4xl",
          "flex flex-col gap-6",
          "px-6 py-8",
        )}
      >
        <Link
          href={backHref}
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: cn("w-fit px-0", "hover:gap-3 hover:px-3"),
            }),
          )}
        >
          <DollarSign className="text-muted-foreground size-3" />
          {backLabel}
        </Link>

        <div>
          <SplitText
            text={title}
            duration={1}
            threshold={0.1}
            ease={EASE_POWER2_OUT}
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="start"
            tag="h1"
            className="font-semibold tracking-tight text-balance text-4xl"
          />
          {description && (
            <FadeIn duration={1} delay={0.25}>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground">
                {description}
              </p>
            </FadeIn>
          )}
        </div>

        {meta && (
          <FadeContent
            transition={{ duration: 1, ease: EASE_POWER2_OUT, delay: 0.4 }}
          >
            {meta}
          </FadeContent>
        )}
      </div>
    </div>
  );
}
