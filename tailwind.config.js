/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Important: This tells Tailwind to find classes in your React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}