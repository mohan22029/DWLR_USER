import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Send, Menu, X, Droplets } from 'lucide-react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="mobile-toggle" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </div>
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <Droplets size={28} className="logo-icon" />
            <h1>AquaMonitor</h1>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/news" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
            <Newspaper size={20} />
            <span>News</span>
          </NavLink>
          
          <NavLink to="/send" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
            <Send size={20} />
            <span>Send</span>
          </NavLink>
          <NavLink to="/predict" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
            <Send size={20} />
            <span>Prediction</span>
          </NavLink>
          
          

        </nav>
        
        <div className="sidebar-footer">
          <p>© 2025 AquaMonitor</p>
          <p>v1.0.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;