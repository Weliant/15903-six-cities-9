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
  favorites: [],
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
    loadFavoritesOffers: (state, action) => {
      state.favorites = action.payload;
      state.isDataLoaded = true;
    },
    updateOffers: (state, action) => {
      if (state.offers?.length) {
        const offerIndex = state.offers.findIndex((item) => item.id === action.payload.id);

        if (offerIndex > -1) {
          state.offers[offerIndex] = action.payload;
        }
      }
    },
    updateFavoritesOffers: (state, action) => {
      if (state.favorites?.length) {
        const offerIndex = state.favorites.findIndex((item) => item.id === action.payload.id);

        if (offerIndex > -1) {
          state.favorites[offerIndex] = action.payload;
        }
      }
    },
    loadOfferById: (state, action) => {
      state.offer = action.payload;
    },
    loadOffersNearBy: (state, action) => {
      state.nearby = action.payload;
    },
    updateNearBy: (state, action) => {
      if (state.nearby?.length) {
        const offerIndex = state.nearby.findIndex((item) => item.id === action.payload.id);

        if (offerIndex > -1) {
          state.nearby[offerIndex] = action.payload;
        }
      }
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
  updateOffers,
  loadFavoritesOffers,
  updateFavoritesOffers,
  loadOfferById,
  loadOffersNearBy,
  updateNearBy,
  loadReviews,
  loading,
  loadingReview,
  errorReview,
} = appData.actions;
