import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { artistPlayPercentage } from '../functions';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const ArtistPlayPercentage = ({ data }) => {
  const artistData = artistPlayPercentage(data);

  const chartData = {
    labels: artistData.slice(0, 10).map((item) => item.artist), // Top 10 artists
    datasets: [
      {
        label: 'Porcentagem de Plays (%)',
        data: artistData.slice(0, 10).map((item) => parseFloat(item.percentage)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(201, 203, 207, 0.6)',
          'rgba(100, 149, 237, 0.6)',
          'rgba(255, 140, 0, 0.6)',
          'rgba(144, 238, 144, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(201, 203, 207, 1)',
          'rgba(100, 149, 237, 1)',
          'rgba(255, 140, 0, 1)',
          'rgba(144, 238, 144, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.toFixed(2)}%`,
        },
      },
    },
  };

  return (
    <div>
      <h2>Top 10 Artistas por Porcentagem de Plays</h2>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ArtistPlayPercentage;
