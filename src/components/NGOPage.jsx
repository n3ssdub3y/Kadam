import React, { useState, useEffect } from 'react';
import FilterPanel from './FilterPanel';
import NGOList from './NGOList';
import './NGOPage.css'; // Create this CSS file for NGO page specific styles

export const NGOPage = () => {
  const [filters, setFilters] = useState({ 
    workType: '', 
    locality: '', 
    efficiency: '' 
  });
  
  const [ngoData, setNgoData] = useState([
    // Mock data - replace with your actual data or API calls
    {
      id: 1,
      name: "Example NGO 1",
      workType: "Education",
      locality: "Mumbai",
      efficiency: 85,
      description: "Works for children's education"
    },
    {
      id: 2,
      name: "Example NGO 2",
      workType: "Environment",
      locality: "Delhi",
      efficiency: 92,
      description: "Environmental conservation projects"
    },
    // Add more NGOs as needed
  ]);

  // If you want to keep the useEffect for future API integration:
  useEffect(() => {
    // This is where you would fetch data if using an API
    // const fetchData = async () => {
    //   const response = await fetch('your-api-endpoint');
    //   const data = await response.json();
    //   setNgoData(data);
    // };
    // fetchData();
  }, []);

  const filteredNGOs = ngoData.filter(ngo =>
    (filters.workType === '' || ngo.workType.toLowerCase().includes(filters.workType.toLowerCase())) &&
    (filters.locality === '' || ngo.locality.toLowerCase().includes(filters.locality.toLowerCase())) &&
    (filters.efficiency === '' || ngo.efficiency >= parseInt(filters.efficiency))
  );

  return (
    <div className="ngo-container">
      <h1>Kadam</h1>
      <p>Take a step towards change</p>
      <FilterPanel filters={filters} setFilters={setFilters} />
      <NGOList ngos={filteredNGOs} />
    </div>
  );
};

// No default export - we're only using named export