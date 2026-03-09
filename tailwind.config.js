/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens:{
      "screen-1350":'1350px',
      "screen-1100":{max:'1100px'},
      "screen-900":{max:'900px'},
      "screen-680":{max:'680px'},
      "screen-400":{max:'400px'},
    },
    extend: {
      
    },
  },
  plugins: [],
};
