import React, { useState } from 'react';
import {
  totalSongsPlayed,
  uniqueSongsPlayed,
  uniqueArtistsPlayed,
  totalMinutesPlayed,
  mostPlayedSong,
  dailyAverageTime,
  mostActiveHours,
  mostActiveSeason,
} from '../functions';

const GeneralQuestions = ({ data }) => {
  const questions = {
     '1': { label: 'Total de Músicas Tocadas', func: totalSongsPlayed },
     '2': { label: 'Músicas Diferentes', func: uniqueSongsPlayed },
     '3': { label: 'Artistas Diferentes', func: uniqueArtistsPlayed },
     '4': { label: 'Total de Minutos Ouvidos', func: totalMinutesPlayed },
     '5': { label: 'Música Mais Ouvida', func: mostPlayedSong },
     '6': { label: 'Média de Tempo Diário', func: dailyAverageTime },
     '7': { label: 'Horários Mais Ativos', func: mostActiveHours },
     '8': { label: 'Estação Mais Ativa', func: mostActiveSeason },
      '9': { label: 'Top 5 Músicas por Estação', func: topSongsBySeason },
      '10': { label: 'Top 3 Artistas por Estação', func: topArtistsBySeason },
      '11': { label: 'Top 100 Artistas por Plays', func: top100ArtistsByPlays },
      '12': { label: 'Top 100 Músicas por Play Time', func: top100SongsByPlayTime },
   };
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [result, setResult] = useState('');


  const handleSelection = (e) => {
    const key = e.target.value;
    setSelectedQuestion(key);
    if (key && questions[key]) {
      const resultValue = questions[key].func(data);
      setResult(resultValue);
    }
  };
  

  return (
    <div className="questions">
      <h2>Perguntas Gerais</h2>
      <select onChange={handleSelection} value={selectedQuestion}>
        <option value="">Selecione uma pergunta</option>
        {Object.entries(questions).map(([key, { label }]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      {result && (
        <div className="result">
          {typeof result === 'object' ? (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          ) : (
            <p>{result}</p>
          )}
        </div>
      )}
    </div>
  );
};
// Função para calcular a porcentagem de plays por artista
export const artistPlayPercentage = (data) => {
  const totalPlays = data.length;
  const artistCounts = {};

  data.forEach((item) => {
    const artist = item.master_metadata_album_artist_name;
    if (artist) {
      artistCounts[artist] = (artistCounts[artist] || 0) + 1;
    }
  });

  const artistPercentages = Object.entries(artistCounts).map(([artist, count]) => ({
    artist,
    percentage: ((count / totalPlays) * 100).toFixed(2) + '%',
  }));

  return artistPercentages.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
};

// Função para listar as top 20 músicas ordenadas por tempo de reprodução
export const top20SongsByPlayTime = (data) => {
  const songDurations = {};

  data.forEach((item) => {
    const song = item.master_metadata_track_name;
    if (song) {
      songDurations[song] = (songDurations[song] || 0) + item.ms_played;
    }
  });

  return Object.entries(songDurations)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([song, duration]) => ({
      song,
      duration: (duration / 60000).toFixed(2) + ' minutos',
    }));
};

// Função para verificar a posição de um artista no ranking
export const artistRanking = (data, artistName) => {
  const artistCounts = {};

  data.forEach((item) => {
    const artist = item.master_metadata_album_artist_name;
    if (artist) {
      artistCounts[artist] = (artistCounts[artist] || 0) + 1;
    }
  });

  const sortedArtists = Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([artist]) => artist);

  const position = sortedArtists.indexOf(artistName) + 1; // Adiciona 1 porque o índice começa em 0
  return position > 0 ? `#${position}` : `${artistName} não está no top 100.`;
};

// Função para verificar em qual estação o artista é mais ativo
export const artistMostActiveSeason = (data, artistName) => {
  const seasonMap = { winter: [12, 1, 2], spring: [3, 4, 5], summer: [6, 7, 8], fall: [9, 10, 11] };
  const seasonCounts = { winter: 0, spring: 0, summer: 0, fall: 0 };

  data.forEach((item) => {
    const artist = item.master_metadata_album_artist_name;
    if (artist === artistName) {
      const month = new Date(item.ts).getMonth() + 1;
      for (const [season, months] of Object.entries(seasonMap)) {
        if (months.includes(month)) {
          seasonCounts[season]++;
          break;
        }
      }
    }
  });

  const mostActiveSeason = Object.entries(seasonCounts).sort((a, b) => b[1] - a[1])[0];
  return mostActiveSeason ? `${mostActiveSeason[0]} (${mostActiveSeason[1]} vezes)` : `${artistName} não tem plays registrados por estação.`;
};

export default GeneralQuestions;
