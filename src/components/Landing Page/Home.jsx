import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Stats from './Statistics';
import './LandingPage.css';

const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const scrollPosition = window.scrollY;
        const scale = 1 + scrollPosition * 0.0005;
        videoRef.current.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      
      <section className="hero-section">
        <div className="hero-background">
          <video
            ref={videoRef}
            className="background-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="poor_children.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
          
        </div>

        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">Kadam</h1>
          <p className="hero-subtitle animate-fade-in">
            One small Kadam for change, one giant leap for humanity
          </p>

          <div className="hero-buttons-container">
            <div className="hero-button-group">
              <p className="hero-button-label">ARE YOU A</p>
              <button
                className="hero-button animate-fade-in"
                onClick={() => navigate('/ngos')}
              >
                VIEWER
              </button>
            </div>

            <div className="hero-button-group">
              <p className="hero-button-label">OR AN</p>
              <button
                className="hero-button animate-fade-in"
                onClick={() => navigate('/NGOregister')}
              >
                NGO
              </button>
            </div>
          </div>
        </div>
      </section>

      <Stats />
    </div>
  );
};

export default Home;