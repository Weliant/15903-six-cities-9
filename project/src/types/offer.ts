export type HostOffer = {
  id: number,
  name: string,
  isPro: boolean,
  avatarUrl: string,
};

export type LocationOffer = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityOffer = {
  name: string;
  location: LocationOffer;
};

export type Offer = {
  city: CityOffer,
  previewImage: string,
  images: string[],
  title: string,
  isFavorite: boolean,
  isPremium: boolean,
  rating: number,
  type: string,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: string[],
  host: HostOffer,
  description: string,
  location: LocationOffer,
  id: number,
}

export type User = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type ReviewOffer = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: User,
};

export type OfferListProp = {
  offers: Offer[];
  onListItemHover: (offerId: number | null) => void;
  typeView?: string;
}
