import {useEffect, useRef} from 'react';
import leaflet, {Marker} from 'leaflet';
import cn from 'classnames';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { MapProp } from '../../types/cities';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../consts';

function Map({height, width, style, city, points, selectedPoint, typeView}: MapProp) : JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const styleSize = {height: `${height}px`, width: `${width ? width : 'auto'}px`};
  const styleMap = style ? {...style, ...styleSize} : styleSize;

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
  });

  useEffect(() => {
    if (map) {
      map.clearLayers();
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [currentCustomIcon, defaultCustomIcon, map, points, selectedPoint]);

  return (
    <section
      className={cn('map', {'cities__map': typeView === 'city', 'property__map': !typeView} )}
      style={styleMap}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
