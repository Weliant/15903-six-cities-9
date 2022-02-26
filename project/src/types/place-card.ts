import { Offer } from './offer';

export type PlaceCardProps = {
  offer: Offer;
  activeCard?: boolean;
  typeView?: string;
  onCardPlaceHover: (offerId: number) => void;
}
