import React from 'react';
import './ProfileDropdown.css';

const ProfileDropdown = ({ onLogout }) => {
  return (
    <div className="profile-dropdown">
      <div id='email'>emailman@gmail.com</div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default ProfileDropdown;