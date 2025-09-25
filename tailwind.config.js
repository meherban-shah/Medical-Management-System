/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1d4ed8", // custom blue
          secondary: "#9333ea", // custom purple
          accent: "#f59e0b", // amber accent
        },
        boxShadow: {
          card: "0 2px 8px rgba(0,0,0,0.1)",
        },
        borderRadius: {
          xl: "1rem",
          '2xl': "1.5rem",
        },
      },
    },
    plugins: [
      require("@tailwindcss/forms"),
      require("@tailwindcss/typography"),
      require("@tailwindcss/aspect-ratio"),
    ],
  };