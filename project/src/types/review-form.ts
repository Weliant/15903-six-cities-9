export type FormComment = {
  rating: string;
  comment: string;
};

export type ReviewFormProp = {
  sendReview: (rating: string, comment: string) => void;
}
