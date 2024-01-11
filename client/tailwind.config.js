/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'palette': {
          'dark': '#040D12',
          'dark-accent': '#183D3D',
          'mid-accent': '#497061',
          'mid': '#5C8374',
          'light-accent': '#93B1A6',
          'light': '#c3d6ce',
          'lightest': '#e1ebe7',
          'bg': '#e5ebe9'
        }
      },
      fontFamily: {
        'content': ['Cabin', 'sans-serif'],
        'sketch': ['Cabin Sketch', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

