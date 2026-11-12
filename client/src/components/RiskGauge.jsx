const statusFor = (score) => {
  if (score <= 30) return 'Low risk';
  if (score <= 60) return 'Moderate risk';
  if (score <= 80) return 'High risk';
  return 'Critical risk';
};

export default function RiskGauge({ score = 0, delayDays = 0, category }) {
  const roundedScore = Math.round(score);
  const arrival = delayDays <= 0 ? `${Math.abs(delayDays).toFixed(1)} days early` : `${delayDays.toFixed(1)} days late`;
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Route risk</p>
      <div className="mt-4 flex items-end justify-between gap-3"><div><span className="text-4xl font-semibold tracking-[-0.06em] text-[#17212b]">{roundedScore}</span><span className="ml-1 text-xs text-slate-500">/100</span></div><span className="mb-1 text-xs font-medium text-slate-600">{statusFor(score)}</span></div>
      <div className="mt-4 h-1.5 bg-slate-100"><div className="h-full bg-[#17212b]" style={{ width: `${Math.min(100, Math.max(4, roundedScore))}%` }} /></div>
      <div className="mt-4 border-t border-slate-100 pt-3"><p className="text-xs font-medium text-[#17212b]">{arrival}</p><p className="mt-1 text-[10px] text-slate-500">{category || 'Projected arrival status'}</p></div>
    </div>
  );
}
