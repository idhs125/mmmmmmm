"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllMembers, getAllRules, getServerStatus } from "@/lib/utils/api";
import { useServerStatus } from "@/lib/context/ServerStatusContext";
import { auth, database } from "@/lib/firebase/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { ref, set, get, remove, Database } from "firebase/database";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Member, Rule } from "@/lib/data/schema";

export default function AdminDashboardPage() {
  const initialMembers = getAllMembers();
  const initialRules = getAllRules();
  const initialServerStatus = getServerStatus();

  // Use the global server status context
  const { isOnline, playerCount, maxPlayers, version, toggleServerStatus, lastUpdated } = useServerStatus();

  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("server");
  const [databaseMissing, setDatabaseMissing] = useState(false);
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    if (!auth) {
      console.error("Auth not available");
      router.push("/admin/login");
      return () => {}; // Return empty cleanup function
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        // User is not logged in, redirect to login page
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Check if database is initialized when component mounts
  useEffect(() => {
    const checkDatabase = async () => {
      if (!database) {
        console.error("Firebase database is not available");
        setDatabaseMissing(true);
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

        const isEmpty = !serverStatusSnapshot.exists() &&
                        !membersSnapshot.exists() &&
                        !rulesSnapshot.exists();

        setDatabaseMissing(isEmpty);
      } catch (error) {
        console.error("Error checking database:", error);
        setDatabaseMissing(true);
      }
    };

    checkDatabase();
  }, []);

  // Load members from Firebase when component mounts
  useEffect(() => {
    if (database) {
      const dbRef = database as Database;
      const membersRef = ref(dbRef, 'members');
      get(membersRef).then((snapshot) => {
        if (snapshot.exists()) {
          const membersData = snapshot.val();
          const membersArray = Object.keys(membersData).map(key => ({
            id: key,
            ...membersData[key],
            joinedAt: new Date(membersData[key].joinedAt)
          }));
          setMembers(membersArray);
        }
      }).catch(error => {
        console.error("Error loading members from Firebase:", error);
      });
    }
  }, []);

  // Load rules from Firebase when component mounts
  useEffect(() => {
    if (database) {
      const dbRef = database as Database;
      const rulesRef = ref(dbRef, 'rules');
      get(rulesRef).then((snapshot) => {
        if (snapshot.exists()) {
          const rulesData = snapshot.val();
          const rulesArray = Object.keys(rulesData).map(key => ({
            id: key,
            ...rulesData[key]
          }));
          setRules(rulesArray);
        }
      }).catch(error => {
        console.error("Error loading rules from Firebase:", error);
      });
    }
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
      router.push("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Add a new member
  const addMember = async (member: Omit<Member, "id">) => {
    if (database) {
      const dbRef = database as Database;
      const membersRef = ref(dbRef, 'members');
      const newMemberRef = ref(dbRef, `members/${Date.now()}`);
      await set(newMemberRef, {
        ...member,
        joinedAt: new Date().toISOString()
      });

      // Reload members
      get(membersRef).then((snapshot) => {
        if (snapshot.exists()) {
          const membersData = snapshot.val();
          const membersArray = Object.keys(membersData).map(key => ({
            id: key,
            ...membersData[key],
            joinedAt: new Date(membersData[key].joinedAt)
          }));
          setMembers(membersArray);
        }
      });
    }
  };

  // Remove a member
  const removeMember = async (id: string) => {
    if (database) {
      const dbRef = database as Database;
      const memberRef = ref(dbRef, `members/${id}`);
      await remove(memberRef);
      setMembers(members.filter(member => member.id !== id));
    }
  };

  // Add a new rule
  const addRule = async (rule: Omit<Rule, "id">) => {
    if (database) {
      const dbRef = database as Database;
      const rulesRef = ref(dbRef, 'rules');
      const newRuleRef = ref(dbRef, `rules/${Date.now()}`);
      await set(newRuleRef, rule);

      // Reload rules
      get(rulesRef).then((snapshot) => {
        if (snapshot.exists()) {
          const rulesData = snapshot.val();
          const rulesArray = Object.keys(rulesData).map(key => ({
            id: key,
            ...rulesData[key]
          }));
          setRules(rulesArray);
        }
      });
    }
  };

  // Remove a rule
  const removeRule = async (id: string) => {
    if (database) {
      const dbRef = database as Database;
      const ruleRef = ref(dbRef, `rules/${id}`);
      await remove(ruleRef);
      setRules(rules.filter(rule => rule.id !== id));
    }
  };

  // Show database missing state
  if (databaseMissing) {
    return (
      <div className="min-h-screen bg-zinc-950">
        {/* Admin Navigation */}
        <header className="bg-zinc-900 border-b border-green-800/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 flex items-center justify-center rounded-sm">
                  <span className="font-minecraft text-white text-sm">L</span>
                </div>
                <h1 className="font-minecraft text-xl text-white">LordSMP Admin</h1>
              </div>

              <div className="flex items-center gap-4">
                <Link href="/">
                  <Button variant="outline" size="sm" className="text-xs">
                    View Website
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-8 mb-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-2xl font-bold text-white mb-2">Database Not Initialized</h2>
              <p className="text-gray-400 mb-6">
                The Firebase Realtime Database has not been initialized with the required data.
                You need to set up the database before you can use the admin dashboard.
              </p>
              <Button
                asChild
                className="bg-red-600 hover:bg-red-700"
              >
                <Link href="/admin/setup/database">
                  Go to Database Setup
                </Link>
              </Button>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-xl font-medium text-white mb-4">What's happening?</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-3">
                <li>The admin dashboard requires data in your Firebase Realtime Database</li>
                <li>Currently, the database appears to be empty or missing required data</li>
                <li>Use the Database Setup page to initialize your database with mock data</li>
                <li>After initializing the database, return to this dashboard</li>
                <li>You'll then be able to manage server status, members, and rules</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, this should redirect, but just in case:
  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">You need to be logged in to access this page</p>
          <Button onClick={() => router.push("/admin/login")}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Admin Navigation */}
      <header className="bg-zinc-900 border-b border-green-800/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 flex items-center justify-center rounded-sm">
                <span className="font-minecraft text-white text-sm">L</span>
              </div>
              <h1 className="font-minecraft text-xl text-white">LordSMP Admin</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-300">Server: {isOnline ? 'Online' : 'Offline'}</span>
              </div>

              <Link href="/">
                <Button variant="outline" size="sm" className="text-xs">
                  View Website
                </Button>
              </Link>

              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="server" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-4 gap-4 bg-zinc-900 p-1">
            <TabsTrigger value="server" className="font-minecraft">Server Status</TabsTrigger>
            <TabsTrigger value="members" className="font-minecraft">Members</TabsTrigger>
            <TabsTrigger value="rules" className="font-minecraft">Rules</TabsTrigger>
            <TabsTrigger value="applications" className="font-minecraft">Applications</TabsTrigger>
          </TabsList>

          {/* Server Status Tab */}
          <TabsContent value="server" className="space-y-6">
            <Card className="bg-zinc-900 border-green-800/30">
              <CardHeader>
                <CardTitle>Server Status</CardTitle>
                <CardDescription>
                  Manage the Minecraft server status here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-zinc-800 rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Status</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <p className="text-xl font-bold text-white">{isOnline ? 'Online' : 'Offline'}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Players</p>
                    <p className="text-xl font-bold text-white">{playerCount} / {maxPlayers}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Version</p>
                    <p className="text-xl font-bold text-white">{version}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-400">Last updated: {lastUpdated.toLocaleString()}</p>

                  <Button
                    onClick={toggleServerStatus}
                    className={isOnline ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
                  >
                    {isOnline ? 'Set Server Offline' : 'Set Server Online'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <Card className="bg-zinc-900 border-green-800/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Members</CardTitle>
                  <CardDescription>
                    Manage server members ({members.length} total)
                  </CardDescription>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Add Member
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Discord</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${
                            member.role === 'owner'
                              ? 'bg-purple-500/20 text-purple-300'
                              : member.role === 'leader'
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-green-500/20 text-green-300'
                          }`}>
                            {member.role}
                          </span>
                        </TableCell>
                        <TableCell>{member.joinedAt.toLocaleDateString()}</TableCell>
                        <TableCell>{member.discordUsername || '—'}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                          <Button variant="destructive" size="sm" onClick={() => removeMember(member.id)}>Remove</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent value="rules" className="space-y-6">
            <Card className="bg-zinc-900 border-green-800/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Server Rules</CardTitle>
                  <CardDescription>
                    Manage server rules ({rules.length} total)
                  </CardDescription>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Add Rule
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Important</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-medium">{rule.title}</TableCell>
                        <TableCell>{rule.category || '—'}</TableCell>
                        <TableCell>
                          {rule.important ? (
                            <span className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded text-xs">Important</span>
                          ) : '—'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                          <Button variant="destructive" size="sm" onClick={() => removeRule(rule.id)}>Remove</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card className="bg-zinc-900 border-green-800/30">
              <CardHeader>
                <CardTitle>Server Join Applications</CardTitle>
                <CardDescription>
                  Manage applications from players who want to join the server
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 text-center bg-zinc-800 rounded-lg">
                  <p className="text-gray-400">No pending applications</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
