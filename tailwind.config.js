const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {},
  plugins: [
    heroui({
      themes: {
        light: { colors: { /* your tokens */ } },
        dark:  { colors: { background: "#1d1d1d", text: "#ffffff", myDarkColor: "#ff4ecd" } },
      },
    }),
  ],
};