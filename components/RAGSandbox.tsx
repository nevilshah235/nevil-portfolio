"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "@/data/projects.json";
import { Project } from "@/types";

interface RetrievalStep {
  node: string;
  score: number;
  reason: string;
}

export default function RAGSandbox() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Project[]>([]);
  const [retrievalPath, setRetrievalPath] = useState<RetrievalStep[]>([]);
  const [showPath, setShowPath] = useState(false);

  // Simple keyword-based search (will be replaced with actual RAG later)
  const performSearch = async (searchQuery: string) => {
    setIsSearching(true);
    setShowPath(false);
    setRetrievalPath([]);

    // Simulate retrieval process
    const steps: RetrievalStep[] = [
      {
        node: "Knowledge Graph",
        score: 0.95,
        reason: "Query matches core domain: AI/ML systems",
      },
      {
        node: "Projects Index",
        score: 0.87,
        reason: "Found relevant projects in vector space",
      },
      {
        node: "Technical Stack",
        score: 0.82,
        reason: "Matched technologies and tools",
      },
    ];

    // Simulate delay for retrieval visualization
    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setRetrievalPath((prev) => [...prev, steps[i]]);
    }

    // Simple keyword matching (replace with actual RAG)
    const filtered = projectsData.filter(
      (project: Project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    setResults(filtered);
    setIsSearching(false);
    setShowPath(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query);
    }
  };

  return (
    <section className="py-20 px-4 bg-primary">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
        >
          RAG Sandbox
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
        >
          Query your portfolio using natural language. Watch as the retrieval agent
          traverses the knowledge graph to find relevant projects and insights.
        </motion.p>

        {/* Search Input */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about projects, technologies, or experiences..."
              className="flex-1 px-6 py-4 bg-primary-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue transition-colors"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-8 py-4 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {/* Retrieval Visualization */}
        <AnimatePresence>
          {showPath && retrievalPath.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-4xl mx-auto mb-8"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Retrieval Path
              </h3>
              <div className="bg-primary-light rounded-lg p-6 space-y-4">
                {retrievalPath.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">{step.node}</span>
                        <span className="text-gray-400 text-sm">
                          (Score: {(step.score * 100).toFixed(0)}%)
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{step.reason}</p>
                    </div>
                    {index < retrievalPath.length - 1 && (
                      <div className="flex-shrink-0 text-accent-blue">↓</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-4xl mx-auto"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Found {results.length} result{results.length !== 1 ? "s" : ""}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-primary-light border border-white/20 rounded-lg p-6"
                  >
                    <h4 className="text-xl font-bold text-white mb-2">
                      {project.icon} {project.title}
                    </h4>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary rounded-full text-sm text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {results.length === 0 && !isSearching && query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400"
          >
            No results found. Try different keywords or ask about specific
            technologies.
          </motion.div>
        )}
      </div>
    </section>
  );
}

