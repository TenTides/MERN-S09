import React, {useRef, useState, useEffect} from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import phoneFrame from './img/phone-frame.png'; // Import image
import img1 from './img/img1.svg'; // Import image
import './Home.css';

const Home = () => {
	return (
    <div className="Home">
      <Navbar />
      <div className="Landing">
        <div className='text-title'>Welcome to #Photo4u!</div>
        <div className='text-h1'>Join now and start uploading your favorite images!</div>
        <div className='icon-container'>
          <img src={img1} className='icons' alt="" />
          <div className='text-caption'>Upload them from your computer or phone!</div>
        </div>
        <div className="frame-box">
          <div className='text-h2'>Our app will allow you to upload your photos</div>
          <img src={phoneFrame} className='phone' alt="" /> {/*Show uploading images*/}
          <div className='text-h2'>And view all of the photos you've uploaded</div>
          <img src={phoneFrame} className='phone' alt="" /> {/*Show /images page*/}
        </div>
        <div className="image-box">
          <div className='img1'>
            <img src={phoneFrame} alt="" />
          </div>
          <div className='img2'>
            <img id="1" src={phoneFrame} alt="" />
            <img id="2" src={phoneFrame} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
