/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './themes/ab-theme/layouts/**/*.html',
    './layouts/**/*.html',
    './content/**/*.md',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      maxWidth: {
        prose: '720px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '720px',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
