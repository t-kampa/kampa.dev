import Section from "@/components/common/Section";
import PageHeader from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROWS = ["row-1", "row-2", "row-3", "row-4", "row-5"];

export default function Loading() {
  return (
    <>
      <PageHeader
        title="Blog Posts"
        description="Notes on UX, architecture, and building SaaS."
      />
      <Section grow>
        <p className="-mt-4 font-mono text-xs text-muted-foreground">
          {"// loading posts..."}
        </p>
        <div className="divide-y">
          {SKELETON_ROWS.map((row) => (
            <div key={row} className="flex flex-col gap-3 py-8">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
