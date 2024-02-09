import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'Text': '#dde5f0',
        'background': '#080b10',
        'primary': '#a0b4d4',
        'secondary': '#683574',
        'accent': '#b965ac',
        'white': 'rgb (255, 255, 255)',
        'searchBg': 'hsl(269, 47%, 34%, 40%)',
        'searchbr': 'hsl(269, 47%, 34%, 50%)',
        'searchBox': 'hsl(236, 47%, 74%)',
        'scrollButton': 'hsl(269, 47%, 34%, 30%)',
      },
      extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        '14': 'repeat(14, minmax(0, 1fr))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
export default config
