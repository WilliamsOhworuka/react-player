import React from 'react';

const LibrarySong = ({song, setSongs, setCurrentSong, setPlaying}) => {
  const setSelectHandler = () => {
    setCurrentSong(song);
    setPlaying(true);
  }

  return (
    <div className={song.active ? 'library-song selected' : 'library-song'} onClick={setSelectHandler}>
      <img src={song.cover} alt={song.name}/>
      <div className="song-description">
        <h3>{song.name}</h3> 
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;