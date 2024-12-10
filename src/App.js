import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import YouTubeTrendingChecker from './youtube-trending/Yt';
import Conf from './confusion-matrix-report/Conf';

function App() {
  const [video, setVideo] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [radarActive, setRadarActive] = useState(true);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (file) => {
    setError('');
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideo(URL.createObjectURL(file));
        setShowOverlay(true);
        setRadarActive(true);
        fetchBackendResponse();
      } else {
        setError('Please upload a valid video file.');
      }
    }
  };

  const fetchBackendResponse = () => {
    setTimeout(() => {
      setReport({
        video_metadata: {
          video_name: "video_1.mp4",
          is_fake: 1,
          fake_confidence: 0.93,
          video_length: "00:05:30",
          frame_count: 108000,
          frame_rate: 30,
          resolution: "1920x1080",
          aspect_ratio: "16:9",
          file_size: "500MB",
        },
        anomalies: [
          { anomaly_id: 1, name: "Texture and Skin Inconsistencies", score: 0.85 },
          { anomaly_id: 2, name: "Lighting and Shadow Mismatches", score: 0.92 },
        ],
      });
      setRadarActive(false);
    }, 3000);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setReport(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setError('');
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
        handleFileChange(file);
      } else {
        setError('Please drop a valid video file.');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <Home
              handleFileChange={handleFileChange}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              video={video}
              error={error}
              showOverlay={showOverlay}
              radarActive={radarActive}
              report={report}
              closeOverlay={closeOverlay}
            />
          } />
          <Route path="/youtube-trending" element={<YouTubeTrendingChecker />} />
          {/* Adding the Conf route */}
          <Route path="/confusion-matrix-report" element={<Conf />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
