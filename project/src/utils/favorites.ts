import { Offers } from '../types/offer';

type favorite = {
  name: string,
  offers: Offers,
};

export const getListOffersFavorites = (offers: Offers) => {
  const listOffersFavorites = [];
  const citySet = new Set<string>();

  for (const offer of offers) {
    citySet.add(offer.city.name);
  }

  const uniqCity: string[] = Array.from(citySet);

  for (const city of uniqCity) {
    const obj: favorite = {
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

  return listOffersFavorites;
};
