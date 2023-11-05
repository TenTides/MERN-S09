import React from 'react';
import Card from '../components/Card';
import './Images.css'
import CardGroup from '../components/CardGroup';

const cardDataToday = [
  {
    imageSrc: '../cat.jpg',
    title: '',
  },
  {
    imageSrc: "cat.jpg",
    title: '',
  },
  {
    imageSrc: "cat.jpg",
    title: '',
  },
];

const cardDataWeek = [
  {
    imageSrc: '../cat.jpg',
    title: '',
  },
  {
    imageSrc: "cat.jpg",
    title: '',
  },
  {
    imageSrc: "cat.jpg",
    title: '',
  },
  {
    imageSrc: "cat.jpg",
    title: '',
  },
  {
    imageSrc: "cat.jpg",
    title: '',
  },
  {
    imageSrc: "cat.jpg",
    title: '',
  },
];

const Images = () => {
  return (
  <div className='body'>
    <nav className='s_nav'>
        <div className="logo">#Photo4u</div>
        <div className='search'><input type="text" /></div>
        <div className="upload">Upload</div>
        <div className="help">Help</div>
        <div className="profile">J</div>

    </nav>
    <div className='Main'>
      <div className="cards">
        <CardGroup heading="Today," cardsData = {cardDataToday} />
        <CardGroup heading="Earlier this week," cardsData = {cardDataWeek} />  
      </div>
    </div>
  </div>
  );
};

export default Images;