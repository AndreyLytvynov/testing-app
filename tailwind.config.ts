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
    boxShadow: {
      primary:
        "2px -2px 10px 0px rgba(92, 46, 145, 0.05), 4px 4px 10px 0px rgba(92, 46, 145, 0.08)",
      // secondary:
      //   '2px -2px 10px 0px rgba(255, 231, 0, 1), 4px 4px 10px 0px rgba(255, 231, 0, 1)',
      // error: '2px -2px 10px 0px #d92d46, 4px 4px 10px 0px #d92d46',
    },
    extend: {
      colors: {
        accent: "#4D44B5",
        "dark-1": "#000000",
        "dark-2": "#09090A",
        "dark-3": "#101012",
        "dark-4": "#1F1F22",
        "light-1": "#F3F4FF",
        "light-2": "#C1BBEB",
        "light-3": "#7878A3",
        "accent-1": "#4D44B5",
      },
    },
  },
  plugins: [],
};
