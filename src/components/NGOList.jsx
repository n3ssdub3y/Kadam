import React from 'react';
import NGOCard from './NGOCard';

const NGOList = ({ ngos }) => {
  return (
    <div>
      {ngos.length === 0 ? <p>No NGOs match your filters.</p> :
        ngos.map((ngo, index) => (
          <NGOCard key={index} {...ngo} />
        ))
      }
    </div>
  );
};

export default NGOList;
