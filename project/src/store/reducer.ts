import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, CITY_DEFAULT } from '../consts';
import { StateInit } from '../types/state';
import { changeDataCityAction, getOffersByCityAction, loadOffers, setError } from './action';

const initialState: StateInit = {
  city: {
    name: CITY_DEFAULT,
    location: {
      latitude: null,
      longitude: null,
      zoom: null,
    },
  },
  offers: [],
  offersByCity: [],
  authorizationStatus: AuthorizationStatus.Auth,
  isDataLoaded: false,
  error: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeDataCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffersByCityAction, (state, action) => {
      state.offersByCity = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
