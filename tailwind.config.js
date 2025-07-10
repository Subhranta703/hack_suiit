// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <- ADD THIS
  ],
  theme: {
  extend: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
  },
},
  plugins: [
   
  ],
  darkMode: 'class', // Enable dark mode support
};
