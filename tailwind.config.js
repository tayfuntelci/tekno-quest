/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      '2xs': '280px',  // Samsung Fold (katlanmış)
      'xs':  '360px',  // küçük telefonlar
      'sm':  '640px',
      'md':  '768px',
      'lg':  '1024px',
      'xl':  '1280px',
      '2xl': '1536px',
    },
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
        'float':        'float 3s ease-in-out infinite',
        'glow':         'glow 2s ease-in-out infinite',
        'pop':          'pop 0.4s cubic-bezier(0.175,0.885,0.32,1.275)',
        'slide-up':     'slideUp 0.4s ease',
        'shake':        'shake 0.4s ease',
        'burst':        'burst 0.9s ease-out forwards',
        'screen-shake': 'screenShake 0.5s ease',
        'banner-in':    'bannerIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards',
        'rank-up':      'rankUp 1.8s ease forwards',
        'heartbeat':    'heartbeat 1.2s ease-in-out infinite',
        'bounce-in':    'bounceIn 0.6s cubic-bezier(0.175,0.885,0.32,1.275)',
      },
      keyframes: {
        float:       { '0%,100%': { transform: 'translateY(0)' },   '50%': { transform: 'translateY(-8px)' } },
        glow:        { '0%,100%': { opacity: '0.7' },               '50%': { opacity: '1' } },
        pop:         { '0%': { transform: 'scale(0.5)', opacity:'0' }, '100%': { transform: 'scale(1)', opacity:'1' } },
        slideUp:     { '0%': { transform: 'translateY(20px)', opacity:'0' }, '100%': { transform: 'translateY(0)', opacity:'1' } },
        shake:       { '0%,100%': { transform:'translateX(0)' }, '20%,60%': { transform:'translateX(-6px)' }, '40%,80%': { transform:'translateX(6px)' } },
        burst:       { '0%': { transform:'translate(0,0) scale(0)', opacity:'1' }, '100%': { transform:'translate(var(--bx), var(--by)) scale(1.4)', opacity:'0' } },
        screenShake: { '0%,100%': { transform:'translate(0,0)' }, '25%': { transform:'translate(-4px,2px)' }, '50%': { transform:'translate(4px,-2px)' }, '75%': { transform:'translate(-2px,-2px)' } },
        bannerIn:    { '0%': { transform:'translateY(-80px) scale(0.7)', opacity:'0' }, '60%': { transform:'translateY(10px) scale(1.05)', opacity:'1' }, '100%': { transform:'translateY(0) scale(1)', opacity:'1' } },
        rankUp:      { '0%': { transform:'scale(0) rotate(-15deg)', opacity:'0' }, '30%': { transform:'scale(1.15) rotate(3deg)', opacity:'1' }, '60%': { transform:'scale(0.95) rotate(-2deg)', opacity:'1' }, '100%': { transform:'scale(1) rotate(0)', opacity:'1' } },
        heartbeat:   { '0%,100%': { transform:'scale(1)' }, '50%': { transform:'scale(1.06)' } },
        bounceIn:    { '0%': { transform:'scale(0.3)', opacity:'0' }, '60%': { transform:'scale(1.1)' }, '100%': { transform:'scale(1)', opacity:'1' } },
      },
    },
  },
  plugins: [],
};
