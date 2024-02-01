import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'
import CryptoTable from './components/crypto-table/CryptoTable'
import CurrencyContextProvider from './context/CurrencyContextProvider'
import { Box, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <CssBaseline />
      <CurrencyContextProvider>
        <Header />
        <Box sx={{height: '100%'}}>
          {/* <CryptoTable /> */}
          <Outlet />
        </Box>
      </CurrencyContextProvider>
    </>
  )
}

export default App
