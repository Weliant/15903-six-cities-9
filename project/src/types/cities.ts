import { CityOffer, Offer } from './offer';

export type Point = {
  id: number;
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Style = {
  [propertyName: string]: string;
};

export type MapProp = {
  height: number;
  width?: number;
  style?: Style;
  city: CityOffer;
  points: Offer[];
  selectedPoint?: Point | undefined;
  typeView?: string;
}
