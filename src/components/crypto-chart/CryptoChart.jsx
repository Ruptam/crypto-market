import { Box, Button, ButtonGroup, CircularProgress, FormControl, InputLabel, MenuItem, Select, Slider } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import CurrencyContext from '../../context/CurrencyContext';
import { theme } from '../../theme';
import { useTheme } from '@emotion/react';


const CryptoChart = () => {

  const [ xAxisData, setXAxisData ] = useState([]);

  const [ yAxisData, setYAxisData ] = useState([]);

  const [ numOfDays, setNumOfdays ] = useState(1);

  const [ chartType, setChartType ] = useState('line');

  const { currency } = useContext(CurrencyContext);

  const selectChartType = (event) => {
    setChartType(event.target.value);
  }

  const lineChart = () => {
    return (
      <Line
          datasetIdKey='id'
          data={{
            pointStyle: false,
            labels: xAxisData,
            datasets: [
              {
                id: 1,
                label: '',
                data: yAxisData,
                borderColor: '#f04f03'
              }
            ],
          }}
          options={{
            elements: {
              point : {
                radius: 1
              }
            },
            scales: {
              x: {
                gridLines: {
                  color: '#f04f03', // Set the color of the x-axis grid lines
                },
                ticks: {
                  color: '#f04f03', // X-axis label color
                },
              },
              y: {
                gridLines: {
                  color: '#f04f03', // Set the color of the x-axis grid lines
                },
                ticks: {
                  color: '#f04f03', // Y-axis label color
                },
              },
            },
            backgroundColor: 'black'
          }}
        />
    )
  }

  const barChart = () => {
    return (
      <Bar
          data={{
            pointStyle: false,
            labels: xAxisData,
            datasets: [
              {
                id: 1,
                label: '',
                data: yAxisData,
                backgroundColor: '#f04f03'
              }
            ],
          }}
          options={{
            scales: {
              x: {
                ticks: {
                  color: '#f04f03', // X-axis label color
                },
              },
              y: {
                ticks: {
                  color: '#f04f03', // Y-axis label color
                },
              },
            },
            backgroundColor: 'black'
          }}
        />
    )
  }

  const showCircularProgress = () => {
    return (
      <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <CircularProgress />
      </Box>
      
    )
  }

  const formatData = (data) => {
    const formattedTimeArray = [];
    const formattedPriceArray = [];
    if (numOfDays === 1) {
      data.prices.map(d => {
        const date = new Date(d[0]);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedTime = `${formattedHours}:${formattedMinutes}`;
        formattedTimeArray.push(formattedTime);
        setXAxisData(formattedTimeArray);

        formattedPriceArray.push(d[1]);

        setYAxisData(formattedPriceArray);
        return;
      })
    } else if (numOfDays === 7 || numOfDays === 15 || numOfDays === 30) {
        data.prices.map(d => {
          const date = new Date(d[0]);
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // Months are zero-based, so add 1
          const day = date.getDate();
          const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
          formattedTimeArray.push(formattedDate);
          setXAxisData(formattedTimeArray);

          formattedPriceArray.push(d[1]);

          setYAxisData(formattedPriceArray);
          return;
        })
    } 
  }



  useEffect(() => {
    const cartDataUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${numOfDays}&precision=2`;
    fetch(cartDataUrl)
      .then(res => res.json())
      .then(data => {
        formatData(data)
      })
  
  }, [numOfDays, currency]);

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Chart Type</InputLabel>
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
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={chartType}
            onChange={ selectChartType }
            label="Chart Type"
          >
            <MenuItem value={'line'}>Line</MenuItem>
            <MenuItem value={'bar'}>Bar</MenuItem>
          </Select>
        </FormControl>
      </Box>

      
      <Box sx={{ height: '90%', width: '100%' }}>
        {
          xAxisData.length === 0 && yAxisData.length === 0 ? showCircularProgress() : 
          chartType === 'line' ?  lineChart() : barChart()
        }
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <ButtonGroup variant="text" aria-label="text button group" color='appSecondary'>
          <Button onClick={ () => { setNumOfdays(1) } }>1 Day</Button>
          <Button onClick={ () => { setNumOfdays(7) } }>7 Days</Button>
          <Button onClick={ () => { setNumOfdays(15) } }>15 Days</Button>
          <Button onClick={ () => { setNumOfdays(30) } }>30 Days</Button>
        </ButtonGroup>
      </Box>
    </>
  )
}

export default CryptoChart