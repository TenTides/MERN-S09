import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Card.css';


const Card = ({ id, photoId, imageSrc, title, onClick, onDeleteClick, onClickOutside, isSelected }) => {
  const [showTags, setShowTags] = useState(isSelected);
  const cardRef = useRef(null);

  useEffect(() => {
    setShowTags(isSelected);
  }, [isSelected]);

  const handleCardClick = () => {
    // onClick(id); // not working, probably not needed because delete gets the id
    setShowTags(true);
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onClickOutside();
      }
    },
    [onClickOutside]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setShowTags(false);
    onDeleteClick(photoId);
  };

  return (
    <div className={`cardWrapper ${showTags ? 'enlarged' : ''}`} onClick={handleCardClick} ref={cardRef}>
      <div className="card">
        <img src={imageSrc} alt={title} />
      </div>
      {showTags && (
        <div className='editCard'>
          <div className="Tags">
            TAGS: 
            ...
          </div>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Card;