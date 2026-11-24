import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// One HTML entry per page (written by scripts/make-pages.mjs), so every page has a real URL
// on GitHub Pages and its own title and description.
const pages = JSON.parse(readFileSync(resolve(import.meta.dirname, 'scripts/pages.json'), 'utf8'))

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((f) => [f.replace(/\/?index\.html$/, '') || 'home', resolve(import.meta.dirname, f)])),
    },
  },
})
