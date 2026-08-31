"use client";

import { useEffect } from "react";
import Section from "@/components/common/Section";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <PageHeader
        title="Something went wrong."
        description="An unexpected error occurred. You can try again."
      />
      <Section grow>
        <Button variant="outline" onClick={reset} className="w-fit">
          Try again
        </Button>
      </Section>
    </>
  );
}
