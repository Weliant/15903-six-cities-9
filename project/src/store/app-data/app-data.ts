import { createSlice } from '@reduxjs/toolkit';
import { CITY_DEFAULT, NameSpace } from '../../consts';
import { StateInit } from '../../types/state';

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
  isDataLoaded: false,
  reviewStatus: {
    isLoaded: true,
    error: false,
  },
};

export const appData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    changeDataCityAction: (state, action) => {
      state.city = action.payload;
    },
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    loadOfferById: (state, action) => {
      state.offer = action.payload;
    },
    loadOffersNearBy: (state, action) => {
      state.nearby = action.payload;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
    loading: (state, action) => {
      state.isDataLoaded = action.payload;
    },
    loadingReview: (state, action) => {
      state.reviewStatus.isLoaded = action.payload;
    },
    errorReview: (state, action) => {
      state.reviewStatus.error = action.payload;
    },
  },
});

export const {
  changeDataCityAction,
  loadOffers,
  loadOfferById,
  loadOffersNearBy,
  loadReviews,
  loading,
  loadingReview,
  errorReview,
} = appData.actions;
