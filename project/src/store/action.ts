import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../consts';
import { Offer, IReviewOffer } from '../types/offer';

export const Action = {
  CHANGE_DATA_CITY: 'CHANGE_DATA_CITY',
  GET_OFFERS_BY_CITY: 'GET_OFFERS_BY_CITY',
};

export const changeDataCityAction = createAction(Action.CHANGE_DATA_CITY, (value) => ({ payload: value }));

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadOfferById = createAction<Offer | undefined | null>('data/loadOfferById');
export const loadOffersNearBy = createAction<Offer[] | undefined>('data/loadOffersNearBy');
export const loadReviews = createAction<IReviewOffer[] | undefined>('data/loadReviews');

export const loading = createAction<boolean>('load/loading');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const loadingReview = createAction<boolean>('app/loadingReview');
export const errorReview = createAction<boolean>('app/errorReview');
