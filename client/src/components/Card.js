import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Card.css';


const Card = ({ id, photoId, imageSrc, title, tags, onClick, onDeleteClick, onClickOutside, isSelected, onDeleteTag, onAddTag }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [showTagInput, setTagInput] = useState(false);
  const [localTags, setLocalTags] = useState(tags);
  const [tagColors, setTagColors] = useState({});

  const imgRef = useRef(null);

  useEffect(() => {
    const adjustImageSize = () => {
      console.log('adjustnig size');
      const imgElement = imgRef.current;
      const cardElement = imgElement.parentElement;
  
      if (imgElement) {
        const aspectRatio = imgElement.width / imgElement.height;
  
        if (aspectRatio > 1) {
          // Landscape image
          cardElement.style.maxWidth = '40vw';
          imgElement.style.maxWidth = '40vw';
          cardElement.style.maxHeight = 'auto';
          imgElement.style.maxHeight = 'auto';
        } else {
          // Portrait image
          cardElement.style.maxWidth = 'auto';
          imgElement.style.maxWidth = 'auto';
          cardElement.style.maxHeight = '30vh';
          imgElement.style.maxHeight = '30vh';
        }
      }
    };
  
    const imgElement = imgRef.current;
  
    if (imgElement && imgElement.complete) {
      adjustImageSize();
    } else {
      imgRef.current.addEventListener('load', adjustImageSize);
    }
  
    return () => {
      if (imgElement) {
        imgElement.removeEventListener('load', adjustImageSize);
      }
    };
  }, []);

  const handleWrapperClick = (event) => {
    if (isEnlarged) {
      setIsEnlarged(false);
  
      const cardElement = imgRef.current.parentElement;
      const imgElement = imgRef.current;
  
      if (cardElement && imgElement) {
        const aspectRatio = imgElement.width / imgElement.height;
  
        if (aspectRatio > 1) {
          // Landscape image
          cardElement.style.maxWidth = '40vw'; // Set the original max width
          cardElement.style.maxHeight = 'auto';
          imgElement.style.maxWidth = '40vw';
          imgElement.style.maxHeight = 'auto';
        } else {
          // Portrait image
          cardElement.style.maxWidth = 'auto';
          cardElement.style.maxHeight = '30vh'; // Set the original max height
          imgElement.style.maxWidth = 'auto';
          imgElement.style.maxHeight = '30vh';
        }
      }
    }
  };

  const handleImageClick = (event) => {
    event.stopPropagation();
    setIsEnlarged(true);
  
    const cardElement = imgRef.current.parentElement;
    const imgElement = imgRef.current;
  
    if (cardElement && imgElement) {
      const aspectRatio = imgElement.width / imgElement.height;
  
      if (aspectRatio > 1) {
        // Landscape image
        const currentMaxWidth = parseFloat(window.getComputedStyle(cardElement).maxWidth);
        const newMaxWidth = currentMaxWidth * 2;
        cardElement.style.maxWidth = `${newMaxWidth}px`;
        console.log('new max width', newMaxWidth);
        cardElement.style.maxHeight = 'auto';
        imgElement.style.maxWidth = `${newMaxWidth}px`; // Set the image width to 100%
        imgElement.style.maxHeight = 'auto';
      } else {
        // Portrait image
        const currentMaxHeight = parseFloat(window.getComputedStyle(cardElement).maxHeight);
        const newMaxHeight = currentMaxHeight * 2;
        cardElement.style.maxWidth = 'auto';
        cardElement.style.maxHeight = `${newMaxHeight}px`;
        imgElement.style.maxWidth = 'auto';
        imgElement.style.maxHeight = `${newMaxHeight}px`; // Set the image height to 100%
      }
    }
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
      console.log("added ", newTag);
      console.log(tags);
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
        <img ref={imgRef} src={imageSrc} alt={title} />
      </div>
      {isEnlarged && (
        <div className='editCard' onClick={handleEditClick}>
          <div className="tags">
            {localTags.length > 0 && localTags.filter(tag => tag.trim() !== '').map((tag, index) => (
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
                      e.preventDefault();
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





