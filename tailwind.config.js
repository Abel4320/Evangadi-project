/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
    },
  },
  plugins: [],
}
