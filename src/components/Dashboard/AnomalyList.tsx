import React from 'react';
import { WaterData } from '../../services/api';
import { AlertTriangle } from 'lucide-react';
import './AnomalyList.css';

interface AnomalyListProps {
  anomalies: WaterData[];
}

const AnomalyList: React.FC<AnomalyListProps> = ({ anomalies }) => {
  if (anomalies.length === 0) {
    return (
      <div className="no-anomalies">
        <div className="no-anomalies-icon">
          <AlertTriangle size={32} />
        </div>
        <p>No anomalies detected in the current data set.</p>
      </div>
    );
  }

  return (
    <div className="anomalies-container">
      <div className="anomalies-list">
        {anomalies.map((anomaly, index) => (
          <div key={index} className="anomaly-item pulse">
            <div className="anomaly-icon">
              <AlertTriangle size={20} />
            </div>
            <div className="anomaly-details">
              <div className="anomaly-date">
                {new Date(anomaly.Date_Time).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
              <div className="anomaly-values">
                <div className="anomaly-value">
                  <span>Water Level:</span> {anomaly.Water_Level.toFixed(2)} m
                </div>
                <div className="anomaly-value">
                  <span>Water Temp:</span> {anomaly.Water_Temperature.toFixed(1)} °C
                </div>
                <div className="anomaly-value">
                  <span>Pressure:</span> {anomaly.Barometric_Pressure.toFixed(1)} hPa
                </div>
                <div className="anomaly-value">
                  <span>Battery:</span> {anomaly.Battery_V.toFixed(2)} V
                </div>
              </div>
            </div>
            <div className="anomaly-actions">
              <button className="btn-small">Details</button>
              <button className="btn-small btn-acknowledge">Acknowledge</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnomalyList;