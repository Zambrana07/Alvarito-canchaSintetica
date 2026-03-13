import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Para GitHub Pages: base = nombre del repo (la URL será usuario.github.io/repo-name/)
// En local BASE_PATH no existe y se usa '/' por defecto
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH ? `/${process.env.BASE_PATH}/` : '/',
})
