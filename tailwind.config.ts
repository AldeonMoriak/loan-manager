import { defineConfig } from "windicss/helpers";

export default defineConfig({
  // darkMode: "class",
  // safelist: "p-3 p-4 p-5",
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazir", "Poppins", "Roboto", "sans-serif"],
        poppins: ["Poppins", "Vazir", "sans-serif"],
      },
    },
  },
  plugins: [],
});
