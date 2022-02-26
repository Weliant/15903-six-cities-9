import { AuthorizationStatus } from '../../consts';
import { Offer } from '../../types/offer';

export type MainPageProps = {
  offers: Offer[];
  adsCount?: number;
  authorizationStatus?: AuthorizationStatus;
}
