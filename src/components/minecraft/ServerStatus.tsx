"use client";

import { ServerStatus as ServerStatusType, ServerPlatform, ServerPlatformType } from "@/lib/data/schema";
import { MinecraftCard } from "./MinecraftCard";
import { cn } from "@/lib/utils";
import { useServerStatus } from "@/lib/context/ServerStatusContext";

interface ServerStatusProps {
  status?: ServerStatusType;
  className?: string;
  showDetails?: boolean;
}

export function ServerStatus({
  status,
  className,
  showDetails = true
}: ServerStatusProps) {
  // Use the global server status context
  const { isOnline, playerCount, maxPlayers, version, lastUpdated, supportedPlatforms } = useServerStatus();

  // Format date to readable format
  const formattedDate = new Date(lastUpdated).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  // Platform display names
  const platformNames: Record<ServerPlatformType, string> = {
    [ServerPlatform.JAVA]: "Java Edition",
    [ServerPlatform.BEDROCK]: "Bedrock Edition",
    [ServerPlatform.POCKET]: "Pocket Edition",
    [ServerPlatform.WINDOWS]: "Windows 10 Edition"
  };

  // Get supported platforms from the passed status prop or use default
  const platformsToDisplay = supportedPlatforms || [
    ServerPlatform.JAVA,
    ServerPlatform.BEDROCK,
    ServerPlatform.POCKET,
    ServerPlatform.WINDOWS
  ];

  return (
    <MinecraftCard
      className={className}
      variant={isOnline ? "primary" : "dark"}
      header={
        <div className="text-center font-minecraft text-xl">
          Server Status
        </div>
      }
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Status indicator */}
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-5 h-5 rounded-full animate-pulse",
            isOnline ? "bg-green-500" : "bg-red-500"
          )}></div>
          <span className="text-2xl font-minecraft">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        {showDetails && (
          <>
            {/* Server info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-center">
              <div className="bg-black/30 p-3 rounded">
                <div className="text-gray-400 text-sm mb-1">Version</div>
                <div className="font-minecraft text-green-400">{version}</div>
              </div>

              {isOnline && (
                <div className="bg-black/30 p-3 rounded">
                  <div className="text-gray-400 text-sm mb-1">Players</div>
                  <div className="font-minecraft text-green-400">
                    {playerCount ?? 0}/{maxPlayers ?? 0}
                  </div>
                </div>
              )}
            </div>

            {/* Platform support */}
            <div className="w-full">
              <div className="text-center text-gray-400 mb-3">Supported Platforms</div>
              <div className="flex flex-wrap justify-center gap-2">
                {platformsToDisplay.map((platform) => (
                  <div
                    key={platform}
                    className="bg-black/40 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {platformNames[platform]}
                  </div>
                ))}
              </div>
            </div>

            {/* Last updated */}
            <div className="text-xs text-gray-400">
              Last updated: {formattedDate}
            </div>
          </>
        )}
      </div>
    </MinecraftCard>
  );
}
