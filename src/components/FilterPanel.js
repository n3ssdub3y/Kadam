import React from 'react';

const FilterPanel = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <input
        name="workType"
        placeholder="Filter by Work Type"
        onChange={handleChange}
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <input
        name="locality"
        placeholder="Filter by Locality"
        onChange={handleChange}
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <input
        name="efficiency"
        placeholder="Min Efficiency"
        type="number"
        onChange={handleChange}
        style={{ padding: '0.5rem' }}
      />
    </div>
  );
};

export default FilterPanel;
