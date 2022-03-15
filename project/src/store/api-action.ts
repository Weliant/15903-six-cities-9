import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, store } from '.';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../consts';
import { errorHandle } from '../services/error-handle';
import { Offer } from '../types/offer';
import { loadOffers, setError } from './action';

export const clearErrorAction = createAsyncThunk(
  'load/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Hotels);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
