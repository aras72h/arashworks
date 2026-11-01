import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App.jsx';
import { WeatherProvider } from './context/WeatherContext.jsx';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </React.StrictMode>
  );
}
