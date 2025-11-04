import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Set the base path to the GitHub Pages repo name so built assets
  // are referenced from `/userdashboards/` instead of the site root.
  // Replace '/userdashboards/' with your repo name if different.
  base: '/userdashboards/',
  plugins: [react()],
})
