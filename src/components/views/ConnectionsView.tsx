import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Check,
  UserPlus,
  Sparkles,
  ShieldCheck,
  Building,
  MessageSquare
} from 'lucide-react';
import { Connection, PageView } from '../../types';

interface ConnectionsViewProps {
  connections: Connection[];
  onConnect: (connectionId: string) => void;
  setActiveView: (view: PageView) => void;
}

export const ConnectionsView: React.FC<ConnectionsViewProps> = ({
  connections,
  onConnect,
  setActiveView
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'discovered'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const industries = ['All', 'Growth Marketing & SaaS', 'Venture Capital', 'Developer Tools', 'Strategic Advisory'];

  const filteredConnections = connections.filter(conn => {
    const matchesSearch = conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry = selectedIndustry === 'All' || conn.industry === selectedIndustry;

    if (activeTab === 'pending') return matchesSearch && matchesIndustry && conn.status === 'pending';
    if (activeTab === 'discovered') return matchesSearch && matchesIndustry && conn.status === 'none';
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#1c1c1a]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#e5e5e0] rounded-3xl shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#1c1c1a]">Verified Executive Network</h1>
          <p className="text-xs text-gray-500">AI Match Score algorithm pairs founders based on complementary business goals.</p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 bg-[#f5f5f0] p-1.5 rounded-2xl border border-[#e5e5e0]">
          {[
            { id: 'all', label: 'All Professionals' },
            { id: 'pending', label: 'Pending Requests (1)' },
            { id: 'discovered', label: 'Recommended Matches' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-[#5a5a40] text-white shadow-soft'
                  : 'text-gray-500 hover:text-[#1c1c1a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role, or company..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#e5e5e0] focus:border-[#5a5a40] rounded-2xl text-xs text-[#1c1c1a] outline-none"
          />
        </div>

        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 bg-white border border-[#e5e5e0] text-xs font-semibold text-[#1c1c1a] rounded-2xl outline-none"
        >
          {industries.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
      </div>

      {/* Connections Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredConnections.map((conn) => (
          <div key={conn.id} className="p-6 bg-white rounded-3xl border border-[#e5e5e0] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={conn.avatar} alt={conn.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#5a5a40]/20" />
                  <div>
                    <div className="font-bold text-sm text-[#1c1c1a] flex items-center gap-1">
                      {conn.name}
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2d7a58]" />
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{conn.role} • {conn.company}</div>
                    <div className="text-[10px] text-gray-400">{conn.location}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 bg-[#2d7a58]/10 text-[#2d7a58] border border-[#2d7a58]/30 font-bold text-xs rounded-full">
                    {conn.matchScore}% AI Match
                  </span>
                  <div className="text-[10px] text-gray-400 mt-1">{conn.mutualConnections} Mutual Intros</div>
                </div>
              </div>

              {/* Match Reason Banner */}
              <div className="p-3 bg-[#f5f5f0] rounded-2xl text-xs space-y-1">
                <div className="flex items-center gap-1 font-bold text-[#5a5a40]">
                  <Sparkles className="w-3.5 h-3.5 text-[#d2691e]" /> Match Insight
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{conn.matchReason}</p>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {conn.skills.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 bg-[#f5f5f0] border border-[#e5e5e0] text-[#1c1c1a] text-[10px] font-semibold rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#e5e5e0] flex items-center justify-between">
              <button
                onClick={() => setActiveView('ai-advisor')}
                className="text-xs font-semibold text-[#5a5a40] hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" /> Request AI Intro Draft
              </button>

              {conn.status === 'connected' ? (
                <button className="px-4 py-1.5 bg-[#f5f5f0] text-[#2d7a58] font-bold text-xs rounded-xl border border-[#2d7a58]/30 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Connected
                </button>
              ) : (
                <button
                  onClick={() => onConnect(conn.id)}
                  className="px-4 py-1.5 bg-[#5a5a40] hover:bg-[#484832] text-white font-bold text-xs rounded-xl shadow-soft transition-all"
                >
                  {conn.status === 'pending' ? 'Accept Request' : 'Connect'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
