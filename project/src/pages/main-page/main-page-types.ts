import { AuthorizationStatus } from '../../consts';
import { Offers } from '../../types/offer';

export type MainPageProps = {
  offers: Offers;
  adsCount?: number;
  authorizationStatus?: AuthorizationStatus;
}
