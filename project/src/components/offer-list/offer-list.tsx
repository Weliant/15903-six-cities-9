import { OfferListProp } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

function OfferList({offers, onListItemHover}: OfferListProp) : JSX.Element {
  const onCardPlaceHover = (id: number) => {
    onListItemHover(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((item) => (
        <PlaceCard
          key={item.id.toString()}
          offer={item}
          onCardPlaceHover={onCardPlaceHover}
        />
      ))}
    </div>
  );
}

export default OfferList;
