import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { PageView } from '../../types';

interface SignupViewProps {
  setActiveView: (view: PageView) => void;
}

export const SignupView: React.FC<SignupViewProps> = ({ setActiveView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return { score: 0, label: '' };
    if (pass.length < 6) return { score: 1, label: 'Weak', color: 'bg-[#c25244]' };
    if (pass.length < 10) return { score: 2, label: 'Moderate', color: 'bg-[#d2691e]' };
    return { score: 3, label: 'Strong', color: 'bg-[#2d7a58]' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setActiveView('onboarding');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1c1c1a] flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-[#5a5a40] text-white p-8 md:p-16 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-[#484832] flex items-center justify-center text-white font-bold text-xl shadow-soft">
              C
            </div>
            <div>
              <div className="font-bold text-lg text-white">CONNECTYCON</div>
              <div className="text-[10px] text-[#f2d2bd] font-bold uppercase">Executive Onboarding</div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Join 12,000+ verified technology founders and investors.
          </h1>
          <p className="text-xs md:text-sm text-[#e5e5e0] leading-relaxed mb-6">
            Unlock AI Business Advisor capabilities, token usage analytics, and high-impact executive networking.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#484832]/60 border border-[#484832] text-xs text-[#f2d2bd] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#d2e0b0] shrink-0" />
          <span>Enterprise privacy guarantee: Your strategic business data is never used to train public LLM models.</span>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center bg-white">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1c1c1a]">Create Executive Account</h2>
            <p className="text-xs text-gray-500 mt-1">Start your 14-day Pro trial with 100,000 monthly AI tokens.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1c1c1a] mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#f5f5f0] border border-[#e5e5e0] focus:border-[#5a5a40] rounded-xl text-xs font-medium text-[#1c1c1a] outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1c1c1a] mb-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@company.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#f5f5f0] border border-[#e5e5e0] focus:border-[#5a5a40] rounded-xl text-xs font-medium text-[#1c1c1a] outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1c1c1a] mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#f5f5f0] border border-[#e5e5e0] focus:border-[#5a5a40] rounded-xl text-xs font-medium text-[#1c1c1a] outline-none"
                  required
                />
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                    <span>Password Strength</span>
                    <span className="capitalize">{strength.label}</span>
                  </div>
                  <div className="flex gap-1 h-1.5">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`flex-1 rounded-full ${
                          step <= strength.score ? strength.color : 'bg-[#e5e5e0]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start gap-2 text-xs text-gray-500">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded border-[#e5e5e0] text-[#5a5a40] focus:ring-[#5a5a40]"
                required
              />
              <label htmlFor="terms" className="leading-tight cursor-pointer">
                I agree to CONNECTYCON's Terms of Service, Privacy Policy, and Security Protocols.
              </label>
            </div>

            <button
              type="submit"
              disabled={!agreed}
              className="w-full py-3 bg-[#5a5a40] hover:bg-[#484832] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-soft transition-all flex items-center justify-center gap-2"
            >
              Continue to Profile Setup
              <ArrowRight className="w-4 h-4 text-[#f2d2bd]" />
            </button>
          </form>

          <p className="text-center text-xs text-gray-500">
            Already registered?{' '}
            <button onClick={() => setActiveView('login')} className="font-bold text-[#5a5a40] hover:underline">
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
