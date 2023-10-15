import React, { useState, useEffect } from 'react';
import MediaPlayer from './components/MediaPlayer';
import track1 from './video/Rec 2022-10-20 10;18;20.mp4';
import track2 from './video/Rec 2022-11-09 14;08;34.mp4';
import track3 from './video/Rec 2022-11-11 15;34;09.mp4';
import track4 from './video/Rec 2022-11-17 16;14;29.mp4';
import track5 from './video/Rec 2023-10-10 12;16;16.mp4';
import '../src/App.css'

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const tracks = [
    { title: "Recording Track 1", source: track1 },
    { title: "Recording Track 2", source: track2 },
    { title: "Recording Track 3", source: track3 },
    { title: "Recording Track 4", source: track4 },
    { title: "Recording Track 5", source: track5 },
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
