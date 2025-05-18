import React, { useState, useEffect } from 'react';
import { fetchWaterData, WaterData } from '../../services/api';
import DataCard from '../../components/Dashboard/DataCard';
import MapView from '../../components/Dashboard/MapView';
import WaterLevelChart from '../../components/Dashboard/WaterLevelChart';
import AnomalyList from '../../components/Dashboard/AnomalyList';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [waterData, setWaterData] = useState<WaterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = async () => {
    try {
      const data = await fetchWaterData();
      setWaterData(data);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch water monitoring data');
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
    
    // Set up interval to refresh data every 14 seconds
    const intervalId = setInterval(() => {
      loadData();
    }, 14000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Get the latest data point
  const latestData = waterData.length > 0 ? waterData[waterData.length - 1] : null;
  
  // Get anomaly data
  const anomalyData = waterData.filter(data => data.Anomaly === "Yes");

  return (
    <div className="dashboard-container fade-in">
      <header className="dashboard-header">
        <h1>Water Monitoring Dashboard</h1>
        <div className="dashboard-actions">
          <span className="last-updated">
            {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : ''}
          </span>
          <button className="btn btn-primary" onClick={loadData}>Refresh Data</button>
        </div>
      </header>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading water monitoring data...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button className="btn btn-primary" onClick={loadData}>Try Again</button>
        </div>
      ) : (
        <div className="dashboard-content">
          {/* Key Metrics Cards */}
          <div className="metrics-grid">
            <DataCard
              title="Current Water Level"
              value={latestData ? `${latestData.Water_Level.toFixed(2)} m` : 'N/A'}
              icon="water-level"
              changeValue={latestData && waterData.length > 1 ? 
                (latestData.Water_Level - waterData[waterData.length - 2].Water_Level).toFixed(2) + " m" : 'N/A'}
              status={latestData?.Anomaly === "Yes" ? "alert" : "normal"}
            />
            <DataCard
              title="Water Temperature"
              value={latestData ? `${latestData.Water_Temperature.toFixed(1)} °C` : 'N/A'}
              icon="temperature"
              changeValue={latestData && waterData.length > 1 ? 
                (latestData.Water_Temperature - waterData[waterData.length - 2].Water_Temperature).toFixed(1) + " °C" : 'N/A'}
              status="normal"
            />
            <DataCard
              title="Barometric Pressure"
              value={latestData ? `${latestData.Barometric_Pressure.toFixed(1)} hPa` : 'N/A'}
              icon="pressure"
              changeValue={latestData && waterData.length > 1 ? 
                (latestData.Barometric_Pressure - waterData[waterData.length - 2].Barometric_Pressure).toFixed(1) + " hPa" : 'N/A'}
              status="normal"
            />
            <DataCard
              title="Battery Voltage"
              value={latestData ? `${latestData.Battery_V.toFixed(2)} V` : 'N/A'}
              icon="battery"
              changeValue={latestData && waterData.length > 1 ? 
                (latestData.Battery_V - waterData[waterData.length - 2].Battery_V).toFixed(2) + " V" : 'N/A'}
              status={latestData && latestData.Battery_V < 3.6 ? "warning" : "normal"}
            />
          </div>

          {/* Map and Chart Section */}
          <div className="map-chart-container">
            <div className="map-section">
              <h2>Monitoring Locations</h2>
              <MapView data={waterData} />
            </div>
            <div className="chart-section">
              <h2>Water Level Trends</h2>
              <WaterLevelChart data={waterData} />
            </div>
          </div>

          {/* Anomaly Section */}
          <div className="anomaly-section">
            <h2>Detected Anomalies</h2>
            <AnomalyList anomalies={anomalyData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;