import React, { useEffect, useState } from 'react';
import './Images.css';
import CardGroup from '../components/CardGroup';
import { usePhotosContext } from "../hooks/usePhotosContext";
import PhotoForm from "../components/PhotoForm";
import ProfileDropdown from '../components/ProfileDropdown';
import { useNavigate } from 'react-router-dom';
import TagMenu from '../components/TagMenu';
import p4ulogo from '../icons/p4ulogo.png';

const LoadingBar = () => {
  return (
    <div className="loading-bar-container">
      <div className="loading-bar"></div>
    </div>
  );
};

const Images = () => {
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const { photos, dispatch } = usePhotosContext();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCardEnlarged, setIsCardEnlarged] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allPhotos, setAllPhotos] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();  
  const [isMobile, setIsMobile] = useState(false);

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/profile/photos/');
      if (!response.ok) {
        console.error('Error fetching photos:', response);
        return;
      }
  
      const json = await response.json();
      setAllPhotos(json);
      dispatch({ type: 'SET_PHOTOS', payload: json });
      setLoading(false);
      setFadeIn(true);
    } catch (error) {
      console.error('Error fetching photos:', error.message);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    fetch('/api/session')
      .then((response) => response.json())
      .then((data) => {
        if (data.userId) {
          setUserId(data.userId);
          console.log('Token from session:', data.userId);
        } else {
          navigate('/account');
        }
      })
      .catch((error) => console.error('Error fetching session data:', error));
  }, [])


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          console.error('Error fetching user details:', response);
          return;
        }
  
        const json = await response.json();
        if (response.ok) {
          setUserEmail(json.email);
          console.log("user email", json.email);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    fetchUser();
  }, [userId]);

  useEffect(() => {
    fetchPhotos();    
  }, []);

  const extractUniqueTags = (photos) => {
    const allTags = photos.reduce((tags, photo) => {
      return tags.concat(photo.tags);
    }, []);
  
    const uniqueTags = [...new Set(allTags)];
  
    return uniqueTags;
  };
  
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
        fetchPhotos();
        setAllTags(extractUniqueTags(updatedPhotos));
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
          fieldName: 'tags',
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

  const addTag = async (photoId, newTag) => {
    try {
      const response = await fetch(`/profile/photos/${photoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tags: { action: 'add', value: newTag },
        }),
      });

      if (response.ok) {
        const updatedPhotos = photos.map((photo) => {
        

          if (photo._id === photoId) {
            const updatedTags = [...photo.tags, newTag];
            return { ...photo, tags: updatedTags };
          }
          return photo;
        });
        const updatedAllTags = extractUniqueTags(updatedPhotos);
        setAllTags(updatedAllTags);
        dispatch({ type: 'SET_PHOTOS', payload: updatedPhotos });
      } else {
        const data = await response.json();
        console.error('Error updating photo tags1:', data.error);
      }
    } catch (error) {
      console.error('Error updating photo tags2:', error.message);
    }
    console.log("add tag", )
  };

  const handleProfileButtonClick = async () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
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
  
  

  const handleTagSelection = async (selectedTags) => {
    try {
      const response = await fetch('/profile/photos/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fieldName: 'tags',
          fieldValue: selectedTags,
        }),
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log('setting photos')
        dispatch({ type: 'SET_PHOTOS', payload: json });
      } else {
        console.error('Error searching photos:', response);
      }
    } catch (error) {
      console.error('Error searching photos:', error.message);
    }
  };

  return (
    <div className='body'>
      <nav className='s_nav'>
      {isMobile ? (
          <div className="logo">
            <img src={p4ulogo} alt="#p4u" style={{ height: '30px', width: 'auto' }} />
            </div>
        ) : (
          <div className="logo">
            <img src={p4ulogo} alt="#p4u" style={{ height: '30px', width: 'auto' }}/>
            <span>Photo4u</span>
          </div>
        )}
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
        <button id="uploadbtn" onClick={handleUploadButtonClick}>
          {/* Display different content for the upload button based on the screen size */}
          {isMobile ? <div className="upload">+</div> : <div className="upload">Upload</div>}
        </button>
        <div className="profile"  onClick={handleProfileButtonClick}>
          <div className="profile-button">
            {userEmail.charAt(0).toUpperCase()}
          </div>
          {isProfileDropdownOpen && <ProfileDropdown userEmail={userEmail} onLogout={handleLogout} />}
        </div>
      </nav>
      <div className='Main'>
        {showForm && (
          <div className="overlay"></div>
        )}
        {showForm && <PhotoForm extractUniqueTags={extractUniqueTags} setAllTags={setAllTags} onClose={handleFormClose} userID={userId}/>}
        <div className="cards">
        {loading ? (
            <div className="loading">
              <LoadingBar />
            </div>
          ) : (
            <div className={`photos-container ${fadeIn ? 'fade-in active' : ''}`}>
              {photos && photos.length > 0 ? (
                <CardGroup
                  heading="Welcome,"
                  cardsData={photos}
                  onDeleteClick={handleDelete}
                  selectedCard={selectedCard}
                  onClickOutside={handleCloseEnlargedCard}
                  onDeleteTag={deleteTag}
                  onAddTag={addTag}
                  isMobile={isMobile}
                />
              ) : (
                <p>No images found</p>
              )}
            </div>
          )}
        </div>
        {isMobile ? null : <TagMenu tags={allTags} onSelectTag={handleTagSelection} />}
      </div>
    </div>
  );
};

export default Images;
