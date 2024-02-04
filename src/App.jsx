import { useContext, useState } from 'react'
import './App.css'
import Header from './components/Header'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'
import { dTheme } from './theme'
import CurrencyContextProvider from './context/CurrencyContextProvider'
import { Box, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import ThemeContext from './context/ThemeContext'

function App() {

  const { darkTheme } = useContext(ThemeContext);

  return (
    <>
      <ThemeProvider theme={darkTheme == true ? dTheme : theme}>
        <CssBaseline />
        <CurrencyContextProvider>
          <Header />
          <Box sx={{ height: '90vh', backgroundColor: (theme) => theme.palette.appPrimary.main }}>
            <Outlet />
          </Box>
        </CurrencyContextProvider>
      </ThemeProvider>
    </>
  )
}

export default App
