import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Card.css';


const Card = ({ id, photoId, imageSrc, title, tags, onClick, onDeleteClick, onClickOutside, isSelected, onDeleteTag, onAddTag, isMobile }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [showTagInput, setTagInput] = useState(false);
  const [localTags, setLocalTags] = useState(tags);
  const [tagColors, setTagColors] = useState({});

  const imgRef = useRef(null);

  useEffect(() => {
    const adjustImageSize = () => {
      const imgElement = imgRef.current;
      const cardElement = imgElement.parentElement;
  
      if (imgElement) {
        const aspectRatio = imgElement.width / imgElement.height;
        // Landscape image
        if (aspectRatio > 1) {
          if(isMobile) {
            cardElement.style.maxWidth = '300px';
            imgElement.style.maxWidth = '300px';
            cardElement.style.maxHeight = 'auto';
            imgElement.style.maxHeight = 'auto';
          }
          else {
            cardElement.style.maxWidth = '600px';
            imgElement.style.maxWidth = '600px';
            cardElement.style.maxHeight = 'auto';
            imgElement.style.maxHeight = 'auto';
          }
        } else { // Portrait image
          if(isMobile) {
            cardElement.style.maxWidth = 'auto';
            imgElement.style.maxWidth = 'auto';
            cardElement.style.maxHeight = '15vh';
            imgElement.style.maxHeight = '15vh';
          }
          else {
            cardElement.style.maxWidth = 'auto';
            imgElement.style.maxWidth = 'auto';
            cardElement.style.maxHeight = '400px';
            imgElement.style.maxHeight = '400px';
          }
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
          if(isMobile) {
            cardElement.style.maxWidth = '300px';
            imgElement.style.maxWidth = '300px';
            cardElement.style.maxHeight = 'auto';
            imgElement.style.maxHeight = 'auto';
          }
          else {
            cardElement.style.maxWidth = '600px';
            imgElement.style.maxWidth = '600px';
            cardElement.style.maxHeight = 'auto';
            imgElement.style.maxHeight = 'auto';
          }
        } else { // Portrait image
          if(isMobile) {
            cardElement.style.maxWidth = 'auto';
            imgElement.style.maxWidth = 'auto';
            cardElement.style.maxHeight = '15vh';
            imgElement.style.maxHeight = '15vh';
          }
          else {
            cardElement.style.maxWidth = 'auto';
            imgElement.style.maxWidth = 'auto';
            cardElement.style.maxHeight = '400px';
            imgElement.style.maxHeight = '400px';
          }
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
        if(isMobile) {
          cardElement.style.maxWidth = '600px';
          imgElement.style.maxWidth = '600px';
          cardElement.style.maxHeight = 'auto';
          imgElement.style.maxHeight = 'auto';
        }
        else {
          cardElement.style.maxWidth = '1200px';
          imgElement.style.maxWidth = '1200px';
          cardElement.style.maxHeight = 'auto';
          imgElement.style.maxHeight = 'auto';
        }
      } else { // Portrait image
        if(isMobile) {
          cardElement.style.maxWidth = 'auto';
          imgElement.style.maxWidth = 'auto';
          cardElement.style.maxHeight = '30vh';
          imgElement.style.maxHeight = '30vh';
        }
        else {
          cardElement.style.maxWidth = 'auto';
          imgElement.style.maxWidth = 'auto';
          cardElement.style.maxHeight = '800px';
          imgElement.style.maxHeight = '800px';
        }
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





