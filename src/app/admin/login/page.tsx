"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    if (!auth) {
      // Auth not available, just show the login form
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already signed in, redirect to dashboard
        router.push("/admin/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!auth) {
      setError("Authentication service is not available");
      setLoading(false);
      return;
    }

    try {
      // Sign in with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // If successful, redirect to dashboard
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      // Handle different Firebase auth errors
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-credential' ||
            error.code === 'auth/user-not-found' ||
            error.code === 'auth/wrong-password') {
          setError("Invalid email or password");
        } else if (error.code === 'auth/too-many-requests') {
          setError("Too many failed login attempts. Please try again later.");
        } else {
          setError("An error occurred during login. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
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
              <h1 className="text-xl font-bold text-white">Admin Login</h1>
              <p className="text-gray-400 text-sm mt-2">
                Enter your credentials to access the admin dashboard
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@lordsmp.com"
                  className="w-full px-4 py-2 rounded bg-zinc-800/80 border border-zinc-600 focus:border-green-500 focus:outline-none text-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <a href="#" className="text-xs text-green-400 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded bg-zinc-800/80 border border-zinc-600 focus:border-green-500 focus:outline-none text-white"
                />
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 py-6 h-auto"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </div>
                  ) : "Login to Dashboard"}
                </Button>
              </div>
            </form>

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
              © {new Date().getFullYear()} LordSMP. Admin Panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
