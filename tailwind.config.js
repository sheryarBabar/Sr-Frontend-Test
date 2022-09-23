/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'app-color': '#1877f2',
        'primary-hover': '#0b5fcc',
        'app-grey': '#808080',
        'google-red': '#ea4335',
        'light-grey': '#eff2f5',
        'app-divider': '#dadde1'
      }
    },
  },
  plugins: [],
}
