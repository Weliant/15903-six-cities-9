import cn from 'classnames';
import { useCallback } from 'react';
import { OfferListProp } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

function OfferList({offers, onListItemHover, typeView}: OfferListProp) : JSX.Element {
  const onCardPlaceHover = useCallback((id: number | null) => {
    onListItemHover(id);
  }, [onListItemHover]);

  return (
    <div className={cn('places__list', {'cities__places-list tabs__content': typeView === 'city', 'near-places__list': typeView !== 'city'} )}>
      {offers?.map((item) => (
        <PlaceCard
          key={item.id.toString()}
          offer={item}
          onCardPlaceHover={onCardPlaceHover}
          typeView={typeView}
        />
      ))}
    </div>
  );
}

export default OfferList;
