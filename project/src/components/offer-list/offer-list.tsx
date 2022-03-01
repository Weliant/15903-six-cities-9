import cn from 'classnames';
import { OfferListProp } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

function OfferList({offers, onListItemHover, typeView}: OfferListProp) : JSX.Element {
  const onCardPlaceHover = (id: number | null) => {
    onListItemHover(id);
  };

  return (
    <div className={cn('places__list', {'cities__places-list tabs__content': typeView === 'city', 'near-places__list': !typeView} )}>
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
