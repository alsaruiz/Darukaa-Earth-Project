import { useState } from 'react';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { api } from '../api/client.js';

export default function SignInPage({ onSuccess, onNavigateToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await api.login(email, password);
      if (result.success && result.user) {
        onSuccess(result.user);
      } else {
        setError(result.message || 'Unable to sign in. Please verify your credentials.');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="signin-page" className="max-w-md mx-auto py-6 sm:py-10">
      {/* Card Container */}
      <div className="rounded-2xl border border-[#DEC8D4] p-7 relative overflow-hidden">
        {/* Subtle Brand Accent Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#FAF0F4] border border-[#DEC8D4] text-[#D65D80] mb-3 shadow-xs">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-[#0F0C0E] tracking-tight">Sign In</h1>
          <p className="text-xs text-[#332A30] font-medium mt-1">
            Access your Darukaa Earth geospatial workspace
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#1F181D] mb-1.5">
              Email Address / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#756770] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF5F7]/80 text-[#0F0C0E] placeholder-[#756770] border border-[#DEC8D4] rounded-lg focus:outline-none focus:border-[#D65D80] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#1F181D] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#756770] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF5F7]/80 text-[#0F0C0E] placeholder-[#756770] border border-[#DEC8D4] rounded-lg focus:outline-none focus:border-[#D65D80] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#1F181D]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#DEC8D4] text-[#D65D80] focus:ring-[#D65D80]"
              />
              Remember me
            </label>
            <span className="text-[#332A30] hover:text-[#D65D80] cursor-pointer text-[11px] font-medium">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#D65D80] hover:bg-[#C24D70] disabled:opacity-70 text-white font-semibold rounded-lg text-xs transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Workspace'}
          </button>
        </form>

        {/* Navigation to Sign Up */}
        <div className="mt-5 text-center text-xs text-[#332A30]">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onNavigateToSignUp}
            className="font-semibold text-[#D65D80] hover:underline cursor-pointer"
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
