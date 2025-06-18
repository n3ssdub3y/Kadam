import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className="logo">Kadam</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/">Causes</Link>
        <Link to="/">Single Cause</Link>
        <Link to="/">About Us</Link>
        <Link to="/">Contact Us</Link>
      </div>
    </nav>
  );
}

export default Navbar;