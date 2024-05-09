/** @type {import("tailwindcss").Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "appfg": "#D9E0CC",
        "appbg": "#ABCAD4",
        "apptext": "#2E2C2F",
        "apptext2": "#6F6870",
        "appsep": "#7A989F",
        "appsep2": "#A4AC95",
        "appbutton": "#508F5A",
        "apperror": "#AF685A",
        "follets": "#87F542",
        "llobatons": "ED1F1F",
        "puputs": "C71FED",
        "rangers": "F5E50C"
      },
      typography: ({ theme }) => ({
        appprose: {
          css: {
            '--tw-prose-body': theme('colors.apptext'),
            '--tw-prose-headings': theme('colors.apptext2'),
            '--tw-prose-lead': theme('colors.apptext'),
            '--tw-prose-links': theme('colors.appbutton'),
            '--tw-prose-counters': theme('colors.appbutton'),
            '--tw-prose-bullets': theme('colors.appbutton'),
          },
        },
      }),
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
  ],
}
