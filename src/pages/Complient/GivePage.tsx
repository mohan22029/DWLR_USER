import React from 'react';
import { GiftIcon } from 'lucide-react';
import './GivePage.css';

const GivePage: React.FC = () => {
  return (
    <div className="give-container fade-in">
      <header className="give-header">
        <h1>Water Level Prediction</h1>
        <p></p>
      </header>

      <div className="iframe-container">
        <iframe 
          src="https://irrigation-monitoring-35fc0.web.app" 
          title="Feedback Form" 
          className="news-iframe"
        />
      </div>
    </div>
  );
};

export default GivePage;
