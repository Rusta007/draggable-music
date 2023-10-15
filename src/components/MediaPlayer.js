import React, { useState, useRef, useEffect } from 'react';

const MediaPlayer = ({ source }) => {
  const mediaRef = useRef();
  const [isVideo, setIsVideo] = useState(source.endsWith('.mp4'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const [mediaState, setMediaState] = useState({
    isVideo: isVideo,
    isPlaying: isPlaying,
  });

  useEffect(() => {
    if (mediaState.isVideo !== isVideo || mediaState.isPlaying !== isPlaying) {
      // Media state has changed, update the playback
      if (isPlaying) {
        mediaRef.current.play();
        mediaRef.current.currentTime = currentTime;
      } else {
        mediaRef.current.pause();
        console.log("pausing")
      }
      setMediaState({
        isVideo: isVideo,
        isPlaying: isPlaying,
      });
    }
  }, [isVideo, isPlaying, currentTime, mediaState]);

  const toggleMedia = () => {
    setIsVideo(!isVideo);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(mediaRef.current.currentTime);
  };

  const forward = () => {
    if (mediaRef.current.readyState > 0) { // Check if media is loaded
      mediaRef.current.currentTime += 10;
      setCurrentTime(mediaRef.current.currentTime);
    }
  };
  
  const rewind = () => {
    if (mediaRef.current.readyState > 0) { // Check if media is loaded
      mediaRef.current.currentTime -= 10;
      setCurrentTime(mediaRef.current.currentTime);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const x = e.clientX - dragStart.x;
      const y = e.clientY - dragStart.y;
      setPosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const mediaBarStyle = {
    cursor: isDragging ? 'grabbing' : 'grab',
    position: 'relative',
    top: position.y,
    left: position.x,
    display: 'inline-block'
  };


  return (
    <div
    style={mediaBarStyle}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}>

      <div className="videoDivBar">
        {isVideo ? (
          <video
            ref={mediaRef}
            width="100%"
            height="100%"
            controls
            src={source}
            onTimeUpdate={handleTimeUpdate}
          ></video>
        ) : (
          <audio
            ref={mediaRef}
            controls
            src={source}
            onTimeUpdate={handleTimeUpdate}
          ></audio>
        )}
      </div>
      <div className="buttonFlex">
      <button className='trackName icon' onClick={rewind}>&#9665;&#9665; </button>
      <button className="toggleButton" onClick={toggleMedia}>
        Toggle {isVideo ? 'Audio' : 'Video'}
      </button>
      <button className='trackName icon' onClick={forward}>&#9655;&#9655;</button>
      
      </div>
    </div>
  );
};

export default MediaPlayer;
