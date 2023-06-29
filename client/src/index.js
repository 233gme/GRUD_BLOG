import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
