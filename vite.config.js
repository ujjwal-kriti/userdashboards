import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use a relative base so the built site works both on GitHub Pages
  // (repo pages) and on hosts like Render. Relative ('./') ensures
  // asset links are resolved relative to the served HTML file.
  base: './',
  plugins: [react()],
})
