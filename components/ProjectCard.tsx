"use client";

import { Project } from "@/types";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const borderColors = {
    blue: "border-accent-blue",
    purple: "border-accent-purple",
    green: "border-accent-green",
    orange: "border-accent-orange",
  };

  // Cycle through colors based on project index
  const colorKeys = Object.keys(borderColors) as Array<keyof typeof borderColors>;
  const colorIndex = project.id.charCodeAt(0) % colorKeys.length;
  const borderColor = borderColors[colorKeys[colorIndex]];

  return (
    <div
      className={`border-2 ${borderColor} rounded-lg p-6 bg-primary-light/50 backdrop-blur-sm hover:bg-primary-light/70 transition-all duration-300 flex flex-col h-full`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{project.icon}</span>
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
      </div>

      <p className="text-gray-300 mb-6 flex-grow">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-primary rounded-full text-sm text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-auto">
        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-primary border border-white/20 rounded-lg text-white hover:bg-primary-light transition-colors text-center"
          >
            Github Code
          </Link>
        )}
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-primary border border-white/20 rounded-lg text-white hover:bg-primary-light transition-colors text-center"
          >
            Live Demo
          </Link>
        )}
      </div>
    </div>
  );
}


