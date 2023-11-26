import React, { useEffect, useState } from 'react';
import './ProfileDropdown.css';

const ProfileDropdown = ({userEmail, onLogout }) => {
  
  return (
    <div className="profile-dropdown">
      <div id='email'>{userEmail}</div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default ProfileDropdown;