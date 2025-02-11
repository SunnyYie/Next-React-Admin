import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { StrictMode, Suspense } from 'react'
import App from './App.tsx'
import './index.css'

// 修复 antd 5 的兼容性问题
import '@ant-design/v5-patch-for-react-19'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Suspense>
        <App />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
)
