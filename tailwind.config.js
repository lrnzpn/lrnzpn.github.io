/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      black: "var(--main-black)",
      brown: "var(--main-brown)",
      "dark-green": "var(--main-dark-green)",
      gray: "var(--main-gray)",
      "olive-green": "var(--main-olive-green)",
      white: "var(--main-white)",
    },
    fontFamily: {
      primary: "var(--primary-font)",
      secondary: "var(--secondary-font)",
    },
  },
  plugins: [],
};
