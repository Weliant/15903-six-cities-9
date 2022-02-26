import { RATING_OFFER } from '../consts';

export const getRatingOffer = (rating: number) => Math.round(rating) / RATING_OFFER * 100;
