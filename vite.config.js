import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  appType: 'spa',
  build: {
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2018',
  },
})
