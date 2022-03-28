import { IReviewOffer } from './offer';

export type FormComment = {
  rating: string;
  comment: string;
};

export type ReviewFormProp = {
  sendReview: (comment: string, rating: number) => void;
  error: boolean;
  isLoaded: boolean;
}

export type ReviewsListProp = {
  reviews?: IReviewOffer[];
  isAuth: boolean;
  idOffer?: number;
}

export type ReviewItemProp = {
  review: IReviewOffer;
}

export type RatingProp = {
  sendRating: (rating: string) => void;
  disable: boolean;
  value: number;
}
