/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte}', './index.html'],
  theme: {
    extend: {
      colors: {
        'crypto-dark': '#1a202c',
        'crypto-green': '#38a169',
        'crypto-gray': '#4a5568',
      }
    }
  },
  plugins: []
};