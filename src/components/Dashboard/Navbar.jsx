import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';
import React, { useEffect, useState } from 'react';

function Navbar() {
  const [logoURL, setLogoURL] = useState('');
  const [ngo, setNgo] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active tab based on current route
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="Kadam-header">
      <div className="header-content">
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="logo-text">Kadam</span>
            <span className="logo-footprint">👣</span>
          </Link>
        </div>
        
        <nav className="main-nav">
          <Link 
            to="/dashboard" 
            className={`nav-item ${isActive('/dashboard')}`}
          >
            <div className="nav-icon-container">
              <i className="icon feed-icon"></i>
              {isActive('/dashboard') && <div className="nav-pulse"></div>}
            </div>
            <span>Feed</span>
          </Link>
          
          <Link 
            to="/network" 
            className={`nav-item ${isActive('/network')}`}
          >
            <div className="nav-icon-container">
              <i className="icon network-icon"></i>
              {isActive('/network') && <div className="nav-pulse"></div>}
            </div>
            <span>My Network</span>
          </Link>
          
          <Link 
            to="/opportunities" 
            className={`nav-item ${isActive('/opportunities')}`}
          >
            <div className="nav-icon-container">
              <i className="icon jobs-icon"></i>
              {isActive('/opportunities') && <div className="nav-pulse"></div>}
            </div>
            <span>Opportunities</span>
          </Link>
          
          <Link 
            to="/messaging" 
            className={`nav-item ${isActive('/messaging')}`}
          >
            <div className="nav-icon-container">
              <i className="icon messaging-icon"></i>
              {isActive('/messaging') && <div className="nav-pulse"></div>}
            </div>
            <span>Messaging</span>
          </Link>
          
          <Link 
            to="/notifications" 
            className={`nav-item ${isActive('/notifications')}`}
          >
            <div className="nav-icon-container">
              <i className="icon notifications-icon"></i>
              {isActive('/notifications') && <div className="nav-pulse"></div>}
            </div>
            <span>Notifications</span>
          </Link>
        </nav>
        
      </div>
    </header>
  );
}

export default Navbar;