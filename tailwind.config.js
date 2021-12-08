module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gbswhs1: "#B4DAF3",
        gbswhs2: "#65C2E4",
        gbswhs3: "#00A2D6",
        gbswhs4: "#0071B6",
        gbswhs5: "#004E82",
        gbswhs6: "#ED1C24",
      },
      outline: {
        gray: ['1px solid #bbbbbb', '1px'],
      },
      boxShadow: {
        gbsw1: '0 20px 25px -5px rgba(101, 194, 228, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        gbsw2: '0 20px 25px -5px rgba(237, 28, 36, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    }
  },
  variants: {},
  plugins: []
}
