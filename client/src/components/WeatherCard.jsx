import { Cloud, CloudRain, CloudSun } from 'lucide-react';

export default function WeatherCard({ weather }) {
  if (!weather || weather.error) return <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Conditions</p><p className="mt-4 text-sm text-slate-500">Weather signal unavailable.</p></div>;
  const description = weather.description || 'Conditions unavailable';
  const rainy = /rain|storm|drizzle|thunder/i.test(description);
  const Icon = rainy ? CloudRain : description.includes('cloud') ? Cloud : CloudSun;
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Destination conditions</p>
      <div className="mt-4 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center border border-slate-200 bg-slate-50"><Icon className="h-4 w-4 text-slate-600" /></span><div><p className="text-lg font-semibold text-[#17212b]">{Math.round(weather.temp)}°C</p><p className="text-[11px] capitalize text-slate-500">{description}</p></div></div>
      <div className="mt-5 flex gap-6 border-t border-slate-100 pt-3 text-[11px]"><div><p className="text-slate-500">Wind</p><p className="mt-1 font-medium text-slate-700">{weather.wind_speed ?? '—'} km/h</p></div><div><p className="text-slate-500">Humidity</p><p className="mt-1 font-medium text-slate-700">{weather.humidity ?? '—'}%</p></div></div>
    </div>
  );
}
