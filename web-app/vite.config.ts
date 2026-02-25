import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use relative base for production (GitHub Pages) and root for dev
  base: command === 'build' ? '/acko-clone/' : '/',
}))
