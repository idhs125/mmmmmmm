import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";
import { ServerStatusProvider } from "@/lib/context/ServerStatusContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "LordSMP - Minecraft Server",
  description: "Join LordSMP, a community-driven Minecraft server featuring epic builds, fun events, and a friendly player base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/minecraft-4"
        />
      </head>
      <body className={`${inter.variable} font-sans bg-zinc-950 text-white min-h-screen`}>
        <ServerStatusProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </ServerStatusProvider>
      </body>
    </html>
  );
}
