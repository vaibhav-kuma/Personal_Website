import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00bfff', // electric cyan
        secondary: '#8a2be2', // purple
        success: '#50c878', // emerald green
        background: '#0a0a0a', // near-black
        surface: '#111111'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
export default config;
