import React, { useState, useEffect } from 'react';
import MediaPlayer from './components/MediaPlayer';
import track1 from './video/Rec 2022-10-20 10;18;20.mp4';
import '../src/App.css'

const track2 = 'https://media.istockphoto.com/id/1460960983/video/rain-falling-on-the-window-and-flowing-raindrops-the-soothing-sound-of-rain-and-candles.mp4?s=mp4-640x640-is&k=20&c=vKONvL6GN2zFnbAMCz0lNpoup04nrCSNyOJJTbu1SrY=';
const track3 = 'https://media.istockphoto.com/id/127737092/video/blue-tit-perching-on-the-branch.mp4?s=mp4-640x640-is&k=20&c=q20fOs37zjOvrgkZvck_34-G2B930EA4_rUjvT57fo8=';
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const tracks = [
    { title: "Recording Track 1", source: track1 },
    { title: "Recording Track 2", source: track2 },
    { title: "Recording Track 3", source: track3 },
    { title: "Recording Track 4", source: track1 },
    { title: "Recording Track 5", source: track2 },
  ];

  useEffect(() => {
    // Check if the selected track is stored in localStorage
    const lastSelectedTrack = localStorage.getItem('lastSelectedTrack');
    if (lastSelectedTrack) {
      setCurrentTrack(lastSelectedTrack);
      setIsPlaying(true); // Autoplay the last selected track
    }
  }, []);

  const selectTrack = (source) => {
    setCurrentTrack(source);
    setIsPlaying(true); // Autoplay the selected track
    localStorage.setItem('lastSelectedTrack', source);
  };

  const onTogglePlayPause = (isPlaying) => {
    setIsPlaying(isPlaying);
  };

  return (
    <div className="App">
      <div className='headingBar'>
      <h1 className='heading'>Draggable music player</h1>
      </div>
      <div className='allSection'>
      <div className='trackSection'>
        <h2>Choose a Track</h2>
        <ul>
          {tracks.map((track, index) => (
            <li key={index}>
              <button className='trackName' onClick={() => selectTrack(track.source)}>
                {track.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='mediaSection'>
      {currentTrack && (
        <div>
          {/* <h2>Now Playing</h2> */}
          <h2>{tracks.find(track => track.source === currentTrack)?.title}</h2>
          <MediaPlayer
            source={currentTrack}
            onTogglePlayPause={onTogglePlayPause}
            className="videobar"
            />
        </div>
      )}
      </div>
      </div>
    </div>
  );
}

export default App;
