import type { Metadata } from "next";
import Article from "@/components/common/Article";
import Section from "@/components/common/Section";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/imprint" },
};

export default function Page() {
  return (
    <>
      <PageHeader title="Impressum" description="Angaben gemäß § 5 TMG." />
      <Section grow className="select-none">
        <Article>
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            Taner Kampa
            <br />
            Albert-Einstein-Straße 31
            <br />
            84048 Mainburg
            <br />
            Deutschland
          </p>

          <h2>Kontakt</h2>
          <p>
            E-Mail: <a href="mailto:me@kampa.dev">me@kampa.dev</a>
          </p>

          <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>Taner Kampa</p>
        </Article>
      </Section>
    </>
  );
}
