import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Building2,
  Check,
  User,
  Settings,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import { PageView, UserProfile, NotificationItem } from '../../types';

interface HeaderProps {
  user: UserProfile;
  activeView: PageView;
  setActiveView: (view: PageView) => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  onOpenQuickAI: () => void;
  onOpenDesignSystem: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  setActiveView,
  notifications,
  onOpenNotifications,
  onOpenQuickAI,
  onOpenDesignSystem,
}) => {
  const [workspace, setWorkspace] = useState('AetherAI Workspace (YC W25)');
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const workspaces = [
    'AetherAI Workspace (YC W25)',
    'Founder Advisory Circle',
    'Personal Network & Angels'
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-[#e5e5e0] px-4 md:px-6 flex items-center justify-between transition-all">
      {/* Left section: Workspace & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        {/* Workspace Selector */}
        <div className="relative">
          <button
            onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e5e5e0] bg-[#f5f5f0] hover:bg-[#e5e5e0] text-xs md:text-sm font-semibold text-[#1c1c1a] transition-colors"
          >
            <Building2 className="w-4 h-4 text-[#5a5a40]" />
            <span className="truncate max-w-[140px] md:max-w-[200px]">{workspace}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#5a5a40]" />
          </button>

          {showWorkspaceMenu && (
            <div className="absolute left-0 mt-2 w-64 bg-white border border-[#e5e5e0] rounded-xl shadow-elevated py-2 z-50">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#5a5a40]">
                Active Workspaces
              </div>
              {workspaces.map((ws) => (
                <button
                  key={ws}
                  onClick={() => {
                    setWorkspace(ws);
                    setShowWorkspaceMenu(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[#1c1c1a] hover:bg-[#f5f5f0] transition-colors text-left"
                >
                  <span className="truncate">{ws}</span>
                  {workspace === ws && <Check className="w-3.5 h-3.5 text-[#5a5a40]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(e.target.value.length > 0);
            }}
            placeholder="Search connections, AI insights, market trends..."
            className="w-full pl-9 pr-8 py-1.5 bg-[#f5f5f0] focus:bg-white border border-transparent focus:border-[#5a5a40] focus:ring-1 focus:ring-[#5a5a40] rounded-full text-xs md:text-sm text-[#1c1c1a] placeholder-gray-400 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setIsSearching(false); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-[#1c1c1a]"
            >
              ✕
            </button>
          )}

          {/* Quick Search Overlay */}
          {isSearching && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-[#e5e5e0] rounded-xl shadow-elevated p-3 z-50 text-xs">
              <div className="text-[11px] font-semibold text-gray-400 uppercase mb-2">Instant Matches for "{searchQuery}"</div>
              <div className="space-y-2">
                <button
                  onClick={() => { setActiveView('ai-advisor'); setIsSearching(false); setSearchQuery(''); }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#f5f5f0] text-left"
                >
                  <span className="font-medium text-[#1c1c1a]">AI Strategic Advice on "{searchQuery}"</span>
                  <span className="text-[10px] bg-[#f2d2bd] text-[#d2691e] px-2 py-0.5 rounded-full font-bold">AI Advisor</span>
                </button>
                <button
                  onClick={() => { setActiveView('connections'); setIsSearching(false); setSearchQuery(''); }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#f5f5f0] text-left"
                >
                  <span className="font-medium text-[#1c1c1a]">Find Professionals matching "{searchQuery}"</span>
                  <span className="text-[10px] bg-[#e5e5e0] px-2 py-0.5 rounded text-[#1c1c1a] font-bold">Connections</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Action Cluster */}
      <div className="flex items-center gap-2.5">
        {/* Advisor Status Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-[#f2d2bd]/30 text-[#d2691e] rounded-full text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#d2691e] animate-pulse" />
          <span>Advisor Online</span>
        </div>

        {/* Quick AI Trigger Button */}
        <button
          onClick={onOpenQuickAI}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#5a5a40] hover:bg-[#484832] text-white rounded-lg text-xs md:text-sm font-medium shadow-soft transition-all transform active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#f2d2bd]" />
          <span className="hidden sm:inline">Ask Advisor</span>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-[#1c1c1a] hover:bg-[#f5f5f0] border border-transparent hover:border-[#e5e5e0] transition-all"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-[#5a5a40]" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c25244] rounded-full ring-2 ring-white" />
          )}
        </button>

        {/* Design System Inspector button */}
        <button
          onClick={onOpenDesignSystem}
          className="p-2 rounded-lg text-[#5a5a40] hover:bg-[#f5f5f0] transition-all hidden md:flex items-center gap-1 text-xs"
          title="Inspect Design System Tokens"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        {/* Profile Avatar Dropdown */}
        <div className="relative ml-1">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-full border border-[#e5e5e0] hover:border-[#5a5a40] transition-colors"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[#e5e5e0] rounded-xl shadow-elevated p-1.5 z-50 text-xs">
              <div className="p-2.5 border-b border-[#e5e5e0] mb-1">
                <div className="font-bold text-[#1c1c1a] text-sm">{user.name}</div>
                <div className="text-[11px] text-gray-500">{user.role} • {user.company}</div>
              </div>
              <button
                onClick={() => { setActiveView('profile'); setShowProfileMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f5f5f0] text-[#1c1c1a] font-medium"
              >
                <User className="w-3.5 h-3.5 text-[#5a5a40]" />
                View Profile
              </button>
              <button
                onClick={() => { setActiveView('settings'); setShowProfileMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f5f5f0] text-[#1c1c1a] font-medium"
              >
                <Settings className="w-3.5 h-3.5 text-[#5a5a40]" />
                Account Settings
              </button>
              <div className="my-1 border-t border-[#e5e5e0]" />
              <button
                onClick={() => { setActiveView('landing'); setShowProfileMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f5f5f0] text-[#c25244] font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
