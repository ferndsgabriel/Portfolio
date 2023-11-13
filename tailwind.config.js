/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderWidth:{
        1:'1px'
      },
      animation:{
        'OpenLeft':'OpenLeft 1s',
      },
      keyframes:{
        'OpenLeft':{
          "2%":{
            transform: "scale(1)",
          },
          "25%":{
            transform: "translateY(-500px)"
          },
        
        },
      },
      colors: {
        'main': "#3C668D",
        'mainLight': "#5F7488",
        'mainDark': "#05192C",
        'light':'#ECECEC'
      },
    },
  },
  plugins: [],
}
