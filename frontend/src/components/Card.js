import React from 'react';
import './Card.css';
const Card = ({key, imageSrc, title}) => {
  return (
    <div className="card">
      <img id={key} src={imageSrc} alt={title} />

    </div>
  );
};

export default Card;