import { Link } from 'react-router-dom';
import { PlaceCardProps } from '../../types/place-card';
import { getCapitalizeFirstLetter } from '../../utils/common';
import { getRatingOffer } from '../../utils/card';
import { AppRoute, ImgSize } from '../../consts';

function PlaceCard({offer, active, typeView} : PlaceCardProps) : JSX.Element {
  const {id, previewImage, title, isPremium, isFavorite, price, type, rating} = offer;

  const ratingPercent = getRatingOffer(rating);

  const bookMarkStyle = `place-card__bookmark-button button ${ isFavorite ? 'place-card__bookmark-button--active': ''}`;

  let cardStyle = 'cities__place-card place-card';
  let cardImgStyle = 'cities__image-wrapper place-card__image-wrapper';
  let cardImgW = ImgSize.Width;
  let cardImgH = ImgSize.Height;
  let cardInfoStyle = 'place-card__info';

  if (typeView === 'favorites') {
    cardStyle = 'favorites__card place-card';
    cardImgStyle = 'favorites__image-wrapper place-card__image-wrapper';
    cardImgW = ImgSize.WidthSmall;
    cardImgH = ImgSize.HeightSmall;
    cardInfoStyle = 'favorites__card-info place-card__info';
  } else if (typeView === 'near') {
    cardStyle = 'near-places__card place-card';
    cardImgStyle = 'near-places__image-wrapper place-card__image-wrapper';
  }

  return (
    <article className={cardStyle}>
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ''}
      <div className={cardImgStyle}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width={cardImgW} height={cardImgH} alt="Place" />
        </Link>
      </div>
      <div className={cardInfoStyle}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookMarkStyle} type="button">
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
