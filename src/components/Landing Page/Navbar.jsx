import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const Navbar = () => {
  const navItems = ['Home', 'Causes', 'Single Cause', 'About Us', 'Contact Us'];

  return (
    <header className="navbar" >
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo-container">
          <span className="logo-text">Kadam</span>
        </div>

        {/* Navigation */}
        <nav className="nav-menu">
          {navItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="nav-link"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;