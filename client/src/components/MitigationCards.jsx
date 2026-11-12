import { CheckCircle2 } from 'lucide-react';
import { Empty } from './ShapChart';

const priority = { high: 'High priority', medium: 'Medium priority', low: 'Monitor' };

export default function MitigationCards({ mitigations }) {
  if (!mitigations?.length) return <Empty message="No mitigation actions were returned for this assessment." />;
  return (
    <section className="border border-slate-200 bg-white">
      <header className="border-b border-slate-200 px-5 py-4"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Recommended response</p><h3 className="mt-1 text-sm font-semibold text-[#17212b]">Actions to reduce exposure</h3></header>
      <ol className="divide-y divide-slate-100">
        {mitigations.map((item, index) => <li key={`${item.title}-${index}`} className="grid gap-4 px-5 py-5 sm:grid-cols-[28px_1fr_auto]"><span className="grid h-6 w-6 place-items-center rounded-full border border-slate-300 text-[10px] font-semibold text-slate-600">{index + 1}</span><div><h4 className="text-sm font-medium text-[#17212b]">{item.title}</h4><p className="mt-1 text-xs leading-5 text-slate-600">{item.description}</p></div><span className="w-fit self-start border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-500">{priority[item.priority] || 'Recommended'}</span></li>)}
      </ol>
      <footer className="flex items-center gap-2 border-t border-slate-200 px-5 py-3 text-[11px] text-slate-500"><CheckCircle2 className="h-3.5 w-3.5" /> Prioritise high-impact actions before changing mode or route.</footer>
    </section>
  );
}
