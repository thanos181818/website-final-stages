import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import YouTubeTrendingChecker from './youtube-trending/Yt';
import Conf from './confusion-matrix-report/Conf';
import videoMetaData from './components/video-meta-data.json';

function App() {
  const [video, setVideo] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [radarActive, setRadarActive] = useState(true);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const { anomalies } = videoMetaData; // Extract anomalies for display

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
    // Simulating a backend fetch with the imported JSON file
    setTimeout(() => {
      setReport(videoMetaData);
      setRadarActive(false);
    }, 3000); // Simulate a delay
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
          <Route
            path="/"
            element={
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
            }
          />
          <Route path="/youtube-trending" element={<YouTubeTrendingChecker />} />
          <Route
            path="/confusion-matrix-report"
            element={<Conf report={report} closeOverlay={closeOverlay} />}
          />
          {/* Additional route to display anomalies */}
          <Route
            path="/anomalies"
            element={
              <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h2>Anomalies Detected</h2>
                {anomalies.length === 0 ? (
                  <p>No anomalies detected in this video.</p>
                ) : (
                  anomalies.map((anomaly) => (
                    <div
                      key={anomaly.anomaly_id}
                      style={{
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '15px',
                        marginBottom: '20px',
                      }}
                    >
                      <h3>
                        Anomaly {anomaly.anomaly_id}: {anomaly.name}
                      </h3>
                      <ul>
                        <li><strong>Timestamps and Scores:</strong></li>
                        {anomaly.timestamps.map((timestamp, index) => (
                          <li key={index}>
                            <strong>Time:</strong> {timestamp[0]}:{timestamp[1]}:{timestamp[2]} 
                            - <strong>Score:</strong> {anomaly.anomaly_scores[index]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
