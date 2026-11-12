import { Loader2, LogOut, Map, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FinancialImpact from '../components/FinancialImpact';
import MitigationCards from '../components/MitigationCards';
import ModeOptimizer from '../components/ModeOptimizer';
import NewsPanel from '../components/NewsPanel';
import QueryInput from '../components/QueryInput';
import RiskGauge from '../components/RiskGauge';
import RiskMap from '../components/RiskMap';
import ShapChart from '../components/ShapChart';
import WeatherCard from '../components/WeatherCard';
import { predictDelayAsync } from '../services/api';

const tabs = [
  ['analysis', 'Assessment'],
  ['factors', 'Risk factors'],
  ['mitigations', 'Actions'],
  ['optim', 'Mode comparison'],
  ['news', 'Signals'],
];

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('analysis');
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { supabase } = await import('../services/supabaseClient');
    await supabase.auth.signOut();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handlePredict = async (query) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await predictDelayAsync(query);
      setResult(response.result);
      setActiveTab('analysis');
    } catch (err) {
      setError(err.message || 'The route assessment could not be completed.');
    } finally {
      setLoading(false);
    }
  };

  const renderTab = () => {
    if (!result) return null;
    switch (activeTab) {
      case 'factors': return <ShapChart factors={result.topRiskFactors} shapValues={result.shapValues} />;
      case 'mitigations': return <MitigationCards mitigations={result.mitigations} />;
      case 'optim': return <ModeOptimizer modes={result.mode_comparison} />;
      case 'news': return <NewsPanel news={result.newsData} />;
      default:
        return <article className="border border-slate-200 bg-white p-6 sm:p-8"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Assessment</p><p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">{result.llmAnalysis}</p></article>;
    }
  };

  return (
    <main className="freight-workspace min-h-screen bg-[#f7f7f5] text-[#17212b]">
      <nav className="border-b border-slate-200 bg-[#f7f7f5]/95 px-5 backdrop-blur sm:px-8">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
          <Link to="/" className="text-sm font-semibold tracking-tight text-[#17212b]">Freight Mind</Link>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-[#17212b]"><LogOut className="h-3.5 w-3.5" /> Sign out</button>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <section className="max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Shipment intelligence</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-[#17212b] sm:text-4xl">Assess a shipment.</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">Describe the route, cargo, and required arrival date. We will return a clear risk brief and recommended next steps.</p>
          <div className="mt-7"><QueryInput onSubmit={handlePredict} loading={loading} /></div>
          {error && <p className="mt-4 border-l-2 border-red-500 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
        </section>

        {loading && <section className="mt-12 max-w-4xl border-y border-slate-200 py-5"><div className="flex items-center gap-3"><Loader2 className="h-4 w-4 animate-spin text-slate-700" /><div><p className="text-sm font-medium text-[#17212b]">Preparing your risk brief</p><p className="mt-0.5 text-xs text-slate-500">Checking shipment context, conditions, and model signals.</p></div></div></section>}

        {!loading && !result && <section className="mt-14 flex max-w-4xl items-start gap-4 border-t border-slate-200 pt-6"><span className="grid h-9 w-9 shrink-0 place-items-center border border-slate-200 bg-white"><Map className="h-4 w-4 text-slate-500" /></span><div><h2 className="text-sm font-semibold text-[#17212b]">Start with a route.</h2><p className="mt-1 max-w-md text-xs leading-5 text-slate-500">For example: “Electronics from Shanghai to Rotterdam, ETA 14 days.”</p></div></section>}

        {result && <section className="mt-12">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Latest assessment</p><h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-[#17212b]">{result.parsedQuery?.origin || 'Origin'} to {result.parsedQuery?.destination || 'destination'}</h2></div><button onClick={() => { setResult(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex w-fit items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-[#17212b]"><Plus className="h-3.5 w-3.5" /> New assessment</button></div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <article className="border border-slate-200 bg-white p-5"><RiskGauge score={result.riskScore} delayDays={result.predictedDelayDays} category={result.delayCategory} /></article>
            <article className="border border-slate-200 bg-white p-5"><FinancialImpact usd={result.financialImpactUsd} breakdown={result.financialBreakdown} /></article>
            <article className="border border-slate-200 bg-white p-5"><WeatherCard weather={result.weatherData} /></article>
            <article className="border border-slate-200 bg-white p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Shipment context</p><dl className="mt-5 space-y-3 text-xs"><div className="flex justify-between gap-3"><dt className="text-slate-500">Cargo</dt><dd className="font-medium text-[#17212b]">{result.parsedQuery?.cargo_type || 'General'}</dd></div><div className="flex justify-between gap-3"><dt className="text-slate-500">ETA</dt><dd className="font-medium text-[#17212b]">{result.parsedQuery?.eta_days || '—'} days</dd></div><div className="flex justify-between gap-3"><dt className="text-slate-500">Mode</dt><dd className="font-medium text-[#17212b]">{result.parsedQuery?.shipping_mode || 'Standard'}</dd></div><div className="flex justify-between gap-3"><dt className="text-slate-500">Market</dt><dd className="font-medium text-[#17212b]">{result.parsedQuery?.market || '—'}</dd></div></dl></article>
          </div>

          <div className="mt-6 overflow-hidden border border-slate-200 bg-white"><RiskMap originName={result.parsedQuery?.origin} originCoords={result.originCoords ? [result.originCoords.lat, result.originCoords.lon] : null} destinationName={result.parsedQuery?.destination} destinationCoords={result.destCoords ? [result.destCoords.lat, result.destCoords.lon] : null} riskScore={result.riskScore} weather={result.weatherData} alternativeRoutes={result.alternativeRoutes} /></div>

          <div className="mt-8 flex gap-5 overflow-x-auto border-b border-slate-200"><div className="hidden shrink-0 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:block">Insights</div>{tabs.map(([key, label]) => <button key={key} onClick={() => setActiveTab(key)} className={`relative shrink-0 px-1 py-3 text-xs font-medium transition ${activeTab === key ? 'text-[#17212b]' : 'text-slate-500 hover:text-[#17212b]'}`}>{label}{activeTab === key && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#17212b]" />}</button>)}</div>
          <div className="mt-6">{renderTab()}</div>
        </section>}
      </div>
    </main>
  );
}
