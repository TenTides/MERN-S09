import React, { useEffect, useState } from 'react';
import './Images.css';
import CardGroup from '../components/CardGroup';
import { useEmployeesContext } from "../hooks/useEmployeesContext";
import EmployeeForm from "../components/EmployeeForm";

const Images = () => {
  const { employees, dispatch } = useEmployeesContext();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCardEnlarged, setIsCardEnlarged] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/api/photos');
      if (!response.ok) {
        console.error('Error fetching photos:', response.statusText);
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
    fetchEmployees();
  }, [dispatch]);

  const handleUploadButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleCardClick = (cardId) => {
    setSelectedCard(selectedCard === cardId ? null : cardId);
  };

  const handleCloseEnlargedCard = () => {
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
        dispatch({ type: 'DELETE_EMPLOYEE', payload: photoId });

        const updatedEmployees = employees.filter(employee => employee._id !== photoId);
        dispatch({ type: 'SET_PHOTOS', payload: updatedEmployees });
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
        {showForm && <EmployeeForm onClose={handleFormClose} />}
        <div className="cards">
          {loading ? (
            <div className="loading">LOADING</div>
          ) : (
            <div className={`employees-container ${fadeIn ? 'fade-in active' : ''}`}>
              {employees && employees.length > 0 ? (
                <CardGroup
                  heading="Today,"
                  cardsData={employees} 
                  onCardClick={handleCardClick}
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
