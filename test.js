// Function to save RGBA data as a PNG image file

import data from './raj-data.json' with {"type":"json"};
console.log(data);
function saveImageFromRGBA(rgbaData, width, height, filename) {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
  
    // Get the 2D drawing context
    const ctx = canvas.getContext('2d');
  
    // Create ImageData object and set the pixel data
    const imageData = ctx.createImageData(width, height);
    
    // Flatten the array if necessary
    const flattenedData = new Uint8Array(rgbaData.flat()); // Flatten 2D array to 1D
  
    // Set the pixel data to the ImageData object
    imageData.data.set(flattenedData);
  
    // Put the ImageData onto the canvas
    ctx.putImageData(imageData, 0, 0);
  
    // Convert canvas to a data URL (Base64 string)
    const dataURL = canvas.toDataURL('image/png');
  
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;  // Set the download file name
    link.click();  // Trigger the download
  }
  
  // Example usage with your RGBA data
  const rgbaData = data["segment_14.png"];
  console.log(rgbaData.length())
  const width = 2;  // Example width (change to match your image's width)
  const height = 2; // Example height (change to match your image's height)
  
  saveImageFromRGBA(rgbaData, width, height, 'segment_14.png');
  