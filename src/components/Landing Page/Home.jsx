import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../../App.css';

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

      <section className="stats">
        <div className="stats-grid">
          <StatCard number="1.2k+" label="Projects Completed" />
          <StatCard number="100" label="Monthly Donate" />
          <StatCard number="1200+" label="Partners Worldwide" />
          <StatCard number="1.4m" label="Donations Received" />
        </div>
      </section>
    </div>
  );
}

const StatCard = ({ number, label }) => (
  <div className="stat-card">
    <h3>{number}</h3>
    <p>{label}</p>
  </div>
);

export default Home;