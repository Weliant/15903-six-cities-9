import { store } from '../store/index.js';
import { CityOffer, Offer } from './offer.js';

export type StateInit = {
  cityName: string,
  city: CityOffer | undefined,
  offersList: Offer[] | undefined,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
