import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Setting} from './consts';


ReactDOM.render(
  <React.StrictMode>
    <App adsCount = {Setting.ADS_COUNT} />
  </React.StrictMode>,
  document.getElementById('root'));
