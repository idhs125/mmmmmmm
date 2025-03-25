/**
 * Script to create an initial admin user in Firebase Auth
 *
 * Run this script with:
 * node scripts/setup-admin.js
 *
 * Set the environment variables or replace them in the script:
 * - FIREBASE_API_KEY
 * - FIREBASE_AUTH_DOMAIN
 * - FIREBASE_DATABASE_URL
 * - FIREBASE_PROJECT_ID
 * - ADMIN_EMAIL
 * - ADMIN_PASSWORD
 */

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getDatabase, ref, set } = require('firebase/database');

// Firebase configuration - replace with your own or use environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-project-id.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DATABASE_URL || "https://your-project-id-default-rtdb.firebaseio.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
};

// Admin credentials - replace with your own or use environment variables
const adminEmail = process.env.ADMIN_EMAIL || "admin@lordsmp.com";
const adminPassword = process.env.ADMIN_PASSWORD || "admintest123";

async function setupAdminUser() {
  try {
    console.log("Initializing Firebase...");
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);

    console.log(`Creating admin user: ${adminEmail}...`);

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

    console.log(`Setup completed successfully!`);
    process.exit(0);
  } catch (error) {
    console.error(`Error setting up admin user:`, error);

    // Check for specific Firebase error codes
    if (error.code === 'auth/email-already-in-use') {
      console.log(`Admin user already exists. You can use the password reset function if needed.`);
    }

    process.exit(1);
  }
}

// Run the setup function
setupAdminUser();
