import { useEffect, useState, MutableRefObject } from 'react';
import leaflet, { LayerGroup, Map, TileLayer } from 'leaflet';
import { CityOffer } from '../types/offer';

type MapProp = {
  map: Map | null,
  layerGroup: LayerGroup | null
}

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityOffer | undefined,
): MapProp {
  const [map, setMap] = useState<Map | null>(null);
  const [layerGroup, setLayerGroup] = useState<LayerGroup | null>(null);

  useEffect(() => {
    let instance: Map;

    if (mapRef.current !== null && layerGroup === null && map === null) {
      instance = new Map(mapRef.current, {
        center: {
          lat: city?.location.latitude,
          lng: city?.location.longitude,
        },
        zoom: city?.location.zoom,
        zoomControl: false,
      } as leaflet.MapOptions | undefined);

      const layer = new TileLayer(
        'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/water/EPSG:3857/{z}/{x}/{y}.png',
      );

      instance.addLayer(layer);

      const markerGroup = leaflet.layerGroup().addTo(instance);

      setLayerGroup(markerGroup);
      setMap(instance);
    }
  }, [mapRef, layerGroup, city, map]);

  return {map, layerGroup};
}

export default useMap;
