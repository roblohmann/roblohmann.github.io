/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',      // Bright blue
        secondary: '#8b5cf6',    // Purple
        accent: '#10b981',       // Green
        dark: '#1e293b',         // Dark slate
      },
    },
  },
  plugins: [],
}
