import React, { useEffect, useRef } from 'react';
import { WaterData } from '../../services/api';
import './WaterLevelChart.css';

interface WaterLevelChartProps {
  data: WaterData[];
}

const WaterLevelChart: React.FC<WaterLevelChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;
    
    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Extract water level and date data
    const waterLevels = data.map(item => item.Water_Level);
    const dates = data.map(item => new Date(item.Date_Time));
    const anomalies = data.map(item => item.Anomaly === "Yes");
    
    // Find min and max values for scaling
    const minWaterLevel = Math.min(...waterLevels);
    const maxWaterLevel = Math.max(...waterLevels);
    const range = maxWaterLevel - minWaterLevel;
    const padding = range * 0.1; // Add 10% padding
    
    // Draw chart
    const width = canvas.width;
    const height = canvas.height;
    const paddingX = 40;
    const paddingY = 30;
    const chartWidth = width - paddingX * 2;
    const chartHeight = height - paddingY * 2;
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#94a3b8'; // Gray color
    ctx.lineWidth = 1;
    ctx.moveTo(paddingX, paddingY);
    ctx.lineTo(paddingX, height - paddingY);
    ctx.lineTo(width - paddingX, height - paddingY);
    ctx.stroke();
    
    // Draw labels
    ctx.font = '10px Poppins, sans-serif';
    ctx.fillStyle = '#64748b';
    
    // Y-axis labels
    const yLabelCount = 5;
    for (let i = 0; i <= yLabelCount; i++) {
      const value = minWaterLevel - padding + ((maxWaterLevel + padding) - (minWaterLevel - padding)) * (i / yLabelCount);
      const y = height - paddingY - (i / yLabelCount) * chartHeight;
      
      ctx.fillText(value.toFixed(1) + ' m', 5, y + 3);
      
      // Draw grid line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.5)';
      ctx.moveTo(paddingX, y);
      ctx.lineTo(width - paddingX, y);
      ctx.stroke();
    }
    
    // X-axis labels (show only a few dates for clarity)
    const xLabelStep = Math.max(1, Math.floor(data.length / 6));
    for (let i = 0; i < data.length; i += xLabelStep) {
      const date = dates[i];
      const x = paddingX + (i / (data.length - 1)) * chartWidth;
      
      ctx.save();
      ctx.translate(x, height - paddingY + 10);
      ctx.rotate(Math.PI / 4);
      ctx.fillText(date.toLocaleDateString(), 0, 0);
      ctx.restore();
    }
    
    // Draw data line
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6'; // Primary blue
    ctx.lineWidth = 2;
    
    for (let i = 0; i < data.length; i++) {
      const x = paddingX + (i / (data.length - 1)) * chartWidth;
      const normalizedValue = (waterLevels[i] - (minWaterLevel - padding)) / ((maxWaterLevel + padding) - (minWaterLevel - padding));
      const y = height - paddingY - normalizedValue * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    
    // Add gradient fill below the line
    const gradient = ctx.createLinearGradient(0, paddingY, 0, height - paddingY);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(paddingX, height - paddingY);
    
    for (let i = 0; i < data.length; i++) {
      const x = paddingX + (i / (data.length - 1)) * chartWidth;
      const normalizedValue = (waterLevels[i] - (minWaterLevel - padding)) / ((maxWaterLevel + padding) - (minWaterLevel - padding));
      const y = height - paddingY - normalizedValue * chartHeight;
      
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(width - paddingX, height - paddingY);
    ctx.closePath();
    ctx.fill();
    
    // Draw anomaly points
    for (let i = 0; i < data.length; i++) {
      if (anomalies[i]) {
        const x = paddingX + (i / (data.length - 1)) * chartWidth;
        const normalizedValue = (waterLevels[i] - (minWaterLevel - padding)) / ((maxWaterLevel + padding) - (minWaterLevel - padding));
        const y = height - paddingY - normalizedValue * chartHeight;
        
        ctx.beginPath();
        ctx.fillStyle = '#ef4444'; // Red color for anomalies
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    
  }, [data]);
  
  return (
    <div className="chart-container">
      {data.length === 0 ? (
        <div className="chart-placeholder">
          <p>No data available for chart</p>
        </div>
      ) : (
        <canvas 
          ref={chartRef} 
          width={600} 
          height={300} 
          className="water-level-chart"
        />
      )}
    </div>
  );
};

export default WaterLevelChart;