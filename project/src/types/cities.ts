import { CityOffer, Offer } from './offer';

export type Point = {
  id: number;
  latitude: number | null;
  longitude: number | null;
  zoom: number | null;
};

export type Style = {
  [propertyName: string]: string;
};

export type MapProp = {
  height: number;
  width?: number;
  style?: Style;
  city: CityOffer | undefined;
  points: Offer[];
  selectedPoint?: Point | undefined;
  typeView?: string;
}

export type Cities = {
  cities: string[],
  active: string | undefined,
}
