import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import './styles/galaxy.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/universe.css';
import './styles/planets.css';
import './styles/stars.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
