/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px"
    },
    fontFamily: {
      sans: ["Helvetica", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    colors: {
      black: "#000000",
      white: "#ffffff",
      gray: "#cbcbcb",
      darkGray: "#5a5a5a",
      transparent: "#00000000"
    },
    extend: {},
  },
  plugins: [],
}

