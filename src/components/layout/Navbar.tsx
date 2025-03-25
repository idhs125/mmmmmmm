"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getSocialLinks } from "@/lib/utils/api";
import { Menu, X, Instagram } from "lucide-react";
import { useServerStatus } from "@/lib/context/ServerStatusContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/public/members", label: "Members" },
  { href: "/public/rules", label: "Rules" },
  { href: "/public/join", label: "Join Us" },
  { href: "/public/status", label: "Server Status" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Use the global server status context
  const { isOnline } = useServerStatus();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = getSocialLinks();

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-black/90 backdrop-blur-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-500 flex items-center justify-center rounded-sm">
            <span className="font-minecraft text-white text-lg">L</span>
          </div>
          <span className={cn(
            "font-minecraft text-2xl transition-colors",
            scrolled ? "text-white" : "text-white"
          )}>
            LordSMP
          </span>
        </Link>

        {/* Server Status Indicator */}
        <div className="hidden md:flex items-center mr-4">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-3 h-3 rounded-full",
              isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"
            )} />
            <span className={cn(
              "text-sm transition-colors",
              scrolled ? "text-white" : "text-white"
            )}>
              {isOnline ? "Server Online" : "Server Offline"}
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-medium transition-colors hover:text-green-400",
                scrolled ? "text-white" : "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-2">
            <a
              href={socialLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#5865F2] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-discord"
              >
                <path d="M18.93 5a19.52 19.52 0 0 0-4.8-1.5 15.2 15.2 0 0 0-.67 1.36 18.09 18.09 0 0 0-5.4 0A15.2 15.2 0 0 0 7.44 3.5 19.52 19.52 0 0 0 2.63 5"/>
                <path d="M2.93 15.55c-.18-3.6 1.51-6.76 4.07-9.33A15.2 15.2 0 0 1 9.5 4.5"/>
                <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                <path d="M18 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                <path d="M12 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                <path d="M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                <path d="M4.93 16a4 4 0 0 0 3.86 2.77 4.1 4.1 0 0 0 3.9-2.77"/>
                <path d="M9.5 17.5a15.2 15.2 0 0 0-2.5-1.72 18.72 18.72 0 0 1-4.07-3.28"/>
                <path d="M14.58 20a15.2 15.2 0 0 0 2.25-2.25"/>
                <path d="M21.37 6a18.86 18.86 0 0 1 .63 13.5 15.2 15.2 0 0 1-2.25 2.25"/>
                <path d="M14.5 15.5A15.2 15.2 0 0 1 17 17.22a19.52 19.52 0 0 0 4.37-1.5"/>
              </svg>
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#E1306C] transition-colors"
            >
              <Instagram size={24} />
            </a>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu size={24} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-zinc-900 border-green-600 text-white">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 flex items-center justify-center rounded-sm">
                  <span className="font-minecraft text-white text-base">L</span>
                </div>
                <span className="font-minecraft text-xl text-white">LordSMP</span>
              </div>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <X size={24} />
                  <span className="sr-only">Close menu</span>
                </Button>
              </SheetTrigger>
            </div>

            <div className="flex flex-col gap-6 text-white">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center gap-4 mt-4">
                <a
                  href={socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#5865F2] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-discord"
                  >
                    <path d="M18.93 5a19.52 19.52 0 0 0-4.8-1.5 15.2 15.2 0 0 0-.67 1.36 18.09 18.09 0 0 0-5.4 0A15.2 15.2 0 0 0 7.44 3.5 19.52 19.52 0 0 0 2.63 5"/>
                    <path d="M2.93 15.55c-.18-3.6 1.51-6.76 4.07-9.33A15.2 15.2 0 0 1 9.5 4.5"/>
                    <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    <path d="M18 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    <path d="M12 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    <path d="M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    <path d="M4.93 16a4 4 0 0 0 3.86 2.77 4.1 4.1 0 0 0 3.9-2.77"/>
                    <path d="M9.5 17.5a15.2 15.2 0 0 0-2.5-1.72 18.72 18.72 0 0 1-4.07-3.28"/>
                    <path d="M14.58 20a15.2 15.2 0 0 0 2.25-2.25"/>
                    <path d="M21.37 6a18.86 18.86 0 0 1 .63 13.5 15.2 15.2 0 0 1-2.25 2.25"/>
                    <path d="M14.5 15.5A15.2 15.2 0 0 1 17 17.22a19.52 19.52 0 0 0 4.37-1.5"/>
                  </svg>
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#E1306C] transition-colors"
                >
                  <Instagram size={32} />
                </a>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"
                )} />
                <span className="text-sm">
                  {isOnline ? "Server Online" : "Server Offline"}
                </span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;
