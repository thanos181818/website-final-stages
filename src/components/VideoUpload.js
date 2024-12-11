// VideoUpload.js
import React from 'react';
import './Home.css';

export default function VideoUpload({ video, handleFileChange, handleDragOver, handleDrop, radarActive }) {
  return (
    <div className="upload-section">
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
        </div>
      )}
    </div>
  );
}
