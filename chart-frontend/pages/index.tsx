import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,  // Register category scale for Bar and Line charts
  LinearScale,    // Register linear scale for Line and Bar charts
  PointElement,   // For point elements on the Line chart
  LineElement,    // Line element for Line chart
  BarElement,     // Bar element for Bar chart
  ArcElement,     // Arc element for Pie or Doughnut chart
  Title,
  Tooltip,
  Legend
);

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
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Line Chart */}
      <div>
        <h2>Line Chart</h2>
        <Line data={lineChartData} />
      </div>

      {/* Bar Chart */}
      <div>
        <h2>Bar Chart</h2>
        <Bar data={barChartData} />
      </div>

      {/* Pie Chart */}
      <div>
        <h2>Pie Chart</h2>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default Dashboard;