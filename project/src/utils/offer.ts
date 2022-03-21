import { COUNT_IMAGE_OFFER } from '../consts';
import { IReviewOffer, Offer } from '../types/offer';

export const getOffer = (offers: Offer[] | undefined, id?: string | number) => offers && offers.find((item) => item.id === Number(id));

export const getFormattedDate = (date?: string) => {
  if (date) {
    const newDate = new Date(date);
    const options = {year: 'numeric', month: 'long'} as const;

    return newDate.toLocaleDateString('en-US', options);
  }
};

export const getOfferImages = (offer?: Offer | null) => offer && offer?.images.length > COUNT_IMAGE_OFFER ? offer.images.slice(0, COUNT_IMAGE_OFFER) : offer?.images;

export const getOffersByCity = (offers?: Offer[], city?: string) => offers && offers.filter((item) => item.city.name === city);

export const getDataByCity = (offers: Offer[], city?: string) => offers.find((item) => item.city.name === city);

export const sortReviews = (commentA: IReviewOffer, commentB: IReviewOffer) => commentB.id - commentA.id;

