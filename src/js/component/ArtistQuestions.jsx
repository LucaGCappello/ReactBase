import React, { useState } from 'react';
import {
  totalPlaysByArtist,
  uniqueSongsByArtist,
  totalMinutesByArtist,
  top20SongsByArtist,
  artistRanking,
  artistMostActiveSeason,
} from '../functions';
import '../../styles/ArtistQuestions.css'


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
   '5': { label: 'Ranking do Artista', func: artistRanking },
    '6': { label: 'Estação Mais Ativa do Artista', func: artistMostActiveSeason },
    '7': { label: 'Porcentagem de Plays por Artista (Gráfico)', func: ArtistPlayPercentage }, 
  };

  const handleSearch = () => {
    if (!artistName.trim()) {
      alert('Por favor, insira o nome de um artista.');
      return;
    }

    if (selectedQuestion && questions[selectedQuestion].func) {
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
      {selectedQuestion === '7' ? (
        <ArtistPlayPercentage data={data} />
      ) : !result ? (
        <div className="search-section">
          <select onChange={(e) => setSelectedQuestion(e.target.value)} value={selectedQuestion}>
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
