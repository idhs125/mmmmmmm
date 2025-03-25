/**
 * Script to set up Firebase Realtime Database security rules
 *
 * Run this script with:
 * node scripts/setup-security-rules.js
 *
 * Set the environment variables or replace them in the script:
 * - FIREBASE_API_KEY
 * - FIREBASE_AUTH_DOMAIN
 * - FIREBASE_DATABASE_URL
 * - FIREBASE_PROJECT_ID
 * - FIREBASE_ADMIN_SDK_CREDENTIALS (path to your service account JSON file)
 *
 * Note: This script requires the Firebase Admin SDK credentials.
 * Download your service account JSON file from the Firebase console:
 * Project Settings > Service Accounts > Generate new private key
 */

const admin = require('firebase-admin');
const fs = require('fs');

/**
 * IMPORTANT:
 * Before running this script, you need to:
 * 1. Go to the Firebase console: https://console.firebase.google.com/
 * 2. Navigate to your project
 * 3. Go to Project Settings > Service Accounts
 * 4. Generate a new private key (this will download a JSON file)
 * 5. Save that file somewhere secure and reference it in this script
 *
 * Example: const serviceAccount = require('./path-to-your-service-account.json');
 */

// Set this to the path of your downloaded service account JSON file
const serviceAccountPath = process.env.FIREBASE_ADMIN_SDK_CREDENTIALS || './firebase-admin-sdk.json';

async function setupSecurityRules() {
  try {
    console.log('Initializing Firebase Admin SDK...');

    let serviceAccount;
    try {
      // Try to read the service account file
      serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    } catch (err) {
      console.error(`Error reading service account file at ${serviceAccountPath}:`);
      console.error(err.message);
      console.log('\nPlease download your service account JSON file from Firebase console and provide the correct path.');
      console.log('Project Settings > Service Accounts > Generate new private key');
      process.exit(1);
    }

    // Initialize the app
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://lordsmp-e698a-default-rtdb.firebaseio.com'
    });

    // Get a database reference
    const db = admin.database();

    // Define security rules for Realtime Database
    const securityRules = {
      rules: {
        ".read": false,
        ".write": false,
        "serverStatus": {
          // Anyone can read server status
          ".read": true,
          // Only authenticated users can write
          ".write": "auth != null"
        },
        "members": {
          // Anyone can read members
          ".read": true,
          // Only authenticated users can write
          ".write": "auth != null"
        },
        "rules": {
          // Anyone can read rules
          ".read": true,
          // Only authenticated users can write
          ".write": "auth != null"
        },
        "applications": {
          // Anyone can read applications
          ".read": true,
          // Anyone can submit an application (write), authenticated users can manage
          ".write": true
        },
        "users": {
          // Only admins can read all users
          ".read": "auth != null",
          // Users can read their own data
          "$uid": {
            ".read": "auth != null && auth.uid === $uid",
            // Only admins can write to any user
            ".write": "auth != null"
          }
        }
      }
    };

    console.log('Setting up security rules...');

    // Set the security rules
    await db.setRules(JSON.stringify(securityRules));

    console.log('Security rules successfully applied!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up security rules:', error);
    process.exit(1);
  }
}

// Run the setup function
setupSecurityRules();
