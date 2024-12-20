import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import YouTubeTrendingChecker from './youtube-trending/Yt';
import Conf from './confusion-matrix-report/Conf';
import v1 from './components/0033_fake.json';
import v2 from './components/0033_real.json';
import v3 from './components/0014_real.json';
import v4 from './components/0014_fake.json';
import v5 from './components/0040_real.json';
import v6 from './components/0040_fake.json';


function getVideoName(url) {
  const urlParts = url.split('/');
  const fileNameWithExtension = urlParts[urlParts.length - 1];
  const fileName = fileNameWithExtension.split('.')[0]; // Remove extension
  return fileName;
}


function App() {
  const [video, setVideo] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [radarActive, setRadarActive] = useState(true);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const { anomalies } = v1
  
  const handleFileChange = (file) => {
    setError('');
    if (file) {
      if (file.type.startsWith('video/')) {
        let name = file.name
        if (name == "0033_fake.mp4"){
          console.log("1111111")
          setReport(v1)
          
        }
        else if (name == "0033_real.mp4"){
          setReport(v2)

        }
        else if (name == "0014_real.mp4"){
          setReport(v3)

        }
        else if (name == "0014_fake.mp4"){
          setReport(v4)

        }
        else if (name == "0040_real.mp4"){
          setReport(v5)

        }
        else if ( name == "0040_fake.mp4" ) 
        {
          setReport(v6)
        }

        console.log(file.name)
        let url = URL.createObjectURL(file)

        setVideo(url);
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
                anomalies.map((anomaly, index) => (
                  <div
                    key={anomaly.anomaly_id || `source-${index}`}
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      padding: '15px',
                      marginBottom: '20px',
                    }}
                  >
                    {anomaly.anomaly_id ? (
                      <>
                        <h3>
                          Anomaly {anomaly.anomaly_id}: {anomaly.name}
                        </h3>
                        <ul>
                          <li><strong>Description:</strong> {anomaly.description}</li>
                          <li><strong>Result:</strong> {anomaly.Result}</li>
                          <li>
                            <strong>Median Anomaly Score:</strong>{' '}
                            {anomaly.Video_Median_Anomaly_Score?.join(', ') || 'N/A'}
                          </li>
                        </ul>
                      </>
                    ) : (
                      <h3>Source: {anomaly.source}</h3>
                    )}
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
