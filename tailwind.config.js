module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F2F5F9',
        grayish: '#AEB5C2',
        darkPurple: '#140F26',
        pinkish: '#746373',
        greenish: '#2e4043',
      },
      fontFamily: {
        body: ['Jost'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
