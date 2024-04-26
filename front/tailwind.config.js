/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "appfg": "#DEE7DA",
      "appbg": "#B7D7E1",
      "apptext": "#2E2C2F",
      "appsep": "#7A989F",
      "appbutton": "#729B79",
      "apperror": "#AF685A",
      "appwhite": "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
}

