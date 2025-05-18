import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Add chat bot script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.wonderchat.io/scripts/wonderchat.js';
    script.setAttribute('data-name', 'wonderchat');
    script.setAttribute('data-address', 'app.wonderchat.io');
    script.setAttribute('data-id', 'cmas3uwfw011evvezmy0qmhik');
    script.setAttribute('data-widget-size', 'normal');
    script.setAttribute('data-widget-button-size', 'normal');
    script.defer = true;
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;