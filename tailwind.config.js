/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './components/**/**/*.{js,jsx,ts,tsx}',
    './layouts/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      'sm': '500px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1440px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1920px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      'transparent': 'transparent',
      'red-50': 'var(--red-50)',
      'red-100': 'var(--red-100)',
      'red-200': 'var(--red-200)',
      'red-300': 'var(--red-300)',
      'red-400': 'var(--red-400)',
      'red-500': 'var(--red-500)',
      'red-600': 'var(--red-600)',
      'red-700': 'var(--red-700)',
      'red-800': 'var(--red-800)',
      'red-900': 'var(--red-900)',
      'grey-50': 'var(--grey-50)',
      'grey-100': 'var(--grey-100)',
      'grey-200': 'var(--grey-200)',
      'grey-300': 'var(--grey-300)',
      'grey-400': 'var(--grey-400)',
      'grey-500': 'var(--grey-500)',
      'grey-600': 'var(--grey-600)',
      'grey-700': 'var(--grey-700)',
      'grey-800': 'var(--grey-800)',
      'grey-900': 'var(--grey-900)',
      'white-500': 'var(--white-500)',
      'white-600': 'var(--white-600)',
      'white-700': 'var(--white-700)',
      'white-800': 'var(--white-800)',
      'white-900': 'var(--white-900)',
      'disabled': 'var(--disabled)',
      'dialog-background': 'rgba(0, 0, 0, .2)',
    },
    fontFamily: {
      body: ['Hind', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
      logo: ['Orbitron', 'sans-serif'],
    },
    fontSize: {
      'body-sm': '.75rem',
      'body-md': '1rem',
      'body-lg': '1.333rem',
      'heading-sm': '1.777em',
      'heading-md': '2.369rem',
      'heading-lg': '3.157rem',
    },
    fontWeight: {
      'hairline': 100,
      'extra-light': 100,
      'thin': 200,
      'light': 300,
      'normal': 400,
      'medium': 500,
      'semibold': 600,
      'bold': 700,
      'extrabold': 800,
      'extra-bold': 800,
      'black': 900,
    },
    borderRadius: {
      'none': '0',
      'sm': '2px',
      'DEFAULT': '4px',
      'md': '6px',
      'lg': '8px',
      'xl': '12px',
      '2xl': '16px',
      '3xl': '24px',
      'full': '9999px',
      'large': '12px',
    },
  },
  plugins: [],
};
