import { useLocation, useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { AppRoute, MapSize } from '../../consts';
import { getCapitalizeFirstLetter } from '../../utils/common';
import { getRatingOffer } from '../../utils/card';
import { getOfferImages } from '../../utils/offer';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { Point } from '../../types/cities';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { fetchOfferByIdAction, postOfferStatusAction } from '../../store/api-action';
import NotFoundPage from '../not-found-page/not-found-page';
import { Offer } from '../../types/offer';
import { getOffer, getOfferNearby, getReview } from '../../store/app-data/selectors';
import { isCheckedAuth } from '../../utils/auth';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function OfferPage() : JSX.Element {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const offer = useAppSelector(getOffer);
  const nearby = useAppSelector(getOfferNearby);
  const reviews = useAppSelector(getReview);
  const [initError, setInitError] = useState<boolean>(false);
  const [offers, setOffers] = useState<Offer[]>([]);

  const ratingPercent = getRatingOffer(offer?.rating);
  const images = getOfferImages(offer);

  const currentPoint: Point | undefined = {
    id: offer?.id,
    latitude: offer?.location.latitude,
    longitude: offer?.location.longitude,
    zoom: offer?.location.zoom,
  };

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = isCheckedAuth(authorizationStatus);

  const dispatch = useAppDispatch();

  const styleMap = {
    margin: '0 auto',
    marginBottom: '50px',
  };

  const postFavorites = () => {
    dispatch(postOfferStatusAction({idOffer: offer?.id, status: Number(!offer?.isFavorite)}));
  };

  const handleButtonClick = () => {
    if (!isAuth){
      navigate(AppRoute.Login, { replace: true });
      return false;
    }

    postFavorites();
  };

  useEffect(() => {
    if ((offer === undefined && id) || (Number(offer?.id) !== Number(id))) {
      dispatch(fetchOfferByIdAction(id));
      setInitError(false);
    } else {
      if (offer === null) {
        setInitError(true);
      }
    }

    let list: Offer[] = [];

    if (offer && offer !== null) {
      list = [offer];
    }

    if (nearby?.length) {
      list = [...list, ...nearby];
    }

    setOffers(list);

  }, [dispatch, id, location, nearby, offer]);

  return(
    <>
      { !initError
        ?
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images?.map((img) => (
                  <div key={img} className="property__image-wrapper">
                    <img className="property__image" src={img} alt="Place" />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {offer?.isPremium ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                  : ''}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {offer?.title}
                  </h1>
                  <button
                    className={cn('property__bookmark-button button', {'property__bookmark-button--active': offer?.isFavorite})}
                    type="button"
                    onClick={handleButtonClick}
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">{ offer?.isFavorite ? 'In bookmarks': 'To bookmarks'}</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${ratingPercent}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer?.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {getCapitalizeFirstLetter(offer?.type)}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offer?.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {offer?.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{offer?.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {offer?.goods.map((good) => (
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
                      <img className="property__avatar user__avatar" src={offer?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {offer?.host.name}
                    </span>
                    <span className="property__user-status">
                      {offer?.host.isPro ? 'Pro' : ''}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {offer?.description}
                    </p>
                  </div>
                </div>
                <ReviewsList reviews={reviews} isAuth={isAuth} idOffer={offer?.id}/>
              </div>
            </div>
            <Map height={MapSize.Height}
              width={MapSize.Width}
              city={offer?.city}
              points={offers}
              style={styleMap}
              selectedPoint={currentPoint}
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OfferList offers={nearby} onListItemHover={() => false } typeView={'nearby'}/>
            </section>
          </div>
        </main>
        :
        <NotFoundPage/>}
      <span></span>
    </>
  );
}

export default OfferPage;
