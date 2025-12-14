import { createRoot } from 'react-dom/client';
import App from './App.js';
import React from 'react';

import './api/server';
import { Provider } from 'react-redux';

import store from './store/store'

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);