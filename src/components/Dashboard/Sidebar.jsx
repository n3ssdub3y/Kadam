import React, { useEffect, useState } from 'react';
import './Dashboard.css'

function Sidebar() {
      const [connections] = useState([
        { name: 'Financial Inclusion Group', title: '501 members' },
        { name: 'Women Entrepreneurs', title: '2.3k members' },
        { name: 'Digital Literacy Advocates', title: '890 members' }
      ]);

    return(
      <>
        <aside className="right-sidebar">
          <div className="connections-card">
            <div className="card-header">
              <h4>Your Network</h4>
              <button className="card-menu">
                <i className="icon more-icon"></i>
              </button>
            </div>
            {connections.map((conn, index) => (
              <div key={index} className="connection">
                <img src="https://via.placeholder.com/40" alt={conn.name} className="connection-img" />
                <div className="connection-info">
                  <p className="connection-name">{conn.name}</p>
                  <small className="connection-title">{conn.title}</small>
                </div>
                <button className="connection-action">
                  <i className="icon connect-icon"></i>
                </button>
              </div>
            ))}
            <button className="view-all-btn">View all</button>
          </div>
          
          <div className="resources-card">
            <div className="card-header">
              <h4>Resources</h4>
            </div>
            <ul className="resources-list">
              <li>
                <a href="#" className="resource-link">
                  <i className="icon funding-icon"></i>
                  <span>Funding Opportunities</span>
                </a>
              </li>
              <li>
                <a href="#" className="resource-link">
                  <i className="icon capacity-icon"></i>
                  <span>Capacity Building</span>
                </a>
              </li>
              <li>
                <a href="#" className="resource-link">
                  <i className="icon volunteer-icon"></i>
                  <span>Volunteer Management</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="ad-card">
            <p className="ad-label">Advertisement</p>
            <div className="ad-content">
              <p>Empower your organization with our premium tools</p>
              <button className="ad-button">Learn More</button>
            </div>
          </div>
        </aside>
      </>  
    );
}
export default Sidebar;