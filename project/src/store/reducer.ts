import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, CITY_DEFAULT } from '../consts';
import { StateInit } from '../types/state';
import { changeDataCityAction, loadReviews, loading, loadOfferById, loadOffers, loadOffersNearBy, requireAuthorization, loadingReview, errorReview } from './action';

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
  offer: undefined,
  nearby: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  reviewStatus: {
    isLoaded: true,
    error: false,
  },
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
    .addCase(loadOfferById, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadOffersNearBy, (state, action) => {
      state.nearby = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loading, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(loadingReview, (state, action) => {
      state.reviewStatus.isLoaded = action.payload;
    })
    .addCase(errorReview, (state, action) => {
      state.reviewStatus.error = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
