import type { Metadata } from "next";
import Section from "@/components/common/Section";
import NotFoundPath from "@/components/content/NotFoundPath";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="404: command not found"
        description={<NotFoundPath />}
      />
      <Section grow />
    </>
  );
}
