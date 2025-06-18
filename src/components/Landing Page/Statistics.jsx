import './LandingPage.css';

function Statistics() {
      
const StatCard = ({ number, label }) => (
  <div className="stat-card">
    <h3>{number}</h3>
    <p>{label}</p>
  </div>
);
return(
    <>
     <section className="stats">
        <div className="stats-grid">
          <StatCard number="1.2k+" label="Projects Completed" />
          <StatCard number="500" label="Monthly Donate" />
          <StatCard number="1200+" label="Partners Worldwide" />
          <StatCard number="1.4m" label="Donations Received" />
        </div>
      </section>
    </>
);
}

export default Statistics;