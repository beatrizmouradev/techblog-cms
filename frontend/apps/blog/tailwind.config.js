/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        'rebounce': 'rebounce 1s infinite',
      },
      keyframes: {
        rebounce: {
          '0%, 100%': { 
            'transform': 'translateX(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': { 
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
          },
        }
      }
    },
  },
  plugins: [],
}

