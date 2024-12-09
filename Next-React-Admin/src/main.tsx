import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ClerkProvider } from '@clerk/clerk-react';
import { routeTree } from './routeTree.gen'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import "@arco-design/web-react/dist/css/arco.css";
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createRouter({ routeTree })

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <RouterProvider router={router} />
      </ClerkProvider>
    </StrictMode>,
  )
}