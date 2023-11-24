import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PhotosContextProvider } from './context/PhotosContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PhotosContextProvider>
          <App/>
    </PhotosContextProvider>
  </React.StrictMode>
);

