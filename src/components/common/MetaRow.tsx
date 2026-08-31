import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface MetaRowItem {
  key: string;
  content: ReactNode;
}

interface Props {
  items: MetaRowItem[];
  end?: ReactNode;
  className?: string;
}

export default function MetaRow({ items, end, className }: Props) {
  const visible = items.filter((item) => item.content);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground",
        className,
      )}
    >
      {visible.map((item, i) => (
        <div key={item.key} className="contents">
          {i > 0 && <Separator orientation="vertical" />}
          {item.content}
        </div>
      ))}
      {end}
    </div>
  );
}
