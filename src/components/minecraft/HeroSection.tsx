import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ServerStatus as ServerStatusComponent } from "./ServerStatus";
import { getServerStatus } from "@/lib/utils/api";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  showServerStatus?: boolean;
  overlayStrength?: "light" | "medium" | "dark";
  className?: string;
  children?: ReactNode;
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  showServerStatus = false,
  overlayStrength = "medium",
  className,
  children
}: HeroSectionProps) {
  const overlayStyles = {
    light: "bg-black/30",
    medium: "bg-black/50",
    dark: "bg-black/70"
  };

  const serverStatus = getServerStatus();

  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center py-32",
        className
      )}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Overlay */}
      <div className={cn(
        "absolute inset-0 z-0",
        overlayStyles[overlayStrength]
      )}></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 text-center lg:text-left">
            <h1 className="font-minecraft text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                {subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {ctaText && ctaLink && (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white font-minecraft text-lg px-8 py-6 h-auto"
                  asChild
                >
                  <a href={ctaLink}>{ctaText}</a>
                </Button>
              )}

              {secondaryCtaText && secondaryCtaLink && (
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-minecraft text-lg px-8 py-6 h-auto"
                  asChild
                >
                  <a href={secondaryCtaLink}>{secondaryCtaText}</a>
                </Button>
              )}
            </div>
          </div>

          {showServerStatus && (
            <div className="lg:col-span-2">
              <ServerStatusComponent status={serverStatus} />
            </div>
          )}

          {children && (
            <div className={cn(
              "lg:col-span-2",
              showServerStatus ? "hidden" : "block"
            )}>
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
}
