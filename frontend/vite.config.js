import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // asegúrate que los assets se sirvan desde raíz
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
