import { getListOffersFavorites } from '../../utils/favorites';
import { useAppSelector } from '../../hooks';
import FavoritesItem from '../../components/favorites-item/favorites-item';
import Footer from '../../components/footer/footer';
import { getFavoritesOffers } from '../../store/app-data/selectors';
import { store } from '../../store';
import { useEffect } from 'react';
import { fetchFavoritesOffersAction } from '../../store/api-action';

function FavoritesPage() : JSX.Element {
  const offers = useAppSelector(getFavoritesOffers);
  const listOffersFavorites = getListOffersFavorites(offers);

  useEffect(() => {
    store.dispatch(fetchFavoritesOffersAction());
  }, []);

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
                      <FavoritesItem key={keyValue} favorite={favorite}/>
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
      <Footer />
    </>
  );
}

export default FavoritesPage;
