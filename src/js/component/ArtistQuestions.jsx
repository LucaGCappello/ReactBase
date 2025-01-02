import React, { useState } from 'react';
import ArtistPlayPercentage from './ArtistPlayPercentage';
import {
  totalPlaysByArtist,
  uniqueSongsByArtist,
  totalMinutesByArtist,
  top20SongsByArtist,
  artistRanking,
  artistMostActiveSeason,
  top100ArtistsByPlays,
  top100SongsByPlayTime,
  top20SongsByPlayTime,
} from '../functions';

const ArtistQuestions = ({ data }) => {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [artistName, setArtistName] = useState('');
  const [timePeriod, setTimePeriod] = useState('all-time'); // Novo estado para período
  const [result, setResult] = useState('');
  const [showChart, setShowChart] = useState(false);

  const timeOptions = [
    { value: '4-weeks', label: 'Últimas 4 semanas' },
    { value: '6-months', label: 'Últimos 6 meses' },
    { value: '1-year', label: 'Último ano' },
    { value: 'all-time', label: 'Desde sempre' },
  ];

  const questions = {
    '1': { label: 'Total de Plays por Artista', func: totalPlaysByArtist },
    '2': { label: 'Músicas Diferentes por Artista', func: uniqueSongsByArtist },
    '3': { label: 'Minutos Ouvidos por Artista', func: totalMinutesByArtist },
    '4': { label: 'Top 20 Músicas por Tempo (Artista)', func: top20SongsByArtist },
    '5': { label: 'Ranking do Artista', func: artistRanking },
    '6': { label: 'Estação Mais Ativa do Artista', func: artistMostActiveSeason },
    '7': { label: 'Porcentagem de Plays por Artista (Gráfico)' },
    '8': { label: 'Top 100 Artistas por Plays', func: top100ArtistsByPlays },
    '9': { label: 'Top 100 Músicas por Tempo', func: top100SongsByPlayTime },
    '10': { label: 'Top 20 Músicas por Tempo', func: top20SongsByPlayTime },
  };

  const handleSearch = () => {
    if (!artistName.trim() && selectedQuestion !== '7' && !['8', '9', '10'].includes(selectedQuestion)) {
      alert('Por favor, insira o nome de um artista.');
      return;
    }

    if (selectedQuestion === '7') {
      setShowChart(true);
    } else if (questions[selectedQuestion].func) {
      const func = questions[selectedQuestion].func;
      const resultValue = ['8', '9', '10'].includes(selectedQuestion)
        ? func(data, timePeriod)
        : func(data, artistName);
      setResult(resultValue);
    }
  };

  const handleNewSearch = () => {
    setSelectedQuestion('');
    setArtistName('');
    setTimePeriod('all-time');
    setResult('');
  };

  if (showChart) {
    return (
      <ArtistPlayPercentage
        data={data}
        goBack={() => setShowChart(false)}
      />
    );
  }

  return (
    <div className="artist-questions">
      <h2>Perguntas sobre Artistas</h2>
      {!result ? (
        <div className="search-section">
          <select
            onChange={(e) => setSelectedQuestion(e.target.value)}
            value={selectedQuestion}
          >
            <option value="">Selecione uma pergunta</option>
            {Object.entries(questions).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          {['8', '9', '10'].includes(selectedQuestion) && (
            <select
              onChange={(e) => setTimePeriod(e.target.value)}
              value={timePeriod}
            >
              {timeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          )}
          {selectedQuestion !== '7' && !['8', '9', '10'].includes(selectedQuestion) && (
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Digite o nome do artista"
            />
          )}
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

export default ArtistQuestions;
