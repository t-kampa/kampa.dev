"use client";

import { usePathname } from "next/navigation";

export default function NotFoundPath() {
  const pathname = usePathname();

  return <>bash: {pathname}: No such file or directory</>;
}
