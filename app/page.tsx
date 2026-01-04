import NeuralHero from "@/components/NeuralHero";
import CareerTechTree from "@/components/CareerTechTree";
import RAGSandbox from "@/components/RAGSandbox";
import FeaturedProjects from "@/components/FeaturedProjects";
import LatestInsights from "@/components/LatestInsights";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <NeuralHero />
      <CareerTechTree />
      <RAGSandbox />
      <FeaturedProjects />
      <LatestInsights />
      <Contact />
    </main>
  );
}

