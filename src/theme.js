import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        common: {
            black: '#b7190f',
            white: '#c3d3d1'
        },
        primary: {
            main: '#1c1919',
            light: '#9d92f0',
            dark: '#bc4a3c'
        },
        secondary: {
            main: '#faf6f6',
        },
        col: {
            main: '#a53662'
        }
    }
})

export const selectTheme = createTheme({
    components: {
      MuiSelect: {
        styleOverrides: {
          // Customize the Select styles here
          // For example:
          root: {
            backgroundColor: 'transparent',
          },
          icon: {
            color: 'darkblue',
          },
          
        },
      },
    },
  });