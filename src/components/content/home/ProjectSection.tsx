import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Section from "@/components/common/Section";
import { buttonVariants } from "@/components/ui/button";
import { getAllProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";
import ProjectCard from "../projects/ProjectCard";

export default function ProjectSection() {
  const projects = getAllProjects();

  return (
    <Section
      tag="selected work"
      title="Case studies, not a tech stack list."
      action={
        <Link
          href="/projects"
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: cn("w-fit", "hover:gap-2"),
            }),
          )}
        >
          All projects
          <ArrowRight className="size-4" />
        </Link>
      }
    >
      <div className="lg:-mb-12 divide-y">
        {projects.map((item, i) => (
          <ProjectCard key={item.id} project={item} index={i + 1} />
        ))}
      </div>
    </Section>
  );
}
