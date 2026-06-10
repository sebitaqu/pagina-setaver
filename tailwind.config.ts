import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sv-bg': '#F2F1EF',
        'sv-surface': '#E8E7E4',
        'sv-border': '#D4D3CF',
        'sv-stone': '#C4BFB8',
        'sv-text': '#1A1A1A',
        'sv-muted': '#6B6560',
        'sv-warm': '#F7F5F2',
        'sv-accent': '#1A1A1A',
        'sv-badge': '#C9A96E',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      aspectRatio: {
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [],
}

export default config
