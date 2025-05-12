import React from 'react';
import VideoPlayer from './VideoPlayer';

const categoryIcon = (category) => {
  switch (category) {
    case 'music': return 'music_note';
    case 'news': return 'public';
    case 'comedy': return 'tag_faces';
    case 'movies': return 'movie';
    default: return 'help';
  }
};


function LikedVideos({ likedVideos,handleUnlike  }) {
  return (
    <div className="liked-page">
      <h2>❤️ Your Liked Videos</h2>
      
      {Object.keys(likedVideos).map((category) => (
        likedVideos[category].length > 0 && (
          <div key={category} className="liked-category">
           <h3>
  <i className="material-icons">{categoryIcon(category)}</i>
  {category.charAt(0).toUpperCase() + category.slice(1)} Videos
</h3>
            <div className="video-list">
              {likedVideos[category].map((video) => (
                <VideoPlayer
                  key={video.videoId}
                  videoId={video.videoId}
                  title={video.title}
                  onLike={(video) => handleUnlike(video)}
                  isLiked={true}
                />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}

export default LikedVideos;
