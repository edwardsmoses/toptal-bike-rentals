/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./public/**/*.html", "./node_modules/flowbite-react/**/*.js",],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
