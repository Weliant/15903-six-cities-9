import { Favorite, Offer } from '../types/offer';

export const getListOffersFavorites = (offers?: Offer[]) => {
  const listOffersFavorites = [];
  const citySet = new Set<string>();

  if (offers?.length) {
    for (const offer of offers) {
      citySet.add(offer.city.name);
    }

    const uniqCity: string[] = Array.from(citySet);

    for (const city of uniqCity) {
      const obj: Favorite = {
        name: city,
        offers: [],
      };

      for (const offer of offers) {
        if (city === offer.city.name) {
          obj.offers.push(offer);
        }
      }

      listOffersFavorites.push(obj);
    }
  }

  return listOffersFavorites;
};
