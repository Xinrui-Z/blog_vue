import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import externalGlobals from 'rollup-plugin-external-globals'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        // target: 'http://localhost:8855/api',
        target: 'http://122.9.33.79:8855/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  build: {
    rollupOptions: {
      external: ['vue', 'element-plus', 'pinia', 'vue-demi'],
      plugins: [
        externalGlobals({
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          pinia: 'Pinia',
          'vue-router': 'VueRouter',
          "vue-demi": "VueDemi"
        }),
      ],
    }
  }
})
