/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/client/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/*.{js,ts,jsx,tsx}",
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
