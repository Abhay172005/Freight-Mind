import { Empty } from './ShapChart';

const signalType = (sentiment) => sentiment === 'negative' ? 'Disruption' : sentiment === 'positive' ? 'Positive signal' : 'Monitor';

export default function NewsPanel({ news }) {
  if (!news?.length) return <Empty message="No external logistics signals were returned for this assessment." />;
  return (
    <section className="border border-slate-200 bg-white">
      <header className="border-b border-slate-200 px-5 py-4"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">External context</p><h3 className="mt-1 text-sm font-semibold text-[#17212b]">Signals affecting this route</h3></header>
      <div className="divide-y divide-slate-100">
        {news.map((item, index) => <article key={`${item.title}-${index}`} className="grid gap-3 px-5 py-5 sm:grid-cols-[120px_1fr]"><div><span className="text-[10px] font-medium text-slate-500">{signalType(item.sentiment)}</span><p className="mt-1 text-[10px] text-slate-400">{item.source || 'Source unavailable'}</p></div><div><h4 className="text-sm font-medium text-[#17212b]">{item.title}</h4>{item.description && <p className="mt-1 text-xs leading-5 text-slate-600">{item.description}</p>}</div></article>)}
      </div>
    </section>
  );
}
