import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, CITY_DEFAULT } from '../consts';
import { StateInit } from '../types/state';
import { changeDataCityAction, loadOffers, requireAuthorization, setError } from './action';

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
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  error: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeDataCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
