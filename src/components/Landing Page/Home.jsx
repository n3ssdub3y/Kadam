import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Stats from './Statistics';
import './LandingPage.css';

const Home = () => {
  const navigate = useNavigate(); // ✅ Hook added

  return (
    <>
      <Navbar />
      <section className="hero-section">
        {/* Background Image with Overlay */}
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>

        {/* Content */}
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">Kadam</h1>
          <p
            className="hero-subtitle animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            One small Kadam for change, one giant leap for humanity
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-buttons-container animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="hero-button-group">
              <p className="hero-button-label">ARE YOU A</p>
              <button
                className="hero-button"
                onClick={() => navigate('/ngos')} // ✅ Add correct path
              >
                DONOR
              </button>
            </div>

            <div className="hero-button-group">
              <p className="hero-button-label">OR AN</p>
              <button
  className="hero-button"
  onClick={() => navigate('/register')}
>
  NGO
</button>
            </div>
          </div>
        </div>
      </section>

      <Stats />
    </>
  );
};

export default Home;
