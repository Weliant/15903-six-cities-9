import { CityOffer, Offer } from './offer';

export type Point = {
  id: number;
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CitiesMapProp = {
  height: number;
  city: CityOffer;
  points: Offer[];
  selectedPoint: Point | undefined;
}
