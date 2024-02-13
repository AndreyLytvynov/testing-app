/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      small: "360px",
      mobile: "480px",
      tablet: "768px",
      desktop: "1280px",
      onlyMobile: { max: "767.8px" },
      onlyTablet: { min: "768px", max: "1279.8px" },
      exceptDesktop: { max: "1279.8px" },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        tablet: "32px",
      },
    },
    fontSize: {
      tiny: "12px",
      xs: "14px",
      base: "16px",
      sm: "18px",
      lg: "20px",
      xl: "24px",
      "2xl": "28px",
      "3xl": "32px",
      "4xl": "40px",
      "5xl": "52px",
    },
    extend: {
      colors: {
        violet: "#4D44B5",
        "dark-1": "#000000",
        "light-1": "#F3F4FF",
      },
    },
  },
  plugins: [],
};
