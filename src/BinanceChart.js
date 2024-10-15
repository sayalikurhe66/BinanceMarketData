import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// Helper function to get WebSocket URL
const getWebSocketURL = (symbol, interval) => wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval};

const BinanceChart = () => {
  const [selectedCoin, setSelectedCoin] = useState('ethusdt');
  const [interval, setInterval] = useState('1m');
  const [chartData, setChartData] = useState([]);
  const ws = useRef(null);

  // Load initial data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(selectedCoin));
    if (savedData) {
      setChartData(savedData);
    }
  }, [selectedCoin]);

  // WebSocket connection management
  useEffect(() => {
    if (ws.current) ws.current.close();

    const url = getWebSocketURL(selectedCoin, interval);
    ws.current = new WebSocket(url);

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const candlestick = message.k;
      if (candlestick.x) {
        setChartData((prev) => {
          const newData = [
            ...prev,
            {
              time: candlestick.t,
              open: parseFloat(candlestick.o),
              high: parseFloat(candlestick.h),
              low: parseFloat(candlestick.l),
              close: parseFloat(candlestick.c),
            },
          ];
          // Save data in localStorage
          localStorage.setItem(selectedCoin, JSON.stringify(newData));
          return newData;
        });
      }
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [selectedCoin, interval]);

  // Handle coin selection
  const handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
    setChartData([]);
  };

  // Handle interval selection
  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
    setChartData([]);
  };

  // Prepare chart data for Chart.js
  const chartDataFormatted = {
    labels: chartData.map((data) => new Date(data.time).toLocaleTimeString()),
    datasets: [
      {
        label: ${selectedCoin.toUpperCase()} ${interval},
        data: chartData.map((data) => data.close),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Binance Market Data</h2>
      <div>
        <select onChange={handleCoinChange} value={selectedCoin}>
          <option value="ethusdt">ETH/USDT</option>
          <option value="bnbusdt">BNB/USDT</option>
          <option value="dotusdt">DOT/USDT</option>
        </select>
        <select onChange={handleIntervalChange} value={interval}>
          <option value="1m">1 Minute</option>
          <option value="3m">3 Minutes</option>
          <option value="5m">5 Minutes</option>
        </select>
      </div>
      <Line data={chartDataFormatted} />
    </div>
  );
};

export default BinanceChart;