/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ppnavy: '#0A1730',
        ppnavy2: '#0E2044',
        ppcard: '#13294B',
        ppline: '#22406E',
        pporange: '#F7A81B',
        ppcyan: '#25D0EE',
        ppgreen: '#3DDC97',
      },
      fontFamily: {
        sans: ['"Microsoft JhengHei"', '"PingFang TC"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,0.35)',
        glow: '0 6px 20px rgba(247,168,27,0.35)',
      },
    },
  },
  plugins: [],
}
