import React from 'react';
import '../../styles/index.css'; 

const Card = ({ title, value, description }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="card-value">{value}</div>
    </div>
  );
};

export default Card;