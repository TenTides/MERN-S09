import React, { useEffect, useState } from 'react';
import './Images.css';
import CardGroup from '../components/CardGroup';
import { usePhotosContext } from "../hooks/usePhotosContext";
import PhotoForm from "../components/PhotoForm";
import ProfileDropdown from '../components/ProfileDropdown';
import { useNavigate } from 'react-router-dom';
import TagMenu from '../components/TagMenu';

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

  const extractUniqueTags = (photos) => {
    const allTags = photos.reduce((tags, photo) => {
      return tags.concat(photo.tags);
    }, []);
  
    const uniqueTags = [...new Set(allTags)];
  
    return uniqueTags;
  };
  
  const allTags = extractUniqueTags(allPhotos);

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
    navigate('/register');
  };
  const organizePhotosByDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    const thisMonth = new Date();
    thisMonth.setMonth(thisMonth.getMonth() - 1);

    const todayPhotos = [];
    const thisWeekPhotos = [];
    const thisMonthPhotos = [];
    const pastMonthPhotos = [];

    allPhotos.forEach((photo) => {
      const photoDate = new Date(photo.createdAt);
      if (photoDate >= today) {
        todayPhotos.push(photo);
      } else if (photoDate >= thisWeek) {
        thisWeekPhotos.push(photo);
      } else if (photoDate >= thisMonth) {
        thisMonthPhotos.push(photo);
      } else {
        pastMonthPhotos.push(photo);
      }
    });

    return { todayPhotos, thisWeekPhotos, thisMonthPhotos, pastMonthPhotos };
  };

  // const { todayPhotos, thisWeekPhotos, thisMonthPhotos, pastMonthPhotos } = organizePhotosByDate();

  

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
        {showForm && <PhotoForm onClose={handleFormClose} userID={userId} reload={fetchPhotos()} />}
        <div className="cards">
        {loading ? (
            <div className="loading">LOADING</div>
          ) : (
            <div className={`photos-container ${fadeIn ? 'fade-in active' : ''}`}>
              {photos && photos.length > 0 ? (
                <CardGroup
                  heading="Today,"
                  cardsData={photos}
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


          {/* {loading ? (
            <div className="loading">LOADING</div>
          ) : (
            <div className={`photos-container ${fadeIn ? 'fade-in active' : ''}`}>
              {todayPhotos.length > 0 && (
                <CardGroup
                  heading="Today,"
                  cardsData={todayPhotos}
                  onDeleteClick={handleDelete}
                  selectedCard={selectedCard}
                  onClickOutside={handleCloseEnlargedCard}
                  onDeleteTag={deleteTag}
                  onAddTag={addTag}
                />
              )}
              {thisWeekPhotos.length > 0 && (
                <CardGroup
                  heading="This Week,"
                  cardsData={thisWeekPhotos}
                  onDeleteClick={handleDelete}
                  selectedCard={selectedCard}
                  onClickOutside={handleCloseEnlargedCard}
                  onDeleteTag={deleteTag}
                  onAddTag={addTag}
                />
              )}
              {thisMonthPhotos.length > 0 && (
                <CardGroup
                  heading="This Month,"
                  cardsData={thisMonthPhotos}
                  onDeleteClick={handleDelete}
                  selectedCard={selectedCard}
                  onClickOutside={handleCloseEnlargedCard}
                  onDeleteTag={deleteTag}
                  onAddTag={addTag}
                />
              )}
              {pastMonthPhotos.length > 0 && (
                <CardGroup
                  heading="Earlier,"
                  cardsData={pastMonthPhotos}
                  onDeleteClick={handleDelete}
                  selectedCard={selectedCard}
                  onClickOutside={handleCloseEnlargedCard}
                  onDeleteTag={deleteTag}
                  onAddTag={addTag}
                />
              )}
              {todayPhotos.length === 0 &&
               thisWeekPhotos.length === 0 &&
               thisMonthPhotos.length === 0 &&
               pastMonthPhotos.length === 0 && (
                <p>No images found</p>
              )}
            </div>
          )} */}
        </div>
        <TagMenu tags={allTags} onSelectTag={handleTagSelection} />
      </div>
    </div>
  );
};

export default Images;
