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
