/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "appfg": "#D9E0CC",
      "appbg": "#ABCAD4",
      "apptext": "#2E2C2F",
      "apptext2": "#6F6870",
      "appsep": "#7A989F",
      "appsep2": "#A4AC95",
      "appbutton": "#508F5A",
      "apperror": "#AF685A",
      "appwhite": "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
}

