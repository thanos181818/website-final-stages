import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Yt.css"; // Updated CSS file for YouTube Trending Checker
import VideoCard from '../components/VideoCard.js';

function YouTubeTrendingChecker() {
  const [videos, setVideos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const videosPerPage = 3; // Show 3 videos at a time

  // Fetch trending videos using the API
  const fetchTrendingVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/trending-videos");
      setVideos(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching trending videos:", error);
      setError("Failed to fetch trending videos. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrendingVideos();
  }, [fetchTrendingVideos]);

  // Navigation for previous and next video pages
  const handlePreviousPage = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
    }
  };

  const handleNextPage = () => {
    if (startIndex + videosPerPage < videos.length) {
      setStartIndex((prevIndex) => Math.min(videos.length - videosPerPage, prevIndex + 1));
    }
  };

  const visibleVideos = videos.slice(startIndex, startIndex + videosPerPage);

  return (
    <div className="App">
      <header>
        <h1>YouTube Trending Videos</h1>
      </header>
      {isLoading ? (
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading trending videos...</p>
        </div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchTrendingVideos} className="retry-button">
            Retry
          </button>
        </div>
      ) : (
        <div className="video-slider">
          <button
            className="arrow left-arrow"
            onClick={handlePreviousPage}
            disabled={startIndex === 0}
          >
            &#8592;
          </button>
          <div className="video-grid">
            {visibleVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          <button
            className="arrow right-arrow"
            onClick={handleNextPage}
            disabled={startIndex + videosPerPage >= videos.length}
          >
            &#8594;
          </button>
        </div>
      )}
      <footer>
        <p>&copy; 2024 YouTube. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default YouTubeTrendingChecker;
