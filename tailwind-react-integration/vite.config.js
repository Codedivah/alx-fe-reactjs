import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you're using React, keep the plugin; if not, skip it
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  }
})
