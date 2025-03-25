"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getServerStatus, updateServerStatus } from "@/lib/utils/api";
import { ServerStatus, ServerPlatformType } from "@/lib/data/schema";
import { database } from "@/lib/firebase/firebase";
import { ref, onValue, set, get, DatabaseReference } from "firebase/database";

interface ServerStatusContextType {
  isOnline: boolean;
  playerCount: number;
  maxPlayers: number;
  version: string;
  lastUpdated: Date;
  supportedPlatforms: ServerPlatformType[];
  toggleServerStatus: () => void;
  updatePlayerCount: (count: number) => void;
}

const ServerStatusContext = createContext<ServerStatusContextType | undefined>(undefined);

export function ServerStatusProvider({ children }: { children: ReactNode }) {
  const initialStatus = getServerStatus();
  const [isOnline, setIsOnline] = useState(initialStatus.isOnline);
  const [playerCount, setPlayerCount] = useState(initialStatus.playerCount || 0);
  const [maxPlayers, setMaxPlayers] = useState(initialStatus.maxPlayers || 0);
  const [version, setVersion] = useState(initialStatus.version);
  const [lastUpdated, setLastUpdated] = useState(new Date(initialStatus.lastUpdated));
  const [supportedPlatforms, setSupportedPlatforms] = useState<ServerPlatformType[]>(initialStatus.supportedPlatforms);

  // Connect to Firebase and listen for changes
  useEffect(() => {
    // Store initialStatus values in variables to use in dependencies array
    const initialIsOnline = initialStatus.isOnline;
    const initialPlayerCount = initialStatus.playerCount || 0;
    const initialMaxPlayers = initialStatus.maxPlayers || 0;
    const initialVersion = initialStatus.version;
    const initialSupportedPlatforms = initialStatus.supportedPlatforms;

    if (typeof window !== "undefined" && database) {
      // Get a properly typed database reference
      const db = database;

      // Check if we already have data in Firebase, if not, initialize it
      const serverStatusRef = ref(db, 'serverStatus');

      get(serverStatusRef).then((snapshot) => {
        if (!snapshot.exists()) {
          // Initialize the database with our default data
          set(serverStatusRef, {
            isOnline: initialIsOnline,
            playerCount: initialPlayerCount,
            maxPlayers: initialMaxPlayers,
            version: initialVersion,
            lastUpdated: new Date().toISOString(),
            supportedPlatforms: initialSupportedPlatforms,
          });
        }
      }).catch((error) => {
        console.error("Error checking server status in Firebase:", error);
      });

      // Listen for changes
      const unsubscribe = onValue(serverStatusRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setIsOnline(data.isOnline);
          setPlayerCount(data.playerCount);
          setMaxPlayers(data.maxPlayers);
          setVersion(data.version);
          setLastUpdated(new Date(data.lastUpdated));
          if (data.supportedPlatforms) {
            setSupportedPlatforms(data.supportedPlatforms);
          }

          // Also update our local state management
          updateServerStatus({
            isOnline: data.isOnline,
            playerCount: data.playerCount,
            maxPlayers: data.maxPlayers,
            version: data.version,
            lastUpdated: new Date(data.lastUpdated)
          });

          console.log("Updated server status from Firebase:", data);
        }
      });

      return () => unsubscribe();
    }
  }, [
    // Include all values from initialStatus that were used
    initialStatus.isOnline,
    initialStatus.playerCount,
    initialStatus.maxPlayers,
    initialStatus.version,
    initialStatus.supportedPlatforms
  ]);

  // Toggle server status on/off
  const toggleServerStatus = () => {
    if (database) {
      const newStatus = !isOnline;
      const now = new Date();
      const db = database; // Type assertion for database
      const serverStatusRef = ref(db, 'serverStatus');

      // Update Firebase
      set(serverStatusRef, {
        isOnline: newStatus,
        playerCount: playerCount,
        maxPlayers: maxPlayers,
        version: version,
        lastUpdated: now.toISOString(),
        supportedPlatforms: supportedPlatforms,
      }).then(() => {
        console.log(`Server status changed to: ${newStatus ? 'Online' : 'Offline'}`);
      }).catch((error) => {
        console.error("Error updating server status in Firebase:", error);
      });
    } else {
      // Fallback to local state if Firebase is not available
      const newStatus = !isOnline;
      setIsOnline(newStatus);

      // Update the server status in the local API
      const updatedStatus = updateServerStatus({
        isOnline: newStatus,
        lastUpdated: new Date()
      });

      setLastUpdated(new Date(updatedStatus.lastUpdated));
      console.log(`Server status changed to: ${newStatus ? 'Online' : 'Offline'} (local only)`);
    }
  };

  // Update player count
  const updatePlayerCount = (count: number) => {
    if (database) {
      const db = database; // Type assertion for database
      const serverStatusRef = ref(db, 'serverStatus');

      // Get current values first
      get(serverStatusRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Update only the player count
          set(serverStatusRef, {
            ...data,
            playerCount: count,
            lastUpdated: new Date().toISOString()
          });
        }
      });
    } else {
      // Fallback to local state
      setPlayerCount(count);
      updateServerStatus({ playerCount: count });
    }
  };

  // Value object to be provided to consumers
  const value = {
    isOnline,
    playerCount,
    maxPlayers,
    version,
    lastUpdated,
    supportedPlatforms,
    toggleServerStatus,
    updatePlayerCount
  };

  return (
    <ServerStatusContext.Provider value={value}>
      {children}
    </ServerStatusContext.Provider>
  );
}

// Custom hook to use the server status context
export function useServerStatus() {
  const context = useContext(ServerStatusContext);
  if (context === undefined) {
    throw new Error("useServerStatus must be used within a ServerStatusProvider");
  }
  return context;
}
