import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import github from '@astrojs/github-pages';

// https://astro.build/config
export default defineConfig({
  site: 'https://roblohmann.github.io',
  integrations: [mdx(), tailwind(), github()],
  output: 'static',
  adapter: github(),
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
