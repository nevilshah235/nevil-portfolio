import Hero from "@/components/Hero";
import KnowledgeStack from "@/components/KnowledgeStack";
import FeaturedProjects from "@/components/FeaturedProjects";
import LatestInsights from "@/components/LatestInsights";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <KnowledgeStack />
      <FeaturedProjects />
      <LatestInsights />
      <Contact />
    </main>
  );
}

