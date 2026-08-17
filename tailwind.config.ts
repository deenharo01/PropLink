import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./types/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        proplink: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#1877f2",
          600: "#1267d9",
          700: "#0f55b5",
          800: "#104791",
          900: "#123d73",
          950: "#0b2342",
        },

        surface: {
          DEFAULT: "#101010",
          50: "#181818",
          100: "#151515",
          200: "#111111",
          300: "#0d0d0d",
          400: "#080808",
          500: "#050505",
        },
      },

      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.28)",
        glow: "0 0 40px rgba(24, 119, 242, 0.12)",
      },

      borderRadius: {
        xl: "14px",
        "2xl": "18px",
        "3xl": "24px",
      },

      maxWidth: {
        "8xl": "1440px",
      },

      backgroundImage: {
        "proplink-glow":
          "radial-gradient(circle at center, rgba(24,119,242,0.14), transparent 65%)",
      },
    },
  },

  plugins: [],
};

export default config;
