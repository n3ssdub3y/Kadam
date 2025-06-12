import React, { useState, useEffect } from 'react';
// import React from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './App.css';
import FilterPanel from './components/FilterPanel';
import NGOList from './components/NGOList';




function App() {
  const [filters, setFilters] = useState({ workType: '', locality: '', efficiency: '' });
  const [ngoData, setNgoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'ngos'));
      const data = snapshot.docs.map(doc => doc.data());
      setNgoData(data);
    };
    fetchData();
  }, []);

  const filteredNGOs = ngoData.filter(ngo =>
    (filters.workType === '' || ngo.workType.toLowerCase().includes(filters.workType.toLowerCase())) &&
    (filters.locality === '' || ngo.locality.toLowerCase().includes(filters.locality.toLowerCase())) &&
    (filters.efficiency === '' || ngo.efficiency >= parseInt(filters.efficiency))
  );

  return (
    <>
    <div className="container">
      <h1>Kadam</h1>
      <p>Take a step towards change</p>
      <FilterPanel filters={filters} setFilters={setFilters} />
      <NGOList ngos={filteredNGOs} />


    
    </div>

    </>
  );
}

export default App;
