import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Your existing React setup (KEEP THIS)
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    // New Tailwind v4 plugin
    tailwindcss(),
  ],
  // Required for GitHub Pages
  base: '/',
})