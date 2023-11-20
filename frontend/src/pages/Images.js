import React, { useEffect, useState } from 'react';
import './Images.css';
import CardGroup from '../components/CardGroup';
import { usePhotosContext } from "../hooks/usePhotosContext";
import PhotoForm from "../components/PhotoForm";

const Images = () => {
  const [userId, setUserId] = useState(null);
  const { photos, dispatch } = usePhotosContext();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCardEnlarged, setIsCardEnlarged] = useState(false);
  
  useEffect(() => {
    fetch('/api/session')
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.userId);
        console.log('Token from session:', data.userId);
      })
      .catch((error) => console.error('Error fetching session data:', error));
  }, []);



  useEffect(() => {
    const fetchPhotos = async () => {

      const response = await fetch('/profile/photos/');
      
      console.log(response);
      if (!response.ok) {
        console.error('Error fetching photos:', response);
        return;
      }
  
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_PHOTOS', payload: json });
        console.log(json);
        setLoading(false);
        setFadeIn(true);
      }
    };
    fetchPhotos();
  }, [dispatch]);

  const handleUploadButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleCloseEnlargedCard = () => {
    console.log('images')
    setSelectedCard(null);
    setIsCardEnlarged(false);
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      if (isCardEnlarged) {
        handleCloseEnlargedCard();
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isCardEnlarged]);

  const handleDelete = async (photoId) => {
    try {
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        dispatch({ type: 'DELETE_PHOTO', payload: photoId });

        const updatedPhotos = photos.filter(photo => photo._id !== photoId);
        dispatch({ type: 'SET_PHOTOS', payload: updatedPhotos });
      } else {
        const data = await response.json();
        console.error('Error deleting photo:', data.error);
      }
    } catch (error) {
      console.error('Error deleting photo:', error.message);
    }
  };

  return (
    <div className='body'>
      <nav className='s_nav'>
        <div className="logo">#Photo4u</div>
        <div className='search'><input type="text" /></div>
        <button onClick={handleUploadButtonClick}>
          <div className="upload">Upload</div>
        </button>
        <div className="help">Help</div>
        <div className="profile">J</div>
      </nav>
      <div className='Main'>
        {showForm && (
          <div className="overlay"></div>
        )}
        {showForm && <PhotoForm onClose={handleFormClose} userID={userId} />}
        <div className="cards">
          {loading ? (
            <div className="loading">LOADING</div>
          ) : (
            <div className={`photos-container ${fadeIn ? 'fade-in active' : ''}`}>
              {photos && photos.length > 0 ? (
                <CardGroup
                  heading="Today,"
                  cardsData={photos} 
                  // onCardClick={handleCardClick}
                  onDeleteClick={handleDelete}
                  selectedCard={selectedCard}  
                  onClickOutside={handleCloseEnlargedCard}
                />
              ) : (
                <p>No images found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Images;
