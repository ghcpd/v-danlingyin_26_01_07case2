/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'feed': '600px',
      },
      height: {
        'screen-safe': 'calc(100vh - 4rem)',
      }
    },
  },
  plugins: [],
}
