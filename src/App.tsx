import React, { useState } from 'react';
import { PageView, UserProfile, Post, Connection, NotificationItem } from './types';
import {
  CURRENT_USER,
  INITIAL_POSTS,
  INITIAL_CONNECTIONS,
  INITIAL_NOTIFICATIONS
} from './data/mockData';

// Layout Common Components
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { QuickAIAdvisorModal } from './components/common/QuickAIAdvisorModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { DesignSystemModal } from './components/common/DesignSystemModal';

// Views
import { LandingView } from './components/views/LandingView';
import { LoginView } from './components/views/LoginView';
import { SignupView } from './components/views/SignupView';
import { ForgotPasswordView } from './components/views/ForgotPasswordView';
import { ProfileSetupView } from './components/views/ProfileSetupView';
import { DashboardView } from './components/views/DashboardView';
import { AIAdvisorView } from './components/views/AIAdvisorView';
import { NetworkFeedView } from './components/views/NetworkFeedView';
import { ConnectionsView } from './components/views/ConnectionsView';
import { ProfileView } from './components/views/ProfileView';
import { SettingsView } from './components/views/SettingsView';
import { NotFoundView } from './components/views/NotFoundView';

export default function App() {
  const [activeView, setActiveView] = useState<PageView>('landing');
  const [user, setUser] = useState<UserProfile>(CURRENT_USER);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [connections, setConnections] = useState<Connection[]>(INITIAL_CONNECTIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // App Shell Drawer States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isQuickAIOpen, setIsQuickAIOpen] = useState(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);

  // Handlers
  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  const handleBookmarkPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isBookmarked = !p.isBookmarked;
          return {
            ...p,
            isBookmarked,
            bookmarksCount: isBookmarked ? p.bookmarksCount + 1 : p.bookmarksCount - 1
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (newPostData: Partial<Post>) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: {
        name: user.name,
        handle: user.handle,
        avatar: user.avatar,
        role: user.role,
        company: user.company,
        verified: user.verified
      },
      content: newPostData.content || '',
      timestamp: 'Just now',
      category: newPostData.category || 'Founder Update',
      aiSummary: newPostData.aiSummary,
      likes: 0,
      commentsCount: 0,
      bookmarksCount: 0,
      tags: newPostData.tags || ['#ExecutiveUpdate']
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleConnect = (connectionId: string) => {
    setConnections((prev) =>
      prev.map((c) => {
        if (c.id === connectionId) {
          return { ...c, status: 'connected' as const };
        }
        return c;
      })
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Public/Standalone routes that do not render the main app shell
  const isPublicRoute = ['landing', 'login', 'signup', 'forgot-password', 'onboarding'].includes(activeView);

  if (isPublicRoute) {
    return (
      <div className="min-h-screen bg-[#fcfbf7] font-sans antialiased text-[#22252a]">
        {activeView === 'landing' && <LandingView setActiveView={setActiveView} />}
        {activeView === 'login' && <LoginView setActiveView={setActiveView} />}
        {activeView === 'signup' && <SignupView setActiveView={setActiveView} />}
        {activeView === 'forgot-password' && <ForgotPasswordView setActiveView={setActiveView} />}
        {activeView === 'onboarding' && (
          <ProfileSetupView
            setActiveView={setActiveView}
            user={user}
            onUpdateUser={handleUpdateUser}
          />
        )}
      </div>
    );
  }

  // Main Application Shell
  const pendingCount = connections.filter((c) => c.status === 'pending').length;
  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex h-screen bg-[#fcfbf7] font-sans antialiased text-[#22252a] overflow-hidden">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        user={user}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        pendingConnectionsCount={pendingCount}
        unreadNotificationsCount={unreadNotifCount}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Sticky Header Bar */}
        <Header
          user={user}
          activeView={activeView}
          setActiveView={setActiveView}
          notifications={notifications}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenQuickAI={() => setIsQuickAIOpen(true)}
          onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto bg-[#fcfbf7]">
          {activeView === 'dashboard' && (
            <DashboardView
              user={user}
              connections={connections}
              notifications={notifications}
              setActiveView={setActiveView}
              onConnect={handleConnect}
            />
          )}

          {activeView === 'ai-advisor' && <AIAdvisorView />}

          {activeView === 'feed' && (
            <NetworkFeedView
              posts={posts}
              user={user}
              onLikePost={handleLikePost}
              onBookmarkPost={handleBookmarkPost}
              onCreatePost={handleCreatePost}
            />
          )}

          {activeView === 'connections' && (
            <ConnectionsView
              connections={connections}
              onConnect={handleConnect}
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'profile' && (
            <ProfileView
              user={user}
              setActiveView={setActiveView}
              onUpdateUser={handleUpdateUser}
            />
          )}

          {activeView === 'settings' && (
            <SettingsView
              user={user}
              onUpdateUser={handleUpdateUser}
            />
          )}

          {activeView === 'notifications' && (
            <div className="p-6 max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-[#121417]">Notifications Center</h1>
                <button
                  onClick={handleMarkAllNotificationsAsRead}
                  className="px-3 py-1.5 bg-[#f4f2eb] text-[#4b5842] border border-[#e5e1d3] font-bold text-xs rounded-lg"
                >
                  Mark all as read
                </button>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-4 bg-[#fcfbf7] border border-[#e5e1d3] rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-[#121417]">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-[#757a6d]">{n.timestamp}</span>
                    </div>
                    <p className="text-[#22252a]">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fallback 404 Route */}
          {!['dashboard', 'ai-advisor', 'feed', 'connections', 'profile', 'settings', 'notifications'].includes(activeView) && (
            <NotFoundView setActiveView={setActiveView} />
          )}
        </main>
      </div>

      {/* Global Drawers & Modals */}
      <QuickAIAdvisorModal
        isOpen={isQuickAIOpen}
        onClose={() => setIsQuickAIOpen(false)}
        setActiveView={setActiveView}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        setActiveView={setActiveView}
      />

      <DesignSystemModal
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
      />
    </div>
  );
}
