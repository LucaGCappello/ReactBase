import React, { useState } from 'react';
import { artistPlayPercentage, artistSpecificPercentage } from '../functions';

const ArtistPlayPercentage = ({ data }) => {
  const [topArtists, setTopArtists] = useState(artistPlayPercentage(data)); // 10 primeiros artistas
  const [newArtist, setNewArtist] = useState(''); // Nome do artista para pesquisa
  const [newArtistResult, setNewArtistResult] = useState(''); // Resultado da pesquisa do novo artista

  const handleSearchArtist = () => {
    if (!newArtist.trim()) {
      alert('Por favor, insira o nome de um artista.');
      return;
    }

    const result = artistSpecificPercentage(data, newArtist);
    setNewArtistResult(result);
  };

  const handleAddArtist = () => {
    if (!newArtist.trim()) {
      alert('Por favor, insira o nome de um artista.');
      return;
    }

    const result = artistSpecificPercentage(data, newArtist);
    if (!result.includes('não possui plays registrados')) {
      const percentage = result.split(': ')[1];
      setTopArtists([...topArtists, { artist: newArtist, percentage }]);
    } else {
      alert(result);
    }
  };

  return (
    <div className="artist-percentage">
      <h2>Top 10 Artistas por Porcentagem</h2>
      <ul>
        {topArtists.map((item, index) => (
          <li key={index}>
            {index + 1}. {item.artist}: {item.percentage}
          </li>
        ))}
      </ul>

      <div className="search-section">
        <input
          type="text"
          value={newArtist}
          onChange={(e) => setNewArtist(e.target.value)}
          placeholder="Digite o nome do artista"
        />
        <button onClick={handleSearchArtist}>Pesquisar</button>
      </div>

      {newArtistResult && (
        <div className="result-section">
          <p>
            <strong>Resultado:</strong> {newArtistResult}
          </p>
          <button onClick={handleAddArtist}>Adicionar Artista</button>
        </div>
      )}
    </div>
  );
};

export default ArtistPlayPercentage;
