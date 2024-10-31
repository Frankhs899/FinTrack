/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#fbf0ce',
          200: '#f7e19c',
          300: '#f2d16b',
          400: '#eec239',
          500: '#eab308',
          600: '#bb8f06',
          700: '#8c6b05',
          800: '#5e4803',
          900: '#2f2402',
        },
        secondary: {
          100: '#eeddfd',
          200: '#dcbbfc',
          300: '#cb99fa',
          400: '#b977f9',
          500: '#a855f7',
          600: '#8644c6',
          700: '#653394',
          800: '#432263',
          900: '#221131',
        },
      },
    },
  },
  plugins: [],
};
