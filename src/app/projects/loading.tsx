import Section from "@/components/common/Section";
import PageHeader from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROWS = ["row-1", "row-2"];

export default function Loading() {
  return (
    <>
      <PageHeader
        title="Case studies, not a tech stack list."
        description="Selected work with the problem, approach, and outcome behind it."
      />
      <Section grow>
        <p className="-mt-4 -mb-8 font-mono text-xs text-muted-foreground">
          {"// loading projects..."}
        </p>
        <div className="divide-y">
          {SKELETON_ROWS.map((row) => (
            <div key={row} className="flex flex-col gap-4 py-8">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
