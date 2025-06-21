import React, { useState, useEffect, useRef } from 'react';
import './LandingPage.css';

const StatCard = ({ number, label, icon }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const increment = Math.ceil(number / (duration / 16));
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [isVisible, number]);

  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-icon">{icon}</div>
      <h3>{count.toLocaleString()}{label.includes('+') ? '+' : ''}</h3>
      <p>{label}</p>
    </div>
  );
};

function Statistics() {
  const stats = [
    { number: 1200, label: "Projects Completed", icon: "📋" },
    { number: 500, label: "Monthly Donors", icon: "❤️" },
    { number: 1200, label: "Partners Worldwide", icon: "🌎" },
    { number: 1400000, label: "Donations Received", icon: "💰" }
  ];

  return (
    <section className="stats">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            number={stat.number}
            label={stat.label}
            icon={stat.icon}
          />
        ))}
      </div>
    </section>
  );
}

export default Statistics;