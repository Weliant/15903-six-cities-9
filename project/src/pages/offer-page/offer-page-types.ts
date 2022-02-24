import { AuthorizationStatus } from '../../consts';
import { Offers } from '../../types/offer';

export type OfferPageProps = {
  offers: Offers;
  authorizationStatus?: AuthorizationStatus;
}
