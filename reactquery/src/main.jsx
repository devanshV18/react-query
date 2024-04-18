import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient() //new instance of react query

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {/* wrapping the app using QCP specifying that client is queryClient */}
    <QueryClientProvider client={queryClient}>  
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
