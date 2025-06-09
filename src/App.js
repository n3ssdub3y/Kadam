import React, { useState } from 'react';
import FilterPanel from './components/FilterPanel';
import NGOList from './components/NGOList';
import './App.css';


function App() {
  const [filters, setFilters] = useState({ workType: '', locality: '', efficiency: '' });

  const ngoData = [
    { name: 'Helping Hands', workType: 'Education', locality: 'Delhi', efficiency: 9 },
    { name: 'Green Earth', workType: 'Environment', locality: 'Mumbai', efficiency: 7 },
    { name: 'Care for All', workType: 'Health', locality: 'Bangalore', efficiency: 8 },
  ];

  const filteredNGOs = ngoData.filter(ngo =>
    (filters.workType === '' || ngo.workType.toLowerCase().includes(filters.workType.toLowerCase())) &&
    (filters.locality === '' || ngo.locality.toLowerCase().includes(filters.locality.toLowerCase())) &&
    (filters.efficiency === '' || ngo.efficiency >= parseInt(filters.efficiency))
  );

  return (
    <div className="container">
      <h1>Kadam</h1>
      <p>Take a step towards change</p>
      <FilterPanel filters={filters} setFilters={setFilters} />
      <NGOList ngos={filteredNGOs} />
    </div>
  );

}

export default App;

