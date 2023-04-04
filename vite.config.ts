import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve('./src') 
    }
  },
  server:{
    host: '0.0.0.0',
    port: 8080,
    proxy:{
      '/api': {
        target: 'http://localhost:8081/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
