import { User } from './user';

export type LocationOffer = {
  latitude: number | null;
  longitude: number | null;
  zoom: number | null;
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
  host: User,
  description: string,
  location: LocationOffer,
  id: number,
}

export type ReviewOfferSmall = {
  comment: string,
  rating: number,
  idOffer?: number,
};

export interface IReviewOffer extends ReviewOfferSmall {
  date?: string,
  id: number,
  user?: User,
}

export type OfferListProp = {
  offers?: Offer[];
  onListItemHover: (offerId: number | null) => void;
  typeView?: string;
}

export type Filter = {
  id: number;
  name: string;
  type: string;
}

export type FilterProp = {
  onFilterItemClick: (item: Filter) => void;
  activeFilter?: string;
}

export type FilterItemProp = {
  item: Filter;
  onItemClick: (item: Filter) => void;
  activeFilter?: string;
}

export type Favorite = {
  name: string,
  offers: Offer[],
};

export type FavoriteItem = {
  favorite: Favorite;
};


