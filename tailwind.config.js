/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#6D787A",
        accent: "#096FFA",
        background: "#FFFFFF",
        surface: "#f5f5f5",
      },
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
      },
      fontSize: {
        'text-small': ['14px', '24px'],
        'text-normal': ['16px', '24px'],
        'text-large': ['18px', '26px'],
        'text-x-large': ['20px', '28px'],
        'text-2x-large': ['22px', '30px'],
        'text-3x-large': ['24px', '30px'],
      },
      spacing: {
        '90': '360px',
      },
      screens: {
        mobile: "360px",
      },
    },
  },
  plugins: [],
};