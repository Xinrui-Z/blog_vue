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
        target: 'http://124.223.175.150:8855/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  build: {
    rollupOptions: {
      external: ['vue', 'element-plus', 'vue-demi', 'pinia','vue-router'],
      plugins: [
        externalGlobals({
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          "vue-demi": 'VueDemi',
          pinia: 'Pinia',
          'vue-router': 'VueRouter',

        }),
      ],
    }
  }
})
