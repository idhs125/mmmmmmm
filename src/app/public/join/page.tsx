"use client";

import { useState } from "react";
import { MinecraftSection } from "@/components/minecraft/MinecraftSection";
import { MinecraftCard } from "@/components/minecraft/MinecraftCard";
import { Button } from "@/components/ui/button";
import { ServerPlatform } from "@/lib/data/schema";
import Link from "next/link";

export default function JoinPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Platform options for the form
  const platformOptions = [
    { id: ServerPlatform.JAVA, label: "Java Edition" },
    { id: ServerPlatform.BEDROCK, label: "Bedrock Edition" },
    { id: ServerPlatform.POCKET, label: "Pocket Edition" },
    { id: ServerPlatform.WINDOWS, label: "Windows 10 Edition" },
  ];

  return (
    <div>
      <MinecraftSection
        title="Join LordSMP"
        subtitle="Apply to become a member of our Minecraft server community"
        backgroundImage="/images/castle-spawn.png"
        overlay={true}
        className="pt-32 pb-20"
      >
        <div className="max-w-4xl mx-auto">
          {/* Application Information */}
          <MinecraftCard
            variant="dark"
            className="mb-10"
            header={
              <h3 className="text-xl text-center">About Our Application Process</h3>
            }
          >
            <div className="space-y-4">
              <p className="text-gray-300">
                We're excited that you're interested in joining the LordSMP Minecraft server! Our application process helps us maintain a friendly and respectful community for all players.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-black/20 p-4 rounded">
                  <h4 className="font-minecraft text-green-400 mb-2">What to Expect</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Complete the application form below</li>
                    <li>Applications are typically reviewed within 48 hours</li>
                    <li>If approved, you'll receive Discord and server details</li>
                    <li>All new members start with a 1-week trial period</li>
                  </ul>
                </div>

                <div className="bg-black/20 p-4 rounded">
                  <h4 className="font-minecraft text-green-400 mb-2">Requirements</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Basic understanding of Minecraft gameplay</li>
                    <li>Willingness to follow server rules</li>
                    <li>Discord account for community communication</li>
                    <li>Positive and respectful attitude</li>
                  </ul>
                </div>
              </div>
            </div>
          </MinecraftCard>

          {formSubmitted ? (
            <MinecraftCard variant="primary" className="border-green-500 text-center py-8">
              <div className="text-center space-y-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-green-500 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h3 className="text-2xl font-minecraft text-white">Application Submitted!</h3>
                <p className="text-gray-300 max-w-md mx-auto">
                  Thank you for applying to join LordSMP! We'll review your application and get back to you as soon as possible through the contact information you provided.
                </p>

                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-400 hover:bg-green-500/10"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Application
                  </Button>
                </div>
              </div>
            </MinecraftCard>
          ) : (
            <MinecraftCard variant="secondary">
              <div className="text-center mb-6">
                <h3 className="text-xl font-minecraft">Application Form</h3>
                <p className="text-gray-400">Please fill out all fields below</p>
              </div>

              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  // In a real application, you would submit to a backend here
                  setFormSubmitted(true);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Minecraft Username */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Minecraft Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="YourMinecraftName"
                      className="w-full px-4 py-2 rounded bg-zinc-700/80 border border-zinc-600 focus:border-green-500 focus:outline-none text-white"
                    />
                  </div>

                  {/* Discord Username */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Discord Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="username#1234"
                      className="w-full px-4 py-2 rounded bg-zinc-700/80 border border-zinc-600 focus:border-green-500 focus:outline-none text-white"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2 rounded bg-zinc-700/80 border border-zinc-600 focus:border-green-500 focus:outline-none text-white"
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="13"
                      placeholder="Your age"
                      className="w-full px-4 py-2 rounded bg-zinc-700/80 border border-zinc-600 focus:border-green-500 focus:outline-none text-white"
                    />
                  </div>
                </div>

                {/* Platform Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Which platforms do you play on? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {platformOptions.map((platform) => (
                      <div
                        key={platform.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={`platform-${platform.id}`}
                          className="w-4 h-4 bg-zinc-700 border-zinc-600 text-green-500 focus:ring-green-500"
                        />
                        <label
                          htmlFor={`platform-${platform.id}`}
                          className="text-sm text-gray-300"
                        >
                          {platform.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Minecraft Experience */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Minecraft Experience <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 rounded bg-zinc-700/80 border border-zinc-600 focus:border-green-500 focus:outline-none text-white"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (Less than 1 year)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="advanced">Advanced (3-5 years)</option>
                    <option value="expert">Expert (5+ years)</option>
                  </select>
                </div>

                {/* About You */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Tell us about yourself <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="What do you enjoy most about Minecraft? What kind of player are you? What are you looking for in a server community?"
                    className="w-full px-4 py-2 rounded bg-zinc-700/80 border border-zinc-600 focus:border-green-500 focus:outline-none text-white"
                  ></textarea>
                </div>

                {/* Why Join */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Why do you want to join LordSMP? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="What attracted you to our server? What do you hope to contribute to our community?"
                    className="w-full px-4 py-2 rounded bg-zinc-700/80 border border-zinc-600 focus:border-green-500 focus:outline-none text-white"
                  ></textarea>
                </div>

                {/* Rules Agreement */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rules-agreement"
                    required
                    className="w-4 h-4 bg-zinc-700 border-zinc-600 text-green-500 focus:ring-green-500"
                  />
                  <label
                    htmlFor="rules-agreement"
                    className="text-gray-300"
                  >
                    I have read and agree to follow the <Link href="/public/rules" className="text-green-400 hover:underline">server rules</Link>
                  </label>
                </div>

                <div className="pt-4 flex justify-center">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 px-8 py-6 h-auto font-minecraft text-lg">
                    Submit Application
                  </Button>
                </div>
              </form>
            </MinecraftCard>
          )}
        </div>
      </MinecraftSection>

      <MinecraftSection
        className="bg-zinc-900 py-16 text-center"
      >
        <h2 className="font-minecraft text-3xl mb-6">Have Questions?</h2>
        <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
          If you have any questions about joining our server or your application status, feel free to join our Discord server for assistance.
        </p>
        <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 h-auto font-minecraft text-lg">
          <Link href="https://discord.gg/lordsmp" target="_blank" rel="noopener noreferrer">
            Join Our Discord
          </Link>
        </Button>
      </MinecraftSection>
    </div>
  );
}
