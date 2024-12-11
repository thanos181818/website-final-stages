// AnomaliesDisplay.js
import React from 'react';

const AnomaliesDisplay = ({ anomalies }) => {
  return (
    <div className="anomalies">
      <h2>Anomalies</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Anomaly ID</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Description</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Result</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Median Anomaly Score</th>
          </tr>
        </thead>
        <tbody>
          {anomalies.map((anomaly) => (
            <tr key={anomaly.anomaly_id}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{anomaly.anomaly_id}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{anomaly.name}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{anomaly.description}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{anomaly.Result}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {anomaly.Video_Median_Anomaly_Score[0].toFixed(3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnomaliesDisplay;
