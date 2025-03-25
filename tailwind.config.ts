import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        minecraft: ["Minecraft", "monospace"],
      },
      colors: {
        // Minecraft-inspired colors
        grass: {
          DEFAULT: "#5BBD2A",
          dark: "#4A9123",
          light: "#79C745"
        },
        dirt: {
          DEFAULT: "#8F5F3F",
          dark: "#694833",
          light: "#A47F5C"
        },
        stone: {
          DEFAULT: "#8D8D8D",
          dark: "#676767",
          light: "#A5A5A5"
        },
        water: {
          DEFAULT: "#3181F6",
          dark: "#2366C7",
          light: "#4F9DFF"
        },
        lava: {
          DEFAULT: "#EA5D09",
          dark: "#B84507",
          light: "#FF7526"
        },
        sand: {
          DEFAULT: "#DDCB8B",
          dark: "#C9B978",
          light: "#F2E4AC"
        },
        obsidian: {
          DEFAULT: "#221F2E",
          dark: "#141320",
          light: "#2E2B3C"
        },
        diamond: {
          DEFAULT: "#27B9CC",
          dark: "#1E9DAE",
          light: "#4ECFE0"
        },
        emerald: {
          DEFAULT: "#18BE7A",
          dark: "#14A56A",
          light: "#27D990"
        },
        gold: {
          DEFAULT: "#E8C83D",
          dark: "#D1B42F",
          light: "#F5DA5B"
        },
        redstone: {
          DEFAULT: "#D73630",
          dark: "#B62D28",
          light: "#F5443D"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: ".9" },
          "50%": { opacity: ".5" },
        },
        glow: {
          "0%, 100%": {
            textShadow: "0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.3)"
          },
          "50%": {
            textShadow: "0 0 20px rgba(0, 255, 0, 0.7), 0 0 30px rgba(0, 255, 0, 0.5)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse": "pulse 2s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'minecraft-pattern': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23444444' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
