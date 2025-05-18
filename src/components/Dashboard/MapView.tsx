import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WaterData } from '../../services/api';
import { MapPin } from 'lucide-react';
import './MapView.css';

// Fix default Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Define a custom circle icon using SVG
const customIcon = (hasAnomaly: boolean) =>
  new L.DivIcon({
    html: `
      <svg height="24" width="24" viewBox="0 0 24 24" style="transform: translate(-12px, -24px);">
        <circle cx="12" cy="12" r="10" fill="${hasAnomaly ? '#FF4C4C' : '#2A9D8F'}" stroke="white" stroke-width="2" />
      </svg>
    `,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

interface MapViewProps {
  data: WaterData[];
}

const MapView: React.FC<MapViewProps> = ({ data }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize Leaflet map
    const map = L.map(mapRef.current, {
      center: [20.5937, 78.9629], // Center of India
      zoom: 5,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      dragging: true,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    // Add base map layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || data.length === 0) return;

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current?.removeLayer(layer);
      }
    });

    // Add markers based on data
    data.forEach((dataPoint, index) => {
      // Use mock coordinates for demonstration; replace with actual lat/lng from data if available
      const mockLocations = [
        { lat: 20.5937, lng: 78.9629, label: 'Station A' },
        { lat: 22.5937, lng: 80.9629, label: 'Station B' },
        { lat: 18.5937, lng: 76.9629, label: 'Station C' },
        { lat: 24.5937, lng: 82.9629, label: 'Station D' },
      ];

      const location = mockLocations[index % mockLocations.length];
      const hasAnomaly = dataPoint.Anomaly === 'Yes';

      if (location.lat && location.lng) {
        const marker = L.marker([location.lat, location.lng], {
          icon: customIcon(hasAnomaly),
        }).addTo(mapInstanceRef.current!);

        marker.bindTooltip(location.label);

        marker.bindPopup(`
          <div>
            <strong>${location.label}</strong><br />
            <strong>Water Level:</strong> ${dataPoint.Water_Level.toFixed(2)} m<br />
            <strong>Temp:</strong> ${dataPoint.Water_Temperature.toFixed(1)} °C<br />
            ${hasAnomaly ? '<p class="anomaly-text">Anomaly Detected!</p>' : ''}
          </div>
        `);
      }
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