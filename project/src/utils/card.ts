import { ratingOffer } from '../consts';

export const getRatingOffer = (rating: number) => Math.round(rating) / ratingOffer * 100;
