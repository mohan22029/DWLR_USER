import React from 'react';
import { 
  Droplet, 
  Thermometer, 
  Gauge, 
  Battery, 
  TrendingUp, 
  TrendingDown, 
  MinusIcon 
} from 'lucide-react';
import './DataCard.css';

interface DataCardProps {
  title: string;
  value: string;
  icon: 'water-level' | 'temperature' | 'pressure' | 'battery';
  changeValue?: string;
  status?: 'normal' | 'warning' | 'alert';
}

const DataCard: React.FC<DataCardProps> = ({ 
  title, 
  value, 
  icon, 
  changeValue = 'N/A',
  status = 'normal'
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'water-level':
        return <Droplet size={24} className="card-icon water-icon" />;
      case 'temperature':
        return <Thermometer size={24} className="card-icon temperature-icon" />;
      case 'pressure':
        return <Gauge size={24} className="card-icon pressure-icon" />;
      case 'battery':
        return <Battery size={24} className="card-icon battery-icon" />;
      default:
        return <Droplet size={24} className="card-icon" />;
    }
  };

  const renderChangeIcon = () => {
    if (changeValue === 'N/A') return null;
    
    const numericChange = parseFloat(changeValue);
    if (isNaN(numericChange)) return <MinusIcon size={16} />;
    
    if (numericChange > 0) {
      return <TrendingUp size={16} className="change-icon up" />;
    } else if (numericChange < 0) {
      return <TrendingDown size={16} className="change-icon down" />;
    } else {
      return <MinusIcon size={16} className="change-icon neutral" />;
    }
  };

  const getCardClass = () => {
    let classes = 'data-card slide-in-up';
    if (status === 'warning') classes += ' warning';
    if (status === 'alert') classes += ' alert';
    return classes;
  };

  return (
    <div className={getCardClass()}>
      <div className="card-header">
        <h3>{title}</h3>
        {renderIcon()}
      </div>
      <div className="card-value">{value}</div>
      {changeValue !== 'N/A' && (
        <div className="card-change">
          {renderChangeIcon()}
          <span>{changeValue}</span>
        </div>
      )}
      {status !== 'normal' && (
        <div className={`status-indicator ${status}`}>
          {status === 'warning' ? 'Warning' : 'Alert'}
        </div>
      )}
    </div>
  );
};

export default DataCard;