import {React, useEffect, useState} from 'react';
import './Images.css'
import CardGroup from '../components/CardGroup';
import { useEmployeesContext } from "../hooks/useEmployeesContext"
import EmployeeForm from"../components/EmployeeForm"

const Images = () => {

  const {employees ,dispatch} = useEmployeesContext()
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
        const response = await fetch('/api/photos')
        const json = await response.json() // array of jsons

        if(response.ok)
        {
            dispatch({type:'SET_EMPLOYEES',payload: json})
            setLoading(false);
            setFadeIn(true);
        }
    }
    fetchEmployees()
  }, [dispatch])

  const handleUploadButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
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
        <div className="cards">
        {loading ? (
            <div className="loading">LOADING</div>
          ) : (
            <div className={`employees-container ${fadeIn ? 'fade-in active' : ''}`}>
              <CardGroup heading="Today," cardsData={employees} />
            </div>
          )}
        </div>
      </div>
      {showForm && <EmployeeForm onClose={handleFormClose} />}
    </div>
  );
};

export default Images;