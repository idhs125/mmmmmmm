"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { setupAdminUser } from "@/lib/firebase/setupAdmin";
import Link from "next/link";
import Image from "next/image";

export default function AdminSetupPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSetup = async () => {
    setLoading(true);
    setResult(null);

    try {
      // Hardcoded Firebase config (same as in .env.local)
      const firebaseConfig = {
        apiKey: "AIzaSyALXNpbKvjZUhPuiOg4fgTEE-jn4mYmiwo",
        authDomain: "lordsmp-e698a.firebaseapp.com",
        databaseURL: "https://lordsmp-e698a-default-rtdb.firebaseio.com",
        projectId: "lordsmp-e698a",
        storageBucket: "lordsmp-e698a.firebasestorage.app",
        messagingSenderId: "645711282580",
        appId: "1:645711282580:web:75b0f00921b95ebc2dcf81"
      };

      // Hardcoded admin credentials
      const adminEmail = "admin@lordsmp.com";
      const adminPassword = "AdminLordSMP123!";

      // Show the configuration being used (for debugging)
      console.log("Using Firebase config:", firebaseConfig);

      // Call the setup function
      const setupResult = await setupAdminUser(firebaseConfig, adminEmail, adminPassword);
      setResult(setupResult);
    } catch (error) {
      console.error("Setup error:", error);
      setResult({
        success: false,
        message: `Setup error: ${error instanceof Error ? error.message : "Unknown error"}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col justify-center">
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/medieval-spawn.png"
          alt="LordSMP Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-black/60 backdrop-blur-sm border-2 border-green-600 rounded-lg p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 bg-green-500 flex items-center justify-center rounded-sm">
                  <span className="font-minecraft text-white text-lg">L</span>
                </div>
                <span className="font-minecraft text-2xl text-white">LordSMP</span>
              </div>
              <h1 className="text-xl font-bold text-white">Admin Setup</h1>
              <p className="text-gray-400 text-sm mt-2">
                Set up the admin user for LordSMP admin panel
              </p>
            </div>

            {result && (
              <div className={`${result.success ? "bg-green-500/10 border border-green-500 text-green-500" : "bg-red-500/10 border border-red-500 text-red-500"} px-4 py-2 rounded mb-6 text-sm`}>
                {result.message}
              </div>
            )}

            <div className="space-y-6">
              <div className="bg-black/40 p-4 rounded text-white text-sm">
                <p className="mb-2"><strong>Email:</strong> admin@lordsmp.com</p>
                <p><strong>Password:</strong> AdminLordSMP123!</p>
              </div>

              <Button
                onClick={handleSetup}
                className="w-full bg-green-600 hover:bg-green-700 py-6 h-auto"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Setting up admin...
                  </div>
                ) : "Set Up Admin User"}
              </Button>

              <div className="p-4 bg-amber-500/10 border border-amber-500 rounded">
                <h3 className="text-amber-400 font-medium mb-2">Important!</h3>
                <p className="text-amber-200 text-sm">
                  After setting up the admin user, you need to initialize the database before the admin panel will work correctly.
                </p>
                <Button
                  asChild
                  className="w-full mt-3 bg-amber-600 hover:bg-amber-700"
                >
                  <Link href="/admin/setup/database">
                    Go to Database Setup
                  </Link>
                </Button>
              </div>

              {result?.success && (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 py-6 h-auto"
                >
                  <Link href="/admin/login" className="w-full h-full flex items-center justify-center">
                    Go to Login
                  </Link>
                </Button>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-700">
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  <Link href="/" className="text-green-400 hover:underline">
                    Return to Main Website
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} LordSMP. Admin Setup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
