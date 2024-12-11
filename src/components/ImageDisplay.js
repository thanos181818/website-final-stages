// ImageDisplay.js
import React, { useEffect } from 'react';
import './Home.css'

export default function ImageDisplay({ jsonFilePath }) {
  useEffect(() => {
    async function loadImagesFromJson(jsonFilePath) {
      try {
        const response = await fetch(jsonFilePath);
        const imageArrays = await response.json();
        const container = document.getElementById('image-container');

        for (const filename in imageArrays) {
          const array = imageArrays[filename];
          const base64Image = arrayToBase64(array);
          const imgElement = document.createElement('img');
          imgElement.src = base64Image;
          imgElement.alt = filename;
          container.appendChild(imgElement);
        }
      } catch (error) {
        console.error('Error loading or displaying images:', error);
      }
    }

    loadImagesFromJson(jsonFilePath);

    function arrayToBase64(imageArray) {
      const width = imageArray[0].length;
      const height = imageArray.length;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const pixel = imageArray[y][x];
          ctx.fillStyle = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }

      return canvas.toDataURL('image/png');
    }
  }, [jsonFilePath]);

  return <div id="image-container"></div>;
}
