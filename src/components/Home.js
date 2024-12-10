import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home({ handleFileChange, handleDragOver, handleDrop, video, error, showOverlay, radarActive, report, closeOverlay }) {
  return (
    <div className="grid-container">
      <div className="box intro">
        <h1>Deepfake Detection</h1>
        <p className="description">
          Measure progress on deepfake detection technology with our cutting-edge analysis tools.
        </p>
        <div className="features">
          <div className="feature">
            <span className="feature-icon">🎥</span>
            <span className="feature-text">Video Analysis</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔍</span>
            <span className="feature-text">Anomaly Detection</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <span className="feature-text">Detailed Reports</span>
          </div>
        </div>
      </div>
      <div className="box youtube-link">
        <div className="action-links">
          <Link to="/youtube-trending" className="action-link">
            <div className="icon-circle">→</div>
            <span className="text">Check YouTube Trends</span>
          </Link>
          <Link to="/model-details" className="action-link">
            <div className="icon-circle">→</div>
            <span className="text">Model Specifications</span>
          </Link>
          <Link to="/confusion-matrix-report" className="action-link">
            <div className="icon-circle">→</div>
            <span className="text">Confusion Matrix</span>
          </Link>
        </div>
      </div>
      <div className="box upload-section">
        <h2>Analyze Your Video</h2>
        <div className="upload-buttons-2">
          <button
            className="upload-btn-2"
            onClick={() => document.getElementById('video-upload').click()}
          >
            Upload Video
          </button>
          <input
            type="file"
            id="video-upload"
            style={{ display: 'none' }}
            accept="video/*"
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
        </div>
        <div className="drag-drop-zone" onDragOver={handleDragOver} onDrop={handleDrop}>
          <p>Drag and drop a video file here, or use the upload button above.</p>
        </div>

        {error && <p className="error-message">{error}</p>}

        {video && (
          <div className="uploaded-file-2">
            <h3>Uploaded Video</h3>
            <video src={video} controls className="uploaded-video-2" />
          </div>
        )}

        {showOverlay && (
          <div className="overlay-wrapper">
            {radarActive ? (
              <div className="radar-container">
                <div className="radar">
                  <div className="radar-circle"></div>
                  <div className="radar-line"></div>
                </div>
                <p>Scanning for anomalies...</p>
              </div>
            ) : (
              <div className="report-wrapper">
                <h3>Analysis Report</h3>
                <ul className="report-data">
                  {Object.entries(report.video_metadata).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                    </li>
                  ))}
                </ul>
                <h4>Anomalies Detected:</h4>
                <ul>
                  {report.anomalies.map((anomaly) => (
                    <li key={anomaly.anomaly_id}>
                      <strong>{anomaly.name}</strong> - Score: {anomaly.score}
                    </li>
                  ))}
                </ul>
                <button onClick={closeOverlay} className="close-btn">
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

