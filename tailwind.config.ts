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
        'searchbr': 'hsl(269, 47%, 34%, 50%)'
      },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
export default config
