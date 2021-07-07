import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'

const Song = ({ songs, song, setPlaying, playing, audioRef, setSongInfo, songInfo, setCurrentSong}) => {
  const getTime = (time) => {
    return  Math.floor(time/60) + ':' + ('0' + Math.floor(time%60)).slice(-2);
  }

  const dragHandler = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = value;
    setSongInfo((prev) => ({...prev, currentTime: value}));
  }

  const playSongHandler = () => {
    if(playing){
      setPlaying(false);
      audioRef.current.pause(); 
      return;
    }

    setPlaying(true);
    audioRef.current.play(); 
  }

  const skipTrackHandler  = (direction)  => {
    const index = songs.findIndex((track) => track.id === song.id);
    const nextSongIndex = index + 1;
    const previousSongIndex =  index - 1;

    switch (direction) {
      case 'skip-forward':
        setCurrentSong(songs[nextSongIndex % songs.length]);
        setPlaying(true);
        break;
      case 'skip-back':
        const backIndex = previousSongIndex < 0 ? previousSongIndex + songs.length : previousSongIndex;
        setCurrentSong(songs[backIndex]);
        setPlaying(true);
        break;
      default:
        break;
    }
  }

  //add styles
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={{background: `linear-gradient(to right, ${song.color[0]},${song.color[1]})`,}} className="track">
          <input type="range" onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime}/>
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft}/>
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={playing ? faPause : faPlay}/>
        <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight}/>
      </div>
    </div>
  );
};

export default Song;