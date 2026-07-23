import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PageView } from '../../types';

interface ForgotPasswordViewProps {
  setActiveView: (view: PageView) => void;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({ setActiveView }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1c1c1a] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-[#e5e5e0] rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-xs text-[#5a5a40] font-bold">
          <button onClick={() => setActiveView('login')} className="flex items-center gap-1 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </button>
        </div>

        {!submitted ? (
          <>
            <div>
              <h2 className="text-xl font-bold text-[#1c1c1a]">Reset Password</h2>
              <p className="text-xs text-gray-500 mt-1">
                Enter your work email address and we'll send a secure password reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <button
                type="submit"
                className="w-full py-3 bg-[#5a5a40] hover:bg-[#484832] text-white font-bold text-xs rounded-xl shadow-soft transition-all"
              >
                Send Reset Authorization
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="w-12 h-12 text-[#2d7a58] mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-[#1c1c1a]">Reset Link Sent</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We have dispatched a password authorization email to <span className="font-bold text-[#1c1c1a]">{email}</span>. Please check your inbox.
            </p>
            <button
              onClick={() => setActiveView('login')}
              className="px-6 py-2.5 bg-[#5a5a40] text-white text-xs font-bold rounded-xl"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
