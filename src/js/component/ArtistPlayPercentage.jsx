import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { artistPlayPercentage } from '../functions';

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ArtistPlayPercentage = ({ data }) => {
  const artistData = artistPlayPercentage(data);

  const chartData = {
    labels: artistData.map((item) => item.artist),
    datasets: [
      {
        label: 'Porcentagem de Plays (%)',
        data: artistData.map((item) => parseFloat(item.percentage)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.toFixed(2)}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Porcentagem',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Artistas',
        },
      },
    },
  };

  return (
    <div>
      <h2>Top 10 Artistas por Porcentagem de Plays</h2>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ArtistPlayPercentage;
