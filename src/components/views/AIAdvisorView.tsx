import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Plus,
  Layers,
  MapPin,
  TrendingUp,
  BookOpen,
  History,
  Download,
  Check,
  Bot,
  RefreshCw,
  Zap,
  ArrowRight,
  ShieldAlert,
  BarChart2
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
import {
  AIAdvisorTab,
  ChatMessage,
  SWOTItem,
  RoadmapMilestone,
  PromptTemplate,
  AdvisorSession
} from '../../types';
import {
  INITIAL_CHAT_MESSAGES,
  INITIAL_SWOT_ITEMS,
  INITIAL_ROADMAP_MILESTONES,
  FINANCIAL_HISTORICAL_METRICS,
  PROMPT_TEMPLATES,
  ADVISOR_SESSIONS
} from '../../data/mockData';

export const AIAdvisorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AIAdvisorTab>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // SWOT State
  const [swotList, setSwotList] = useState<SWOTItem[]>(INITIAL_SWOT_ITEMS);
  const [newSwotTitle, setNewSwotTitle] = useState('');
  const [newSwotCategory, setNewSwotCategory] = useState<SWOTItem['category']>('strengths');

  // Roadmap State
  const [milestones, setMilestones] = useState<RoadmapMilestone[]>(INITIAL_ROADMAP_MILESTONES);

  // Financial Projection State
  const [growthRate, setGrowthRate] = useState(18); // %
  const [churnRate, setChurnRate] = useState(1.8); // %

  // Chat message send handler
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputText('');
    setIsGenerating(true);

    try {
      const response = await fetch('/api/advisor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend, context: { tab: activeTab } })
      });
      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'advisor',
        text: data.reply || 'Executive recommendation generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: data.suggestedActions || ['Generate SWOT Matrix', 'Export Strategy Note']
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackAiMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'advisor',
        text: `**Executive Strategy Note**:\n\nRegarding *"${textToSend}"*:\n\n1. **Core Recommendation**: At $84.2k MRR, focus on enterprise security hardening (SOC2) and automated outbound sequences.\n2. **Network Match**: Introduce yourself to Julian Sterling in Connections for distribution partnership synergies.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Add SWOT Item
  const handleAddSwot = () => {
    if (!newSwotTitle.trim()) return;
    const newItem: SWOTItem = {
      id: `swot_${Date.now()}`,
      category: newSwotCategory,
      title: newSwotTitle,
      description: 'Added via Executive Advisor console',
      impactScore: 'High'
    };
    setSwotList([...swotList, newItem]);
    setNewSwotTitle('');
  };

  // Projected financial data generator
  const projectedFinancials = FINANCIAL_HISTORICAL_METRICS.map((item, idx) => {
    const factor = Math.pow(1 + growthRate / 100, idx);
    const projectedMrr = Math.round(item.mrr * factor);
    return {
      ...item,
      projectedMrr,
      projectedArr: projectedMrr * 12
    };
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#1c1c1a]">
      {/* Advisor Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#1c1c1a] text-white rounded-3xl shadow-soft">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#5a5a40] rounded-2xl text-[#f2d2bd]">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-white">AI Business Advisor Studio</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#f2d2bd]/30 text-[#f2d2bd] text-[10px] font-bold">
                Gemini 2.5 Active
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Autonomous strategic intelligence for founders, executives, and investors.
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-1 bg-white/10 p-1.5 rounded-2xl border border-white/10">
          {[
            { id: 'chat', label: 'Executive Chat', icon: Bot },
            { id: 'swot', label: 'SWOT Matrix', icon: Layers },
            { id: 'roadmap', label: 'Growth Roadmap', icon: MapPin },
            { id: 'revenue', label: 'Revenue Forecast', icon: TrendingUp },
            { id: 'prompts', label: 'Prompt Library', icon: BookOpen },
            { id: 'history', label: 'Sessions', icon: History }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AIAdvisorTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-xs transition-all ${
                  active
                    ? 'bg-[#5a5a40] text-white shadow-soft'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: EXECUTIVE CHAT */}
      {activeTab === 'chat' && (
        <div className="bg-white border border-[#e5e5e0] rounded-3xl shadow-sm flex flex-col h-[620px] overflow-hidden">
          {/* Chat Stream Area */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'advisor' && (
                  <div className="w-8 h-8 rounded-full bg-[#5a5a40] text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-[#f2d2bd]" />
                  </div>
                )}

                <div
                  className={`max-w-2xl p-4 rounded-2xl text-xs md:text-sm leading-relaxed space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-[#1c1c1a] text-white rounded-br-none'
                      : 'bg-[#f5f5f0] border border-[#e5e5e0] text-[#1c1c1a] rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-[10px] text-gray-400 font-semibold border-b border-[#e5e5e0]/50 pb-1 mb-1">
                    <span>{msg.sender === 'user' ? 'You (Jordan)' : 'CONNECTYCON Advisor'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="whitespace-pre-line">{msg.text}</div>

                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(action)}
                          className="px-2.5 py-1 bg-white hover:bg-[#e5e5e0] text-[#1c1c1a] border border-[#e5e5e0] rounded-lg text-[11px] font-bold transition-all"
                        >
                          ⚡ {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex items-center gap-3 p-4 bg-[#f5f5f0] border border-[#e5e5e0] rounded-2xl max-w-md">
                <Bot className="w-5 h-5 text-[#5a5a40] animate-spin" />
                <span className="text-xs font-semibold text-[#1c1c1a]">
                  Synthesizing executive recommendation via Gemini 2.5...
                </span>
              </div>
            )}
          </div>

          {/* Input Console */}
          <div className="p-4 border-t border-[#e5e5e0] bg-[#f5f5f0] space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask Executive Advisor (e.g. 'How do I restructure our usage tiers for $12k ACV?')..."
                className="flex-1 px-4 py-3 bg-white border border-[#e5e5e0] rounded-xl text-xs md:text-sm text-[#1c1c1a] outline-none focus:border-[#5a5a40]"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isGenerating || !inputText.trim()}
                className="px-5 py-3 bg-[#5a5a40] hover:bg-[#484832] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-soft transition-all flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send className="w-4 h-4 text-[#f2d2bd]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SWOT MATRIX GENERATOR */}
      {activeTab === 'swot' && (
        <div className="space-y-6">
          <div className="p-4 bg-[#f4f2eb] border border-[#e5e1d3] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-extrabold text-base text-[#121417]">Strategic SWOT Matrix (2026 Executive Analysis)</h2>
              <p className="text-xs text-[#757a6d]">AetherAI internal & external factors cataloged by AI Business Advisor.</p>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                value={newSwotTitle}
                onChange={(e) => setNewSwotTitle(e.target.value)}
                placeholder="Add new SWOT observation..."
                className="px-3 py-2 bg-[#fcfbf7] border border-[#e5e1d3] rounded-xl text-xs text-[#22252a] outline-none"
              />
              <select
                value={newSwotCategory}
                onChange={(e) => setNewSwotCategory(e.target.value as any)}
                className="px-3 py-2 bg-[#fcfbf7] border border-[#e5e1d3] rounded-xl text-xs font-bold text-[#2c3827]"
              >
                <option value="strengths">Strength</option>
                <option value="weaknesses">Weakness</option>
                <option value="opportunities">Opportunity</option>
                <option value="threats">Threat</option>
              </select>
              <button
                onClick={handleAddSwot}
                className="px-4 py-2 bg-[#2c3827] text-white text-xs font-bold rounded-xl shadow-soft shrink-0"
              >
                Add
              </button>
            </div>
          </div>

          {/* 2x2 SWOT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-5 rounded-2xl bg-[#2d7a58]/5 border border-[#2d7a58]/30 space-y-3">
              <div className="flex items-center justify-between border-b border-[#2d7a58]/20 pb-2">
                <h3 className="font-extrabold text-sm text-[#2d7a58] uppercase tracking-wider">Strengths (Internal)</h3>
                <span className="text-xs font-bold bg-[#2d7a58]/20 text-[#2d7a58] px-2 py-0.5 rounded-full">
                  {swotList.filter(s => s.category === 'strengths').length} Items
                </span>
              </div>
              <div className="space-y-2">
                {swotList.filter(s => s.category === 'strengths').map(item => (
                  <div key={item.id} className="p-3 bg-[#fcfbf7] rounded-xl border border-[#e5e1d3] text-xs space-y-1">
                    <div className="font-bold text-[#121417]">{item.title}</div>
                    <p className="text-[11px] text-[#757a6d]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="p-5 rounded-2xl bg-[#c25244]/5 border border-[#c25244]/30 space-y-3">
              <div className="flex items-center justify-between border-b border-[#c25244]/20 pb-2">
                <h3 className="font-extrabold text-sm text-[#c25244] uppercase tracking-wider">Weaknesses (Internal)</h3>
                <span className="text-xs font-bold bg-[#c25244]/20 text-[#c25244] px-2 py-0.5 rounded-full">
                  {swotList.filter(s => s.category === 'weaknesses').length} Items
                </span>
              </div>
              <div className="space-y-2">
                {swotList.filter(s => s.category === 'weaknesses').map(item => (
                  <div key={item.id} className="p-3 bg-[#fcfbf7] rounded-xl border border-[#e5e1d3] text-xs space-y-1">
                    <div className="font-bold text-[#121417]">{item.title}</div>
                    <p className="text-[11px] text-[#757a6d]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunities */}
            <div className="p-5 rounded-2xl bg-[#4a6572]/5 border border-[#4a6572]/30 space-y-3">
              <div className="flex items-center justify-between border-b border-[#4a6572]/20 pb-2">
                <h3 className="font-extrabold text-sm text-[#4a6572] uppercase tracking-wider">Opportunities (External)</h3>
                <span className="text-xs font-bold bg-[#4a6572]/20 text-[#4a6572] px-2 py-0.5 rounded-full">
                  {swotList.filter(s => s.category === 'opportunities').length} Items
                </span>
              </div>
              <div className="space-y-2">
                {swotList.filter(s => s.category === 'opportunities').map(item => (
                  <div key={item.id} className="p-3 bg-[#fcfbf7] rounded-xl border border-[#e5e1d3] text-xs space-y-1">
                    <div className="font-bold text-[#121417]">{item.title}</div>
                    <p className="text-[11px] text-[#757a6d]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Threats */}
            <div className="p-5 rounded-2xl bg-[#d97706]/5 border border-[#d97706]/30 space-y-3">
              <div className="flex items-center justify-between border-b border-[#d97706]/20 pb-2">
                <h3 className="font-extrabold text-sm text-[#d97706] uppercase tracking-wider">Threats (External)</h3>
                <span className="text-xs font-bold bg-[#d97706]/20 text-[#d97706] px-2 py-0.5 rounded-full">
                  {swotList.filter(s => s.category === 'threats').length} Items
                </span>
              </div>
              <div className="space-y-2">
                {swotList.filter(s => s.category === 'threats').map(item => (
                  <div key={item.id} className="p-3 bg-[#fcfbf7] rounded-xl border border-[#e5e1d3] text-xs space-y-1">
                    <div className="font-bold text-[#121417]">{item.title}</div>
                    <p className="text-[11px] text-[#757a6d]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GROWTH ROADMAP (30-60-90 DAYS) */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="p-5 bg-[#f4f2eb] border border-[#e5e1d3] rounded-2xl space-y-1">
            <h2 className="font-extrabold text-base text-[#121417]">30-60-90 Day Executive Roadmap</h2>
            <p className="text-xs text-[#757a6d]">Milestones prioritized by AI Business Advisor based on Series A fundraising targets.</p>
          </div>

          <div className="space-y-4">
            {milestones.map((m) => (
              <div key={m.id} className="p-5 bg-[#fcfbf7] rounded-2xl border border-[#e5e1d3] shadow-soft space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#2c3827] text-white font-bold text-xs rounded-full">
                      {m.phase}
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#c25244]/10 text-[#c25244] font-bold text-[11px] rounded-full">
                      {m.priority} Priority
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#2d7a58] capitalize bg-[#2d7a58]/10 px-2.5 py-1 rounded-full">
                    {m.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-[#121417]">{m.title}</h3>
                  <p className="text-xs text-[#757a6d] mt-0.5">{m.description}</p>
                </div>

                <div className="pt-2 border-t border-[#e5e1d3] flex flex-wrap gap-2">
                  {m.kpis.map((kpi, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-[#f4f2eb] border border-[#e5e1d3] text-xs text-[#22252a] rounded-lg flex items-center gap-1 font-medium">
                      <Check className="w-3 h-3 text-[#2d7a58]" /> {kpi}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REVENUE PROJECTION TOOL */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-[#f4f2eb] border border-[#e5e1d3] rounded-2xl">
            <div>
              <label className="block text-xs font-bold text-[#121417] mb-1">Target MoM Growth Rate ({growthRate}%)</label>
              <input
                type="range"
                min="5"
                max="50"
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="w-full accent-[#4b5842]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#121417] mb-1">Monthly Customer Churn ({churnRate}%)</label>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.1"
                value={churnRate}
                onChange={(e) => setChurnRate(Number(e.target.value))}
                className="w-full accent-[#4b5842]"
              />
            </div>

            <div className="p-3 bg-[#fcfbf7] rounded-xl border border-[#e5e1d3] text-center">
              <div className="text-[10px] uppercase font-bold text-[#757a6d]">Projected ARR (Dec 2026)</div>
              <div className="text-xl font-extrabold text-[#2d7a58]">
                ${(projectedFinancials[projectedFinancials.length - 1].projectedArr / 1000).toFixed(0)}k ARR
              </div>
            </div>
          </div>

          <div className="p-5 bg-[#f4f2eb] border border-[#e5e1d3] rounded-2xl space-y-4 shadow-soft">
            <h3 className="font-extrabold text-sm text-[#121417]">Simulated MRR Trajectory Model</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectedFinancials}>
                  <XAxis dataKey="month" stroke="#757a6d" fontSize={11} />
                  <YAxis stroke="#757a6d" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#fcfbf7', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="projectedMrr" fill="#2c3827" radius={[6, 6, 0, 0]} name="Projected MRR ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PROMPT LIBRARY */}
      {activeTab === 'prompts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROMPT_TEMPLATES.map((tmpl) => (
            <div key={tmpl.id} className="p-5 bg-[#fcfbf7] rounded-2xl border border-[#e5e1d3] shadow-soft space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2.5 py-0.5 bg-[#f4f2eb] border border-[#e5e1d3] text-[#2c3827] text-[10px] font-bold rounded-full uppercase">
                    {tmpl.category}
                  </span>
                  <span className="text-[10px] text-[#757a6d]">~{tmpl.tokensEstimate} Tokens</span>
                </div>
                <h3 className="font-extrabold text-sm text-[#121417]">{tmpl.title}</h3>
                <p className="text-xs text-[#757a6d] leading-relaxed mt-1">{tmpl.description}</p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('chat');
                  handleSendMessage(tmpl.promptText);
                }}
                className="w-full py-2 bg-[#2c3827] hover:bg-[#1e271a] text-white font-bold text-xs rounded-xl shadow-soft transition-all flex items-center justify-center gap-1.5"
              >
                <span>Execute Prompt</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#e8a598]" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 6: SESSIONS & EXPORT */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {ADVISOR_SESSIONS.map((sess) => (
            <div key={sess.id} className="p-5 bg-[#fcfbf7] rounded-2xl border border-[#e5e1d3] shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-[#121417]">{sess.title}</span>
                  <span className="px-2 py-0.5 bg-[#e5e1d3] text-[#2c3827] text-[10px] font-bold rounded-full">
                    {sess.category}
                  </span>
                </div>
                <p className="text-xs text-[#757a6d]">{sess.summary}</p>
                <div className="text-[10px] text-[#757a6d] font-semibold">{sess.date} • {sess.messagesCount} Exchanges</div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-[#f4f2eb] hover:bg-[#edebe1] text-[#121417] border border-[#e5e1d3] text-xs font-bold rounded-lg flex items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-[#4b5842]" /> Export Markdown
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
