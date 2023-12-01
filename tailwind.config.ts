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
        'Text': '#D5EEFC',
        'background': '#010A0E',
        'primary': '#129AE2',
        'secondary': '#052D42',
        'accent': '#26A8ED',
        'white': 'rgb (255, 255, 255)'
      },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
export default config
