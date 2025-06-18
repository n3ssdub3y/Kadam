import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Stats from './Statistics';
import './LandingPage.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Navbar />
      
      <section className="hero">
        <h1>One small Kadam for change, one giant leap for humanity.</h1>
      </section>

      <section className="user-selection">
        <h2>ARE YOU AN</h2>
        <div className="buttons">
          <button onClick={() => navigate('/ngos')}>NGO</button>
          <span>OR A</span>
          <button>DONOR</button>
        </div>
      </section>

<Stats></Stats>
    </div>
  );
}


export default Home;