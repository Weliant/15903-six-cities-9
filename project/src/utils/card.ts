import { RATING_OFFER } from '../consts';

export const getRatingOffer = (rating?: number) => rating && Math.round(rating) / RATING_OFFER * 100;
