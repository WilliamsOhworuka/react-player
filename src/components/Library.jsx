import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setSongs, isOpen, setCurrentSong, audioRef, setPlaying}) => {
  return (
    <div className={`library ${isOpen ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song, index) =>  <LibrarySong setSongs={setSongs} key={song.id} songs={songs} audioRef={audioRef} song={song} setPlaying={setPlaying} setCurrentSong={setCurrentSong}/>)}
      </div>
    </div>
  );
};

export default Library;