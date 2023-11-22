import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Card.css';


const Card = ({ id, photoId, imageSrc, title, tags, onClick, onDeleteClick, onClickOutside, isSelected, onDeleteTag, onAddTag }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [showTagInput, setTagInput] = useState(false);
  const [localTags, setLocalTags] = useState(tags);
  const [tagColors, setTagColors] = useState({});

  const handleWrapperClick = (event) => {
    if (isEnlarged) {
      setIsEnlarged(false);
    }
  };

  const handleImageClick = (event) => {
    event.stopPropagation();
    setIsEnlarged(true);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDeleteClick(photoId);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
  };

  const deleteTag = (index) => {
    onDeleteTag(photoId, index);
  };

  const openTagInput = () => {
    setTagInput(true);
  };

  const closeTagInput = () => {
    setTagInput(false);
  };

  const colors = ['#54d676', '#70dbe0', '#ebeb94', '#d68c69', '#b281e3', '#eb7f8d'];

  const getColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const addTag = () => {
    const inputElement = document.getElementById('addTagInput');
    const newTag = inputElement.value.trim();

    if (newTag !== '') {
      const updatedTags = [...localTags, newTag];
      setLocalTags(updatedTags);

      const newColor = getColor();

      setTagColors(prevColors => ({
        ...prevColors,
        [newTag]: newColor,
      }));


      onAddTag(photoId, newTag);
      setTagInput(false);
    }
  };

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  const getColorForTag = (tag) => {
    if (tagColors[tag]) {
      return tagColors[tag];
    }

    const newColor = getColor();
    setTagColors(prevColors => ({
      ...prevColors,
      [tag]: newColor,
    }));

    return newColor;
  };

  return (
    <div className={`cardWrapper ${isEnlarged ? 'enlarged' : ''}`} onClick={handleWrapperClick}>
      <div className={`card ${isEnlarged ? 'enlarged' : ''}`} onClick={handleImageClick}>
        <img src={imageSrc} alt={title} />
      </div>
      {isEnlarged && (
        <div className='editCard' onClick={handleEditClick}>
          <div className="tags">
            {localTags.length > 0 && localTags.map((tag, index) => (
              <span 
                key={index} 
                className='tag' 
                style={{ backgroundColor: getColorForTag(tag) }}
              >
                {tag} 
                <button onClick={() => deleteTag(index)}>&times;</button>
              </span>
            ))}
            {showTagInput && (
              <div className="tagInputContainer">
                <input
                  id="addTagInput" 
                  type="text" 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addTag();
                    }
                  }}
                />
                <button className="closeButton" onClick={closeTagInput}>&times;</button>
              </div>
            )}
            {!showTagInput && <button id="addTagBtn" onClick={openTagInput}>+</button>}
          </div>
          <button className='deleteBtn' onClick={handleDeleteClick}>Delete Image</button>
        </div>
      )}
    </div>
  );
};

export default Card;





