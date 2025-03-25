import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MinecraftSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  overlay?: boolean;
  overlayStrength?: "light" | "medium" | "dark";
  children: ReactNode;
}

export function MinecraftSection({
  className,
  title,
  subtitle,
  backgroundImage,
  overlay = false,
  overlayStrength = "medium",
  children
}: MinecraftSectionProps) {
  const overlayStyles = {
    light: "bg-black/30",
    medium: "bg-black/50",
    dark: "bg-black/70"
  };

  return (
    <section
      className={cn(
        "relative py-16 md:py-24",
        className
      )}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      } : undefined}
    >
      {/* Overlay */}
      {overlay && backgroundImage && (
        <div className={cn(
          "absolute inset-0 z-0",
          overlayStyles[overlayStrength]
        )}></div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="font-minecraft text-3xl md:text-4xl lg:text-5xl mb-4 text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="w-24 h-1 bg-green-500 mx-auto mt-6"></div>
          </div>
        )}

        {/* Main Content */}
        {children}
      </div>
    </section>
  );
}
