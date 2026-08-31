import DecryptedText from "@/components/common/animated/DecryptText";
import FadeContent from "@/components/common/animated/FadeContent";
import FadeIn from "@/components/common/animated/FadeIn";
import LinkCard from "@/components/common/LinkCard";
import MetaRow from "@/components/common/MetaRow";
import TextTooltip from "@/components/common/TextTooltip";
import { Badge } from "@/components/ui/badge";
import { EASE_POWER2_OUT } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface ProjectPreview {
  id: string;
  slug: string;
  name: string;
  description: string;
  improvements: {
    value: string;
    label: string;
  }[];
  date: string;
  techStack: string[];
  repoUrl?: string;
}

interface Props {
  project: ProjectPreview;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const delay = 0.4 + index * 0.2;

  return (
    <LinkCard href={`/projects/${project.slug}`}>
      <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:max-w-md">
          <div className="flex items-baseline gap-2">
            <h2
              className={cn(
                "font-medium tracking-tight",
                "transition-transform group-hover/link-card:translate-x-1",
              )}
            >
              <DecryptedText
                text={project.name}
                revealDirection="start"
                sequential
                useOriginalCharsOnly={false}
                animateOn="view"
                maxIterations={100}
                speed={35}
                startDelay={delay}
              />
            </h2>
          </div>
          <FadeIn delay={delay + 0.15}>
            <p className="text-sm text-balance text-muted-foreground">
              {project.description}
            </p>
          </FadeIn>
          <FadeContent
            transition={{
              duration: 0.6,
              ease: EASE_POWER2_OUT,
              delay: delay + 0.3,
            }}
          >
            <MetaRow
              className="gap-2"
              items={[
                { key: "date", content: <span>{project.date}</span> },
                {
                  key: "techStack",
                  content: (
                    <>
                      {project.techStack.map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="font-mono text-muted-foreground"
                        >
                          {item}
                        </Badge>
                      ))}
                    </>
                  ),
                },
              ]}
            />
          </FadeContent>
        </div>
        <div className="flex flex-1 flex-col divide-y divide-dashed">
          {project.improvements.map((imp, i) => (
            <FadeContent
              key={imp.label}
              transition={{
                duration: 0.6,
                ease: EASE_POWER2_OUT,
                delay: delay + 0.45 + i * 0.15,
              }}
              className="flex items-center justify-start gap-4 py-1.5 first:pt-0 last:pb-0"
            >
              <span className="shrink-0 font-mono text-sm font-medium tabular-nums line-clamp-1">
                {imp.value}
              </span>
              <TextTooltip
                render={
                  <span className="text-xs text-balance line-clamp-1 text-muted-foreground">
                    {imp.label}
                  </span>
                }
                text={imp.label}
              />
            </FadeContent>
          ))}
        </div>
      </div>
    </LinkCard>
  );
}
