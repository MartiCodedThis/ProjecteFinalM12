/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "appfg": "#d9e0cc",
      "appbg": "#abcad4",
      "apptext": "#2E2C2F",
      "appsep": "#7A989F",
      "appbutton": "#508f5a",
      "apperror": "#AF685A",
      "appwhite": "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
}

