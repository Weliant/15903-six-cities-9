import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, CITIES, CITY_DEFAULT } from '../../consts';
import { getCapitalizeFirstLetter } from '../../utils/common';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { Point } from '../../types/cities';
import { Offer } from '../../types/offer';
import { getDataByCity, getOffer, getOffersByCity } from '../../utils/offer';
import CitiesList from './../../components/cities-list/cities-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeDataCityAction } from '../../store/action';

function MainPage() : JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const citiesRef = useRef<null | HTMLDivElement>(null);
  const activeCityData = useAppSelector((state) => state.city);
  const activeCityName = useAppSelector((state) => state.city?.name);
  const offers = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);
  const [height, setHeight] = useState(0);
  const [offersByCity, setOffersByCity] = useState<Offer[] | undefined>(undefined);

  const onListItemHover = (offerId: number | null) => {
    if (offerId) {
      const currentOffer = getOffer(offers, offerId) as Offer;

      const currentPoint: Point = {
        id: offerId,
        latitude: currentOffer.location.latitude,
        longitude: currentOffer.location.longitude,
        zoom: currentOffer.location.zoom,
      };

      setSelectedPoint(currentPoint);
    } else {
      setSelectedPoint(undefined);
    }
  };

  useEffect(() => {
    const refElement = citiesRef.current;

    if (location.hash) {
      const city = getCapitalizeFirstLetter(location.hash.slice(1));
      const offersByCityNew = getOffersByCity(offers, city);
      setOffersByCity(offersByCityNew);

      if (offersByCityNew) {
        const activeCityDataNew = getDataByCity(offersByCityNew, city);
        dispatch(changeDataCityAction(activeCityDataNew?.city));
      }
    } else {
      navigate(`${AppRoute.Root}#${CITY_DEFAULT.toLowerCase()}`, { replace: true });
    }


    if (refElement) {
      setHeight(refElement.offsetHeight);
    }

  }, [location, navigate, citiesRef, dispatch, offers]);

  return (
    <main className={`page__main page__main--index ${!offersByCity?.length && 'page__main--index-empty'}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList cities={CITIES} active={activeCityName}/>
        </section>
      </div>
      { offersByCity?.length ?
        <div className="cities" ref={citiesRef}>
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersByCity.length} places to stay in {activeCityName}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferList offers={offersByCity} onListItemHover={onListItemHover} typeView={'city'}/>
            </section>
            <div className="cities__right-section">
              <Map height={height} city={activeCityData} points={offersByCity} selectedPoint={selectedPoint} typeView='city'/>
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
