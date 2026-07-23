import React, { useState } from 'react';
import {
  User,
  Shield,
  Key,
  CreditCard,
  Bell,
  Palette,
  Globe,
  Smartphone,
  Copy,
  Check,
  Plus,
  Trash2,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../../types';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'security' | 'tokens' | 'billing'>('profile');
  const [apiKeys, setApiKeys] = useState([
    { id: 'key_1', name: 'Production Advisor API', created: 'Jul 10, 2026', key: 'cc_live_94817a92b...e8a', lastUsed: '2 hours ago' }
  ]);

  const handleGenerateKey = () => {
    const newKey = {
      id: `key_${Date.now()}`,
      name: `Executive Key ${apiKeys.length + 1}`,
      created: 'Just now',
      key: `cc_live_${Math.random().toString(36).substring(2, 12)}...`,
      lastUsed: 'Never'
    };
    setApiKeys([...apiKeys, newKey]);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#1c1c1a]">
      {/* Settings Header */}
      <div className="p-6 bg-white border border-[#e5e5e0] rounded-3xl shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-[#1c1c1a]">Account & Platform Settings</h1>
        <p className="text-xs text-gray-500">Manage your profile credentials, API tokens, and AI usage quotas.</p>
      </div>

      {/* Settings Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="p-2 bg-white border border-[#e5e5e0] rounded-3xl space-y-1 h-fit shadow-sm">
          {[
            { id: 'profile', label: 'Profile Information', icon: User },
            { id: 'appearance', label: 'Appearance & Theme', icon: Palette },
            { id: 'security', label: 'Security & 2FA', icon: Shield },
            { id: 'tokens', label: 'API Tokens & Keys', icon: Key },
            { id: 'billing', label: 'Billing & Token Limits', icon: CreditCard }
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all text-left ${
                  active
                    ? 'bg-[#5a5a40] text-white shadow-soft'
                    : 'text-[#1c1c1a] hover:bg-[#f5f5f0]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#f2d2bd]' : 'text-[#5a5a40]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="md:col-span-3 p-6 bg-white border border-[#e5e5e0] rounded-3xl shadow-sm space-y-6">
          {activeTab === 'profile' && (
            <div className="space-y-4 max-w-lg">
              <h2 className="font-bold text-base text-[#1c1c1a]">Profile Credentials</h2>
              <div>
                <label className="block text-xs font-semibold text-[#1c1c1a] mb-1">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => onUpdateUser({ name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#f5f5f0] border border-[#e5e5e0] rounded-xl text-xs text-[#1c1c1a] outline-none focus:border-[#5a5a40]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1c1c1a] mb-1">Email Address</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-3.5 py-2.5 bg-[#e5e5e0] border border-[#e5e5e0] rounded-xl text-xs text-gray-500 outline-none cursor-not-allowed"
                />
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <h2 className="font-bold text-base text-[#1c1c1a]">Visual Theme Preferences</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-[#f5f5f0] border-2 border-[#5a5a40] cursor-pointer text-center space-y-2">
                  <div className="h-10 rounded-xl bg-white border border-[#e5e5e0]" />
                  <span className="font-bold text-xs text-[#1c1c1a]">Natural Tones (Active)</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#1c1c1a] text-white cursor-pointer text-center space-y-2">
                  <div className="h-10 rounded-xl bg-black" />
                  <span className="font-bold text-xs">Executive Dark</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4 max-w-lg">
              <h2 className="font-bold text-base text-[#1c1c1a]">Security & Authentication</h2>
              <div className="p-4 bg-[#f5f5f0] border border-[#e5e5e0] rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-[#1c1c1a]">Two-Factor Authentication (2FA)</div>
                  <div className="text-[10px] text-gray-400">Authenticator App enabled</div>
                </div>
                <span className="px-2.5 py-1 bg-[#2d7a58]/10 text-[#2d7a58] font-bold text-xs rounded-full">
                  Active
                </span>
              </div>
            </div>
          )}

          {activeTab === 'tokens' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-base text-[#1c1c1a]">CONNECTYCON API Keys</h2>
                  <p className="text-xs text-gray-400">Access executive AI endpoints programmatically.</p>
                </div>
                <button
                  onClick={handleGenerateKey}
                  className="px-4 py-2 bg-[#5a5a40] text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-soft"
                >
                  <Plus className="w-3.5 h-3.5 text-[#f2d2bd]" /> Generate Key
                </button>
              </div>

              <div className="space-y-2">
                {apiKeys.map((key) => (
                  <div key={key.id} className="p-3.5 bg-[#f5f5f0] rounded-2xl border border-[#e5e5e0] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-[#1c1c1a]">{key.name}</div>
                      <div className="font-mono text-[11px] text-gray-500">{key.key}</div>
                    </div>
                    <span className="text-[10px] text-gray-400">Created {key.created}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-4">
              <h2 className="font-bold text-base text-[#1c1c1a]">Subscription & AI Tokens</h2>
              <div className="p-6 bg-[#1c1c1a] text-white rounded-3xl space-y-3 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">Executive Pro Plan</span>
                  <span className="px-2.5 py-1 bg-[#f2d2bd] text-[#d2691e] font-bold text-xs rounded-full">
                    Active Subscription
                  </span>
                </div>
                <div className="text-3xl font-light">$299 <span className="text-xs font-normal text-gray-400">/ month</span></div>
                <div className="text-xs text-gray-300">Includes 100,000 monthly AI tokens with priority Gemini 2.5 inference.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
