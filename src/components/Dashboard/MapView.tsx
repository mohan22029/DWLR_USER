import React, { useEffect, useRef } from 'react';
import { WaterData } from '../../services/api';
import { MapPin } from 'lucide-react';
import './MapView.css';

interface MapViewProps {
  data: WaterData[];
}

const MapView: React.FC<MapViewProps> = ({ data }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // In a real implementation, this would use a mapping library like Leaflet or Google Maps
  // For this example, we'll simulate a map with CSS and place markers based on data
  
  useEffect(() => {
    if (!mapRef.current || data.length === 0) return;
    
    // This would be replaced with actual map initialization code
    const mapElement = mapRef.current;
    mapElement.innerHTML = '';
    
    // Mock data for placing markers
    const mockLocations = [
      { lat: 30, lng: 50, label: 'Station A' },
      { lat: 60, lng: 30, label: 'Station B' },
      { lat: 40, lng: 70, label: 'Station C' },
      { lat: 70, lng: 60, label: 'Station D' },
    ];
    
    // Create markers based on mock locations and associate with data points
    mockLocations.forEach((location, index) => {
      const marker = document.createElement('div');
      marker.className = 'map-marker';
      
      // Position marker based on mock coordinates
      marker.style.left = `${location.lng}%`;
      marker.style.top = `${location.lat}%`;
      
      // Determine if this marker should show an anomaly
      const dataPoint = data[Math.min(index, data.length - 1)];
      const hasAnomaly = dataPoint.Anomaly === "Yes";
      
      if (hasAnomaly) {
        marker.classList.add('anomaly');
      }
      
      // Create marker content
      marker.innerHTML = `
        <div class="marker-icon ${hasAnomaly ? 'anomaly' : ''}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div class="marker-tooltip">
          <strong>${location.label}</strong>
          <p>Water Level: ${dataPoint.Water_Level.toFixed(2)} m</p>
          <p>Temp: ${dataPoint.Water_Temperature.toFixed(1)} °C</p>
          ${hasAnomaly ? '<p class="anomaly-text">Anomaly Detected!</p>' : ''}
        </div>
      `;
      
      mapElement.appendChild(marker);
    });
    
  }, [data]);

  return (
    <div className="map-container">
      <div className="map-overlay">
        <div className="map-legend">
          <div className="legend-item">
            <span className="marker-dot normal"></span>
            <span>Normal</span>
          </div>
          <div className="legend-item">
            <span className="marker-dot anomaly"></span>
            <span>Anomaly</span>
          </div>
        </div>
      </div>
      <div ref={mapRef} className="map-view">
        {/* Map will be rendered here */}
        {data.length === 0 && (
          <div className="map-placeholder">
            <MapPin size={32} />
            <p>No data available to display on map</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;