/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust based on your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        dyslexic: ['OpenDyslexic', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
        arial: ['Arial', 'sans-serif'],
        verdana: ['Verdana', 'sans-serif'],
        tiresias: ['Tiresias', 'sans-serif'],
        comic: ['Comic Sans MS', 'Comic Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

