import Link from "next/link";
import { getSocialLinks } from "@/lib/utils/api";
import { Instagram, Heart } from "lucide-react";

export function Footer() {
  const socialLinks = getSocialLinks();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-white py-12 border-t border-green-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500 flex items-center justify-center rounded-sm">
                <span className="font-minecraft text-white text-base">L</span>
              </div>
              <span className="font-minecraft text-xl text-white">LordSMP</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-xs">
              A community-driven Minecraft server featuring epic builds, fun events,
              and a friendly player base. Join us today!
            </p>
            <div className="flex items-center gap-4">
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
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-minecraft text-lg mb-4 text-green-400">Quick Links</h3>
            <ul className="grid grid-cols-1 gap-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/public/members" className="text-gray-300 hover:text-white transition-colors">
                  Members
                </Link>
              </li>
              <li>
                <Link href="/public/rules" className="text-gray-300 hover:text-white transition-colors">
                  Rules
                </Link>
              </li>
              <li>
                <Link href="/public/join" className="text-gray-300 hover:text-white transition-colors">
                  Join Us
                </Link>
              </li>
              <li>
                <Link href="/public/status" className="text-gray-300 hover:text-white transition-colors">
                  Server Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Server Info */}
          <div>
            <h3 className="font-minecraft text-lg mb-4 text-green-400">Server Information</h3>
            <ul className="grid grid-cols-1 gap-3">
              <li className="flex flex-col">
                <span className="text-gray-400">Version:</span>
                <span className="text-white">1.21.4</span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-400">Platforms:</span>
                <span className="text-white">Java, Bedrock, Pocket, Windows</span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-400">Connection Info:</span>
                <span className="text-white">Available via Discord</span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-400">Discord:</span>
                <a
                  href={socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-400 transition-colors"
                >
                  Join Our Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} LordSMP. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500" /> for the Minecraft community
          </p>
        </div>
      </div>
    </footer>
  );
}
