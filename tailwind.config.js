module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.tsx'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
