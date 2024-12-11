import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import VideoUpload from './VideoUpload';
import ReportDisplay from './1';
import ImageDisplay from './ImageDisplay';
import GeneratePDF from './templetepdf';
import VideoMetadata from './VideoMetaData';
import AnomaliesDisplay from './AnomaliesDisplay';

function getVideoName(url) {
  const urlParts = url.split('/');
  const fileNameWithExtension = urlParts[urlParts.length - 1];
  const fileName = fileNameWithExtension.split('.')[0]; // Remove extension
  return fileName;
}

export default function Home({
  handleFileChange,
  handleDragOver,
  handleDrop,
  video,
  error,
  radarActive,
  report,
}) {
  console.log(report);

  const [isChartRendered, setIsChartRendered] = useState(false);
  const graphRef = useRef(null);
  const anomaly1 = report?.anomalies?.find((anomaly) => anomaly.anomaly_id === 1);

  const downloadReport = () => {
    console.warn(report);
    console.log("hiiiiiiiiiiiiiiiiiiii");
    GeneratePDF(report);
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

      <VideoUpload
        video={video}
        handleFileChange={handleFileChange}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        radarActive={radarActive}
      />
      <div>
      {/* Display Video Metadata */}
      {report && report.video_metadata && <VideoMetadata videoMetadata={report.video_metadata} />}

      {/* Display Anomalies */}
      {report && report.anomalies && <AnomaliesDisplay anomalies={report.anomalies} />}
      
      </div>
      

      {video && (
        <div className="buttons">
          <button className="download-btn" onClick={downloadReport}>
            Download Report
          </button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      <ImageDisplay jsonFilePath="./raj-data.json" />
    </div>
  );
}
