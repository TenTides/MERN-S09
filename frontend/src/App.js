import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmailVerified from './pages/EmailVerified';
import Home from './pages/Home';
import Images from './pages/Images';
import SignUp from './pages/SignUp';
import VerifyEmail from './pages/VerifyEmail';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/images" element={<Images />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/email-verified" element={<EmailVerified />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;