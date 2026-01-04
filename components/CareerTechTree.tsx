"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";
import careerData from "@/data/careerTimeline.json";

export default function CareerTechTree() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;
    svg.attr("width", width).attr("height", height);

    const simulation = d3
      .forceSimulation(careerData.hubs as any)
      .force(
        "link",
        d3
          .forceLink(careerData.connections)
          .id((d: any) => d.id)
          .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(careerData.connections)
      .enter()
      .append("line")
      .attr("stroke", "#60a5fa")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d: any) => d.strength * 3);

    // Draw nodes
    const node = svg
      .append("g")
      .selectAll("g")
      .data(careerData.hubs)
      .enter()
      .append("g")
      .call(
        d3
          .drag<SVGGElement, any>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Add circles for nodes
    node
      .append("circle")
      .attr("r", 40)
      .attr("fill", (d: any) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer");

    // Add labels
    node
      .append("text")
      .text((d: any) => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", 60)
      .attr("fill", "#fff")
      .attr("font-size", "14px")
      .attr("font-weight", "bold");

    // Add role details
    const roleGroup = node
      .append("g")
      .attr("class", "role-details")
      .attr("opacity", 0);

    roleGroup
      .append("rect")
      .attr("x", -80)
      .attr("y", -60)
      .attr("width", 160)
      .attr("height", 100)
      .attr("fill", "rgba(0, 0, 0, 0.8)")
      .attr("rx", 8);

    roleGroup
      .selectAll("text")
      .data((d: any) => d.roles)
      .enter()
      .append("text")
      .attr("x", 0)
      .attr("y", (d: any, i: number) => -40 + i * 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .attr("font-size", "12px")
      .text((d: any) => `${d.title} - ${d.company}`);

    // Hover effects
    node
      .on("mouseover", function (event, d: any) {
        d3.select(this).select("circle").attr("r", 50);
        d3.select(this).select(".role-details").attr("opacity", 1);
      })
      .on("mouseout", function () {
        d3.select(this).select("circle").attr("r", 40);
        d3.select(this).select(".role-details").attr("opacity", 0);
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, []);

  return (
    <section className="py-20 px-4 bg-primary-dark">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
        >
          Career Tech-Tree
        </motion.h2>
        <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
          Navigate through interconnected hubs of experience. Each node represents
          a domain of expertise, connected by the tools and technologies that bridge
          different projects and roles.
        </p>
        <div className="flex justify-center">
          <div className="bg-primary rounded-lg p-8 backdrop-blur-sm">
            <svg ref={svgRef} className="w-full max-w-4xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

