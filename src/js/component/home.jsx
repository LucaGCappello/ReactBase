import React, { useState, useEffect } from 'react';
import GeneralQuestions from './GeneralQuestions';
import ArtistQuestions from './ArtistQuestions';
import spotifyData from '../../data/spotify_data_history.json';

const Home = () => {
  const [currentPage, setCurrentPage] = useState('general');
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(spotifyData);
  }, []);

  return (
    <div>
      <div className="navigation">
        <button
          className={currentPage === 'general' ? 'active' : ''}
          onClick={() => setCurrentPage('general')}
        >
          General Questions
        </button>
        <button
          className={currentPage === 'artist' ? 'active' : ''}
          onClick={() => setCurrentPage('artist')}
        >
          Artist Questions
        </button>
      </div>
      <div className="page-content">
        {currentPage === 'general' && <GeneralQuestions data={data} />}
        {currentPage === 'artist' && <ArtistQuestions data={data} />}
      </div>
    </div>
  );
};

export default Home;
