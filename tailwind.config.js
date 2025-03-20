/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               
    "./src/**/*.{js,jsx,ts,tsx}"  
  ],
  theme: {
    extend: {
      colors: {
        main: "#023336",
        textSecondColor: "#03363D",
        textColor:"#BBBBBB",
        hoverColor: "#045056",
        logout: "#AE2E2E",
        gray: "#969696",
        title: "#1F7A57",
        inputsPlaceholder: "#9ca3af",
      },
    },
  },
  plugins: [],
}
