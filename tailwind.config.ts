import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#E3A652",
          light: "#EDB96A",
          dark: "#C8883A",
        },
        charcoal: {
          DEFAULT: "#101218",
          dark: "#050608",
          light: "#1A1C23",
        },
      },
      animation: {
        "marquee-left": "marqueeLeft 40s linear infinite",
        "marquee-right": "marqueeRight 40s linear infinite",
      },
      keyframes: {
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
