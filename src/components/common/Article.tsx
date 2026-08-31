import type { BasicProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function Article({ className, children }: BasicProps) {
  return (
    <article
      className={cn("typeset typeset-docs mx-auto w-full lg:px-6", className)}
    >
      {children}
    </article>
  );
}
