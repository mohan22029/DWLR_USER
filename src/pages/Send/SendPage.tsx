import React from 'react';
import { SendIcon } from 'lucide-react';
import './SendPage.css';

const SendPage: React.FC = () => {
  return (
    <div className="send-container fade-in">
      <header className="send-header">
        <h1>Rasie Complaint</h1>
        <p>Send your queris about water monitoring</p>
      </header>
      
      <div className="iframe-container">
        <iframe 
          src="https://aquaalert.netlify.app/" 
          title="Water News" 
          className="news-iframe"
        />
      </div>
    </div>
  );
};

export default SendPage;