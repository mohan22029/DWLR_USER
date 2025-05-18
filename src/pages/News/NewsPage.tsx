import React from 'react';
import './NewsPage.css';

const NewsPage: React.FC = () => {
  return (
    <div className="news-container fade-in">
      <header className="news-header">
        <h1>Latest Water News</h1>
        <p>Stay updated with the latest water-related news and articles</p>
      </header>
      
      <div className="iframe-container">
        <iframe 
          src="https://news-um7u.onrender.com/" 
          title="Water News" 
          className="news-iframe"
        />
      </div>
    </div>
  );
};

export default NewsPage;