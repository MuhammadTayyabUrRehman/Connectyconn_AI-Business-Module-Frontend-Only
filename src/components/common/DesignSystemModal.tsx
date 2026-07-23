import React, { useState } from 'react';
import { X, Layers, AlertCircle, CheckCircle2, Info, Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface DesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSystemModal: React.FC<DesignSystemModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'components' | 'states'>('tokens');

  if (!isOpen) return null;

  const colorSwatches = [
    { name: 'Warm White', hex: '#FCFBF7', usage: 'Primary Canvas Background' },
    { name: 'Soft Ivory', hex: '#F4F2EB', usage: 'Surface & Card Background' },
    { name: 'Olive Green', hex: '#4B5842', usage: 'Primary Brand Color' },
    { name: 'Forest Olive', hex: '#2C3827', usage: 'Dark Surface & Hero Headers' },
    { name: 'Muted Peach', hex: '#F3E3D3', usage: 'Warm Highlight & Badge Accents' },
    { name: 'Soft Salmon', hex: '#E8A598', usage: 'AI Sparkle & Secondary Accent' },
    { name: 'Charcoal', hex: '#22252a', usage: 'Primary Typography' },
    { name: 'Graphite Black', hex: '#121417', usage: 'Deep Contrast & Dark Containers' },
  ];

  const statusSwatches = [
    { name: 'Muted Emerald (Success)', hex: '#2D7A58' },
    { name: 'Soft Amber (Warning)', hex: '#D97706' },
    { name: 'Muted Terracotta (Error)', hex: '#C25244' },
    { name: 'Slate Blue (Information)', hex: '#4A6572' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121417]/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-4xl bg-[#fcfbf7] border border-[#e5e1d3] rounded-2xl shadow-elevated flex flex-col h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#e5e1d3] bg-[#f4f2eb]">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#4b5842]" />
            <div>
              <div className="font-extrabold text-sm text-[#121417]">CONNECTYCON Design System (2026 Edition)</div>
              <div className="text-[11px] text-[#757a6d]">Warm Ivory & Olive Palette • Dieter Rams Restraint</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#edebe1] text-[#757a6d]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#e5e1d3] px-4 bg-[#fcfbf7]">
          {[
            { id: 'tokens', label: 'Color & Typography Tokens' },
            { id: 'components', label: 'UI Component Architecture' },
            { id: 'states', label: 'Empty, Error & Loading States' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-bold text-xs border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-[#4b5842] text-[#2c3827]'
                  : 'border-transparent text-[#757a6d] hover:text-[#22252a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'tokens' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#757a6d] mb-3">
                  Primary Palette
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {colorSwatches.map((swatch) => (
                    <div key={swatch.name} className="p-3 bg-[#f4f2eb] rounded-xl border border-[#e5e1d3] space-y-2">
                      <div className="h-12 rounded-lg shadow-inner" style={{ backgroundColor: swatch.hex }} />
                      <div>
                        <div className="font-bold text-xs text-[#121417]">{swatch.name}</div>
                        <div className="text-[10px] font-mono text-[#757a6d]">{swatch.hex}</div>
                        <div className="text-[10px] text-[#4b5842] mt-0.5">{swatch.usage}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#757a6d] mb-3">
                  Status & Feedback Accents
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {statusSwatches.map((swatch) => (
                    <div key={swatch.name} className="p-3 bg-[#f4f2eb] rounded-xl border border-[#e5e1d3] space-y-2">
                      <div className="h-8 rounded-lg" style={{ backgroundColor: swatch.hex }} />
                      <div className="font-bold text-xs text-[#121417]">{swatch.name}</div>
                      <div className="text-[10px] font-mono text-[#757a6d]">{swatch.hex}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'components' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#757a6d]">Buttons & Triggers</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="px-4 py-2 bg-[#2c3827] text-white font-bold text-xs rounded-xl shadow-soft">
                    Primary Button
                  </button>
                  <button className="px-4 py-2 bg-[#4b5842] text-white font-bold text-xs rounded-xl">
                    Secondary Olive
                  </button>
                  <button className="px-4 py-2 bg-[#f4f2eb] hover:bg-[#edebe1] text-[#22252a] font-bold text-xs rounded-xl border border-[#e5e1d3]">
                    Outlined Ivory
                  </button>
                  <button className="px-4 py-2 bg-[#f3e3d3] text-[#121417] font-bold text-xs rounded-xl flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#e8a598]" /> AI Trigger
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#757a6d]">Badges & Status Tags</h4>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#2d7a58]/10 text-[#2d7a58] border border-[#2d7a58]/30 text-[11px] font-bold rounded-full">
                    99.4% AI Accuracy
                  </span>
                  <span className="px-2.5 py-1 bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/30 text-[11px] font-bold rounded-full">
                    3 Pending Requests
                  </span>
                  <span className="px-2.5 py-1 bg-[#4b5842] text-white text-[11px] font-bold rounded-full">
                    Verified Founder
                  </span>
                  <span className="px-2.5 py-1 bg-[#f3e3d3] text-[#2c3827] text-[11px] font-bold rounded-full">
                    YC W25 Alum
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'states' && (
            <div className="space-y-6">
              <div className="p-6 bg-[#f4f2eb] border border-[#e5e1d3] rounded-2xl text-center space-y-3">
                <Info className="w-8 h-8 text-[#4b5842] mx-auto" />
                <div className="font-bold text-sm text-[#121417]">No Activity Records Found</div>
                <p className="text-xs text-[#757a6d] max-w-sm mx-auto">
                  Your AI Business Advisor is waiting to synthesize your next strategic roadmap session.
                </p>
                <button className="px-4 py-2 bg-[#2c3827] text-white text-xs font-bold rounded-xl mx-auto">
                  Start First AI Session
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#757a6d]">Skeleton Loaders</h4>
                <div className="p-4 bg-[#f4f2eb] rounded-xl border border-[#e5e1d3] space-y-3">
                  <div className="h-4 bg-[#edebe1] rounded-md animate-pulse w-3/4" />
                  <div className="h-3 bg-[#edebe1] rounded-md animate-pulse w-1/2" />
                  <div className="h-3 bg-[#edebe1] rounded-md animate-pulse w-5/6" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
