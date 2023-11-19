import React from 'react';
import './Card.css';
const Card = ({id, imageSrc, title}) => {
  return (
    <div className="card">
      <img id={id} src={imageSrc} alt={title} />

    </div>
  );
};

export default Card;