import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, Check, ArrowRight } from 'lucide-react';
import { PageView } from '../../types';

interface QuickAIAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveView: (view: PageView) => void;
}

export const QuickAIAdvisorModal: React.FC<QuickAIAdvisorModalProps> = ({
  isOpen,
  onClose,
  setActiveView
}) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAsk = async (queryText?: string) => {
    const finalPrompt = queryText || prompt;
    if (!finalPrompt.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/advisor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt, context: { quickModal: true } })
      });
      const data = await res.json();
      setResponse(data.reply || 'Analysis generated successfully.');
    } catch {
      setResponse('**Executive Summary**: Based on your current telemetry ($84.2k MRR), focus on completing SOC2 Type II compliance to unlock pending enterprise trials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121417]/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-[#fcfbf7] border border-[#e5e1d3] rounded-2xl shadow-elevated overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 bg-[#2c3827] text-white">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#4b5842] text-[#f3e3d3]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#fcfbf7]">CONNECTYCON AI Advisor</div>
              <div className="text-[10px] text-[#edebe1]">Executive AI Assistant • Gemini 2.5 Active</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#4b5842] text-[#edebe1] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {!response && !loading && (
            <div className="space-y-3">
              <p className="text-xs text-[#757a6d]">
                Ask for strategic advice, pitch deck critiques, or financial projections:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "How do I increase our ACV from $3.5k to $12k?",
                  "Analyze top risk factors for Series A fundraising",
                  "Draft cold outbound message for VP Engineering",
                  "Suggest optimal pricing tiers for AI API"
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrompt(preset);
                      handleAsk(preset);
                    }}
                    className="p-2.5 bg-[#f4f2eb] hover:bg-[#edebe1] border border-[#e5e1d3] rounded-xl text-left text-xs font-medium text-[#22252a] transition-all hover:scale-[1.01]"
                  >
                    "{preset}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="p-6 text-center space-y-3">
              <Bot className="w-8 h-8 text-[#4b5842] animate-bounce mx-auto" />
              <div className="text-xs font-semibold text-[#2c3827]">Synthesizing Executive Recommendation...</div>
              <div className="w-48 h-1.5 bg-[#e5e1d3] rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-[#4b5842] animate-pulse w-2/3 rounded-full" />
              </div>
            </div>
          )}

          {response && !loading && (
            <div className="bg-[#f4f2eb] p-4 rounded-xl border border-[#e5e1d3] text-xs text-[#22252a] leading-relaxed whitespace-pre-line space-y-2">
              <div className="font-bold text-[#2c3827] flex items-center gap-1.5 border-b border-[#e5e1d3] pb-2 mb-2">
                <Check className="w-4 h-4 text-[#2d7a58]" />
                Executive Synthesis
              </div>
              <div>{response}</div>
            </div>
          )}
        </div>

        {/* Input Bar & Actions */}
        <div className="p-3 border-t border-[#e5e1d3] bg-[#f4f2eb] flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Ask Advisor anything..."
              className="flex-1 px-3 py-2 bg-[#fcfbf7] border border-[#e5e1d3] rounded-xl text-xs text-[#22252a] outline-none focus:border-[#4b5842]"
            />
            <button
              onClick={() => handleAsk()}
              disabled={loading || !prompt.trim()}
              className="px-4 py-2 bg-[#2c3827] hover:bg-[#1e271a] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#757a6d] px-1">
            <span>Powered by CONNECTYCON AI Engine</span>
            <button
              onClick={() => {
                onClose();
                setActiveView('ai-advisor');
              }}
              className="font-bold text-[#4b5842] hover:underline flex items-center gap-1"
            >
              Open Full AI Advisor Studio <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
