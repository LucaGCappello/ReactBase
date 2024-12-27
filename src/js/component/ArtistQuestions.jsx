import React, { useState } from 'react';
import {
  totalPlaysByArtist,
  uniqueSongsByArtist,
  totalMinutesByArtist,
  top20SongsByArtist,
  artistRanking,
  artistMostActiveSeason,
} from '../functions';

const ArtistQuestions = ({ data }) => {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [artistName, setArtistName] = useState('');
  const [result, setResult] = useState('');

  const questions = {
    '1': { label: 'Total de Plays por Artista', func: totalPlaysByArtist },
    '2': { label: 'Músicas Diferentes por Artista', func: uniqueSongsByArtist },
    '3': { label: 'Minutos Ouvidos por Artista', func: totalMinutesByArtist },
    '4': { label: 'Top 20 Músicas por Tempo (Artista)', func: top20SongsByArtist },
    '5': { label: 'Ranking do Artista', func: artistRanking },
    '6': { label: 'Estação Mais Ativa do Artista', func: artistMostActiveSeason },
  };

  const handleSearch = () => {
    if (!artistName.trim()) {
      alert('Por favor, insira o nome de um artista.');
      return;
    }

    if (selectedQuestion && questions[selectedQuestion]) {
      const resultValue = questions[selectedQuestion].func(data, artistName);
      setResult(resultValue);
    }
  };

  const handleNewSearch = () => {
    setSelectedQuestion('');
    setArtistName('');
    setResult('');
  };

  return (
    <div className="artist-questions">
      <h2>Perguntas sobre Artistas</h2>
      {!result ? (
        <div className="search-section">
          <select onChange={(e) => setSelectedQuestion(e.target.value)} value={selectedQuestion}>
            <option value="">Selecione uma pergunta</option>
            {Object.entries(questions).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            placeholder="Digite o nome do artista"
          />
          <button onClick={handleSearch}>Pesquisar</button>
        </div>
      ) : (
        <div className="result-section">
          <p>
            <strong>Resultado:</strong>
          </p>
          {typeof result === 'object' ? (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          ) : (
            <p>{result}</p>
          )}
          <button onClick={handleNewSearch}>Nova Pesquisa</button>
        </div>
      )}
    </div>
  );
};
// Calcula a porcentagem de plays de cada artista em relação ao total
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

  // Ordena pela porcentagem e retorna os 10 primeiros
  return artistPercentages.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage)).slice(0, 10);
};

// Retorna a porcentagem de plays para um artista específico
export const artistSpecificPercentage = (data, artistName) => {
  const totalPlays = data.length;
  const artistPlays = data.filter((item) => item.master_metadata_album_artist_name === artistName).length;

  if (artistPlays === 0) {
    return `${artistName} não possui plays registrados.`;
  }

  const percentage = ((artistPlays / totalPlays) * 100).toFixed(2);
  return `${artistName}: ${percentage}%`;
};

export default ArtistQuestions;
