/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0078D4',      // Azure Blue
        secondary: '#14B8A6',    // Teal/Cyan
        accent: '#1E3A8A',       // Deep Blue
        dark: '#1F2937',         // Dark Gray
      },
    },
  },
  plugins: [],
}
