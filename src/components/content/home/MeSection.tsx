import FadeIn from "@/components/common/animated/FadeIn";
import SplitText from "@/components/common/animated/SplitText";
import { EASE_POWER2_OUT } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function MeSection() {
  return (
    <div className="border-b">
      <section
        className={cn(
          "mx-auto w-full lg:max-w-4xl",
          "flex flex-col",
          "gap-6 px-6 py-8",
        )}
      >
        <div>
          <SplitText
            text={"Taner Kampa"}
            duration={1}
            threshold={0.1}
            ease={EASE_POWER2_OUT}
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="start"
            tag="h1"
            className={cn(
              "font-semibold tracking-tight text-balance",
              "text-4xl",
            )}
          />
          <FadeIn duration={1}>
            <span className="font-mono text-xs text-muted-foreground sm:text-sm">
              Full-Stack / Product Engineer — Munich, Germany
            </span>
          </FadeIn>
        </div>
        <div className="flex flex-col gap-1">
          <FadeIn duration={1} delay={0.25}>
            <h2 className="text-lg leading-snug tracking-tight text-pretty sm:text-xl">
              I care about the product, not just the pull request.
            </h2>
          </FadeIn>
          <FadeIn duration={1} delay={0.5}>
            <p className="max-w-md text-sm leading-relaxed text-pretty text-muted-foreground">
              Full-stack engineer with product and UX depth. <br />
              From architecture to the details that make software feel right.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
