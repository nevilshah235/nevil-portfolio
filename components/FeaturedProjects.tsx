"use client";

import { Project } from "@/types";
import ProjectCard from "./ProjectCard";
import projectsData from "@/data/projects.json";

export default function FeaturedProjects() {
  const projects: Project[] = projectsData as Project[];

  return (
    <section id="projects" className="py-20 px-4 bg-primary-dark">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

