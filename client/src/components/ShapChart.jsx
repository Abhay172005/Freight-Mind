const label = (value) => value?.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()) || 'Unknown factor';

export default function ShapChart({ factors }) {
  if (!factors?.length) return <Empty message="No model factors were returned for this assessment." />;
  const maximum = Math.max(...factors.map((factor) => Math.abs(factor.impact)), 0.01);

  return (
    <section className="border border-slate-200 bg-white">
      <header className="flex items-end justify-between border-b border-slate-200 px-5 py-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Model explanation</p><h3 className="mt-1 text-sm font-semibold text-[#17212b]">What is driving the risk score</h3></div><span className="text-[10px] text-slate-500">SHAP attribution</span></header>
      <div className="divide-y divide-slate-100">
        {factors.slice(0, 8).map((factor) => {
          const increasesRisk = factor.impact > 0;
          const width = Math.max(4, (Math.abs(factor.impact) / maximum) * 100);
          return <div key={factor.feature} className="grid gap-3 px-5 py-4 sm:grid-cols-[180px_1fr_72px]"><div><p className="text-xs font-medium text-[#17212b]">{label(factor.feature)}</p><p className="mt-1 text-[10px] text-slate-500">{increasesRisk ? 'Increases risk' : 'Reduces risk'}</p></div><div className="flex items-center"><div className="h-1.5 w-full bg-slate-100"><div className={`h-full ${increasesRisk ? 'bg-slate-800' : 'bg-slate-400'}`} style={{ width: `${width}%` }} /></div></div><div className="text-right text-xs font-medium text-slate-600">{increasesRisk ? '+' : ''}{factor.impact.toFixed(3)}</div></div>;
        })}
      </div>
    </section>
  );
}

export function Empty({ message }) {
  return <section className="border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-xs text-slate-500">{message}</section>;
}
