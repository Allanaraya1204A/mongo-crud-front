/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'snow-flurry': {
        '50': '#f3faeb',
        '100': '#e0f3cd',
        '200': '#caebab',
        '300': '#a7dc7a',
        '400': '#87ca51',
        '500': '#68b032',
        '600': '#4f8c24',
        '700': '#3e6b20',
        '800': '#33561e',
        '900': '#2e491e',
        '950': '#15280b',
    },
    

      }
    },
  },
  plugins: [],
}

