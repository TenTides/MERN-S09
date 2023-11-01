import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EmployeesContextProvider } from './context/EmployeesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EmployeesContextProvider>
          <App/>
    </EmployeesContextProvider>
  </React.StrictMode>
);

