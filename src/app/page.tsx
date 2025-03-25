"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/minecraft/HeroSection";
import { MinecraftSection } from "@/components/minecraft/MinecraftSection";
import { MinecraftCard } from "@/components/minecraft/MinecraftCard";
import { ServerStatus } from "@/components/minecraft/ServerStatus";
import { getLeaders, getOwner, getServerStatus } from "@/lib/utils/api";
import { MemberCard } from "@/components/minecraft/MemberCard";
import { useServerStatus } from "@/lib/context/ServerStatusContext";

export default function HomePage() {
  const serverStatus = getServerStatus(); // Keep this for supported platforms and other data
  const owner = getOwner();
  const leaders = getLeaders();

  // Use the global server status context
  const { version, isOnline } = useServerStatus();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Welcome to LordSMP"
        subtitle="Join our thriving Minecraft community on version 1.21.4. Build, explore, and connect with players across Java, Bedrock, Pocket and Windows!"
        backgroundImage="/images/castle-spawn.png"
        ctaText="Join Server"
        ctaLink="/public/join"
        secondaryCtaText="Server Status"
        secondaryCtaLink="/public/status"
        showServerStatus={true}
        overlayStrength="medium"
      />

      {/* Features Section */}
      <MinecraftSection
        title="Server Features"
        subtitle="Discover what makes LordSMP special"
        className="bg-zinc-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Feature 1 */}
          <div className="group">
            <div className="h-48 relative overflow-hidden rounded-t-md">
              <Image
                src="/images/medieval-spawn.png"
                alt="Epic Builds"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 text-white font-minecraft text-xl">Epic Builds</h3>
            </div>
            <div className="bg-zinc-800 p-4 rounded-b-md">
              <p className="text-gray-300">Showcase your creativity with amazing builds in our creative and survival worlds.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group">
            <div className="h-48 relative overflow-hidden rounded-t-md">
              <Image
                src="/images/floating-island.jpg"
                alt="Multiple Platforms"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 text-white font-minecraft text-xl">Cross-Platform</h3>
            </div>
            <div className="bg-zinc-800 p-4 rounded-b-md">
              <p className="text-gray-300">Play on Java, Bedrock, Pocket, or Windows 10 - everyone can join the fun!</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group">
            <div className="h-48 relative overflow-hidden rounded-t-md">
              <Image
                src="/images/fantasy-castle.png"
                alt="Community Events"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 text-white font-minecraft text-xl">Community Events</h3>
            </div>
            <div className="bg-zinc-800 p-4 rounded-b-md">
              <p className="text-gray-300">Participate in regular building competitions, PvP tournaments, and special events.</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group">
            <div className="h-48 relative overflow-hidden rounded-t-md">
              <Image
                src="/images/castle-spawn.png"
                alt="Active Staff"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 text-white font-minecraft text-xl">Active Staff</h3>
            </div>
            <div className="bg-zinc-800 p-4 rounded-b-md">
              <p className="text-gray-300">Our dedicated team ensures a safe, friendly environment for all players.</p>
            </div>
          </div>
        </div>
      </MinecraftSection>

      {/* Server Info & Status Section */}
      <MinecraftSection
        className="relative py-24"
        backgroundImage="/images/medieval-spawn.png"
        overlay={true}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Server Info */}
          <MinecraftCard
            variant="dark"
            header={<h3 className="text-2xl text-center">Server Information</h3>}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/20 p-4 rounded">
                  <h4 className="font-minecraft text-green-400 mb-2">Version</h4>
                  <p className="text-white">{version}</p>
                </div>
                <div className="bg-black/20 p-4 rounded">
                  <h4 className="font-minecraft text-green-400 mb-2">How to Connect</h4>
                  <p className="text-white">Join our Discord for server details</p>
                </div>
              </div>

              <div className="p-4 rounded bg-black/20">
                <h4 className="font-minecraft text-green-400 mb-2">Supported Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {serverStatus.supportedPlatforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-3 py-1 bg-zinc-800 text-white rounded-full text-sm"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
                  <Link href="/public/rules">Server Rules</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full md:w-auto">
                  <Link href="/public/members">View Members</Link>
                </Button>
              </div>
            </div>
          </MinecraftCard>

          {/* Live Status */}
          <div className="flex flex-col gap-6">
            <ServerStatus
              status={serverStatus}
              className="flex-grow"
            />

            <MinecraftCard
              variant="secondary"
              header={<h3 className="text-xl text-center">Server Owner</h3>}
              className="flex-grow"
            >
              {owner && (
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 relative overflow-hidden rounded">
                    <Image
                      src={owner.profileImage || "/images/default-avatar.png"}
                      alt={owner.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-minecraft text-lg">{owner.name}</h4>
                    <p className="text-gray-300 text-sm mt-1">{owner.description}</p>
                  </div>
                </div>
              )}
            </MinecraftCard>
          </div>
        </div>
      </MinecraftSection>

      {/* Leaders Section */}
      <MinecraftSection
        title="Our Team Leaders"
        subtitle="Meet the talented individuals who help run LordSMP"
        className="bg-zinc-900/95"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {leaders.map((leader) => (
            <MemberCard key={leader.id} member={leader} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-green-600 hover:bg-green-700 font-minecraft">
            <Link href="/public/members">View All Members</Link>
          </Button>
        </div>
      </MinecraftSection>

      {/* CTA Section */}
      <MinecraftSection
        className="bg-gradient-to-b from-emerald-900/40 to-zinc-900 text-center py-20"
      >
        <h2 className="font-minecraft text-4xl md:text-5xl text-white mb-6">
          Ready to Join the Adventure?
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Become part of our growing community. Fill out our application form to join LordSMP today!
        </p>
        <Button className="bg-green-600 hover:bg-green-700 font-minecraft text-lg px-8 py-6 h-auto">
          <Link href="/public/join">Apply Now</Link>
        </Button>
      </MinecraftSection>
    </div>
  );
}
