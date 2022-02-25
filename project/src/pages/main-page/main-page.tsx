import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainPageProps } from './main-page-types';
import { AppRoute, cities } from '../../consts';
import { getCapitalizeFirstLetter } from '../../utils/common';
import OfferList from '../../components/offer-list/offer-list';

function MainPage({offers}: MainPageProps) : JSX.Element {
  const [active, setActive] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      setActive(getCapitalizeFirstLetter(location.hash.slice(1)));
    } else {
      navigate(`${AppRoute.Root}#${cities[0].toLowerCase()}`, { replace: true });
    }
  }, [location, navigate]);

  return (
    <main className={`page__main page__main--index ${offers?.length ? '' : 'page__main--index-empty'}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              cities.map((city) => {
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
      { offers?.length ?
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
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
              <OfferList offers={offers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
        :
        <div className="cities">
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
