import { Link } from 'react-router-dom';
import { FavoritesPageProps } from './favorites-page-types';
import { getListOffersFavorites } from '../../utils/favorites';
import PlaceCard from '../../components/place-card/place-card';

function FavoritesPage({offers}: FavoritesPageProps) : JSX.Element {
  const listOffersFavorites = getListOffersFavorites(offers);

  return (
    <>
      {offers?.length ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {
                  listOffersFavorites.map((favorite) => {
                    const keyValue = `${favorite.name}`;

                    return (
                      <li key={keyValue} className="favorites__locations-items">
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="#city">
                              <span>{favorite.name}</span>
                            </a>
                          </div>
                        </div>
                        <div className="favorites__places">
                          {favorite.offers.map((item) => <PlaceCard key={item.id.toString()} offer={item} typeView="favorites" onCardPlaceHover={() => false } />)}
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
            </section>
          </div>
        </main>
        :
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>}
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </>
  );
}

export default FavoritesPage;
