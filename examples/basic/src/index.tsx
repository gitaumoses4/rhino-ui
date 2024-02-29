import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@rhino-ui/components/dist/css/reset.css';
import '@rhino-ui/components/dist/css/fonts.css';
import '@rhino-ui/components/dist/css/utilities.css';
import '@rhino-ui/components/dist/css/variables.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
