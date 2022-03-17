import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../consts';
import { Offer } from '../types/offer';

export const Action = {
  CHANGE_DATA_CITY: 'CHANGE_DATA_CITY',
  GET_OFFERS_BY_CITY: 'GET_OFFERS_BY_CITY',
};

export const changeDataCityAction = createAction(Action.CHANGE_DATA_CITY, (value) => ({ payload: value }));

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setError = createAction<string>('load/setError');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
