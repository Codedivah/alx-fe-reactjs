import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),    // keep only if using React
    tailwindcss() // now Tailwind is directly in vite.config.js
  ]
})
