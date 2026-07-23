import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Users,
  Bot,
  Zap,
  CheckCircle2,
  Lock,
  Building,
  BarChart3,
  Globe
} from 'lucide-react';
import { PageView } from '../../types';

interface LandingViewProps {
  setActiveView: (view: PageView) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ setActiveView }) => {
  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1c1c1a] font-sans flex flex-col">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#e5e5e0] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#5a5a40] flex items-center justify-center text-white font-bold text-lg shadow-soft">
            C
          </div>
          <div>
            <div className="font-bold text-base tracking-tight text-[#1c1c1a]">CONNECTYCON</div>
            <div className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">AI Executive Network</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#5a5a40]">
          <a href="#features" className="hover:text-[#1c1c1a] transition-colors">Platform</a>
          <a href="#advisor" className="hover:text-[#1c1c1a] transition-colors">AI Advisor Core</a>
          <a href="#testimonials" className="hover:text-[#1c1c1a] transition-colors">Executives</a>
          <a href="#pricing" className="hover:text-[#1c1c1a] transition-colors">Enterprise</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('login')}
            className="px-4 py-2 text-xs font-bold text-[#5a5a40] hover:bg-[#f5f5f0] rounded-xl transition-all"
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveView('signup')}
            className="px-4 py-2 bg-[#5a5a40] hover:bg-[#484832] text-white text-xs font-bold rounded-xl shadow-soft transition-all transform active:scale-95 flex items-center gap-1.5"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5 text-[#f2d2bd]" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-24 max-w-6xl mx-auto text-center flex flex-col items-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e5e5e0] text-xs font-bold text-[#5a5a40] mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#d2691e]" />
          <span>CONNECTYCON 2026 Executive Release</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2d7a58]" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1c1c1a] max-w-4xl leading-[1.15] mb-6">
          Professional networking enhanced by an <span className="text-[#5a5a40]">AI Business Advisor</span>.
        </h1>

        <p className="text-base md:text-lg text-gray-500 max-w-2xl leading-relaxed mb-8">
          Unite high-level executive connections with automated SWOT matrix generation, real-time token telemetry, and financial growth roadmaps built for founders.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
          <button
            onClick={() => setActiveView('dashboard')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#5a5a40] hover:bg-[#484832] text-white font-bold text-sm rounded-2xl shadow-soft transition-all flex items-center justify-center gap-2"
          >
            Launch Interactive Prototype
            <ArrowRight className="w-4 h-4 text-[#f2d2bd]" />
          </button>
          <button
            onClick={() => setActiveView('onboarding')}
            className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-[#f5f5f0] text-[#1c1c1a] border border-[#e5e5e0] font-bold text-sm rounded-2xl transition-all"
          >
            Preview Founder Onboarding
          </button>
        </div>

        {/* Live Hero App Preview Card */}
        <div className="w-full max-w-5xl rounded-3xl border border-[#e5e5e0] bg-white p-3 shadow-sm">
          <div className="rounded-2xl overflow-hidden bg-[#f5f5f0] border border-[#e5e5e0] p-4 md:p-6 text-left">
            <div className="flex items-center justify-between border-b border-[#e5e5e0] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#c25244]" />
                <div className="w-3 h-3 rounded-full bg-[#d2691e]" />
                <div className="w-3 h-3 rounded-full bg-[#2d7a58]" />
                <span className="text-xs font-mono text-gray-400 ml-2">https://app.connectycon.io/advisor</span>
              </div>
              <span className="text-xs font-bold text-[#2d7a58] bg-[#2d7a58]/10 px-2.5 py-1 rounded-full">
                AI Confidence Score: 99.4%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#e5e5e0]">
                <div className="text-[10px] uppercase font-bold text-gray-400">Monthly AI Token Consumption</div>
                <div className="text-2xl font-bold text-[#1c1c1a] my-1">84,200 / 100k</div>
                <div className="w-full h-2 bg-[#e5e5e0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#5a5a40] w-[84%]" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e5e5e0]">
                <div className="text-[10px] uppercase font-bold text-gray-400">Networking Engagement Index</div>
                <div className="text-2xl font-bold text-[#2d7a58] my-1">94.8 / 100</div>
                <div className="text-xs text-gray-500">Top 2% among YC Founders</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e5e5e0]">
                <div className="text-[10px] uppercase font-bold text-gray-400">Verified Founder Connections</div>
                <div className="text-2xl font-bold text-[#1c1c1a] my-1">842 Active</div>
                <div className="text-xs text-[#d2691e] font-semibold">3 Pending Investor Intros</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges / Companies */}
      <section className="bg-white border-y border-[#e5e5e0] py-10 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Trusted by founders & executives from industry leaders
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 font-bold text-sm text-[#5a5a40]">
            <div className="flex items-center gap-1.5"><Building className="w-4 h-4" /> Y COMBINATOR W25</div>
            <div className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> APEX VENTURES</div>
            <div className="flex items-center gap-1.5"><BarChart3 className="w-4 h-4" /> LINEAR CRAFT</div>
            <div className="flex items-center gap-1.5"><Bot className="w-4 h-4" /> AETHER AI</div>
            <div className="flex items-center gap-1.5"><Lock className="w-4 h-4" /> SOVEREIGN CAPITAL</div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section id="features" className="px-6 py-20 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1c1c1a]">
            Designed with Dieter Rams restraint for modern executives.
          </h2>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
            Eliminate social network noise. Engage in high-signal business discussions backed by executive AI analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#e5e5e0] space-y-3 shadow-sm hover:border-[#5a5a40] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#5a5a40] text-white flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#f2d2bd]" />
            </div>
            <h3 className="font-bold text-base text-[#1c1c1a]">AI Business Advisor</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Generate instant 2x2 SWOT matrices, 30-60-90 day milestone roadmaps, and revenue forecasting models using Gemini 2.5 Flash.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#e5e5e0] space-y-3 shadow-sm hover:border-[#5a5a40] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#5a5a40] text-white flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#f2d2bd]" />
            </div>
            <h3 className="font-bold text-base text-[#1c1c1a]">Real-time Telemetry</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Track your token budgets, productivity score, networking engagement index, and daily activity heatmaps in a single dashboard.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#e5e5e0] space-y-3 shadow-sm hover:border-[#5a5a40] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#5a5a40] text-white flex items-center justify-center">
              <Users className="w-5 h-5 text-[#f2d2bd]" />
            </div>
            <h3 className="font-bold text-base text-[#1c1c1a]">High-Signal Network Feed</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Connect with verified founders, venture partners, and CTOs. Posts are enhanced with instant AI executive summaries.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-[#e5e5e0] px-6 py-10 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#5a5a40] text-white font-bold flex items-center justify-center text-xs">
              C
            </div>
            <span className="font-bold text-[#1c1c1a]">CONNECTYCON Inc. © 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveView('dashboard')} className="hover:text-[#1c1c1a]">Prototype App</button>
            <button onClick={() => setActiveView('settings')} className="hover:text-[#1c1c1a]">API Tokens</button>
            <a href="#privacy" className="hover:text-[#1c1c1a]">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#1c1c1a]">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
