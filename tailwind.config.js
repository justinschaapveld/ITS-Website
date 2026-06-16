/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          teal:    '#325863',
          tealDark:'#243f48',
          tealLight:'#4a7a89',
          charcoal:'#1a1a1a',
          offwhite:'#f5f5f3',
          yellow:  '#f5b800',
          yellowHover: '#ffc61a',
        },
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        scroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
      },
    },
  },
  plugins: [],
};
