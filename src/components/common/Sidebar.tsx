import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Rss,
  Users,
  User,
  Bell,
  Settings,
  HelpCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { PageView, UserProfile } from '../../types';

interface SidebarProps {
  activeView: PageView;
  setActiveView: (view: PageView) => void;
  user: UserProfile;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  pendingConnectionsCount: number;
  unreadNotificationsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  user,
  isCollapsed,
  setIsCollapsed,
  pendingConnectionsCount,
  unreadNotificationsCount
}) => {
  const navItems = [
    {
      id: 'dashboard' as PageView,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'ai-advisor' as PageView,
      label: 'AI Advisor',
      icon: Bot,
      badge: 'HERO',
      badgeColor: 'bg-[#5a5a40] text-[#ffffff]'
    },
    {
      id: 'feed' as PageView,
      label: 'Network Feed',
      icon: Rss,
      badge: null
    },
    {
      id: 'connections' as PageView,
      label: 'Connections',
      icon: Users,
      badge: pendingConnectionsCount > 0 ? `${pendingConnectionsCount}` : null,
      badgeColor: 'bg-[#d2691e] text-white'
    },
    {
      id: 'profile' as PageView,
      label: 'Profile',
      icon: User,
      badge: null
    },
    {
      id: 'notifications' as PageView,
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? `${unreadNotificationsCount}` : null,
      badgeColor: 'bg-[#c25244] text-white'
    },
    {
      id: 'settings' as PageView,
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside
      className={`relative flex flex-col h-full bg-white border-r border-[#e5e5e0] transition-all duration-300 z-20 select-none ${
        isCollapsed ? 'w-16 md:w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#e5e5e0]">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#5a5a40] flex items-center justify-center text-white font-black text-sm shadow-soft">
              C
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight text-[#1c1c1a] flex items-center gap-1">
                CONNECTYCON
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5a5a40]" />
              </div>
              <div className="text-[10px] text-gray-500 font-medium">AI Executive Network</div>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 mx-auto rounded-lg bg-[#5a5a40] flex items-center justify-center text-white font-black text-sm shadow-soft">
            C
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md text-gray-500 hover:text-[#1c1c1a] hover:bg-[#f5f5f0] transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        <div className={`px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 ${isCollapsed ? 'hidden' : 'block'}`}>
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all relative ${
                isActive
                  ? 'bg-[#5a5a40] text-white shadow-soft font-semibold'
                  : 'text-[#1c1c1a] hover:bg-[#f5f5f0] hover:text-[#1c1c1a]'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#f2d2bd]' : 'text-[#5a5a40]'}`} />
              
              {!isCollapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}

              {!isCollapsed && item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor || 'bg-[#e5e5e0] text-[#1c1c1a]'}`}>
                  {item.badge}
                </span>
              )}

              {isCollapsed && item.badge && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#c25244]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Quick AI Trigger Widget */}
      {!isCollapsed && (
        <div className="p-4 m-2 rounded-2xl bg-[#1c1c1a] text-white shadow-soft relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1.5 relative z-10">
            <Sparkles className="w-4 h-4 text-[#f2d2bd]" />
            <span className="text-xs font-bold text-[#f2d2bd]">AI Business Advisor</span>
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed mb-3 relative z-10">
            Get instant strategic analysis, SWOT matrix, or revenue forecasts.
          </p>
          <button
            onClick={() => setActiveView('ai-advisor')}
            className="w-full py-2 px-3 bg-[#5a5a40] hover:bg-[#484832] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 relative z-10"
          >
            Launch Advisor
          </button>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#5a5a40] opacity-30 rounded-full blur-2xl"></div>
        </div>
      )}

      {/* Footer Profile & System Info */}
      <div className="p-3 border-t border-[#e5e5e0]">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#5a5a40]/20"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#1c1c1a] truncate flex items-center gap-1">
                  {user.name}
                  {user.verified && <ShieldCheck className="w-3 h-3 text-[#2d7a58]" />}
                </div>
                <div className="text-[10px] text-gray-500 truncate">{user.company}</div>
              </div>
            </div>
            <button
              onClick={() => setActiveView('settings')}
              className="p-1.5 text-gray-500 hover:text-[#1c1c1a] hover:bg-[#f5f5f0] rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setActiveView('profile')}
            className="flex justify-center w-full"
            title={user.name}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
        )}
      </div>
    </aside>
  );
};
