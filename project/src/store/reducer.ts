import { createReducer } from '@reduxjs/toolkit';
import { CITY_DEFAULT } from '../consts';
import { StateInit } from '../types/state';
import { changeCityAction, changeDataCityAction, getOffersAction } from './action';

const initialState: StateInit = {
  cityName: '',
  city: {
    name: CITY_DEFAULT,
    location: {
      latitude: null,
      longitude: null,
      zoom: null,
    },
  },
  offersList: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(changeDataCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffersAction, (state, action) => {
      state.offersList = action.payload;
    });
});

export {reducer};
