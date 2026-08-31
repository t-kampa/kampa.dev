import { MotionConfig } from "motion/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { PropsWithChildren } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { getAllTags } from "@/lib/blog";
import { jsonLdText, website } from "@/lib/jsonld";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/provider/ThemeProvider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Software Engineer`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Software Engineer`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Software Engineer`,
    description: SITE_DESCRIPTION,
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const knowsAbout = await getAllTags();

  return (
    <html
      lang="en"
      className={cn("h-full antialiased", geist.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body>
        <script type="application/ld+json">
          {jsonLdText({
            "@context": "https://schema.org",
            "@type": "Person",
            name: SITE_NAME,
            url: SITE_URL,
            jobTitle: "Software Engineer",
            knowsAbout,
            sameAs: [
              "https://www.linkedin.com/in/tanerkampa/",
              "https://github.com/t-kampa",
            ],
          })}
        </script>
        <script type="application/ld+json">
          {jsonLdText(website({ name: SITE_NAME, url: SITE_URL }))}
        </script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MotionConfig reducedMotion="user">
            <PageLayout>{children}</PageLayout>
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
