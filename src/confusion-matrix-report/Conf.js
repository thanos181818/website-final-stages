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

  // Go to next model
  const nextModel = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Go to previous model
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
          disabled={currentIndex === 0}  // Disable if at the first model
        >
          {"<"}
        </button>
        <div className="photo-box">
          <div className="model-details">
            <p><strong>Model Name:</strong> {photos[currentIndex].modelName}</p>
          </div>
          <img src={photos[currentIndex].photo} alt={`Photo ${currentIndex + 1}`} className="photo" />
          <div className="accuracy">
            <p><strong>Accuracy:</strong> {photos[currentIndex].accuracy}%</p>
            <p><strong>Precision:</strong> {photos[currentIndex].precision}%</p>
            <p><strong>Recall:</strong> {photos[currentIndex].recall}%</p>
            <p><strong>F1-Score:</strong> {photos[currentIndex].f1Score}%</p>
            <p><strong>Support:</strong> {photos[currentIndex].support}</p>
          </div>
        </div>
        <button
          className="arrow right-arrow"
          onClick={nextModel}
          disabled={currentIndex === photos.length - 1}  // Disable if at the last model
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Conf;
