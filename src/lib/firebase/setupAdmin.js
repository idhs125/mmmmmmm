// Firebase Admin User Setup
// This file contains functions to set up the admin user in Firebase

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Firebase configuration is already loaded from environment variables in firebase.ts
// This is a separate function that can be called directly from the browser

export async function setupAdminUser(firebaseConfig, adminEmail, adminPassword) {
  try {
    console.log("Setting up admin user...");

    // Initialize Firebase with the provided config
    const app = initializeApp(firebaseConfig, "admin-setup");
    const auth = getAuth(app);
    const db = getDatabase(app);

    console.log(`Creating admin user: ${adminEmail}...`);

    try {
      // Create the admin user
      const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      const user = userCredential.user;

      console.log(`Admin user created successfully with UID: ${user.uid}`);

      // Add admin role in the database
      const userRoleRef = ref(db, `users/${user.uid}`);
      await set(userRoleRef, {
        email: adminEmail,
        role: 'admin',
        createdAt: new Date().toISOString()
      });

      console.log(`Admin role assigned to user in the database`);

      // Initialize server status in the database
      const serverStatusRef = ref(db, 'serverStatus');
      await set(serverStatusRef, {
        isOnline: true,
        playerCount: 0,
        maxPlayers: 30,
        version: "1.21.4",
        lastUpdated: new Date().toISOString(),
        supportedPlatforms: ["java", "bedrock", "pocket", "windows"],
      });

      console.log(`Initial server status set in the database`);

      return {
        success: true,
        message: "Admin user created successfully!"
      };
    } catch (error) {
      console.error(`Error creating admin user:`, error);

      // Check for specific Firebase error codes
      if (error.code === 'auth/email-already-in-use') {
        return {
          success: false,
          message: "Admin user already exists. You can reset your password if needed."
        };
      }

      return {
        success: false,
        message: `Error: ${error.message || error.code || "Unknown error"}`
      };
    }
  } catch (error) {
    console.error(`Error in setup:`, error);
    return {
      success: false,
      message: `Setup error: ${error.message || "Unknown error"}`
    };
  }
}
