import { AppBar, Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import CurrencyContext from '../context/CurrencyContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const { currency, setCurrency } = useContext(CurrencyContext);

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={ () => {navigate('/')} }>
                            CRYPTO MARKET
                        </Typography>

                        <Box sx={{ m: 1, minWidth: 120, color: 'white' }}>
                            <FormControl fullWidth sx={{ color: 'white' }}>
                                <InputLabel sx={{ color: 'white' }} id="demo-simple-select-label">Currency</InputLabel>
                                <Select
                                    sx={{ color: 'white' }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currency}
                                    label="Currency"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'INR'}>INR</MenuItem>
                                    <MenuItem value={'USD'}>USD</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                    </Toolbar>
                </AppBar>
            </Box>
        
    )
}

export default Header