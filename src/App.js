import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import VideoPlayer from './VideoPlayer';
import LikedVideos from './LikedVideos';
import './App.css';

const API_KEY = "AIzaSyBlWvMi9U_Cc3NGJqcJAiU4wuaVyTjXeK4";

function App() {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState({
    music: [],
    news: [],
    comedy: [],
    movies: [],
    others: []
  });

  useEffect(() => {
    const stored = localStorage.getItem("likedVideos");
    if (stored) {
      setLikedVideos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          regionCode: 'IN',
          maxResults: 10,
          key: API_KEY,
        },
      });
      setTrendingVideos(response.data.items);
    };

    fetchTrendingVideos();
  }, []);

  useEffect(() => {
    localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
  }, [likedVideos]);

  const handleSearch = async (term) => {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: term,
        key: API_KEY,
        maxResults: 20,
        type: 'video',
      },
    });
    setVideos(response.data.items);
  };

  const categorizeVideo = (title) => {
    const titleLowerCase = title.toLowerCase();
    if (titleLowerCase.includes('music') || titleLowerCase.includes('song')) {
      return 'music';
    } else if (titleLowerCase.includes('news') || titleLowerCase.includes('update')) {
      return 'news';
    } else if (titleLowerCase.includes('comedy') || titleLowerCase.includes('funny')) {
      return 'comedy';
    } else if (titleLowerCase.includes('movie') || titleLowerCase.includes('film')) {
      return 'movies';
    }
    return 'others';
  };

  const handleLike = (video) => {
    const category = categorizeVideo(video.title);
    const alreadyLiked = likedVideos[category].find(v => v.videoId === video.videoId);
    if (!alreadyLiked) {
      setLikedVideos({
        ...likedVideos,
        [category]: [...likedVideos[category], video]
      });
    }
  };

  const handleUnlike = (video) => {
    const category = categorizeVideo(video.title);
    const updatedCategory = likedVideos[category].filter(v => v.videoId !== video.videoId);
    setLikedVideos({
      ...likedVideos,
      [category]: updatedCategory,
    });
  };

  return (
    <Router>
      
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/" className="site-logo">🎬 MyTube</Link>
          </div>
          <div className="nav-right">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>🔍 Search</NavLink>
            <NavLink to="/liked" className="nav-link">❤️ Liked</NavLink>
            <NavLink to="/trending" className="nav-link">🔥 Trending</NavLink>
          </div>
        </nav>
        <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={handleSearch} />

                {videos.length > 0 && (
                  <>
                    <h2 className="section-heading">🔍 Search Results</h2>
                    <div className="video-list">
                      {videos.map((video) => (
                        <VideoPlayer
                          key={video.id.videoId}
                          videoId={video.id.videoId}
                          title={video.snippet.title}
                          onLike={handleLike}
                          isLiked={Object.values(likedVideos).some(category =>
                            category.some(v => v.videoId === video.id.videoId)
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            }
          />

          <Route
            path="/liked"
            element={<LikedVideos likedVideos={likedVideos} handleUnlike={handleUnlike} />}
          />

          <Route
            path="/trending"
            element={
              <>
                <h1 className="title">🔥 Trending Videos</h1>
                <div className="video-list">
                  {trendingVideos.map((video) => (
                    <VideoPlayer
                      key={video.id}
                      videoId={video.id}
                      title={video.snippet.title}
                      onLike={handleLike}
                      isLiked={Object.values(likedVideos).some(category =>
                        category.some(v => v.videoId === video.id)
                      )}
                    />
                  ))}
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
