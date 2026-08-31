import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface Props {
  page: number;
  totalPages: number;
  basePath: string;
  className?: string;
}

export default function PagePagination({
  page,
  totalPages,
  basePath,
  className,
}: Props) {
  if (totalPages <= 1) return null;

  const href = (p: number) =>
    `${basePath}${basePath.includes("?") ? "&" : "?"}page=${p}`;

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={page > 1 ? href(page - 1) : "#"}
            aria-disabled={page <= 1}
            className={cn(page <= 1 && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href={href(p)} isActive={p === page}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={page < totalPages ? href(page + 1) : "#"}
            aria-disabled={page >= totalPages}
            className={cn(
              page >= totalPages && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
