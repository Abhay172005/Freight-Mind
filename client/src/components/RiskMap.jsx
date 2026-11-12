import { useEffect, useRef } from 'react';
import { Map, Marker, NavigationControl, Popup, setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import 'maplibre-gl/dist/maplibre-gl.css';

setWorkerUrl(workerUrl);

const makePin = (colour) => {
  const pin = document.createElement('span');
  pin.style.cssText = `display:block;width:12px;height:12px;border:3px solid white;border-radius:999px;background:${colour};box-shadow:0 0 0 1px rgba(15,23,42,.25)`;
  return pin;
};

export default function RiskMap({ originName, originCoords, destinationName, destinationCoords, riskScore = 0 }) {
  const origin = originCoords || [1.3521, 103.8198];
  const destination = destinationCoords || [51.9482, 4.0623];
  const [originLat, originLng] = origin;
  const [destinationLat, destinationLng] = destination;
  const mapContainer = useRef(null);
  const riskColour = riskScore > 70 ? '#dc2626' : riskScore > 40 ? '#d97706' : '#17212b';

  useEffect(() => {
    if (!mapContainer.current) return undefined;
    const map = new Map({
      container: mapContainer.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [(originLng + destinationLng) / 2, (originLat + destinationLat) / 2],
      zoom: 2,
      attributionControl: true,
    });
    map.addControl(new NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      map.addSource('shipment-route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [[originLng, originLat], [(originLng + destinationLng) / 2, (originLat + destinationLat) / 2 + 7], [destinationLng, destinationLat]],
          },
        },
      });
      map.addLayer({
        id: 'shipment-route', type: 'line', source: 'shipment-route',
        paint: { 'line-color': riskColour, 'line-width': 3, 'line-opacity': 0.8, 'line-dasharray': [2, 2] },
      });
      new Marker({ element: makePin('#17212b'), anchor: 'center' }).setLngLat([originLng, originLat]).setPopup(new Popup({ offset: 12 }).setText(originName || 'Origin')).addTo(map);
      new Marker({ element: makePin(riskColour), anchor: 'center' }).setLngLat([destinationLng, destinationLat]).setPopup(new Popup({ offset: 12 }).setText(destinationName || 'Destination')).addTo(map);
      map.fitBounds([[originLng, originLat], [destinationLng, destinationLat]], { padding: { top: 52, right: 52, bottom: 52, left: 52 }, maxZoom: 3, duration: 0 });
    });
    return () => map.remove();
  }, [originLat, originLng, destinationLat, destinationLng, originName, destinationName, riskColour]);

  return (
    <section className="relative h-[300px] w-full overflow-hidden bg-slate-100 sm:h-[360px]">
      <div ref={mapContainer} className="h-full w-full" />
      <div className="pointer-events-none absolute left-4 top-4 border border-slate-200 bg-white/95 px-3 py-2 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Route overview</p><p className="mt-1 text-xs font-medium text-[#17212b]">{originName || 'Origin'} <span className="text-slate-400">to</span> {destinationName || 'Destination'}</p></div>
      <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 border border-slate-200 bg-white/95 px-3 py-2 text-[11px] text-slate-600"><span className="h-2 w-2 rounded-full" style={{ background: riskColour }} /> Risk score {Math.round(riskScore)}/100</div>
    </section>
  );
}
