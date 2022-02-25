import { countImagesOffer } from '../consts';
import { Offer, Offers } from '../types/offer';

export const getOffer = (offers: Offers, id: string | undefined) => {
  const offersMatch = offers.filter((item) => item.id === Number(id));

  return offersMatch[0];
};

export const getFormattedDate = (date: string) => {
  const newDate = new Date(date);
  const options = {year: 'numeric', month: 'long'} as const;

  return newDate.toLocaleDateString('en-US', options);
};

export const getOfferImages = (offer: Offer) => offer.images.length > countImagesOffer ? offer.images.slice(0, countImagesOffer) : offer.images;

export const getOfferNeighbourhood = (offers: Offers, id: string | undefined) => offers.filter((item) => item.id !== Number(id)).slice(0, 3);
