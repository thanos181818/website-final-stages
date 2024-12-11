// VideoMetadata.js
import React from 'react';

const VideoMetadata = ({ videoMetadata }) => {
  return (
    <div className="video-details">
      <h2>Video Details</h2>
      <p><strong>Video Name:</strong> {videoMetadata.video_name}</p>
      <p><strong>Video Length:</strong> {videoMetadata.video_length}</p>
      <p><strong>Resolution:</strong> {videoMetadata.resolution}</p>
      <p><strong>Aspect Ratio:</strong> {videoMetadata.aspect_ratio}</p>
      <p><strong>Frame Count:</strong> {videoMetadata.frame_count}</p>
      <p><strong>Frame Rate:</strong> {videoMetadata.frame_rate} fps</p>
      <p><strong>File Size:</strong> {videoMetadata.file_size}</p>
    </div>
  );
};

export default VideoMetadata;
