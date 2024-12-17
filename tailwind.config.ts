import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { transform: 'scale(1)' }, // Original size
          '50%': { transform: 'scale(1.2)' },   // Enlarged size
        },
      },
      animation: {
        blink: 'blink 1.5s ease-in-out infinite', // Animation duration and repeat
      },
    },
  },
  plugins: [],
};
export default config;
