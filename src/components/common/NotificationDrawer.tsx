import React from 'react';
import { X, CheckCheck, Bell, Sparkles, UserPlus, MessageSquare } from 'lucide-react';
import { NotificationItem, PageView } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  setActiveView: (view: PageView) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  setActiveView
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'connection_request':
        return <UserPlus className="w-4 h-4 text-[#d97706]" />;
      case 'ai_insight':
        return <Sparkles className="w-4 h-4 text-[#2d7a58]" />;
      case 'mention':
        return <MessageSquare className="w-4 h-4 text-[#4a6572]" />;
      default:
        return <Bell className="w-4 h-4 text-[#4b5842]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#121417]/30 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-sm bg-[#fcfbf7] h-full border-l border-[#e5e1d3] shadow-elevated flex flex-col">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#e5e1d3] flex items-center justify-between bg-[#f4f2eb]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#2c3827]" />
            <span className="font-bold text-sm text-[#121417]">Notifications</span>
            <span className="text-xs bg-[#e5e1d3] text-[#2c3827] px-2 py-0.5 rounded-full font-bold">
              {notifications.filter(n => !n.read).length} new
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onMarkAllAsRead}
              className="p-1.5 text-xs text-[#4b5842] hover:text-[#121417] flex items-center gap-1"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
            </button>
            <button onClick={onClose} className="p-1.5 text-[#757a6d] hover:text-[#121417]">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                if (notif.type === 'connection_request') setActiveView('connections');
                if (notif.type === 'ai_insight') setActiveView('dashboard');
                if (notif.type === 'mention') setActiveView('feed');
                onClose();
              }}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                notif.read
                  ? 'bg-[#fcfbf7] border-[#e5e1d3] opacity-80'
                  : 'bg-[#f4f2eb] border-[#4b5842]/40 shadow-soft'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-[#edebe1] shrink-0">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#121417] truncate">{notif.title}</span>
                    <span className="text-[10px] text-[#757a6d]">{notif.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#22252a] leading-relaxed multiline-ellipsis">
                    {notif.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
