import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, CITIES, CITY_DEFAULT, Filters, HEIGHT_TOP_MENU } from '../../consts';
import { getCapitalizeFirstLetter } from '../../utils/common';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { Point } from '../../types/cities';
import { Filter, Offer } from '../../types/offer';
import { getDataByCity, getOffer, getOffersByCity, sortFilter } from '../../utils/offer';
import CitiesList from './../../components/cities-list/cities-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FilterSort from '../../components/filter-sort/filter-sort';
import { changeDataCityAction, loadOfferById } from '../../store/app-data/app-data';
import { getCity, getCityName, getOffers } from '../../store/app-data/selectors';
import MainPageEmpty from '../../components/main-page-empty/main-page-empty';
import { fetchOffersAction } from '../../store/api-action';
import { store } from '../../store';

function MainPage() : JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const citiesRef = useRef<null | HTMLDivElement>(null);
  const activeCityData = useAppSelector(getCity);
  const activeCityName = useAppSelector(getCityName);
  const offers = useAppSelector(getOffers);
  const dispatch = useAppDispatch();

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);
  const [height, setHeight] = useState(0);
  const [offersByCity, setOffersByCity] = useState<Offer[] | undefined>(undefined);
  const [offersByCityFilter, setOffersByCityFilter] = useState<Offer[] | undefined>(undefined);
  const [activeFilter, setActiveFilter] = useState<string>(Filters.Popular);
  const [init, setInit] = useState<boolean>(false);

  const onListItemHover = useCallback((offerId: number | null) => {
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
  }, [offers]);

  const onFilterItemClick = (item: Filter) => {
    setActiveFilter(item.type);

    if (offersByCity?.length) {
      setOffersByCityFilter(sortFilter(item.type, offersByCity));
    }
  };

  useEffect(() => {
    const refElement = citiesRef.current;

    if (!init) {
      store.dispatch(fetchOffersAction());
      setInit(true);
    }

    if (location.hash) {
      const city = getCapitalizeFirstLetter(location.hash.slice(1));
      const offersByCityNew = getOffersByCity(offers, city);
      setOffersByCity(offersByCityNew);
      setOffersByCityFilter(Object.assign([], offersByCityNew));

      if (offersByCityNew) {
        const activeCityDataNew = getDataByCity(offersByCityNew, city);
        dispatch(changeDataCityAction(activeCityDataNew?.city));
      }

      dispatch(loadOfferById(undefined));
    } else {
      navigate(`${AppRoute.Root}#${CITY_DEFAULT.toLowerCase()}`, { replace: true });
    }

    if (refElement && refElement.offsetHeight) {
      setHeight((refElement.offsetHeight - HEIGHT_TOP_MENU));
    }

  }, [location, navigate, citiesRef, dispatch, offers, init]);

  return (
    <main ref={citiesRef} className={`page__main page__main--index ${!offersByCityFilter?.length && 'page__main--index-empty'}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList cities={CITIES} active={activeCityName}/>
        </section>
      </div>
      { offersByCityFilter?.length ?
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersByCityFilter.length} places to stay in {activeCityName}</b>
              <FilterSort activeFilter={activeFilter} onFilterItemClick={onFilterItemClick}></FilterSort>
              <OfferList offers={offersByCityFilter} onListItemHover={onListItemHover} typeView={'city'}/>
            </section>
            <div className="cities__right-section">
              <Map height={height} city={activeCityData} points={offersByCityFilter} selectedPoint={selectedPoint} typeView='city'/>
            </div>
          </div>
        </div>
        :
        <MainPageEmpty/>}
    </main>
  );
}

export default MainPage;
