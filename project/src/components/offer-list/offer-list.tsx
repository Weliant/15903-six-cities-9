import { useState } from 'react';
import { Offer, OfferListProp } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

function OfferList({offers}: OfferListProp) : JSX.Element {
  const [active] = useState(2);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((item) => (
        active === item.id ? <PlaceCard key={item.id.toString()} offer={item as Offer} active={active} />
          : <PlaceCard key={item.id.toString()} offer={item as Offer} />
      ))}
    </div>
  );
}

export default OfferList;
