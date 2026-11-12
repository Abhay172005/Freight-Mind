const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0);

export default function FinancialImpact({ usd, breakdown }) {
  const rows = [
    ['Revenue at risk', breakdown?.revenue_at_risk],
    ['Holding cost', breakdown?.holding_cost],
    ['Penalty fees', breakdown?.penalty_fees],
  ];
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Financial exposure</p>
      <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#17212b]">{money(usd)}</p>
      <p className="mt-1 text-[10px] text-slate-500">Estimated impact if the risk materialises</p>
      <dl className="mt-5 divide-y divide-slate-100 border-t border-slate-100">
        {rows.map(([name, value]) => <div key={name} className="flex items-center justify-between py-2 text-[11px]"><dt className="text-slate-500">{name}</dt><dd className="font-medium text-slate-700">{money(value)}</dd></div>)}
      </dl>
    </div>
  );
}
