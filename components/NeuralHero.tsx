"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

interface KnowledgeNode {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
  size: number;
}

const nodes: KnowledgeNode[] = [
  { id: "python", label: "Python", position: [2, 1, 0], color: "#3b82f6", size: 0.3 },
  { id: "ai", label: "AI/ML", position: [-2, 1, 0], color: "#8b5cf6", size: 0.3 },
  { id: "neo4j", label: "Neo4j", position: [0, 2, 1], color: "#10b981", size: 0.25 },
  { id: "llm", label: "LLMs", position: [0, -2, 1], color: "#f59e0b", size: 0.3 },
  { id: "rag", label: "RAG", position: [1.5, -1, -1], color: "#ef4444", size: 0.25 },
  { id: "backend", label: "Backend", position: [-1.5, -1, -1], color: "#06b6d4", size: 0.3 },
];

function KnowledgeOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.mouse.y * 0.3;
      meshRef.current.rotation.y = state.mouse.x * 0.3;
      const scale = hovered ? 1.1 : 1 + Math.sin(state.clock.elapsedTime) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central orb */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1e40af"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* Knowledge nodes */}
      {nodes.map((node) => (
        <group key={node.id} position={node.position}>
          <Sphere args={[node.size, 16, 16]}>
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.5}
            />
          </Sphere>
          <Text
            position={[0, node.size + 0.2, 0]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {node.label}
          </Text>
        </group>
      ))}

      {/* Connection lines */}
      {nodes.map((node) => (
        <line key={`line-${node.id}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, node.position[0], node.position[1], node.position[2]])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#60a5fa" opacity={0.3} transparent />
        </line>
      ))}
    </group>
  );
}

export default function NeuralHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center geometric-bg px-4 overflow-hidden">
      {/* Social Media Icons - Top Right */}
      <div className="absolute top-8 right-8 flex gap-4 z-10">
        <a
          href="https://www.linkedin.com/in/nevilshah235/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-accent-blue transition-colors"
          aria-label="LinkedIn"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="https://github.com/nevilshah235"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-accent-blue transition-colors"
          aria-label="GitHub"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <KnowledgeOrb />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Main Content Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Nevil Shah // Architecting Intelligence
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto drop-shadow-md">
          Building bridge-focused AI systems. Specializing in Knowledge Graph LLM
          Orchestration, and Scalable Backend Systems.
        </p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold backdrop-blur-sm bg-white/10"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download
            className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold backdrop-blur-sm bg-white/10"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

