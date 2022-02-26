import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { OfferPageProps } from './offer-page-types';
import { FormComment } from '../../types/review-form';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { getCapitalizeFirstLetter } from '../../utils/common';
import { getRatingOffer } from '../../utils/card';
import { getFormattedDate, getOffer, getOfferImages, getOfferNeighbourhood } from '../../utils/offer';
import { reviews } from '../../mocks/reviews';
import ReviewForm from '../../components/review-form/review-form';
import PlaceCard from '../../components/place-card/place-card';
import { Offer } from '../../types/offer';

function OfferPage({offers, authorizationStatus}: OfferPageProps) : JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();

  const offer: Offer = getOffer(offers, id) as Offer;
  const ratingPercent = getRatingOffer(offer.rating);
  const images = getOfferImages(offer);
  const offerNeighbourhood = getOfferNeighbourhood(offers, id) as Offer[];

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const postReview = ({rating, comment}: FormComment) => {
    throw new Error(`Function 'onSendReview' isn't implemented. Data is ${rating} and ${comment}`);
  };

  const postFavorites = () => {
    throw new Error('Function \'postFavorites\' isn\'t implemented.');
  };

  const handleButtonClick = () => {
    if (!isAuth){
      navigate(AppRoute.Login, { replace: true });
      return false;
    }

    postFavorites();
  };

  return(
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.map((img) => (
              <div key={img} className="property__image-wrapper">
                <img className="property__image" src={img} alt="Place" />
              </div>
            ))}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {offer.isPremium ?
              <div className="property__mark">
                <span>Premium</span>
              </div>
              : ''}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer.title}
              </h1>
              <button
                className={cn('property__bookmark-button button', {'property__bookmark-button--active': offer.isFavorite})}
                type="button"
                onClick={handleButtonClick}
              >
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">{ offer.isFavorite ? 'In bookmarks': 'To bookmarks'}</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${ratingPercent}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {getCapitalizeFirstLetter(offer.type)}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((good) => (
                  <li key={good} className="property__inside-item">
                    {good}
                  </li>
                ))}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {offer.host.name}
                </span>
                <span className="property__user-status">
                  {offer.host.isPro ? 'Pro' : ''}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {offer.description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
              <ul className="reviews__list">
                {reviews.map((review) => (
                  <li key={review.id} className="reviews__item">
                    <div className="reviews__user user">
                      <div className="reviews__avatar-wrapper user__avatar-wrapper">
                        <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
                      </div>
                      <span className="reviews__user-name">
                        {review.user.name}
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
                      <time className="reviews__time" dateTime="2019-04-24">{getFormattedDate(review.date)}</time>
                    </div>
                  </li>
                ))}
              </ul>
              {isAuth && <ReviewForm sendReview={(rating, comment) => {postReview({rating, comment});}} />}
            </section>
          </div>
        </div>
        <section className="property__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {offerNeighbourhood.map((item) => <PlaceCard key={item.id.toString()} offer={item} typeView="near" onCardPlaceHover={() => false }/>)}
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferPage;
