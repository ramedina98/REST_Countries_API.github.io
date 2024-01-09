/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html", 
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      width: {
        'all': '100%',
        'backBtn':'170px',
        '200':'240px',
        '300': '310px',
        '400': '400px',
        '500': '500px',
        'bigFlag':'610px',
        'infoDiv': '650px'
      },
      height: {
        'bigFlag':'410px',
        'infoDiv': '450px',
        'cartH': '415px',
        'flag': '40%',
        'info': '60%',
        'half': '50%'
      },
      screens: {
        'custom-md': '728px', // Define tu propio breakpoint en 688px
      },
      fontSize: {
        'titleCountry': '1.3em',
        'tc':'1.5em'
      },
    },
  },
  plugins: [],
}

