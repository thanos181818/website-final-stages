// ReportDisplay.js
import React from 'react';
import { Line } from 'react-chartjs-2';
// import './ReportDisplay.css';


export default function ReportDisplay({ report, anomaly1, isChartRendered, graphRef }) {
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
    <div className="report-wrapper">
      <h3>Uploaded Video</h3>
      <video src={report?.video_metadata?.video_url} controls className="uploaded-video-2" />

      <div className="report-data">
        <h3>Analysis Report</h3>
        <ul>
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
              <strong>{anomaly.name}</strong>
              {anomaly.anomaly_scores.map((score, index) => (
                <span key={index}>
                  Score at {anomaly.timestamps[index].join(':')}: {score}{' '}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>

      {anomaly1 && (
        <div className="graph-section">
          <h4>Graph for {anomaly1.name}</h4>
          {/* <Line
            ref={graphRef}
            data={graphData}
            options={options}
            onAfterRender={() => setIsChartRendered(true)}
          /> */}
        </div>
      )}
    </div>
  );
}
