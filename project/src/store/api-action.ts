import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { api, store } from '.';
import { APIRoute, AppRoute, AuthorizationStatus } from '../consts';
import { errorHandle } from '../services/error-handle';
import { dropToken, saveToken } from '../services/token';
import { Auth } from '../types/auth';
import { Offer, IReviewOffer, ReviewOfferSmall } from '../types/offer';
import { User } from '../types/user';
import { redirectToRoute } from './action';
import { errorReview,
  loadFavoritesOffers,
  loading,
  loadingReview,
  loadOfferById,
  loadOffers,
  loadOffersNearBy,
  loadReviews,
  updateFavoritesOffers,
  updateNearBy,
  updateOffers } from './app-data/app-data';
import { requireAuthorization } from './user-process/user-process';

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

export const fetchOfferByIdAction = createAsyncThunk(
  'data/fetchOfferById',
  async (idOffer: string | undefined) => {
    if (idOffer) {
      store.dispatch(loading(false));

      const fetchOfferById = (id: string | undefined) => api.get<Offer>(`${APIRoute.Hotels}/${id}`);
      const fetchOfferNearby = (id: string | undefined) => api.get<Offer[]>(`${APIRoute.Hotels}/${id}/${APIRoute.OfferNearby}`);
      const fetchOfferComments = (id: string | undefined) => api.get<IReviewOffer[]>(`${APIRoute.Comments}/${id}`);

      try {
        const responses = await axios.all<AxiosResponse<Offer> | AxiosResponse<Offer[]> | AxiosResponse<IReviewOffer[]>>([fetchOfferById(idOffer), fetchOfferNearby(idOffer), fetchOfferComments(idOffer)]);

        store.dispatch(loadOfferById(responses[0].data as Offer));
        store.dispatch(loadOffersNearBy(responses[1].data as Offer[]));
        store.dispatch(loadReviews(responses[2].data as IReviewOffer[]));
        store.dispatch(loading(true));
      } catch(error) {
        errorHandle(error);

        store.dispatch(loadOfferById(null));
        store.dispatch(loading(true));
      }
    }
  },
);

export const fetchFavoritesOffersAction = createAsyncThunk(
  'data/fetchFavoritesOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Favorite);
      store.dispatch(loadFavoritesOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const postOfferStatusAction = createAsyncThunk(
  'data/offerStatus',
  async (offerStatus: {idOffer: number | undefined, status: number, type?: string}) => {
    store.dispatch(loading(false));

    try {
      const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${offerStatus.idOffer}/${offerStatus.status}`);

      if (offerStatus.type === 'city') {
        store.dispatch(updateOffers(data));
      } else if (offerStatus.type === 'nearby'){
        store.dispatch(updateNearBy(data));
      } else if (offerStatus.type === 'favorites'){
        store.dispatch(updateFavoritesOffers(data));
      }else {
        store.dispatch(loadOfferById(data));
      }

      store.dispatch(loading(true));
    } catch (error) {
      errorHandle(error);
      store.dispatch(loading(true));
    }
  },
);

export const submitReviewAction = createAsyncThunk(
  'data/commentAdd',
  async ({comment, rating, idOffer}: ReviewOfferSmall) => {
    store.dispatch(errorReview(false));
    store.dispatch(loadingReview(false));

    try {
      const {data} = await api.post<IReviewOffer[]>(`${APIRoute.Comments}/${idOffer}`, {comment, rating});

      store.dispatch(loadReviews(data));
      store.dispatch(loadingReview(true));
    } catch (error) {
      errorHandle(error);
      store.dispatch(errorReview(true));
      store.dispatch(loadingReview(true));
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(loading(true));
    } catch(error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      store.dispatch(loading(true));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({email, password}: Auth) => {
    try {
      const {data: {token}} = await api.post<User>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Root));
      store.dispatch(loading(true));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      store.dispatch(loading(true));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      store.dispatch(redirectToRoute(AppRoute.Login));
      store.dispatch(loading(true));
    } catch (error) {
      errorHandle(error);
      store.dispatch(loading(true));
    }
  },
);

