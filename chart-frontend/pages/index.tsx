// Import components
import { useEffect, useState, useRef, CSSProperties } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { createChart, IChartApi } from 'lightweight-charts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  Filler,
  PointElement,
} from 'chart.js';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  Filler,
  PointElement
);

// Establish Dashboard
const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Line Chart',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  });

  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Bar Chart',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Pie Chart',
        data: [],
        backgroundColor: ['red', 'blue', 'yellow'],
      },
    ],
  });

  const [candlestickData, setCandlestickData] = useState([]);

  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Fetch data from API
  useEffect(() => {
    axios.get('http://localhost:8000/api/line-chart-data/').then((response) => {
      setLineChartData({
        labels: response.data.labels,
        datasets: [
          {
            label: 'Line Chart',
            data: response.data.data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
          },
        ],
      });
    });

    axios.get('http://localhost:8000/api/bar-chart-data/').then((response) => {
      setBarChartData({
        labels: response.data.labels,
        datasets: [
          {
            label: 'Bar Chart',
            data: response.data.data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      });
    });

    axios.get('http://localhost:8000/api/pie-chart-data/').then((response) => {
      setPieChartData({
        labels: response.data.labels,
        datasets: [
          {
            label: 'Pie Chart',
            data: response.data.data,
            backgroundColor: ['red', 'blue', 'yellow'],
          },
        ],
      });
    });

    axios.get('http://localhost:8000/api/candlestick-chart-data/').then((response) => {
      setCandlestickData(response.data.data); // Ensure this is the correct format
    });
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current || !candlestickData.length) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: {
          color: '#ffffff',
        },
        textColor: '#000000',
      },
      grid: {
        vertLines: {
          color: '#eeeeee',
        },
        horzLines: {
          color: '#eeeeee',
        },
      },
    });

    chart.addCandlestickSeries({
      upColor: 'rgb(0,204,255)',
      borderUpColor: 'rgb(0,204,255)',
      wickUpColor: 'rgb(0,204,255)',
      borderDownColor: 'rgb(255,83,85)',
      wickDownColor: 'rgb(255,83,85)',
    }).setData(candlestickData);

    return () => chart.remove();
  }, [candlestickData]);

  // Define styles with CSSProperties
  const containerStyle: CSSProperties = {
    background: 'linear-gradient(to right, #ffffff, #f0f0f0)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px',
  };

  const chartContainerStyle: CSSProperties = {
    width: '80%',
    maxWidth: '800px',
    height: '400px',
    marginBottom: '40px',
  };

  return (
    <div style={containerStyle}>
      <h1>Dashboard</h1>

      {/* Line Chart */}
      <div style={chartContainerStyle}>
        <h2 style={{ marginBottom: '20px' }}>Line Chart</h2> {/* Added margin-bottom */}
        <Line data={lineChartData} />
      </div>

      {/* Bar Chart */}
      <div style={chartContainerStyle}>
        <h2 style={{ marginBottom: '20px' }}>Bar Chart</h2> {/* Added margin-bottom */}
        <Bar data={barChartData} />
      </div>

      {/* Pie Chart */}
      <div style={chartContainerStyle}>
        <h2 style={{ marginBottom: '20px' }}>Pie Chart</h2> {/* Added margin-bottom */}
        <Pie data={pieChartData} />
      </div>

      {/* Candlestick Chart */}
      <div style={chartContainerStyle}>
        <h2 style={{ marginBottom: '20px' }}>Candlestick Chart</h2> {/* Added margin-bottom */}
        <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default Dashboard;
