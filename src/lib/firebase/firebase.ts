// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getAuth, Auth } from "firebase/auth";

// Your web app's Firebase configuration
// Using hardcoded values to ensure they are available
const firebaseConfig = {
  apiKey: "AIzaSyALXNpbKvjZUhPuiOg4fgTEE-jn4mYmiwo",
  authDomain: "lordsmp-e698a.firebaseapp.com",
  databaseURL: "https://lordsmp-e698a-default-rtdb.firebaseio.com",
  projectId: "lordsmp-e698a",
  storageBucket: "lordsmp-e698a.firebasestorage.app",
  messagingSenderId: "645711282580",
  appId: "1:645711282580:web:75b0f00921b95ebc2dcf81"
};

// Initialize Firebase - ensuring it's only initialized once
let firebaseApp: FirebaseApp | undefined;
let database: Database | undefined;
let auth: Auth | undefined;

if (typeof window !== "undefined") {
  // Only initialize on client-side
  try {
    firebaseApp = initializeApp(firebaseConfig);
    database = getDatabase(firebaseApp);
    auth = getAuth(firebaseApp);

    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

export { firebaseApp, database, auth };
