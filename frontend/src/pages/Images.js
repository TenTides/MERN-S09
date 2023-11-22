import React, { useEffect, useState } from 'react';
import './Images.css';
import CardGroup from '../components/CardGroup';
import { usePhotosContext } from "../hooks/usePhotosContext";
import PhotoForm from "../components/PhotoForm";
import ProfileDropdown from '../components/ProfileDropdown';
import { useNavigate } from 'react-router-dom';

const Images = () => {
  const [userId, setUserId] = useState(null);
  const { photos, dispatch } = usePhotosContext();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCardEnlarged, setIsCardEnlarged] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allPhotos, setAllPhotos] = useState([]);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();  

  useEffect(() => {
    fetch('/api/session')
      .then((response) => response.json())
      .then((data) => {
        if (data.userId) {
          setUserId(data.userId);
          console.log('Token from session:', data.userId);
        } else {
          navigate('/login');
        }
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
        setAllPhotos(json);
        console.log("all photos", json)
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
      const response = await fetch(`/profile/photos/${photoId}`, {
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
        console.error('Error deleting photo!:', data.error);
      }
    } catch (error) {
      console.error('Error deleting photo:', error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch('/profile/photos/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fieldName: 'tags', // or another field you want to search
          fieldValue: searchQuery,
        }),
      });
  
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'SET_PHOTOS', payload: json });
      } else {
        console.error('Error searching photos:', response);
      }
    } catch (error) {
      console.error('Error searching photos:', error.message);
    }
  };

  
const deleteTag = async (photoId, tagIndex) => {
  try {
    const response = await fetch(`/profile/photos/${photoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: { index: tagIndex, action: 'delete' },
      }),
    });

    if (response.ok) {
      const updatedPhotos = photos.map(photo => {
        if (photo._id === photoId) {
          const updatedTags = [...photo.tags];
          updatedTags.splice(tagIndex, 1);
          return { ...photo, tags: updatedTags };
        }
        return photo;
      });
      dispatch({ type: 'SET_PHOTOS', payload: updatedPhotos });
    } else {
      const data = await response.json();
      console.error('Error updating photo tags:', data.error);
    }
  } catch (error) {
    console.error('Error updating photo tags:', error.message);
  }
};

const addTag = async (photoId, tagIndex) => {
  try {
    const response = await fetch(`/profile/photos/${photoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: { index: tagIndex, action: 'delete' },
      }),
    });

    if (response.ok) {
      const updatedPhotos = photos.map(photo => {
        if (photo._id === photoId) {
          const updatedTags = [...photo.tags];
          updatedTags.splice(tagIndex, 1);
          return { ...photo, tags: updatedTags };
        }
        return photo;
      });
      dispatch({ type: 'SET_PHOTOS', payload: updatedPhotos });
    } else {
      const data = await response.json();
      console.error('Error updating photo tags:', data.error);
    }
  } catch (error) {
    console.error('Error updating photo tags:', error.message);
  }
};

const handleProfileButtonClick = async () => {
  setIsProfileDropdownOpen(true);
};

const handleLogout = async () => {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      clearSession();
      setUserId(null);
      console.log('Logout successful');
    } else {
      const data = await response.json();
      console.error('Error logging out:', data.error);
    }
  } catch (error) {
    console.error('Error logging out:', error.message);
  }
};

const clearSession = () => {
  setUserId(null);
  navigate('/account');
};

  return (
    <div className='body'>
      <nav className='s_nav'>
        <div className="logo">#Photo4u</div>
        <div className='search'>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        </div>
        <button onClick={handleUploadButtonClick}>
          <div className="upload">Upload</div>
        </button>
        <div className="help">Help</div>
        <div className="profile"  onClick={handleProfileButtonClick}>
          <div className="profile-button">
            J
          </div>
          {isProfileDropdownOpen && <ProfileDropdown onLogout={handleLogout} />}
        </div>
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
                  onDeleteTag={deleteTag}
                  onAddTag={addTag}
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
