import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // if you need to serve your pngs or manifest from /public, Vite does this by default
})
