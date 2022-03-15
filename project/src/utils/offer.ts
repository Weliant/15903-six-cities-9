import { COUNT_IMAGE_OFFER } from '../consts';
import { Offer } from '../types/offer';

export const getOffer = (offers: Offer[] | undefined, id?: string | number) => offers && offers.find((item) => item.id === Number(id));

export const getFormattedDate = (date: string) => {
  const newDate = new Date(date);
  const options = {year: 'numeric', month: 'long'} as const;

  return newDate.toLocaleDateString('en-US', options);
};

export const getOfferImages = (offer: Offer) => offer.images.length > COUNT_IMAGE_OFFER ? offer.images.slice(0, COUNT_IMAGE_OFFER) : offer.images;

export const getOfferNeighbourhood = (offers: Offer[] | undefined, id?: string) => offers && offers.filter((item) => item.id !== Number(id)).slice(0, 3);

export const getOffersByCity = (offers?: Offer[], city?: string) => offers && offers.filter((item) => item.city.name === city);

export const getDataByCity = (offers: Offer[], city?: string) => offers.find((item) => item.city.name === city);

