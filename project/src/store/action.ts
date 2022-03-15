import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const Action = {
  CHANGE_DATA_CITY: 'CHANGE_DATA_CITY',
  GET_OFFERS_BY_CITY: 'GET_OFFERS_BY_CITY',
};

export const changeDataCityAction = createAction(Action.CHANGE_DATA_CITY, (value) => ({ payload: value }));
export const getOffersByCityAction = createAction(Action.GET_OFFERS_BY_CITY, (value) => ({ payload: value }));

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setError = createAction<string>('load/setError');
