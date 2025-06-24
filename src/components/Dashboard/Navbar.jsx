import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import React, { useEffect, useState } from 'react';


function Navbar() {
          const [logoURL, setLogoURL] = useState('');
            const [ngo, setNgo] = useState(null);
          
    
    return(
        <>
        <header className="Kadam-header">
        <div className="header-content">
          <div className="logo">
            <Link to="/">Kadam 👣</Link>
          </div>
          <nav className="main-nav">
            <Link to="/dashboard" className="nav-item">
              <i className="icon feed-icon"></i>
              <span>Feed</span>
            </Link>
            <Link to="/network" className="nav-item">
              <i className="icon network-icon"></i>
              <span>My Network</span>
            </Link>
            <Link to="/opportunities" className="nav-item">
              <i className="icon jobs-icon"></i>
              <span>Opportunities</span>
            </Link>
            <Link to="/messaging" className="nav-item">
              <i className="icon messaging-icon"></i>
              <span>Messaging</span>
            </Link>
            <Link to="/notifications" className="nav-item">
              <i className="icon notifications-icon"></i>
              <span>Notifications</span>
            </Link>
          </nav>
          <div className="user-menu" onClick={() => navigate('/profile')}>
            {/* {logoURL ? (
              <img src={logoURL} alt="Profile" className="profile-pic-small" />
            ) : (
              <div className="profile-pic-placeholder-small">
                {ngo.ngoName.charAt(0)}
              </div>
            )} */}
            <span>Me <i className="dropdown-icon"></i></span>
          </div>
        </div>
      </header>
        </>
    );
}
export default Navbar;