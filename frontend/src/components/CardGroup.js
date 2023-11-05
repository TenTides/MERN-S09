import React from 'react';
import './Card.css';
import Card from './Card';
import './CardGroup.css'
const CardGroup = ({heading, cardsData }) => {
  return (
    <div className="card-group">
      <div className='heading'>{heading}</div>
      <div className="cards">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            imageSrc={card.imageSrc}
            title={card.title}
          />
        ))}
      </div>
      
    </div>
  );
};

export default CardGroup;