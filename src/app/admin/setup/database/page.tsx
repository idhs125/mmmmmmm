"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { initializeDatabase } from "@/lib/firebase/initializeDatabase";
import Link from "next/link";
import Image from "next/image";
import { database } from "@/lib/firebase/firebase";
import { ref, get, Database } from "firebase/database";

export default function DatabaseSetupPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [dbStatus, setDbStatus] = useState<{
    hasServerStatus: boolean;
    hasMembers: boolean;
    hasRules: boolean;
  }>({
    hasServerStatus: false,
    hasMembers: false,
    hasRules: false
  });
  const [statusChecked, setStatusChecked] = useState(false);

  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  const checkDatabaseStatus = async () => {
    if (!database) {
      console.error("Firebase database is not available");
      setStatusChecked(true);
      return;
    }

    try {
      const dbRef = database as Database;
      const serverStatusRef = ref(dbRef, 'serverStatus');
      const membersRef = ref(dbRef, 'members');
      const rulesRef = ref(dbRef, 'rules');

      const [serverStatusSnapshot, membersSnapshot, rulesSnapshot] = await Promise.all([
        get(serverStatusRef),
        get(membersRef),
        get(rulesRef)
      ]);

      setDbStatus({
        hasServerStatus: serverStatusSnapshot.exists(),
        hasMembers: membersSnapshot.exists(),
        hasRules: rulesSnapshot.exists()
      });

      setStatusChecked(true);
    } catch (error) {
      console.error("Error checking database status:", error);
      setStatusChecked(true);
    }
  };

  const handleInitializeDatabase = async () => {
    setLoading(true);
    setResult(null);

    try {
      const initResult = await initializeDatabase();
      setResult(initResult);

      // Re-check database status after initialization
      if (initResult.success) {
        await checkDatabaseStatus();
      }
    } catch (error) {
      console.error("Database initialization error:", error);
      setResult({
        success: false,
        message: `Database error: ${error instanceof Error ? error.message : "Unknown error"}`
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

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-green-500 flex items-center justify-center rounded-sm">
              <span className="font-minecraft text-white text-lg">L</span>
            </div>
            <span className="font-minecraft text-3xl text-white">LordSMP Database Setup</span>
          </div>

          <Card className="bg-black/60 backdrop-blur-sm border-2 border-green-600 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Database Status</CardTitle>
              <CardDescription className="text-gray-400">
                Current status of the Firebase Realtime Database
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!statusChecked ? (
                <div className="flex justify-center py-4">
                  <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${dbStatus.hasServerStatus ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <h3 className="text-white font-medium">Server Status</h3>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {dbStatus.hasServerStatus
                          ? "Server status data is present"
                          : "No server status data found"}
                      </p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${dbStatus.hasMembers ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <h3 className="text-white font-medium">Members</h3>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {dbStatus.hasMembers
                          ? "Member data is present"
                          : "No member data found"}
                      </p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${dbStatus.hasRules ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <h3 className="text-white font-medium">Rules</h3>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {dbStatus.hasRules
                          ? "Rule data is present"
                          : "No rule data found"}
                      </p>
                    </div>
                  </div>

                  {result && (
                    <div className={`${result.success ? "bg-green-500/10 border border-green-500 text-green-500" : "bg-red-500/10 border border-red-500 text-red-500"} px-4 py-3 rounded text-sm`}>
                      {result.message}
                    </div>
                  )}

                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-6">
                    <Button
                      onClick={handleInitializeDatabase}
                      className="bg-green-600 hover:bg-green-700 py-6 h-auto flex-1"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Initializing...
                        </div>
                      ) : "Initialize Database"}
                    </Button>

                    <Button
                      className="bg-blue-600 hover:bg-blue-700 py-6 h-auto flex-1"
                      asChild
                    >
                      <Link href="/admin/login">
                        Go to Admin Login
                      </Link>
                    </Button>

                    <Button
                      className="bg-purple-600 hover:bg-purple-700 py-6 h-auto flex-1"
                      asChild
                    >
                      <Link href="/admin/dashboard">
                        Go to Dashboard
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="bg-black/60 backdrop-blur-sm border-2 border-amber-600 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Important Notes</h2>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>This page will initialize the database with mock data</li>
              <li>Click "Initialize Database" to set up server status, members, and rules</li>
              <li>After initialization, you can manage everything from the admin dashboard</li>
              <li>If the admin panel shows blank areas, try running initialization again</li>
              <li><span className="text-amber-400">Warning:</span> This will overwrite existing data of the same type</li>
            </ul>
          </div>

          <div className="text-center">
            <Link href="/" className="text-green-400 hover:underline">
              Return to Main Website
            </Link>
            <p className="text-gray-500 text-xs mt-4">
              © {new Date().getFullYear()} LordSMP. Database Setup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
