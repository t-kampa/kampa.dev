import { Github, Linkedin } from "@thesvg/react";
import { Mail } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import FadeContent from "@/components/common/animated/FadeContent";
import SplitText from "@/components/common/animated/SplitText";
import { buttonVariants } from "@/components/ui/button";
import { EASE_POWER2_OUT } from "@/lib/animations";
import { cn } from "@/lib/utils";

const SOCIAL_PLATFORMS: { icon: ReactNode; url: string; label: string }[] = [
  { icon: <Mail />, url: "mailto:me@kampa.dev", label: "Email" },
  {
    icon: <Linkedin />,
    url: "https://www.linkedin.com/in/tanerkampa/",
    label: "LinkedIn",
  },
  {
    icon: <Github variant="mono" />,
    url: "https://github.com/t-kampa",
    label: "GitHub",
  },
];

const LEGAL_PAGES: { label: string; url: string }[] = [
  { label: "impressum", url: "/imprint" },
  { label: "datenschutz", url: "/privacy" },
];

const REPO_URL = "https://github.com/t-kampa/kampa.dev";

export default function Footer() {
  return (
    <footer
      className={cn(
        "border-t border-border/70",
        "backdrop-blur-sm dark:bg-black/50",
        "text-center text-muted-foreground",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full lg:max-w-4xl",
          "flex flex-col",
          "gap-8 px-6 py-8",
        )}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2">
            {SOCIAL_PLATFORMS.map((social) => (
              <Link
                key={social.url}
                href={social.url}
                target={"_blank"}
                rel="noopener noreferrer"
                aria-label={social.label}
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                )}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 font-mono">
          <FadeContent
            transition={{ duration: 1, ease: EASE_POWER2_OUT, delay: 0.1 }}
          >
            <Link
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-xs text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              <span className="text-muted-foreground/40">{"// "}</span>
              <span className="underline decoration-dotted underline-offset-4 group-hover:decoration-solid">
                no templates here, just coffee and code ☕
              </span>
            </Link>
          </FadeContent>
          <SplitText
            className="font-mono text-sm font-semibold tracking-wider"
            text={"2026-PRESENT © TANER KAMPA"}
            duration={1}
            threshold={0.1}
            ease={EASE_POWER2_OUT}
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          />
          <div className="flex justify-center">
            {LEGAL_PAGES.map((legalPage) => (
              <FadeContent key={legalPage.url}>
                <Link
                  href={legalPage.url}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      size: "xs",
                      className: "font-light tracking-normal lowercase",
                    }),
                  )}
                >
                  {legalPage.label}
                </Link>
              </FadeContent>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
