// tailwind.config.js
tailwind.config = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], // Add React files
  theme: {
    extend: {
      colors: {
        black1: '#222222',
        primary: '#D86A37',
       
      },
      container: {
        center: true,
        padding: "1rem", // Optional padding for better spacing
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "1025px",
        xl: "1200px",
        "2xl": "1400px",
        "4xl": "1640px",
      },
    },
  },
  plugins: [],
}
