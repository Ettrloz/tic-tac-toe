import 'virtual:uno.css';
import '@unocss/reset/tailwind.css';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './eruda';

createRoot(/** @type {HTMLElement} */ (document.getElementById('app'))).render(<App />);
