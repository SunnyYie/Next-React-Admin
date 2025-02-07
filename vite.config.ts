import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // 配置别名
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, 'src'),
    },
  },
})
