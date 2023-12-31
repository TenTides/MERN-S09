import React from 'react';
import './Card.css';
import Card from './Card';
import './CardGroup.css'
const CardGroup = ({ heading, cardsData, onDeleteClick, selectedCard, onClickOutside, onDeleteTag, onAddTag }) => {
  return (
    <div className="card-group">
      <div className='heading'>{heading}</div>
      <div className="cards">
        {cardsData.map((card, index) => (
          <Card
            key={card._id}
            id={index}
            photoId={card._id}
            imageSrc={card.file}
            title={card.title}
            tags = {card.tags}
            onDeleteClick={onDeleteClick}
            isSelected={selectedCard === index}
            onClickOutside={onClickOutside}
            onDeleteTag = {onDeleteTag}
            onAddTag = {onAddTag}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGroup;