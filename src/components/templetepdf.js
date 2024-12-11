import React from "react";
import html2pdf from "html2pdf.js";
import './Home.css';


function GeneratePDF(report) {
    console.log(report);
    
    // Build the HTML content for the PDF with added styles
    const htmlString = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="text-align: center; color: #4CAF50;">Video Metadata Report</h1>
        
        <h2 style="color: #4CAF50;">Video Details</h2>
        <p><strong>Video Name:</strong> ${report.video_metadata.video_name}</p>
        <p><strong>Video Length:</strong> ${report.video_metadata.video_length}</p>
        <p><strong>Resolution:</strong> ${report.video_metadata.resolution}</p>
        <p><strong>Aspect Ratio:</strong> ${report.video_metadata.aspect_ratio}</p>
        <p><strong>Frame Count:</strong> ${report.video_metadata.frame_count}</p>
        <p><strong>Frame Rate:</strong> ${report.video_metadata.frame_rate} fps</p>
        <p><strong>File Size:</strong> ${report.video_metadata.file_size}</p>
        
        <h2 style="color: #4CAF50;">Anomalies</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; text-align: left;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 8px; border: 1px solid #ddd;">Anomaly ID</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Name</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Description</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Result</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Median Anomaly Score</th>
            </tr>
          </thead>
          <tbody>
            ${report.anomalies.map(anomaly => `
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${anomaly.anomaly_id}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${anomaly.name}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${anomaly.description}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${anomaly.Result}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${anomaly.Video_Median_Anomaly_Score[0].toFixed(3)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <p style="font-size: 0.9em; color: #888; text-align: center;">Report generated on: ${new Date().toLocaleString()}</p>
      </div>
    `;

    // Create a temporary HTML element to use with html2pdf
    const element = document.createElement("div");
    element.innerHTML = htmlString;

    // Configure PDF options
    const options = {
        margin: 15,
        filename: "VideoMetadataReport.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Generate and save the PDF
    html2pdf().set(options).from(element).save();
}


 
export default GeneratePDF;


