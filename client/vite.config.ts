import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target:'https://socialboard-5eov.onrender.com/'
        changeOrigin: true,
      },
    },
  },
})
