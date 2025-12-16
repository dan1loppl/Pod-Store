import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        card: 'var(--card)',
        accent: 'var(--accent)',
        'accent-glow': 'var(--accentGlow)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
      },
      backgroundColor: {
        background: 'var(--bg)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px var(--accentGlow)',
        'glow-lg': '0 0 40px var(--accentGlow)',
        'glow-secondary': '0 0 20px var(--secondary)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px var(--accentGlow)' },
          '50%': { boxShadow: '0 0 40px var(--accent)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionDuration: {
        DEFAULT: 'var(--transition-duration)',
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--transition-ease)',
      },
    },
  },
  plugins: [],
};

export default config;
