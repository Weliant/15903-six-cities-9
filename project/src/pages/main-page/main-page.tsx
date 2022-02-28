import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainPageProps } from './main-page-types';
import { AppRoute, CITIES } from '../../consts';
import { getCapitalizeFirstLetter } from '../../utils/common';
import OfferList from '../../components/offer-list/offer-list';
import CitiesMap from '../../components/cities-map/cities-map';
import { Point } from '../../types/cities';
import { Offer } from '../../types/offer';
import { getOffer, getOffersByCity } from '../../utils/offer';

function MainPage({offers}: MainPageProps) : JSX.Element {
  const [active, setActive] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const citiesRef = useRef<null | HTMLDivElement>(null);

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);
  const [height, setHeight] = useState(0);
  const offersByCity = getOffersByCity(active, offers) as Offer[];

  const onListItemHover = (offerId: number) => {
    const currentOffer = getOffer(offers, offerId) as Offer;

    const currentPoint: Point = {
      id: offerId,
      latitude: currentOffer.location.latitude,
      longitude: currentOffer.location.longitude,
      zoom: currentOffer.location.zoom,
    };

    setSelectedPoint(currentPoint as Point);
  };

  useEffect(() => {
    const refElement = citiesRef.current;

    if (location.hash) {
      const city = getCapitalizeFirstLetter(location.hash.slice(1));
      setActive(city);
    } else {
      navigate(`${AppRoute.Root}#${CITIES[0].toLowerCase()}`, { replace: true });
    }


    if (refElement) {
      setHeight(refElement.offsetHeight);
    }

  }, [location, navigate, citiesRef]);

  return (
    <main className={`page__main page__main--index ${offersByCity?.length ? '' : 'page__main--index-empty'}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              CITIES.map((city) => {
                const keyValue = `${city}`;

                return (
                  <li key={keyValue} className="locations__item">
                    <a className={`locations__item-link tabs__item ${ active === city ?'tabs__item--active': ''}`} href={`#${city.toLowerCase()}`}>
                      <span>{city}</span>
                    </a>
                  </li>
                );
              })
            }
          </ul>
        </section>
      </div>
      { offersByCity?.length ?
        <div className="cities" ref={citiesRef}>
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersByCity.length} places to stay in {active}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferList offers={offersByCity} onListItemHover={onListItemHover} />
            </section>
            <div className="cities__right-section">
              <CitiesMap height={height} city={offersByCity[0].city} points={offersByCity} selectedPoint={selectedPoint}/>
            </div>
          </div>
        </div>
        :
        <div className="cities" ref={citiesRef}>
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>}
    </main>
  );
}

export default MainPage;
