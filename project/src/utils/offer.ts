import { COUNT_IMAGE_OFFER, Filters } from '../consts';
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

export const sortFilterLow = (offerA: Offer, offerB: Offer) => offerA.price - offerB.price;
export const sortFilterHight = (offerA: Offer, offerB: Offer) => offerB.price - offerA.price;
export const sortFilterRating = (offerA: Offer, offerB: Offer) => +offerB.rating - +offerA.rating;

export const sortFilter = (type: string, offers: Offer[]) => {
  let offersFilter: Offer[] | undefined = offers;

  switch(type){
    case Filters.Low:
      offersFilter = offers.slice().sort(sortFilterLow);
      break;
    case Filters.Hight:
      offersFilter = offers.slice().sort(sortFilterHight);
      break;
    case Filters.Rating:
      offersFilter = offers.slice().sort(sortFilterRating);
      break;
    default: break;
  }

  return offersFilter;
};

