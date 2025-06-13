import React from 'react';
import ReactDOM from 'react-dom/client'; // Importe de 'react-dom/client' para React 18+
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);