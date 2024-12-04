module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spartan: ['"Spartan"', "sans-serif"], // Add custom font
      },
      zIndex: {
        50: "50",
        100: "100",
        200: "200",
      },
    },
  },
  plugins: [],
};
