/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{ts,tsx}", "./public/**/*.html", "./node_modules/flowbite-react/**/*.js"],
  theme: {
    extend: {
    },
  },
  plugins: [require("flowbite/plugin")],
};
