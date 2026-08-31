import DotField from "@/components/common/animated/DotField";
import type { BasicProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import Footer from "./Footer";
import Header from "./Header";

export default function PageLayout({ className, children }: BasicProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <DotField />
      <main className={cn("flex flex-1 flex-col", className)}>{children}</main>
      <Footer />
    </div>
  );
}
