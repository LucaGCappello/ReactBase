import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GeneralQuestions from './GeneralQuestions';
import ArtistQuestions from './ArtistQuestions';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/general">General Questions</Link>
          <Link to="/artist">Artist Questions</Link>
        </nav>
        <Routes>
          <Route path="/general" element={<GeneralQuestions />} />
          <Route path="/artist" element={<ArtistQuestions />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
