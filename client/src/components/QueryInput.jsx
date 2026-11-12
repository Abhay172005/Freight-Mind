import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const examples = [
  'Electronics from Shanghai to Los Angeles, ETA 14 days',
  'Machinery parts from Mumbai to London, ETA 21 days',
  'Pharmaceuticals from Singapore to Rotterdam, ETA 8 days',
];

export default function QueryInput({ onSubmit, loading }) {
  const [query, setQuery] = useState('');
  const submit = (event) => { event.preventDefault(); if (query.trim() && !loading) onSubmit(query.trim()); };

  return (
    <div>
      <form onSubmit={submit} className="border border-slate-300 bg-white p-2 shadow-sm">
        <div className="flex items-center gap-2">
          <input value={query} onChange={(event) => setQuery(event.target.value)} disabled={loading} placeholder="Describe a shipment — origin, destination, cargo, and ETA" className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-[#17212b] outline-none placeholder:text-slate-400" />
          <button type="submit" disabled={!query.trim() || loading} className="inline-flex shrink-0 items-center gap-2 bg-[#17212b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"><span className="hidden sm:inline">Analyse</span><ArrowRight className="h-4 w-4" /></button>
        </div>
      </form>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {examples.map((example) => <button key={example} type="button" disabled={loading} onClick={() => { setQuery(example); onSubmit(example); }} className="text-left text-[11px] text-slate-500 underline decoration-slate-300 underline-offset-4 transition hover:text-[#17212b] disabled:opacity-50">{example}</button>)}
      </div>
    </div>
  );
}
