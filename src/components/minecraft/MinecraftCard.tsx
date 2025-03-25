import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface MinecraftCardProps {
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "light";
  bordered?: boolean;
  children: ReactNode;
}

export function MinecraftCard({
  className,
  header,
  footer,
  variant = "primary",
  bordered = true,
  children
}: MinecraftCardProps) {
  const variantStyles = {
    primary: "bg-zinc-800/80 text-white border-green-600",
    secondary: "bg-zinc-900/80 text-white border-gray-700",
    dark: "bg-black/90 text-white border-green-800",
    light: "bg-white/10 text-white backdrop-blur-sm border-white/20"
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-transform duration-300 hover:translate-y-[-2px]",
        bordered ? "border-2" : "border-0",
        variantStyles[variant],
        className
      )}
    >
      {header && (
        <CardHeader className={cn(
          "font-minecraft border-b-2",
          variant === "primary" ? "border-green-600" : "border-gray-700"
        )}>
          {header}
        </CardHeader>
      )}
      <CardContent className={cn("p-5", !header && "pt-5")}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn(
          "border-t-2",
          variant === "primary" ? "border-green-600/50" : "border-gray-700/50"
        )}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
