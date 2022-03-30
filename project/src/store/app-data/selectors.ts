import { NameSpace } from '../../consts';
import { CityOffer, IReviewOffer, Offer } from '../../types/offer';
import { State, ReviewStatus } from '../../types/state';

export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
export const getReviewStatus = (state: State): ReviewStatus => state[NameSpace.data].reviewStatus;
export const getOffers = (state: State): Offer[] | undefined => state[NameSpace.data].offers;
export const getFavoritesOffers = (state: State): Offer[] | undefined => state[NameSpace.data].favorites;
export const getOffer = (state: State): Offer | undefined | null => state[NameSpace.data].offer;
export const getOfferNearby = (state: State): Offer[] | undefined => state[NameSpace.data].nearby;
export const getCity = (state: State): CityOffer | undefined => state[NameSpace.data].city;
export const getCityName = (state: State): string | undefined => state[NameSpace.data].city?.name;
export const getReview = (state: State): IReviewOffer[] | undefined => state[NameSpace.data].reviews;
