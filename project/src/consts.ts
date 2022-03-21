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
  FavoriteEdit = '/favorite/{hotelId}/{status}',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}
