import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If your project uses React, keep react() in the plugins array.
// If not using React, remove react() and replace with the plugin for your framework or omit entirely.
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  }
})
