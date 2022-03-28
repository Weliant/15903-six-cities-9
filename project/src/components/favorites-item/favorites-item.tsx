import PlaceCard from '../../components/place-card/place-card';
import { FavoriteItem } from '../../types/offer';

function FavoritesItem(props: FavoriteItem) : JSX.Element {
  const { favorite } = props;

  return (
    <li className="favorites__locations-items">
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
}

export default FavoritesItem;
