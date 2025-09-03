/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aculife: {
          blue: '#1e40af',
          'blue-light': '#3b82f6',
          'blue-dark': '#1e3a8a',
        }
      },
    },
  },
  plugins: [],
};