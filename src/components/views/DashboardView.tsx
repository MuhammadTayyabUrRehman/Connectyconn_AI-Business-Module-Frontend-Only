import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Users,
  Activity,
  Bot,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  DollarSign,
  Clock,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Plus,
  Compass
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
import { UserProfile, Connection, PageView, NotificationItem } from '../../types';
import { FINANCIAL_HISTORICAL_METRICS } from '../../data/mockData';

interface DashboardViewProps {
  user: UserProfile;
  connections: Connection[];
  notifications: NotificationItem[];
  setActiveView: (view: PageView) => void;
  onConnect: (connectionId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  connections,
  notifications,
  setActiveView,
  onConnect
}) => {
  // Activity Heatmap data simulation
  const days = Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    intensity: (i * 7 + 3) % 4
  }));

  const pendingConnections = connections.filter(c => c.status === 'pending' || c.status === 'none').slice(0, 3);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn text-[#1c1c1a]">
      {/* Executive Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#f2d2bd]/40 text-[#d2691e] text-[10px] font-bold tracking-wide uppercase">
              Executive Cockpit
            </span>
            <span className="text-xs text-gray-400 font-medium">• YC W25 Batch</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1c1c1a]">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Your AI Advisor has identified 3 new high-value connections and optimized ARR growth today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('ai-advisor')}
            className="px-5 py-2.5 bg-[#5a5a40] hover:bg-[#484832] text-white rounded-xl font-medium text-xs md:text-sm transition-colors shadow-soft flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#f2d2bd]" />
            New Strategic Prompt
          </button>
        </div>
      </div>

      {/* 4 Stat Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#e5e5e0] shadow-sm space-y-1">
          <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">AI Confidence Score</div>
          <div className="text-3xl font-light text-[#1c1c1a]">
            99.4<span className="text-sm font-semibold text-[#5a5a40] ml-1">%</span>
          </div>
          <div className="text-[10px] text-[#2d7a58] font-semibold">+1.2% deterministic optimization</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e5e5e0] shadow-sm space-y-1">
          <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Networking Index</div>
          <div className="text-3xl font-light text-[#1c1c1a]">
            94.8<span className="text-sm font-semibold text-gray-400 ml-1">/100</span>
          </div>
          <div className="text-[10px] text-[#d2691e] font-semibold">Top 2% among YC Founders</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e5e5e0] shadow-sm space-y-1">
          <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Recent Interactions</div>
          <div className="text-3xl font-light text-[#1c1c1a]">184</div>
          <div className="text-[10px] text-gray-400">14 Active AI Sessions Executed</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e5e5e0] shadow-sm space-y-1">
          <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">MRR Growth Rate</div>
          <div className="text-3xl font-light text-[#1c1c1a]">
            +23.4<span className="text-sm font-semibold text-[#5a5a40] ml-1">%</span>
          </div>
          <div className="text-[10px] text-[#2d7a58] font-semibold">$84,200 Current ARR Trajectory</div>
        </div>
      </div>

      {/* Main Charts & Side Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart Column */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#e5e5e0] p-6 flex flex-col justify-between shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-base md:text-lg text-[#1c1c1a]">Network Engagement & Trajectory</h2>
              <p className="text-xs text-gray-400">ARR Trajectory vs Cloud Inference Efficiency</p>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-3 h-3 rounded-full bg-[#e5e5e0]" title="Baseline" />
              <span className="w-3 h-3 rounded-full bg-[#d2e0b0]" title="Optimization" />
              <span className="w-3 h-3 rounded-full bg-[#5a5a40]" title="Peak Peak" />
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FINANCIAL_HISTORICAL_METRICS}>
                <defs>
                  <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5a5a40" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#5a5a40" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#757570" fontSize={11} />
                <YAxis stroke="#757570" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e5e0', borderRadius: '12px', fontSize: '12px', color: '#1c1c1a' }}
                />
                <Area type="monotone" dataKey="mrr" stroke="#5a5a40" strokeWidth={3} fillOpacity={1} fill="url(#colorMrr)" name="MRR ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-[#e5e5e0]">
            <span className="font-medium">Current Inference Cost: $142.80 / mo</span>
            <span className="font-semibold text-[#2d7a58]">+14.2% Productivity Score</span>
          </div>
        </div>

        {/* Right Column: Advisor Insight & Recommended Hubs */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Dark Advisor Insight Card */}
          <div className="bg-[#1c1c1a] text-white rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between shadow-soft">
            <div className="relative z-10 space-y-3">
              <div className="bg-white/10 w-fit px-2.5 py-1 rounded text-[10px] font-bold tracking-widest uppercase text-[#f2d2bd]">
                Advisor Insight
              </div>
              <h3 className="text-lg font-medium leading-tight text-white">
                Elena Rossi is looking for a Tech Lead in Sustainable SaaS space.
              </h3>
              <p className="text-xs text-gray-400">
                Your past experience at EcoFlow makes you a 98% match for this warm introduction.
              </p>
            </div>

            <button
              onClick={() => setActiveView('ai-advisor')}
              className="mt-6 w-full py-3 bg-[#5a5a40] hover:bg-[#484832] text-white rounded-xl text-xs font-bold transition-colors relative z-10"
            >
              Draft Introduction
            </button>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#5a5a40] opacity-30 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Recommended Hubs */}
          <div className="bg-white rounded-3xl border border-[#e5e5e0] p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-sm text-[#1c1c1a]">Recommended Hubs</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#f2d2bd] text-[#d2691e] rounded-xl flex items-center justify-center text-xs font-bold">
                  AI
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#1c1c1a]">Ethical AI Founders</div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold">12.4k Members</div>
                </div>
                <button onClick={() => setActiveView('feed')} className="text-[11px] text-[#5a5a40] font-bold hover:underline">
                  Join
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d2e0b0] text-[#484832] rounded-xl flex items-center justify-center text-xs font-bold">
                  VC
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#1c1c1a]">Series A Sync</div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold">2.1k Members</div>
                </div>
                <button onClick={() => setActiveView('feed')} className="text-[11px] text-[#5a5a40] font-bold hover:underline">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Connections & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Recommended Connections */}
        <div className="p-6 bg-white rounded-3xl border border-[#e5e5e0] space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-[#1c1c1a]">AI Match Recommended Connections</h2>
            <button
              onClick={() => setActiveView('connections')}
              className="text-xs font-bold text-[#5a5a40] hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {pendingConnections.map((conn) => (
              <div key={conn.id} className="p-3 bg-[#f5f5f0] rounded-2xl border border-[#e5e5e0] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={conn.avatar} alt={conn.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-xs text-[#1c1c1a]">{conn.name}</div>
                    <div className="text-[10px] text-gray-500">{conn.role} • {conn.company}</div>
                    <div className="text-[10px] text-[#2d7a58] font-bold mt-0.5">
                      {conn.matchScore}% AI Match • {conn.mutualConnections} Mutual Intros
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onConnect(conn.id)}
                  className="px-3.5 py-1.5 bg-[#5a5a40] hover:bg-[#484832] text-white text-xs font-bold rounded-xl transition-all shadow-soft"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Heatmap & Logs */}
        <div className="p-6 bg-white rounded-3xl border border-[#e5e5e0] space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-[#1c1c1a]">Executive Activity Timeline</h2>
            <div className="flex items-center gap-1 text-[10px] text-[#2d7a58] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> All AI Clusters Operational
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {notifications.slice(0, 3).map((notif) => (
              <div key={notif.id} className="p-3 bg-[#f5f5f0] rounded-2xl border border-[#e5e5e0] flex items-start gap-3">
                <div className="p-2 bg-white rounded-xl border border-[#e5e5e0] shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#5a5a40]" />
                </div>
                <div>
                  <div className="font-bold text-[#1c1c1a]">{notif.title}</div>
                  <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">{notif.message}</p>
                  <span className="text-[10px] text-[#5a5a40] font-semibold mt-1 inline-block">{notif.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
