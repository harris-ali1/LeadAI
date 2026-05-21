/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F0F0F",
        panel: "#151515",
        soft: "#F7F7F2",
        muted: "#8F8F8A",
        line: "rgba(255,255,255,0.10)"
      },
      boxShadow: {
        glow: "0 18px 80px rgba(255,255,255,0.08)"
      }
    }
  },
  plugins: []
};