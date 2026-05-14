import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Repo subpath on GitHub Pages — produces correct asset URLs in the build output.
  base: '/compound-interest-calculator/',
})
