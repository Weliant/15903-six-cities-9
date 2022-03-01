import { useEffect, useState, MutableRefObject } from 'react';
import leaflet, { LayerGroup, Map, TileLayer } from 'leaflet';
import { CityOffer } from '../types/offer';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityOffer,
): LayerGroup | null {
  const [layerGroup, setLayerGroup] = useState<LayerGroup | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && layerGroup === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
        zoomControl: false,
      });

      const layer = new TileLayer(
        'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/water/EPSG:3857/{z}/{x}/{y}.png',
      );

      instance.addLayer(layer);

      const markerGroup = leaflet.layerGroup().addTo(instance);

      setLayerGroup(markerGroup);
    }
  }, [mapRef, layerGroup, city]);

  return layerGroup;
}

export default useMap;
