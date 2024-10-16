import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as Chartjs } from 'chart.js/auto';

// Ensure getWebSocketURL is correctly defined
const getWebSocketURL = (symbol, interval) => `wss://stream.binance.com:9443/ws/<symbol>@kline_<interval>`;

const BinanceChart = () => {
  const [selectedCoin, setSelectedCoin] = useState('ethusdt');
  const [interval, setInterval] = useState('1m');
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Price',
        data: [100, 200, 150, 300, 250, 400],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  });

  // useEffect(() => {
  //   // WebSocket logic here
  //   setChartData(["Dummy data"]);
  // }, [selectedCoin, interval]);

  return (
    <div>
      <h2>Binance Chart Component</h2>
      <Line data={chartData} />
    </div>
  );  
};

export default BinanceChart;
