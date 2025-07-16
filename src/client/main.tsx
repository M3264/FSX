import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
let ReactGA: typeof import('react-ga') | undefined = undefined;
if (typeof window !== 'undefined') {
  ReactGA = require('react-ga');
}
import App from './App.tsx';
import './index.css';

// Initialisation de Google Analytics
ReactGA.initialize('G-19SQ73GDNL', {
  gaOptions: {
    siteSpeedSampleRate: 100,
    cookieDomain: 'www.famoustech.xyz'
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
