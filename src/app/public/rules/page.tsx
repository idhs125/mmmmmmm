"use client";

import { useState } from "react";
import { MinecraftSection } from "@/components/minecraft/MinecraftSection";
import { MinecraftCard } from "@/components/minecraft/MinecraftCard";
import { getAllRules } from "@/lib/utils/api";
import { Button } from "@/components/ui/button";
import { Rule } from "@/lib/data/schema";
import Link from "next/link";

interface RulesByCategoryType {
  [key: string]: Rule[];
}

export default function RulesPage() {
  const rules = getAllRules();
  const [searchTerm, setSearchTerm] = useState("");

  // Get all unique categories
  const categories = [...new Set(rules.map(rule => rule.category || "General"))];

  // Filter rules by search term
  const filteredRules = searchTerm
    ? rules.filter(rule =>
        rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : rules;

  // Group rules by category
  const rulesByCategory: RulesByCategoryType = categories.reduce((acc, category) => {
    acc[category] = filteredRules.filter(rule => rule.category === category);
    return acc;
  }, {} as RulesByCategoryType);

  return (
    <div>
      <MinecraftSection
        title="Server Rules"
        subtitle="Please follow these rules to ensure a great experience for everyone"
        backgroundImage="/images/medieval-spawn.png"
        overlay={true}
        className="pt-32 pb-20"
      >
        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search rules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800/90 text-white border-2 border-green-600/50 rounded-lg py-3 px-4 focus:outline-none focus:border-green-500"
            />
            <div className="absolute right-4 top-3.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Important Rules First */}
        <div className="mb-12">
          <h2 className="font-minecraft text-2xl mb-6 flex items-center gap-2 text-red-400">
            <span>⚠️</span>
            <span>Important Rules</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRules
              .filter(rule => rule.important)
              .map(rule => (
                <MinecraftCard
                  key={rule.id}
                  variant="dark"
                  className="border-red-600/50"
                  header={
                    <div className="flex items-center gap-2">
                      <span className="text-red-400">⚠️</span>
                      <h3 className="text-xl">{rule.title}</h3>
                    </div>
                  }
                >
                  <p className="text-gray-300">{rule.description}</p>
                </MinecraftCard>
              ))}
          </div>

          {filteredRules.filter(rule => rule.important).length === 0 && (
            <div className="text-center py-8 bg-zinc-800/50 rounded-lg">
              <p className="text-gray-400">No important rules found matching your search</p>
            </div>
          )}
        </div>

        {/* Rules by Category */}
        {categories.map(category => {
          const categoryRules = rulesByCategory[category] || [];
          if (categoryRules.length === 0) return null;

          return (
            <div key={category} className="mb-12">
              <h2 className="font-minecraft text-2xl mb-6 text-green-400">
                {category} Rules
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryRules
                  .filter(rule => !rule.important)
                  .map(rule => (
                    <MinecraftCard
                      key={rule.id}
                      variant="secondary"
                      className={rule.important ? "border-red-600/50" : ""}
                      header={
                        <h3 className="text-xl">{rule.title}</h3>
                      }
                    >
                      <p className="text-gray-300">{rule.description}</p>
                    </MinecraftCard>
                  ))}
              </div>
            </div>
          );
        })}

        {filteredRules.length === 0 && (
          <div className="text-center py-12 bg-zinc-800/50 rounded-lg mt-6">
            <h3 className="text-xl font-minecraft text-gray-400">No rules found</h3>
            <p className="text-gray-500 mt-2">Try a different search term</p>
          </div>
        )}
      </MinecraftSection>

      <MinecraftSection
        className="bg-zinc-900 py-16 text-center"
      >
        <h2 className="font-minecraft text-3xl mb-6">Ready to Join Our Community?</h2>
        <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
          If you agree to follow our rules and want to be part of our community, apply now to join the LordSMP server!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-green-600 hover:bg-green-700 px-8 py-6 h-auto font-minecraft text-lg">
            <Link href="/public/join">Apply Now</Link>
          </Button>
          <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 h-auto font-minecraft text-lg">
            <Link href="/public/status">Server Status</Link>
          </Button>
        </div>
      </MinecraftSection>
    </div>
  );
}
