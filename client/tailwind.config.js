/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1535px",
        // => @media (max-width: 1535px) { ... }

        xl: "1279px",
        // => @media (max-width: 1279px) { ... }

        lg: "1023px",
        // => @media (max-width: 1023px) { ... }

        md: "767px",
        // => @media (max-width: 767px) { ... }

        sm: "639px",
        // => @media (max-width: 639px) { ... }

        xs: "475px",
        // => @media (max-width: 475px) { ... }

        x: "0px",
        // => @media (max-width: 255px) { ... }
      },
    },
  },
  plugins: [],
};
