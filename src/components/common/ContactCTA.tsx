import { Mail } from "lucide-react";
import Link from "next/link";
import Section from "@/components/common/Section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
}

export default function ContactCTA({
  title = "If this is the kind of work you're looking for, let's talk.",
}: Props) {
  return (
    <Section
      tag="get in touch"
      title={title}
      action={
        <Link
          href="mailto:me@kampa.dev"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "w-fit gap-3 hover:gap-2",
          )}
        >
          <Mail />
          me@kampa.dev
        </Link>
      }
    ></Section>
  );
}
