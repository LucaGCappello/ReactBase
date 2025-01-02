import React, { useState } from 'react';
import ArtistPlayPercentage from './ArtistPlayPercentage';
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
  const [showChart, setShowChart] = useState(false); // Controla a exibição do gráfico

  const questions = {
    '1': { label: 'Total de Plays por Artista', func: totalPlaysByArtist },
    '2': { label: 'Músicas Diferentes por Artista', func: uniqueSongsByArtist },
    '3': { label: 'Minutos Ouvidos por Artista', func: totalMinutesByArtist },
    '4': { label: 'Top 20 Músicas por Tempo (Artista)', func: top20SongsByArtist },
    '5': { label: 'Ranking do Artista', func: artistRanking },
    '6': { label: 'Estação Mais Ativa do Artista', func: artistMostActiveSeason },
    '7': { label: 'Porcentagem de Plays por Artista (Gráfico)' },
  };

  const handleSearch = () => {
    if (!artistName.trim() && selectedQuestion !== '7') {
      alert('Por favor, insira o nome de um artista.');
      return;
    }

    if (selectedQuestion === '7') {
      setShowChart(true); // Exibe o gráfico
    } else if (questions[selectedQuestion].func) {
      const resultValue = questions[selectedQuestion].func(data, artistName);
      setResult(resultValue);
    }
  };

  const handleNewSearch = () => {
    setSelectedQuestion('');
    setArtistName('');
    setResult('');
  };

  if (showChart) {
    return (
      <ArtistPlayPercentage
        data={data}
        goBack={() => setShowChart(false)} // Função para voltar
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
          {selectedQuestion !== '7' && (
            <>
              <input
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="Digite o nome do artista"
              />
              <button onClick={handleSearch}>Pesquisar</button>
            </>
          )}
          {selectedQuestion === '7' && (
            <button onClick={handleSearch}>Exibir Gráfico</button>
          )}
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
