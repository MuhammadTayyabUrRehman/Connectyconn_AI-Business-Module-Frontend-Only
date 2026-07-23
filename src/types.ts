export type PageView =
  | 'landing'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'onboarding'
  | 'dashboard'
  | 'ai-advisor'
  | 'feed'
  | 'connections'
  | 'profile'
  | 'notifications'
  | 'settings'
  | 'design-system';

export type AIAdvisorTab = 'chat' | 'swot' | 'roadmap' | 'revenue' | 'prompts' | 'history';

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatar: string;
  role: string;
  company: string;
  location: string;
  bio: string;
  verified: boolean;
  industry: string;
  experienceLevel: string;
  businessGoals: string[];
  skills: string[];
  connectionsCount: number;
  profileViews: number;
  aiEngagementScore: number;
  growthScore: number;
}

export interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    role: string;
    company: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  category: 'Founder Update' | 'Investor Insight' | 'AI Analysis' | 'Strategy' | 'General';
  aiSummary?: string;
  likes: number;
  commentsCount: number;
  bookmarksCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  comments?: PostComment[];
  tags: string[];
}

export interface PostComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Connection {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  company: string;
  location: string;
  industry: string;
  skills: string[];
  matchScore: number; // e.g. 96 (%)
  mutualConnections: number;
  status: 'connected' | 'pending' | 'none';
  matchReason: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'advisor';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
  category?: 'swot' | 'general' | 'roadmap' | 'financial';
  suggestedActions?: string[];
}

export interface SWOTItem {
  id: string;
  category: 'strengths' | 'weaknesses' | 'opportunities' | 'threats';
  title: string;
  description: string;
  impactScore: 'High' | 'Medium' | 'Low';
}

export interface RoadmapMilestone {
  id: string;
  phase: '30 Days (Immediate)' | '60 Days (Growth)' | '90 Days (Scale)';
  title: string;
  description: string;
  kpis: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
  priority: 'Critical' | 'High' | 'Medium';
}

export interface FinancialMetric {
  month: string;
  mrr: number;
  arr: number;
  arrTarget: number;
  tokenCost: number;
  newCustomers: number;
}

export interface NotificationItem {
  id: string;
  type: 'connection_request' | 'ai_insight' | 'mention' | 'system' | 'like';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  actionUrl?: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: 'Pitch Deck' | 'Pricing Strategy' | 'Go-To-Market' | 'Hiring' | 'Fundraising';
  promptText: string;
  tokensEstimate: number;
}

export interface AdvisorSession {
  id: string;
  title: string;
  date: string;
  messagesCount: number;
  summary: string;
  category: string;
}
