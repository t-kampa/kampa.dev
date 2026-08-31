import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { BasicProps } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props extends BasicProps {
  href: string;
}

export default function LinkCard({ href, className, children }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link-card transition-all duration-300",
        "hover:bg-accent/40",
        "px-6 py-8 -mx-6",
        "flex flex-row gap-6 items-center",
      )}
    >
      <div className={cn("flex-1 ", className)}>{children}</div>
      <div className="hidden sm:flex">
        <ArrowRight
          className={cn(
            "transition-all duration-300",
            "size-4 text-muted-foreground",
            "opacity-0 -translate-x-1",
            "group-hover/link-card:translate-x-0 group-hover/link-card:opacity-100",
          )}
        />
      </div>
    </Link>
  );
}
