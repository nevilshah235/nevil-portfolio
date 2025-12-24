import Hero from "@/components/Hero";
import KnowledgeStack from "@/components/KnowledgeStack";
import FeaturedProjects from "@/components/FeaturedProjects";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <KnowledgeStack />
      <FeaturedProjects />
    </main>
  );
}

