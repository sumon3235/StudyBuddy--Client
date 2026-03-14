import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/routes.jsx'
import AuthProvider from './Providers/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
       <Toaster position="top-right-corner" />
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
