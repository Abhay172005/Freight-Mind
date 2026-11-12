import { ArrowRight, BarChart3, CloudSun, Navigation, Route, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <main className="bg-[#f7f7f5] px-5 text-[#17212b] sm:px-8">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col py-6 sm:py-8">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[#17212b]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#17212b] text-white"><Navigation className="h-4 w-4" /></span>Freight Mind</Link>
          <Link to="/login" className="text-xs font-semibold text-slate-600 transition hover:text-[#17212b]">Sign in</Link>
        </header>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Predictive logistics intelligence</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-[#17212b] sm:text-6xl lg:text-7xl">See delay risk<br />before the delay.</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600">Freight Mind helps logistics teams assess shipment risk, understand the cause, and decide the next best move with confidence.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4"><Link to="/dashboard" className="inline-flex items-center gap-2 rounded-md bg-[#17212b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Analyse a shipment <ArrowRight className="h-4 w-4" /></Link><span className="text-xs text-slate-500">ML prediction · route context · mitigation guidance</span></div>
          </div>

          <aside className="overflow-hidden bg-[#17212b] text-white shadow-xl shadow-slate-300/60 lg:-translate-x-8">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Route intelligence</p><p className="mt-1 text-sm font-medium text-white">Shipment decision brief</p></div><Route className="h-5 w-5 text-slate-400" /></div>
            <div className="relative px-6 py-8"><svg viewBox="0 0 320 150" className="h-auto w-full" aria-label="Example shipping route"><path d="M25 120 C105 12, 210 22, 295 55" fill="none" stroke="rgba(255,255,255,.22)" strokeDasharray="4 6" strokeWidth="1.5" /><path d="M25 120 C105 12, 210 22, 295 55" fill="none" stroke="white" strokeWidth="2" /><circle cx="25" cy="120" r="5" fill="#fff" /><circle cx="295" cy="55" r="5" fill="#94a3b8" /><circle cx="161" cy="39" r="3" fill="#fff" /></svg><div className="mt-3 flex justify-between text-xs"><div><p className="font-medium text-white">Singapore</p><p className="mt-1 text-slate-400">Origin port</p></div><div className="text-right"><p className="font-medium text-white">Rotterdam</p><p className="mt-1 text-slate-400">Destination port</p></div></div></div>
            <div className="grid grid-cols-2 border-t border-white/10"><div className="p-5"><p className="text-[10px] uppercase tracking-wider text-slate-400">Forecast</p><p className="mt-2 text-xl font-semibold tracking-tight">Delay risk</p></div><div className="border-l border-white/10 p-5"><p className="text-[10px] uppercase tracking-wider text-slate-400">Decision</p><p className="mt-2 text-xl font-semibold tracking-tight">Next move</p></div></div>
          </aside>
        </div>

        <footer className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Freight Mind — operational decision support for supply chains.</span><span>v1.2</span></footer>
      </section>

      <section className="mx-auto max-w-6xl border-t border-slate-200 py-20 sm:py-28">
        <div className="max-w-2xl"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">From signal to decision</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">One clear brief for every shipment.</h2><p className="mt-5 text-base leading-7 text-slate-600">Start with the route. Freight Mind brings the model forecast, live conditions, and practical response into one focused view.</p></div>
        <div className="mt-12 grid border-y border-slate-200 md:grid-cols-3">
          <article className="border-slate-200 py-8 md:border-r md:pr-8"><BarChart3 className="h-5 w-5 text-slate-500" /><p className="mt-8 text-sm font-semibold">Forecast the outcome</p><p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">A delivery-risk score, expected delay, and the factors that meaningfully changed it.</p></article>
          <article className="border-t border-slate-200 py-8 md:border-r md:border-t-0 md:px-8"><CloudSun className="h-5 w-5 text-slate-500" /><p className="mt-8 text-sm font-semibold">Read the conditions</p><p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">Weather and news signals are attached to the destination so the context is never abstract.</p></article>
          <article className="border-t border-slate-200 py-8 md:border-t-0 md:pl-8"><ShieldCheck className="h-5 w-5 text-slate-500" /><p className="mt-8 text-sm font-semibold">Choose the response</p><p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">Compare options, estimate the exposure, and leave with a concrete mitigation plan.</p></article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl pb-20 sm:pb-28"><div className="flex flex-col gap-8 border border-slate-200 bg-white p-7 sm:flex-row sm:items-end sm:justify-between sm:p-10"><div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Ready when the route is</p><h2 className="mt-4 max-w-xl text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Turn a shipment update into an informed next move.</h2></div><Link to="/dashboard" className="inline-flex shrink-0 items-center gap-2 self-start rounded-md bg-[#17212b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 sm:self-auto">Open dashboard <ArrowRight className="h-4 w-4" /></Link></div></section>
    </main>
  );
}
