import React from 'react';

const NGOCard = ({ name, workType, locality, efficiency }) => {
  return (
   <div className="card">
    <h3>{name}</h3>
    <p><strong>Type:</strong> {workType}</p>
    <p><strong>Locality:</strong> {locality}</p>
    <p><strong>Efficiency:</strong> {efficiency}/10</p>
    </div>
  );
};

export default NGOCard;
