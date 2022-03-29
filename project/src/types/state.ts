import { AuthorizationStatus } from '../consts.js';
import { store } from '../store/index.js';
import { CityOffer, Offer, IReviewOffer } from './offer.js';

export type ReviewStatus = {
  error: boolean,
  isLoaded: boolean,
}

export type StateInit = {
  city?: CityOffer,
  offers?: Offer[],
  offer?: Offer | null,
  nearby?: Offer[],
  reviews?: IReviewOffer[],
  isDataLoaded: boolean,
  reviewStatus: ReviewStatus
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};
