import React from 'react';
import {Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  return (
    <nav className='h_nav'>
        <span className="name">#Photo4u</span>
        <div className='links'>
          <Link to="/about" className="more">More</Link>
          <Link to="/images" className="join">Join</Link>
        </div>
    </nav>
  );
}

export default Navbar;