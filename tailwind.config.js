module.exports = {
  purge: [],
  darkMode: false, // other values 'media' and 'class'
  theme: {
    extend: {
      colors: {
        "my-accent": "#0092CA",
        "my-accent-light": "#03a8e7",
        "my-contrast": "#F9FAFB",
        "my-black": "#082032",
        "my-dark": "#2C394B",
        "my-dim": "#334756",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["active"],
    },
  },
  plugins: [],
};
