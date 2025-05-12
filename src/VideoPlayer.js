import React from 'react';
import './VideoPlayer.css';

function VideoPlayer({ videoId, title, onLike, isLiked }) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-card">
      <iframe
        width="300"
        height="170"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allowFullScreen
      />
      <p className="video-title">{title}</p>
      <button onClick={() => onLike({ videoId, title })} className="like-button">
      {isLiked ? '💔 Unlike' : '🤍 Like'} 
      </button>
    </div>
  );
}

export default VideoPlayer;
