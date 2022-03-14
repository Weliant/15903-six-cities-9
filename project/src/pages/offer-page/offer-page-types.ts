import { AuthorizationStatus } from '../../consts';
import { Offer } from '../../types/offer';

export type OfferPageProps = {
  offers?: Offer[];
  authorizationStatus?: AuthorizationStatus;
}
