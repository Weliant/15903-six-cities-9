import { AuthorizationStatus } from '../consts.js';
import { store } from '../store/index.js';
import { CityOffer, Offer } from './offer.js';

export type StateInit = {
  city?: CityOffer,
  offers?: Offer[],
  offersByCity?: Offer[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  error: string,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
