import { AppBar, Box, FormControl, InputLabel, MenuItem, Select, Switch, Toolbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import CurrencyContext from '../context/CurrencyContext';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ThemeContext from '../context/ThemeContext';

const Header = () => {

    const navigate = useNavigate();
    const { currency, setCurrency } = useContext(CurrencyContext);

    const { darkTheme, setDarkTheme } = useContext(ThemeContext);

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='appPrimary'>
                    <Toolbar color='customPrimary'>
                        <Typography 
                            variant="h4" 
                            component="div" 
                            sx={{ flexGrow: 1, color: (theme) => theme.palette.appSecondary.main }} onClick={ () => {navigate('/')} }
                            color="appSecondary"
                        >
                            CRYPTO MARKET
                        </Typography>

                        <Box sx={{ m: 1, minWidth: 120, color: 'white' }}>
                            <FormControl fullWidth sx={{ color: 'white' }}>
                                <InputLabel sx={{ color: (theme) => theme.palette.appSecondary.main }} id="demo-simple-select-label">Currency</InputLabel>
                                <Select
                                    sx={{
                                        color: (theme) => theme.palette.appSecondary.main,
                                        '.MuiOutlinedInput-notchedOutline': {
                                          borderColor: (theme) => theme.palette.appSecondary.main,
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                          borderColor: (theme) => theme.palette.appSecondary.main,
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                          borderColor: (theme) => theme.palette.appSecondary.main,
                                        },
                                        '.MuiSvgIcon-root ': {
                                          fill: (theme) => theme.palette.appSecondary.main,
                                        }
                                      }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currency}
                                    label="Currency"
                                    variant='outlined'
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'INR'}>INR</MenuItem>
                                    <MenuItem value={'USD'}>USD</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    <Switch defaultChecked onChange={ () => setDarkTheme(!darkTheme) } />

                    </Toolbar>
                </AppBar>
            </Box>
        
    )
}

export default Header