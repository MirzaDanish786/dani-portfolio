import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
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
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      transitionTimingFunction: {
        // Mirrors EASE_OUT in lib/motion.ts so CSS and Framer agree.
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      colors: {
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
        phthalo: {
          50: "#fdf6ec",
          100: "#faead0",
          200: "#f4d29a",
          300: "#ecb35e",
          400: "#d68f2f",
          500: "#b06a14",
          600: "#8a4f01",
          700: "#6b3d01",
          800: "#4f2d01",
          900: "#3a2101",
          950: "#1f1100",
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
        // Slow ambient drift for the background light sources. Long duration
        // and small deltas keep it below the threshold of conscious notice.
        // Deliberately small travel. These are large blurred shapes, so even a
        // couple of percent is clearly visible — bigger deltas start to read as
        // the background sloshing around behind the text.
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(6%, -7%, 0) scale(1.10)" },
          "66%": { transform: "translate3d(-5%, 5%, 0) scale(0.93)" },
        },
        // Gentle vertical bob for the background code glyphs. Small travel and
        // long duration so it registers as "alive", not as movement.
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -16px, 0)" },
        },
        // Hero scroll hint: the rule travels down, fades out at the bottom,
        // then re-enters from the top.
        // Starts at rest directly under the SCROLL label — translateY(0), not
        // a negative offset, which would place the line over the text — then
        // travels down and fades out before restarting from the same point.
        "scroll-move": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "20%": { opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "translateY(160%)", opacity: "0" },
        },
        // A highlight travelling along a hairline rule, left to right.
        "rule-sweep": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(320%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        drift: "drift 16s ease-in-out infinite",
        float: "float 14s ease-in-out infinite",
        "scroll-move": "scroll-move 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "rule-sweep": "rule-sweep 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config