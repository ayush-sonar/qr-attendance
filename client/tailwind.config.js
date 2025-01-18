// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        coolvetica: ["Coolvetica", "sans-serif"],
        productsans: ["Product Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        lexend: ['Lexend', 'sans-serif'],
        // 'poppins': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
