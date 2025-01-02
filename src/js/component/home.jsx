import React, { useState, useEffect } from "react";
import GeneralQuestions, { questions } from "./GeneralQuestions";
import ArtistQuestions from "./ArtistQuestions";
import spotifyData from "../../data/spotify_data_history.json";
import Card from "../component/card";
import CardTops from "../component/cardTops";
import NavTab from "../component/navtab"
import {
  totalSongsPlayed,
  uniqueSongsPlayed,
  uniqueArtistsPlayed,
  totalMinutesPlayed,
  mostPlayedSong,
  dailyAverageTime,
  mostActiveHours,
  mostActiveSeason,
  topSongsBySeason,
  topArtistsBySeason,
  top100ArtistsByPlays,
  top100SongsByPlayTime,
} from "../functions";

const Home = () => {
  const [currentPage, setCurrentPage] = useState("general");
  const [data, setData] = useState([]);
  const [state, setState] = useState(false);
  const questions = [
    { label: "Total de Músicas Tocadas", func: totalSongsPlayed },
    { label: "Músicas Diferentes", func: uniqueSongsPlayed },
    { label: "Artistas Diferentes", func: uniqueArtistsPlayed },
    { label: "Total de Minutos Ouvidos", func: totalMinutesPlayed },
    { label: "Música Mais Ouvida", func: mostPlayedSong },
    { label: "Média de Tempo Diário", func: dailyAverageTime },
    { label: "Horários Mais Ativos", func: mostActiveHours },
    { label: "Estação Mais Ativa", func: mostActiveSeason },
  ];

  useEffect(() => {
    setData(spotifyData);
  }, []);

  return (
    <div> 
      <div className="navigation">
        <button
          className={currentPage === "general" ? "active" : ""}
          onClick={() => setCurrentPage("general")}
        >
          General Questions
        </button>
        <button
          className={currentPage === "artist" ? "active" : ""}
          onClick={() => setCurrentPage("artist")}
        >
          Artist
        </button>
        <button
          className={currentPage === "tops" ? "active" : ""}
          onClick={() => setCurrentPage("tops")}
        >
          Tops
        </button>
      </div>
      <NavTab/>
      <div className="page-content">
        {/* {currentPage === "general" && <GeneralQuestions data={data} />} */}
        {currentPage === "artist" && <ArtistQuestions data={data} />}
      </div>
      

      {setCurrentPage && (
        <div>
          {questions.map((q) => (
            <Card
              initialText={q.label}
              overlayText={<div>{JSON.stringify(q.func(data))}</div>}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
