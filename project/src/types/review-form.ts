import { ReviewOffer } from './offer';

export type FormComment = {
  rating: string;
  comment: string;
};

export type ReviewFormProp = {
  sendReview: (rating: string, comment: string) => void;
}

export type ReviewsListProp = {
  reviews: ReviewOffer[];
  isAuth: boolean;
}
