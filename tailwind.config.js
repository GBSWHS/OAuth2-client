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
      }
    }
  },
  variants: {},
  plugins: []
}
