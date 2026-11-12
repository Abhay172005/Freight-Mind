import { Empty } from './ShapChart';

export default function ModeOptimizer({ modes }) {
  if (!modes?.length) return <Empty message="No transport mode comparison was returned for this assessment." />;
  return (
    <section className="overflow-x-auto border border-slate-200 bg-white">
      <header className="border-b border-slate-200 px-5 py-4"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Transport options</p><h3 className="mt-1 text-sm font-semibold text-[#17212b]">Compare the operational trade-offs</h3></header>
      <div className="min-w-[620px]">
        <div className="grid grid-cols-[1.1fr_.7fr_.8fr_.8fr_2fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500"><span>Mode</span><span>Risk</span><span>ETA</span><span>Cost</span><span>Rationale</span></div>
        {modes.map((mode) => <div key={mode.mode} className="grid grid-cols-[1.1fr_.7fr_.8fr_.8fr_2fr] gap-4 border-b border-slate-100 px-5 py-4 text-xs last:border-b-0"><div className="font-semibold text-[#17212b]">{mode.mode}{mode.is_recommended && <span className="ml-2 text-[10px] font-medium text-slate-500">Recommended</span>}</div><div className="text-slate-600">{mode.risk_rating}/10</div><div className="text-slate-600">{mode.estimated_eta}</div><div className="text-slate-600">{mode.cost_tier}</div><p className="leading-5 text-slate-600">{mode.reasoning}</p></div>)}
      </div>
    </section>
  );
}
