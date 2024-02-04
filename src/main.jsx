import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CssBaseline } from '@mui/material'
import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import CryptoDetail from './components/crypto-detail/CryptoDetail.jsx'
import CryptoTable from './components/crypto-table/CryptoTable.jsx'
import { ThemeContext } from '@emotion/react'
import ThemeContextProvider from './context/ThemeContextProvider.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <CryptoTable />
      },
      {
        path: '/crypto-detail',
        element: <CryptoDetail />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    
  //   <App />
  // </React.StrictMode>,
  <ThemeContextProvider>
    <RouterProvider router={router} />
  </ThemeContextProvider>
  
)
