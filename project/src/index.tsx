import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { Setting } from './consts';


ReactDOM.render(
  <React.StrictMode>
    <App adsCount = {Setting.ADS_COUNT} offers={offers} />
  </React.StrictMode>,
  document.getElementById('root'));
