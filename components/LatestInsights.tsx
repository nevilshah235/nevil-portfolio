"use client";

import { Insight } from "@/types";
import insightsData from "@/data/insights.json";
import { useState } from "react";
import Link from "next/link";

export default function LatestInsights() {
  const insights: Insight[] = insightsData as Insight[];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextInsight = () => {
    setCurrentIndex((prev) => (prev + 1) % insights.length);
  };

  const prevInsight = () => {
    setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length);
  };

  if (insights.length === 0) {
    return null;
  }

  const currentInsight = insights[currentIndex];

  return (
    <section className="py-20 px-4 bg-primary-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Latest Insights
        </h2>
        <div className="relative">
          {/* Carousel Container */}
          <div className="bg-primary rounded-lg p-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {currentInsight.avatar ? (
                  <img
                    src={currentInsight.avatar}
                    alt={currentInsight.author}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-accent-blue flex items-center justify-center text-white font-bold">
                    {currentInsight.author.charAt(0)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white font-semibold">
                    {currentInsight.author}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {currentInsight.date}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{currentInsight.excerpt}</p>
                {currentInsight.readMoreUrl && (
                  <Link
                    href={currentInsight.readMoreUrl}
                    className="text-accent-blue hover:underline"
                  >
                    Read More →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {insights.length > 1 && (
            <>
              <button
                onClick={prevInsight}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-primary border border-white/20 rounded-full p-3 hover:bg-primary-light transition-colors"
                aria-label="Previous insight"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextInsight}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-primary border border-white/20 rounded-full p-3 hover:bg-primary-light transition-colors"
                aria-label="Next insight"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {insights.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {insights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-white w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to insight ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


