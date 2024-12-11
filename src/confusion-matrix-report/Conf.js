import React, { useState } from "react";
import "./Conf.css";
import tp1 from "./tp-1.png";
import tp2 from "./tp-1.png";
import tp3 from "./tp-1.png";
import tp4 from "./tp-1.png";
import tp5 from "./tp-1.png";
import tp6 from "./tp-1.png";

const Conf = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = [
    { 
      photo: tp1, 
      modelName: "Model A", 
      accuracy: (Math.random() * 100).toFixed(2),
      precision: (Math.random() * 100).toFixed(2),
      recall: (Math.random() * 100).toFixed(2),
      f1Score: (Math.random() * 100).toFixed(2),
      support: (Math.random() * 100).toFixed(0) 
    },
    { 
      photo: tp2, 
      modelName: "Model B", 
      accuracy: (Math.random() * 100).toFixed(2),
      precision: (Math.random() * 100).toFixed(2),
      recall: (Math.random() * 100).toFixed(2),
      f1Score: (Math.random() * 100).toFixed(2),
      support: (Math.random() * 100).toFixed(0) 
    },
    { 
      photo: tp3, 
      modelName: "Model C", 
      accuracy: (Math.random() * 100).toFixed(2),
      precision: (Math.random() * 100).toFixed(2),
      recall: (Math.random() * 100).toFixed(2),
      f1Score: (Math.random() * 100).toFixed(2),
      support: (Math.random() * 100).toFixed(0) 
    },
    { 
      photo: tp4, 
      modelName: "Model D", 
      accuracy: (Math.random() * 100).toFixed(2),
      precision: (Math.random() * 100).toFixed(2),
      recall: (Math.random() * 100).toFixed(2),
      f1Score: (Math.random() * 100).toFixed(2),
      support: (Math.random() * 100).toFixed(0) 
    },
    { 
      photo: tp5, 
      modelName: "Model E", 
      accuracy: (Math.random() * 100).toFixed(2),
      precision: (Math.random() * 100).toFixed(2),
      recall: (Math.random() * 100).toFixed(2),
      f1Score: (Math.random() * 100).toFixed(2),
      support: (Math.random() * 100).toFixed(0) 
    },
    { 
      photo: tp6, 
      modelName: "Model F", 
      accuracy: (Math.random() * 100).toFixed(2),
      precision: (Math.random() * 100).toFixed(2),
      recall: (Math.random() * 100).toFixed(2),
      f1Score: (Math.random() * 100).toFixed(2),
      support: (Math.random() * 100).toFixed(0) 
    }
  ];

  const nextModel = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevModel = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="conf-container">
      <div className="slider-container">
        <button
          className="arrow left-arrow"
          onClick={prevModel}
          disabled={currentIndex === 0}
        >
          &#8592;
        </button>
        <div className="photo-box">
          <div className="model-details">
            <h2>{photos[currentIndex].modelName}</h2>
          </div>
          <img src={photos[currentIndex].photo} alt={`Photo ${currentIndex + 1}`} className="photo" />
          
          {/* Accuracy displayed here */}
          <div className="accuracy">
            <strong>Accuracy:</strong> {photos[currentIndex].accuracy}%
          </div>
          
          {/* Table for other metrics */}
          <div className="stats">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Precision</td>
                  <td>{photos[currentIndex].precision}%</td>
                </tr>
                <tr>
                  <td>Recall</td>
                  <td>{photos[currentIndex].recall}%</td>
                </tr>
                <tr>
                  <td>F1-Score</td>
                  <td>{photos[currentIndex].f1Score}%</td>
                </tr>
                <tr>
                  <td>Support</td>
                  <td>{photos[currentIndex].support}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="arrow right-arrow"
          onClick={nextModel}
          disabled={currentIndex === photos.length - 1}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Conf;
