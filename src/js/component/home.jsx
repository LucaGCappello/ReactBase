import React, { useState, useEffect } from "react";
import GeneralQuestions, { questions } from "./GeneralQuestions";
import ArtistQuestions from "./ArtistQuestions";
import spotifyData from "../../data/spotify_data_history.json";
import Card from "../component/card";
import CardTops from "../component/cardTops";
import NavTab from "../component/navtab";
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
      <NavTab />
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
      <div className="page-content">
        {/* {currentPage === "general" && <GeneralQuestions data={data} />} */}
        {currentPage === "artist" && <ArtistQuestions data={data} />}
      </div>

      {currentPage === "general" ? (
        <div>
          {questions.map((q) => (
            <Card
              initialText={q.label}
              overlayText={<div>{JSON.stringify(q.func(data))}</div>}
            />
          ))}
        </div>
      ) : currentPage === "tops" ? (
        <div style={{ marginTop: "20px" }}>
          <CardTops
            initialText="Top 5 Músicas por Estação"
            overlayText={<div>{JSON.stringify(topSongsBySeason(data))}</div>}
          />
          <CardTops
            initialText="Top 3 Artistas por Estação"
            overlayText={<div>{JSON.stringify(topArtistsBySeason(data))}</div>}
          />
          <CardTops
            initialText="Top 100 Artistas por Plays"
            overlayText={
              <div>{JSON.stringify(top100ArtistsByPlays(data))}</div>
            }
          />
          <CardTops
            initialText="Top 100 Músicas por Play Time"
            overlayText={
              <div>{JSON.stringify(top100SongsByPlayTime(data))}</div>
            }
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Home;
