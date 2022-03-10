import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { Setting } from './consts';
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App adsCount = {Setting.ADS_COUNT} offers={offers} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
