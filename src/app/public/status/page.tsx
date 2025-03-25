"use client";

import { useState, useEffect } from "react";
import { MinecraftSection } from "@/components/minecraft/MinecraftSection";
import { MinecraftCard } from "@/components/minecraft/MinecraftCard";
import { ServerStatus as ServerStatusComponent } from "@/components/minecraft/ServerStatus";
import { getServerStatus } from "@/lib/utils/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ServerPlatform } from "@/lib/data/schema";
import { useServerStatus } from "@/lib/context/ServerStatusContext";

export default function StatusPage() {
  const serverStatus = getServerStatus(); // Keep this for supported platforms data
  const [currentTime, setCurrentTime] = useState(new Date());

  // Use the global server status context
  const { isOnline } = useServerStatus();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Platform display info
  const platformInfo = [
    {
      type: ServerPlatform.JAVA,
      name: "Java Edition",
      version: "1.21.4",
      iconPath: "M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm12 10H9v-2h6v2zm0-4H9V9h6v2z",
      description: "Original PC version of Minecraft. Connect using the Java Edition client."
    },
    {
      type: ServerPlatform.BEDROCK,
      name: "Bedrock Edition",
      version: "1.21.4",
      iconPath: "M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16z M7 10h10v4H7z",
      description: "Cross-platform version available on consoles and mobile. Connect using any Bedrock Edition client."
    },
    {
      type: ServerPlatform.POCKET,
      name: "Pocket Edition",
      version: "1.21.4",
      iconPath: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3-3H7V4h10v14z",
      description: "Mobile version for phones and tablets. Connect using the Minecraft app on your device."
    },
    {
      type: ServerPlatform.WINDOWS,
      name: "Windows 10 Edition",
      version: "1.21.4",
      iconPath: "M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z",
      description: "Windows 10 specific version of Minecraft. Available through the Microsoft Store."
    }
  ];

  return (
    <div>
      <MinecraftSection
        title="Server Status"
        subtitle="Check if the server is online and ready to play"
        backgroundImage="/images/medieval-spawn.png"
        overlay={true}
        className="pt-32 pb-20"
      >
        <div className="max-w-4xl mx-auto">
          {/* Server Status Card */}
          <div className="mb-12">
            <ServerStatusComponent status={serverStatus} showDetails={true} />
          </div>

          {/* Current Time */}
          <div className="flex justify-center mb-10">
            <MinecraftCard variant="dark" className="inline-block">
              <div className="text-center">
                <h3 className="font-minecraft text-lg mb-2">Current Time</h3>
                <p className="text-2xl font-mono">{currentTime.toLocaleTimeString()}</p>
                <p className="text-gray-400 text-sm">{currentTime.toLocaleDateString()}</p>
              </div>
            </MinecraftCard>
          </div>

          {/* Platform Information */}
          <h2 className="font-minecraft text-2xl mb-6 text-center">Supported Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platformInfo.map((platform) => (
              <MinecraftCard
                key={platform.type}
                variant="secondary"
                header={
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={platform.iconPath}></path>
                    </svg>
                    <h3 className="text-xl">{platform.name}</h3>
                  </div>
                }
              >
                <div className="space-y-3">
                  <div>
                    <div className="text-gray-400 text-sm">Version</div>
                    <div className="font-minecraft">{platform.version}</div>
                  </div>
                  <p className="text-gray-300 text-sm pt-2">
                    {platform.description}
                  </p>
                </div>
              </MinecraftCard>
            ))}
          </div>

          <div className="mt-10 bg-yellow-800/20 border border-yellow-600/40 rounded-lg p-4 text-yellow-200">
            <h3 className="font-minecraft text-lg mb-2">Connection Information</h3>
            <p>
              Server connection details are private and will be provided through our Discord server after your application is approved. This helps us maintain a safe and friendly community.
            </p>
          </div>
        </div>
      </MinecraftSection>

      <MinecraftSection
        className="bg-zinc-900 text-center py-16"
      >
        <h2 className="font-minecraft text-3xl mb-6">Ready to Join?</h2>
        <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
          If the server is online, you can connect once you've been approved.
          New players will need to apply first!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-green-600 hover:bg-green-700 px-8 py-6 h-auto font-minecraft text-lg">
            <Link href="/public/join">Apply Now</Link>
          </Button>
          <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 h-auto font-minecraft text-lg">
            <Link href="https://discord.gg/lordsmp" target="_blank" rel="noopener noreferrer">
              Join Discord
            </Link>
          </Button>
        </div>
      </MinecraftSection>
    </div>
  );
}
