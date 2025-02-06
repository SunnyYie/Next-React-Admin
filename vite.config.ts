import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // 配置别名
  resolve: {
    alias: {
      '@/': '/src/',
    },
  },
})
