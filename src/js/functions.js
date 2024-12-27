// 1) Total de músicas tocadas
export const totalSongsPlayed = (data) => data.length;

// 2) Total de músicas diferentes ouvidas
export const uniqueSongsPlayed = (data) => {
  const uniqueSongs = new Set(data.map((item) => item.master_metadata_track_name));
  return uniqueSongs.size;
};

// 3) Total de artistas diferentes ouvidos
export const uniqueArtistsPlayed = (data) => {
  const uniqueArtists = new Set(data.map((item) => item.master_metadata_album_artist_name));
  return uniqueArtists.size;
};

// 4) Total de minutos ouvidos
export const totalMinutesPlayed = (data) => {
  const totalMs = data.reduce((sum, item) => sum + item.ms_played, 0);
  return (totalMs / 60000).toFixed(2);
};

// 5) Música mais ouvida
export const mostPlayedSong = (data) => {
  const songCount = {};
  data.forEach((item) => {
    const song = item.master_metadata_track_name;
    if (song) {
      songCount[song] = (songCount[song] || 0) + 1;
    }
  });

  const sortedSongs = Object.entries(songCount).sort((a, b) => b[1] - a[1]);
  return sortedSongs[0] ? `${sortedSongs[0][0]} (${sortedSongs[0][1]} vezes)` : 'Nenhuma música tocada';
};

// 6) Média de tempo diário a ouvir
export const dailyAverageTime = (data) => {
  const days = {};
  data.forEach((item) => {
    const date = new Date(item.ts).toISOString().split('T')[0];
    days[date] = (days[date] || 0) + item.ms_played;
  });
  const totalDays = Object.keys(days).length;
  const totalMs = Object.values(days).reduce((sum, ms) => sum + ms, 0);
  return (totalMs / totalDays / 60000).toFixed(2);
};

// 7) Entre que horários o utilizador mais ouve música
export const mostActiveHours = (data) => {
  const hourCounts = {};
  data.forEach((item) => {
    const hour = new Date(item.ts).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });

  const sortedHours = Object.entries(hourCounts).sort((a, b) => b[1] - a[1]);
  if (sortedHours.length === 0) return 'Nenhuma atividade registrada';
  const [mostActiveHour, count] = sortedHours[0];
  return `Entre ${mostActiveHour}:00 e ${parseInt(mostActiveHour) + 1}:00 (${count} vezes)`;
};

// 8) Em qual estação o utilizador mais ouve música
export const mostActiveSeason = (data) => {
  const seasonMap = { winter: [12, 1, 2], spring: [3, 4, 5], summer: [6, 7, 8], fall: [9, 10, 11] };
  const seasonCounts = { winter: 0, spring: 0, summer: 0, fall: 0 };

  data.forEach((item) => {
    const month = new Date(item.ts).getMonth() + 1;
    for (const [season, months] of Object.entries(seasonMap)) {
      if (months.includes(month)) {
        seasonCounts[season]++;
        break;
      }
    }
  });

  const sortedSeasons = Object.entries(seasonCounts).sort((a, b) => b[1] - a[1]);
  return sortedSeasons[0] ? `${sortedSeasons[0][0]} (${sortedSeasons[0][1]} vezes)` : 'Nenhuma estação registrada';
};

// 9) Top 5 músicas por estação do ano
export const topSongsBySeason = (data) => {
  const seasonMap = { winter: [12, 1, 2], spring: [3, 4, 5], summer: [6, 7, 8], fall: [9, 10, 11] };
  const songsBySeason = { winter: {}, spring: {}, summer: {}, fall: {} };

  data.forEach((item) => {
    const month = new Date(item.ts).getMonth() + 1;
    for (const [season, months] of Object.entries(seasonMap)) {
      if (months.includes(month)) {
        const song = item.master_metadata_track_name;
        const artist = item.master_metadata_album_artist_name;
        const album = item.master_metadata_album_album_name;
        const key = `${song} - ${artist} (${album})`;
        if (song) {
          songsBySeason[season][key] = (songsBySeason[season][key] || 0) + 1;
        }
        break;
      }
    }
  });

  const result = {};
  for (const [season, songs] of Object.entries(songsBySeason)) {
    result[season] = Object.entries(songs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([song, count], index) => `TOP ${index + 1} ${season} - ${song}, ${count} vezes`);
  }
  return result;
};

// 10) Top 3 artistas por estação do ano
export const topArtistsBySeason = (data) => {
  const seasonMap = { winter: [12, 1, 2], spring: [3, 4, 5], summer: [6, 7, 8], fall: [9, 10, 11] };
  const artistsBySeason = { winter: {}, spring: {}, summer: {}, fall: {} };

  data.forEach((item) => {
    const month = new Date(item.ts).getMonth() + 1;
    for (const [season, months] of Object.entries(seasonMap)) {
      if (months.includes(month)) {
        const artist = item.master_metadata_album_artist_name;
        const album = item.master_metadata_album_album_name;
        const key = `${artist} (${album})`;
        if (artist) {
          artistsBySeason[season][key] = (artistsBySeason[season][key] || 0) + 1;
        }
        break;
      }
    }
  });

  const result = {};
  for (const [season, artists] of Object.entries(artistsBySeason)) {
    result[season] = Object.entries(artists)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([artist, count], index) => `TOP ${index + 1} ${season} - ${artist}, ${count} vezes`);
  }
  return result;
};

// 11) Top 100 artistas ordenados por quantidade de plays
export const top100ArtistsByPlays = (data) => {
  const artistCount = {};
  data.forEach((item) => {
    const artist = item.master_metadata_album_artist_name;
    if (artist) {
      artistCount[artist] = (artistCount[artist] || 0) + 1;
    }
  });

  return Object.entries(artistCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 100)
    .map(([artist, count], index) => `TOP ${index + 1} - ${artist}, ${count} vezes`);
};

// 12) Top 100 músicas ordenadas por milissegundos em plays
export const top100SongsByPlayTime = (data) => {
  const songTime = {};
  data.forEach((item) => {
    const song = item.master_metadata_track_name;
    if (song) {
      songTime[song] = (songTime[song] || 0) + item.ms_played;
    }
  });

  return Object.entries(songTime)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 100)
    .map(([song, time], index) => `TOP ${index + 1} - ${song}, ${(time / 60000).toFixed(2)} minutos`);
};
// Função para calcular a porcentagem de plays por artista
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

  return artistPercentages.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
};

// Função para listar as top 20 músicas ordenadas por tempo de reprodução
export const top20SongsByPlayTime = (data) => {
  const songDurations = {};

  data.forEach((item) => {
    const song = item.master_metadata_track_name;
    if (song) {
      songDurations[song] = (songDurations[song] || 0) + item.ms_played;
    }
  });

  return Object.entries(songDurations)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([song, duration]) => ({
      song,
      duration: (duration / 60000).toFixed(2) + ' minutos',
    }));
};

// Função para verificar a posição de um artista no ranking
export const artistRanking = (data, artistName) => {
  const artistCounts = {};

  data.forEach((item) => {
    const artist = item.master_metadata_album_artist_name;
    if (artist) {
      artistCounts[artist] = (artistCounts[artist] || 0) + 1;
    }
  });

  const sortedArtists = Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([artist]) => artist);

  const position = sortedArtists.indexOf(artistName) + 1; // Adiciona 1 porque o índice começa em 0
  return position > 0 ? `#${position}` : `${artistName} não está no top 100.`;
};
// 1) Total de plays de um artista
export const totalPlaysByArtist = (data, artistName) => {
  return data.reduce((count, item) => {
    return item.master_metadata_album_artist_name === artistName ? count + 1 : count;
  }, 0);
};

// 2) Total de músicas diferentes tocadas de um artista
export const uniqueSongsByArtist = (data, artistName) => {
  const uniqueSongs = new Set(
    data
      .filter((item) => item.master_metadata_album_artist_name === artistName)
      .map((item) => item.master_metadata_track_name)
  );
  return uniqueSongs.size;
};

// 3) Total de minutos ouvidos de um artista
export const totalMinutesByArtist = (data, artistName) => {
  const totalMs = data
    .filter((item) => item.master_metadata_album_artist_name === artistName)
    .reduce((sum, item) => sum + item.ms_played, 0);
  return (totalMs / 60000).toFixed(2); // Converte para minutos
};

// 4) Top 20 músicas de um artista por tempo de reprodução
export const top20SongsByArtist = (data, artistName) => {
  const songDurations = {};

  data
    .filter((item) => item.master_metadata_album_artist_name === artistName)
    .forEach((item) => {
      const song = item.master_metadata_track_name;
      if (song) {
        songDurations[song] = (songDurations[song] || 0) + item.ms_played;
      }
    });

  return Object.entries(songDurations)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([song, duration]) => ({
      song,
      duration: (duration / 60000).toFixed(2) + ' minutos',
    }));
};

// Função para verificar em qual estação o artista é mais ativo
export const artistMostActiveSeason = (data, artistName) => {
  const seasonMap = { winter: [12, 1, 2], spring: [3, 4, 5], summer: [6, 7, 8], fall: [9, 10, 11] };
  const seasonCounts = { winter: 0, spring: 0, summer: 0, fall: 0 };

  data.forEach((item) => {
    const artist = item.master_metadata_album_artist_name;
    if (artist === artistName) {
      const month = new Date(item.ts).getMonth() + 1;
      for (const [season, months] of Object.entries(seasonMap)) {
        if (months.includes(month)) {
          seasonCounts[season]++;
          break;
        }
      }
    }
  });

  const mostActiveSeason = Object.entries(seasonCounts).sort((a, b) => b[1] - a[1])[0];
  return mostActiveSeason ? `${mostActiveSeason[0]} (${mostActiveSeason[1]} vezes)` : `${artistName} não tem plays registrados por estação.`;
};