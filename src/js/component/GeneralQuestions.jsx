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
  '11': { label: 'Top 100 Artistas por Plays', func: top100ArtistsByPlays, hasFilter: true },
  '12': { label: 'Top 100 Músicas por Play Time', func: top100SongsByPlayTime, hasFilter: true },
  '13': { label: 'Top 20 Músicas de um Artista', func: top20SongsByArtist, hasFilter: true },
};

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
  const [selectedPeriod, setSelectedPeriod] = useState('all-time'); // Filtro de período
  const [artistName, setArtistName] = useState(''); // Nome do artista
  const [result, setResult] = useState('');

  // Define a data fixa como 19 de dezembro de 2023
  const currentDate = '2023-12-19T00:00:00Z';

  const handleSelection = (e) => {
    setSelectedQuestion(e.target.value);
    setResult('');
  };

  const handleSearch = () => {
    const question = questions[selectedQuestion];
    if (!question) return;

    if (selectedQuestion === '13' && !artistName.trim()) {
      alert('Por favor, insira o nome do artista.');
      return;
    }

    const resultValue =
      question.hasFilter && selectedQuestion === '13'
        ? question.func(data, artistName, selectedPeriod, currentDate)
        : question.hasFilter
        ? question.func(data, selectedPeriod, currentDate)
        : question.func(data);

    setResult(resultValue);
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

      {selectedQuestion === '13' && (
        <input
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder="Digite o nome do artista"
        />
      )}

      {questions[selectedQuestion]?.hasFilter && (
        <select onChange={(e) => setSelectedPeriod(e.target.value)} value={selectedPeriod}>
          <option value="4-weeks">Nas últimas 4 semanas</option>
          <option value="6-months">Nos últimos 6 meses</option>
          <option value="1-year">No último ano</option>
          <option value="all-time">Desde sempre</option>
        </select>
      )}

      <button onClick={handleSearch}>Pesquisar</button>

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

export default GeneralQuestions;
