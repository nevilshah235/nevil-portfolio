"use client";

import { KnowledgeStack as KnowledgeStackType } from "@/types";
import knowledgeStackData from "@/data/knowledgeStack.json";
import { useEffect, useRef } from "react";

export default function KnowledgeStack() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data: KnowledgeStackType = knowledgeStackData as KnowledgeStackType;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const size = Math.min(600, window.innerWidth - 32);
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.3;
    const nodeRadius = 40;

    const colorMap: Record<string, string> = {
      blue: "#3b82f6",
      green: "#10b981",
      purple: "#8b5cf6",
      orange: "#f59e0b",
    };

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw connections
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 2;

    data.nodes.forEach((node) => {
      const angle = (2 * Math.PI * data.nodes.indexOf(node)) / data.nodes.length;
      const x = centerX + radius * Math.cos(angle - Math.PI / 2);
      const y = centerY + radius * Math.sin(angle - Math.PI / 2);

      // Connect to center
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Connect to other nodes if specified
      node.connections.forEach((connId) => {
        if (connId !== data.central.id) {
          const connectedNode = data.nodes.find((n) => n.id === connId);
          if (connectedNode) {
            const connAngle =
              (2 * Math.PI * data.nodes.indexOf(connectedNode)) /
              data.nodes.length;
            const connX =
              centerX + radius * Math.cos(connAngle - Math.PI / 2);
            const connY =
              centerY + radius * Math.sin(connAngle - Math.PI / 2);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(connX, connY);
            ctx.stroke();
          }
        }
      });
    });

    // Draw nodes
    data.nodes.forEach((node) => {
      const angle = (2 * Math.PI * data.nodes.indexOf(node)) / data.nodes.length;
      const x = centerX + radius * Math.cos(angle - Math.PI / 2);
      const y = centerY + radius * Math.sin(angle - Math.PI / 2);

      // Draw node circle
      ctx.fillStyle = colorMap[node.color] || "#3b82f6";
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
      ctx.fill();

      // Draw node label
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.label, x, y);
    });

    // Draw center node
    ctx.fillStyle = colorMap[data.central.color] || "#3b82f6";
    ctx.beginPath();
    ctx.arc(centerX, centerY, nodeRadius * 1.2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(data.central.label, centerX, centerY);
  }, []);

  return (
    <section className="py-20 px-4 bg-primary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          The Knowledge Stack
        </h2>
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto"
            style={{ maxWidth: "600px" }}
          />
        </div>
      </div>
    </section>
  );
}


