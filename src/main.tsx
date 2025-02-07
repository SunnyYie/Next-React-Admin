import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { StrictMode, Suspense } from 'react'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Suspense>
        <App />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
)
