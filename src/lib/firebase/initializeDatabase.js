// Initialize Firebase Database with Mock Data
import { database } from './firebase';
import { ref, set, get } from 'firebase/database';
import { members, rules, serverStatus } from '../data/mockData';

/**
 * Initializes the Firebase database with mock data
 * Forces data creation even if some data already exists
 */
export async function initializeDatabase() {
  if (!database) {
    console.error("Firebase database is not available");
    return { success: false, message: "Firebase database is not available" };
  }

  try {
    console.log("Starting database initialization...");

    // Get a properly typed database reference
    const db = database;

    // Initialize server status
    const serverStatusRef = ref(db, 'serverStatus');

    console.log("Setting server status...");
    await set(serverStatusRef, {
      isOnline: true,
      playerCount: 0,
      maxPlayers: 30,
      version: "1.21.4",
      lastUpdated: new Date().toISOString(),
      supportedPlatforms: ["java", "bedrock", "pocket", "windows"],
    });
    console.log("Server status initialized successfully");

    // Initialize members
    console.log("Setting up members...");
    const membersRef = ref(db, 'members');

    // Convert date objects to strings for Firebase
    const membersData = {};
    members.forEach((member, index) => {
      const id = Date.now() + index; // Ensure unique IDs
      membersData[id] = {
        ...member,
        joinedAt: member.joinedAt.toISOString()
      };
    });

    await set(membersRef, membersData);
    console.log("Members initialized successfully");

    // Initialize rules
    console.log("Setting up rules...");
    const rulesRef = ref(db, 'rules');

    const rulesData = {};
    rules.forEach((rule, index) => {
      const id = Date.now() + index; // Ensure unique IDs
      rulesData[id] = rule;
    });

    await set(rulesRef, rulesData);
    console.log("Rules initialized successfully");

    return {
      success: true,
      message: "Database initialized successfully with mock data"
    };
  } catch (error) {
    console.error("Error initializing database:", error);
    return {
      success: false,
      message: `Error initializing database: ${error.message || "Unknown error"}`
    };
  }
}
