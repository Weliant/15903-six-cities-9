import { useAppDispatch, useAppSelector } from '../../hooks';
import { submitReviewAction } from '../../store/api-action';
import { getReviewStatus } from '../../store/app-data/selectors';
import { ReviewOfferSmall } from '../../types/offer';
import { ReviewsListProp } from '../../types/review-form';
import { sortReviews } from '../../utils/offer';
import ReviewForm from '../review-form/review-form';
import ReviewsItem from '../reviews-item/reviews-item';

function ReviewsList({reviews, isAuth, idOffer}: ReviewsListProp) : JSX.Element {
  const dispatch = useAppDispatch();

  const reviewsNewList = reviews ? reviews.slice().sort(sortReviews).slice(0, 10) : [];
  const reviewStatus = useAppSelector(getReviewStatus);

  const postReview = ({comment, rating}: ReviewOfferSmall) => {
    dispatch(submitReviewAction({comment, rating, idOffer}));
  };

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews?.length}</span></h2>
      <ul className="reviews__list">
        {reviewsNewList?.map((review) => (
          <ReviewsItem key={review.id} review={review} />
        ))}
      </ul>
      {isAuth && <ReviewForm sendReview={(comment, rating) => {postReview({comment, rating});}} error={reviewStatus.error} isLoaded={reviewStatus.isLoaded} />}
    </section>
  );
}

export default ReviewsList;
