import { AuthorizationStatus } from '../../consts';
import { Offer } from '../../types/offer';

export type MainPageProps = {
  offers: Offer[];
  authorizationStatus?: AuthorizationStatus;
}
