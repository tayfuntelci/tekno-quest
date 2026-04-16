/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:       '#0a0a18',
        surface:  '#12122b',
        primary:  '#ffe600',
        success:  '#39ff14',
        danger:   '#ff4444',
        info:     '#00cfff',
        purple:   '#c084fc',
        orange:   '#ff9f1c',
      },
      fontFamily: {
        game: ['Chakra Petch', 'sans-serif'],
        body: ['Exo 2', 'sans-serif'],
      },
      animation: {
        'float':    'float 3s ease-in-out infinite',
        'glow':     'glow 2s ease-in-out infinite',
        'pop':      'pop 0.4s cubic-bezier(0.175,0.885,0.32,1.275)',
        'slide-up': 'slideUp 0.4s ease',
        'shake':    'shake 0.4s ease',
      },
      keyframes: {
        float:    { '0%,100%': { transform: 'translateY(0)' },   '50%': { transform: 'translateY(-8px)' } },
        glow:     { '0%,100%': { opacity: '0.7' },               '50%': { opacity: '1' } },
        pop:      { '0%': { transform: 'scale(0.5)', opacity:'0' }, '100%': { transform: 'scale(1)', opacity:'1' } },
        slideUp:  { '0%': { transform: 'translateY(20px)', opacity:'0' }, '100%': { transform: 'translateY(0)', opacity:'1' } },
        shake:    { '0%,100%': { transform:'translateX(0)' }, '20%,60%': { transform:'translateX(-6px)' }, '40%,80%': { transform:'translateX(6px)' } },
      },
    },
  },
  plugins: [],
};
