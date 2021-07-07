import React from "react";
import './styles/app.scss';
import Player from './components/Player';
import Song from './components/Song'
import data from './util';
import Library from "./components/Library";
import Nav from './components/Nav';

function App() {
  const  [songs, setSongs] = React.useState(data());
  const [playing, setPlaying] = React.useState(false);
  const [currentSong, setCurrentSong] = React.useState(songs[0]);
  const [songInfo, setSongInfo] = React.useState({
    currentTime: 0,
    duration: 0, 
    animationPercentage: 0,
  });
  const [navOpen, setNavOpen] = React.useState(false);


  const audioRef = React.useRef(null); 

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const animationPercent = (current/duration) * 100;

    setSongInfo((prev) => ({...prev, currentTime: current, duration, animationPercentage: animationPercent}));

    if(current === duration){
      const currentIndex = songs.findIndex((item) => item.id === currentSong.id);
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
  }

  React.useEffect(() => {
    setSongs((prev) => {
      const current = [...prev];

      const newState = current.map((item) => {
        if(item.id === currentSong.id){
          return {...item, active: true}
        } 

        return {...item, active: false}
      });

      return newState;
    });
  }, [currentSong])

  React.useEffect(() => {
    audioRef.current.pause()
  }, [])

  return (
    <div className={`app  ${navOpen ? 'library-active' : ''}`}>
     <Nav setNavOpen={setNavOpen}/>
     <Song currentSong={currentSong}/>
     <Player setSongs={setSongs} songs={songs} songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} song={currentSong} setCurrentSong={setCurrentSong} playing={playing} setPlaying={setPlaying}/>
     <Library setSongs={setSongs} isOpen={navOpen} setPlaying={setPlaying} songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef}/>
     <audio autoPlay onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}/>
    </div>
  );
}

export default App;
