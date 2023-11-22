/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'White':"url('/src/Assets/bgWhite/10.png')",
        'Dark':"url('/src/Assets/bgDark/10.png')",
      },
      borderWidth:{
        1:'1px'
      },
      animation:{
        'OpenLeft':'OpenLeft 1s',
      },
      animation:{
        'bgWhite': 'bgWhite 5s infinite reverse ease',
        'bgDark': 'bgDark 5s infinite reverse ease'
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
        'bgWhite':{
        "0%":{
            backgroundImage: "url('/src/Assets/bgWhite/1.png')"
          },
          "10%":{
              backgroundImage: "url('/src/Assets/bgWhite/2.png')"
          },
          "20%":{
              backgroundImage: "url('/src/Assets/bgWhite/3.png')"
          },
          "30%":{
              backgroundImage: "url('/src/Assets/bgWhite/4.png')"
          },
          "40%":{
              backgroundImage: "url('/src/Assets/bgWhite/5.png')"
          },
          "50%":{
              backgroundImage: "url('/src/Assets/bgWhite/5.png')"
          },
          "60%":{
              backgroundImage: "url('/src/Assets/bgWhite/6.png')"
          },
          "70%":{
              backgroundImage: "url('/src/Assets/bgWhite/7.png')"
          },
          "80%":{
              backgroundImage: "url('/src/Assets/bgWhite/8.png')"
          },
          "90%":{
              backgroundImage: "url('/src/Assets/bgWhite/9.png')"
          },
          "100%":{
              backgroundImage: "url('/src/Assets/bgWhite/10.png')"
          },
        },
        'bgDark':{
          "0%":{
              backgroundImage: "url('/src/Assets/bgDark/1.png')"
            },
            "10%":{
                backgroundImage: "url('/src/Assets/bgDark/2.png')"
            },
            "20%":{
                backgroundImage: "url('/src/Assets/bgDark/3.png')"
            },
            "30%":{
                backgroundImage: "url('/src/Assets/bgDark/4.png')"
            },
            "40%":{
                backgroundImage: "url('/src/Assets/bgDark/5.png')"
            },
            "50%":{
                backgroundImage: "url('/src/Assets/bgDark/5.png')"
            },
            "60%":{
                backgroundImage: "url('/src/Assets/bgDark/6.png')"
            },
            "70%":{
                backgroundImage: "url('/src/Assets/bgDark/7.png')"
            },
            "80%":{
                backgroundImage: "url('/src/Assets/bgDark/8.png')"
            },
            "90%":{
                backgroundImage: "url('/src/Assets/bgDark/9.png')"
            },
            "100%":{
                backgroundImage: "url('/src/Assets/bgDark/10.png')"
            },
          }
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
