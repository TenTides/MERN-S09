import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Images from './pages/Images';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/images" element={<Images />} />
          <Route path="/" element={<Home/>}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;