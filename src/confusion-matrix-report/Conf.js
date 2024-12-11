import React, { useState } from "react";
import "./Conf.css";
import tp1 from "./tp-1.png";
import tp2 from "./tp-2.png";
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
      accuracy: 0.98,
      precision_fake: 0.97,
      recall_fake: 1.00,
      f1Score_fake: 0.98,
      support_fake: 171,
      precision_real: 1.00,
      recall_real: 0.97,
      f1Score_real: 0.98,
      support_real: 193
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
                  <td>Precision(Fake)</td>
                  <td>{photos[currentIndex].precision_fake}</td>
                </tr>
                <tr>
                  <td>Recall (Fake)</td>
                  <td>{photos[currentIndex].recall_fake}</td>
                </tr>
                <tr>
                  <td>F1-Score (Fake)</td>
                  <td>{photos[currentIndex].f1Score_fake}</td>
                </tr>
                <tr>
                  <td>Support (Fake)</td>
                  <td>{photos[currentIndex].support_fake}</td>
                </tr>
                <tr>
                  <td>Precision (Real)</td>
                  <td>{photos[currentIndex].precision_real}</td>
                </tr>
                <tr>
                  <td>Recall (Real)</td>
                  <td>{photos[currentIndex].recall_real}</td>
                </tr>
                <tr>
                  <td>F1-Score( Real)</td>
                  <td>{photos[currentIndex].f1Score_real}</td>
                </tr>
                <tr>
                  <td>Support (Real)</td>
                  <td>{photos[currentIndex].support_real}</td>
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
