import React from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Home.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home({
  handleFileChange,
  handleDragOver,
  handleDrop,
  video,
  error,
  radarActive,
  report,
}) {
  // Extract data for anomaly 1 (if available)
  const anomaly1 = report?.anomalies?.find((anomaly) => anomaly.anomaly_id === 1);

  // Prepare graph data for anomaly 1
  const graphData = {
    labels: anomaly1?.graph_data.map((_, index) => `Point ${index + 1}`) || [],
    datasets: [
      {
        label: 'Anomaly 1 Graph Data',
        data: anomaly1?.graph_data || [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Anomaly 1 Graph',
      },
    },
  };

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

        {!video && (
          <>
            <div className="upload-buttons-2">
              <button
                className="upload-btn-2"
                onClick={() => document.getElementById('video-upload').click()}>
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
            <div
              className="drag-drop-zone"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <p>Drag and drop a video file here, or click the upload button above</p>
            </div>
          </>
        )}

        {video && (
          <div className="uploaded-file-2">
            <p className="video-upload-success">
              {radarActive ? 'Your Video is Being Uploaded' : 'Your Video Has Been Uploaded'}
            </p>

            {radarActive && (
              <div className="radar-container">
                <div className="radar">
                  <div className="radar-circle"></div>
                  <div className="radar-line"></div>
                </div>
                <p>Scanning for anomalies...</p>
              </div>
            )}

            {!radarActive && (
              <>
                <h3>Uploaded Video</h3>
                <video src={video} controls className="uploaded-video-2" />

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
                        <strong>{anomaly.name}</strong> -{' '}
                        {anomaly.anomaly_scores.map((score, index) => (
                          <span key={index}>
                            Score at {anomaly.timestamps[index].join(':')}: {score}{' '}
                          </span>
                        ))}
                      </li>
                    ))}
                  </ul>

                  {anomaly1 && (
                    <div className="graph-section">
                      <h4>Graph for {anomaly1.name}</h4>
                      <Line data={graphData} options={options} />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
