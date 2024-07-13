import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "bg-color": "#323437",
        "main-color": "#e2b714",
        "caret-color": "#e2b714",
        "sub-color": "#646669",
        "sub-alt-color": "#2c2e31",
        "text-color": "#d1d0c5",
        "error-color": "#ca4754",
        "error-extra-color": "#7e2a33",
        "colorful-error-color": "#ca4754",
        "colorful-error-extra-color": "#7e2a33",
      },
    },
    screens: {
      xs: "640px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1536px",
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
export default config;
