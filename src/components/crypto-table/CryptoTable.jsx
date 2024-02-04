import { Box, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import CurrencyContext from '../../context/CurrencyContext';
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
// const commaNumber = require('comma-number')


const CryptoTable = () => {

    const navigate = useNavigate();
    const { currency } = useContext(CurrencyContext);
    const { darkTheme } = useContext(ThemeContext);
    const [coins, setCoins] = useState([]);
    const [perPageCoins, setPerPageCoins] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        console.log(event);
        setPage(newPage);
        const startIndex = rowsPerPage * newPage;
        const endIndex = startIndex + rowsPerPage;
        setPerPageCoins(coins.slice(startIndex, endIndex));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPerPageCoins(coins.slice(0, parseInt(event.target.value, 10)));
        setPage(0);
    };


    const showTableOrProgress = () => {
        if (coins.length > 0) {
            return (
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead  >
                        <TableRow sx={{ backgroundColor: (theme) => theme.palette.appSecondary.main }}>
                            <TableCell ></TableCell>
                            <TableCell sx={{ color: (theme) => theme.palette.tablePrimary.main }}>Name</TableCell>
                            <TableCell sx={{ color: (theme) => theme.palette.tablePrimary.main }}>Price ({currency})</TableCell>
                            <TableCell sx={{ color: (theme) => theme.palette.tablePrimary.main }}>Market Cap</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: (theme) => theme.palette.appSecondary.light }}>
                        {
                            perPageCoins.map(coin => (
                                <TableRow
                                    key={coin.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => {
                                        navigate('/crypto-detail', { state: { selectedCoin: coin } })
                                    }}
                                >
                                    <TableCell component="th" scope="row" align="right">
                                        <img src={coin.image} style={{ height: 30, width: 30 }} />
                                    </TableCell>

                                    <TableCell>
                                        {coin.name}
                                    </TableCell>
                                    <TableCell >
                                        {/* {currency === 'INR' ? <CurrencyRupeeIcon fontSize='small'/> : <AttachMoneyIcon fontSize='small'/> }  */}
                                        {coin.current_price.toLocaleString()}
                                    </TableCell>
                                    <TableCell >{coin.market_cap.toLocaleString()}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            )
        } else {
            return (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )
        }
    }

    const showPagination = () => {
        if(coins.length > 0) {
            return (
                <TablePagination
                    sx={{
                        color: '#f04f03'
                    }}
                    component="div"
                    count={100}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )
        }
    }

    useEffect(() => {

        const coinListUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`;
        fetch(coinListUrl).then(res => {
            return res.json();
        }).then(data => {
            const numOfPage = data.length / rowsPerPage;
            setCoins(data);
            setPerPageCoins(data.slice(0, rowsPerPage));
        }).catch(err => {
            console.error(err);
        })
    }, [currency]);

    return (
        
        <Box 
            sx={{ 
                width: '100%', 
                display: 'flex', 
                flexDirection:'column', 
                alignItems: 'center', 
                backgroundColor: (theme) => theme.palette.appPrimary.main,
                padding: '2%'
            }}
        >
            <TableContainer component={Paper} sx={{ width: '80%', padding: '2%', backgroundColor: (theme) => theme.palette.appPrimary.main }}>
                {
                    showTableOrProgress()
                }
                {
                    showPagination()
                }
                
            </TableContainer>
        </Box>
    )
}

export default CryptoTable