import { Link } from 'react-router-dom';
import cn from 'classnames';
import { PlaceCardProps } from '../../types/place-card';
import { getCapitalizeFirstLetter } from '../../utils/common';
import { getRatingOffer } from '../../utils/card';
import { AppRoute, ImgSize } from '../../consts';

function PlaceCard({offer, typeView, onCardPlaceHover} : PlaceCardProps) : JSX.Element {
  const {id, previewImage, title, isPremium, isFavorite, price, type, rating} = offer;

  const ratingPercent = getRatingOffer(rating);
  let cardImgW = ImgSize.Width;
  let cardImgH = ImgSize.Height;

  if (typeView === 'favorites') {
    cardImgW = ImgSize.WidthSmall;
    cardImgH = ImgSize.HeightSmall;
  }

  const handlePlaceCardMouseEnter = () => {
    onCardPlaceHover(offer.id);
  };

  const handlePlaceCardMouseLeave = () => {
    onCardPlaceHover(null);
  };

  return (
    <article
      className={cn('place-card',
        {'near-places__card': typeView === 'near',
          'favorites__card': typeView === 'favorites',
          'cities__place-card': !typeView} )}
      onMouseEnter={handlePlaceCardMouseEnter}
      onMouseLeave={handlePlaceCardMouseLeave}
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div
        className={cn('place-card__image-wrapper',
          {'near-places__image-wrapper': typeView === 'near',
            'favorites__image-wrapper': typeView === 'favorites',
            'cities__image-wrapper': !typeView} )}
      >
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width={cardImgW} height={cardImgH} alt="Place" />
        </Link>
      </div>
      <div className={cn('place-card__info', {'favorites__card-info': typeView === 'favorites'} )}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={cn('place-card__bookmark-button button', {'place-card__bookmark-button--active': isFavorite})} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{ isFavorite ? 'In bookmarks': 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{getCapitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
