import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CryptoDescription from '../crypto-description/CryptoDescription';
import CryptoChart from '../crypto-chart/CryptoChart';
import { Box, Divider } from '@mui/material';

const CryptoDetail = () => {

  const location = useLocation();

  return (
    <>
      <Box sx={{ display: 'flex', backgroundColor: (theme) => theme.palette.appPrimary.main }}>
        <Box sx={{ width: '40%' }}>
          <CryptoDescription selectedCoin={location.state.selectedCoin}/>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box sx={{ width: '60%'}}>
          <CryptoChart />
        </Box>
      </Box>
    </>
  )
}

export default CryptoDetail