import { useAppDispatch, useAppSelector } from '../../hooks';
import { submitReviewAction } from '../../store/api-action';
import { ReviewOfferSmall } from '../../types/offer';
import { ReviewsListProp } from '../../types/review-form';
import { getRatingOffer } from '../../utils/card';
import { getFormattedDate, sortReviews } from '../../utils/offer';
import ReviewForm from '../review-form/review-form';

function ReviewsList({reviews, isAuth, idOffer}: ReviewsListProp) : JSX.Element {
  const dispatch = useAppDispatch();

  const reviewsNewList = reviews ? reviews.slice().sort(sortReviews).slice(0, 10) : [];
  const { reviewStatus } = useAppSelector((state) => state);

  const postReview = ({comment, rating}: ReviewOfferSmall) => {
    dispatch(submitReviewAction({comment, rating, idOffer}));
  };

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews?.length}</span></h2>
      <ul className="reviews__list">
        {reviewsNewList?.map((review) => (
          <li key={review.id} className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={review?.user?.avatarUrl} width="54" height="54" alt="Reviews avatar" />
              </div>
              <span className="reviews__user-name">
                {review?.user?.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{width: `${getRatingOffer(review.rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {review.comment}
              </p>
              <time className="reviews__time" dateTime="2019-04-24">{getFormattedDate(review?.date)}</time>
            </div>
          </li>
        ))}
      </ul>
      {isAuth && <ReviewForm sendReview={(comment, rating) => {postReview({comment, rating});}} error={reviewStatus.error} isLoaded={reviewStatus.isLoaded} />}
    </section>
  );
}

export default ReviewsList;
