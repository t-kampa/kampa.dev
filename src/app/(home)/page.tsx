import AboutMeSection from "@/components/content/home/AboutMeSection";
import BlogSection from "@/components/content/home/BlogSection";
import BuildSection from "@/components/content/home/BuildSection";
import MeSection from "@/components/content/home/MeSection";
import ProjectSection from "@/components/content/home/ProjectSection";

export default function Home() {
  return (
    <>
      <MeSection />
      <ProjectSection />
      <BuildSection />
      <AboutMeSection />
      <BlogSection />
    </>
  );
}
