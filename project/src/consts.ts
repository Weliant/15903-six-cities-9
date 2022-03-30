import { Filter } from './types/offer';

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const CITY_DEFAULT = 'Paris';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const RATING_OFFER = 5;
export const COUNT_IMAGE_OFFER = 6;
export const HEIGHT_TOP_MENU = 106;

export enum ImgSize {
  Width = 260,
  Height = 200,
  WidthSmall = 150,
  HeightSmall = 110,
}

export const URL_MARKER_DEFAULT = '../img/pin.svg';
export const URL_MARKER_CURRENT = '../img/pin-active.svg';

export enum MapSize {
  Width = 1144,
  Height = 580,
}

export enum APIRoute {
  Hotels = '/hotels',
  OfferNearby = 'nearby',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum Filters {
  Popular = 'popular',
  Low = 'low',
  Hight = 'hight',
  Rating = 'rating',
}

export const FILTER_LIST: Filter[] = [
  {id: 0, name: 'Popular', type: 'popular'},
  {id: 1, name: 'Price: low to high', type: 'low'},
  {id: 2, name: 'Price: high to low', type: 'hight'},
  {id: 3, name: 'Top rated first', type: 'rating'},
];

export enum NameSpace {
  data = 'DATA',
  user = 'USER',
}
