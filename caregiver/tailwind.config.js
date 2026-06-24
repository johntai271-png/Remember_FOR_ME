/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#1d5bd8",
        action: "#137333",
        active: "#8b6cff",
        lavender: "#eef0ff",
        shell: "#f6f6ff",
      },
      boxShadow: {
        card: "0 18px 40px rgba(54, 72, 112, 0.08)",
      },
      borderRadius: {
        "4xl": "24px",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
