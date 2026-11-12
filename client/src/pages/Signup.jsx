import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (password.length < 8) {
      setError('Use a password with at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const { supabase } = await import('../services/supabaseClient');
      const { data, error: signupError } = await supabase.auth.signUp({ email, password });
      if (signupError) throw signupError;
      if (data.session) {
        localStorage.setItem('accessToken', data.session.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
        return;
      }
      setMessage('Account created. Check your email to confirm your address, then sign in.');
    } catch (err) {
      setError(err.message || 'Unable to create your account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="freight-auth min-h-screen bg-[#f7f7f5] px-5 py-6 text-[#17212b] sm:px-8">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col">
        <header className="flex items-center justify-between"><Link to="/" className="text-sm font-semibold tracking-tight">Freight Mind</Link><span className="text-xs text-slate-500">Create your workspace</span></header>
        <section className="flex flex-1 items-center justify-center py-16"><div className="w-full max-w-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Get started</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#17212b]">Create an account.</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Start assessing shipment risk and making faster route decisions.</p>
          <form onSubmit={handleSignup} className="mt-8 space-y-5 border-t border-slate-200 pt-6">
            <label className="block"><span className="mb-2 block text-xs font-medium text-slate-700">Work email</span><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" className="w-full border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-800" /></label>
            <label className="block"><span className="mb-2 block text-xs font-medium text-slate-700">Password</span><div className="relative"><input type={showPassword ? 'text' : 'password'} required minLength="8" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" className="w-full border border-slate-300 bg-white px-3 py-3 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-800" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></label>
            <label className="block"><span className="mb-2 block text-xs font-medium text-slate-700">Confirm password</span><input type={showPassword ? 'text' : 'password'} required minLength="8" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Repeat your password" className="w-full border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-800" /></label>
            {error && <p className="border-l-2 border-red-500 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
            {message && <p className="border-l-2 border-emerald-600 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">{message}</p>}
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 bg-[#17212b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Creating account...' : <>Create account <ArrowRight className="h-4 w-4" /></>}</button>
          </form>
          <p className="mt-6 text-center text-xs text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-[#17212b] hover:underline">Sign in</Link></p>
        </div></section>
        <footer className="border-t border-slate-200 py-5 text-[11px] text-slate-500">Freight Mind - Operational decision support for supply chains</footer>
      </div>
    </main>
  );
}
