/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens:{
      "screen-1350":"1350px",
      "screen-1100":"1100px",
      "screen-900":"900px",
      "screen-680":"680px",
      "screen-400":"400px",
    },
    extend: {
      
    },
  },
  plugins: [],
};
