export const Setting = {
  ADS_COUNT: 5,
};

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

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

export const ratingOffer = 5;
export const countImagesOffer = 6;

export enum ImgSize {
  Width = 260,
  Height = 200,
  WidthSmall = 150,
  HeightSmall = 110,
}
