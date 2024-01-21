/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import typographyPlugin from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typographyPlugin, daisyui],
};
