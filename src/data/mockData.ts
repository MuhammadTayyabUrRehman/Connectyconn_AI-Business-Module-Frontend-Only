import {
  UserProfile,
  Post,
  Connection,
  ChatMessage,
  SWOTItem,
  RoadmapMilestone,
  FinancialMetric,
  NotificationItem,
  PromptTemplate,
  AdvisorSession
} from '../types';

export const CURRENT_USER: UserProfile = {
  id: 'usr_2026_01',
  name: 'Elena Rostova',
  handle: '@elena_founder',
  email: 'elena@connectycon.io',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  role: 'Founder & CEO',
  company: 'AetherAI Synthetics',
  location: 'San Francisco, CA',
  bio: 'Building autonomous AI workflow orchestrators for Series A+ engineering teams. YC W25 alum.',
  verified: true,
  industry: 'Artificial Intelligence & SaaS',
  experienceLevel: 'Serial Entrepreneur (8+ yrs)',
  businessGoals: ['Scale MRR to $100k', 'Hire Lead AI Architect', 'Raise $3M Seed Round', 'Strategic Partnerships'],
  skills: ['AI Architecture', 'GTM Strategy', 'Fundraising', 'Product Leadership', 'TypeScript / PyTorch'],
  connectionsCount: 842,
  profileViews: 1290,
  aiEngagementScore: 94.8,
  growthScore: 88
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_101',
    author: {
      name: 'Marcus Vance',
      handle: '@marcus_vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      role: 'General Partner',
      company: 'Apex Horizon Ventures',
      verified: true
    },
    content: 'We just analyzed 140 B2B AI startups in H1 2026. The shift from thin wrapper tools to deeply integrated workflow agents is striking. Startups focusing on domain-specific deterministic fallbacks + real-time metrics are retaining 4x more ARR.',
    timestamp: '2 hours ago',
    category: 'Investor Insight',
    aiSummary: 'B2B AI trends: Autonomous agents with deterministic fallbacks yield 4x higher retention.',
    likes: 142,
    commentsCount: 28,
    bookmarksCount: 67,
    isLiked: true,
    tags: ['#VentureCapital', '#B2BAI', '#StartupMetrics'],
    comments: [
      {
        id: 'c_1',
        authorName: 'Elena Rostova',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        authorRole: 'Founder & CEO',
        content: 'Spot on Marcus! We saw our trial-to-paid conversion jump 32% once we introduced confidence scores on agent operations.',
        timestamp: '1 hour ago',
        likes: 19
      }
    ]
  },
  {
    id: 'post_102',
    author: {
      name: 'Dr. Aris Thorne',
      handle: '@aris_thorne',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      role: 'Chief AI Scientist',
      company: 'Cognitive Dynamics',
      verified: true
    },
    content: 'Just published our benchmark results on latency-optimized spec-decoding for real-time executive voice assistants. 85ms end-to-end processing across standard edge servers without precision loss.',
    timestamp: '5 hours ago',
    category: 'AI Analysis',
    aiSummary: 'Technical breakthrough in spec-decoding achieves 85ms voice pipeline latency on edge servers.',
    likes: 215,
    commentsCount: 42,
    bookmarksCount: 110,
    isBookmarked: true,
    tags: ['#MachineLearning', '#EdgeAI', '#Research']
  },
  {
    id: 'post_103',
    author: {
      name: 'Sophia Chen',
      handle: '@sophiachen_design',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
      role: 'VP of Product Experience',
      company: 'Linear Craft',
      verified: true
    },
    content: 'Why we removed 60% of our modal dialogs in favor of contextual inline command surfaces. In B2B SaaS, spatial context > popups. The mental model stays intact.',
    timestamp: '1 day ago',
    category: 'Strategy',
    aiSummary: 'UX Strategy: Replacing modals with inline command surfaces increases user task completion by 40%.',
    likes: 389,
    commentsCount: 54,
    bookmarksCount: 198,
    tags: ['#ProductDesign', '#UX2026', '#B2BSaaS']
  }
];

export const INITIAL_CONNECTIONS: Connection[] = [
  {
    id: 'conn_1',
    name: 'Julian Sterling',
    handle: '@jsterling',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    role: 'Head of Growth',
    company: 'ScaleScale AI',
    location: 'New York, NY',
    industry: 'Growth Marketing & SaaS',
    skills: ['PLG Growth', 'Outbound Automation', 'B2B Analytics'],
    matchScore: 98,
    mutualConnections: 18,
    status: 'pending',
    matchReason: 'High overlap in B2B AI distribution strategy and shared investor networks.'
  },
  {
    id: 'conn_2',
    name: 'Amara Okafor',
    handle: '@amara_capital',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
    role: 'Partner',
    company: 'Sovereign Ventures',
    location: 'London, UK',
    industry: 'Venture Capital',
    skills: ['Seed Stage', 'AI Infrastructure', 'Europe Growth'],
    matchScore: 94,
    mutualConnections: 24,
    status: 'none',
    matchReason: 'Actively investing in Series A AI automation tools matching AetherAI profile.'
  },
  {
    id: 'conn_3',
    name: 'Liam O’Connor',
    handle: '@liam_cto',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    role: 'Co-Founder & CTO',
    company: 'Kinetix Data',
    location: 'Austin, TX',
    industry: 'Developer Tools',
    skills: ['Distributed Systems', 'Go/Rust', 'Vector Databases'],
    matchScore: 91,
    mutualConnections: 12,
    status: 'connected',
    matchReason: 'Complementary tech stack architecture and potential API integration partner.'
  },
  {
    id: 'conn_4',
    name: 'Maya Lin',
    handle: '@mayalin_advisory',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    role: 'Managing Director',
    company: 'Catalyst Advisory Group',
    location: 'San Francisco, CA',
    industry: 'Strategic Advisory',
    skills: ['M&A', 'Enterprise GTM', 'Executive Coaching'],
    matchScore: 89,
    mutualConnections: 31,
    status: 'connected',
    matchReason: 'Top executive advisor in SF tech ecosystem.'
  }
];

export const INITIAL_SWOT_ITEMS: SWOTItem[] = [
  {
    id: 'swot_1',
    category: 'strengths',
    title: 'Proprietary Agent Execution Core',
    description: 'Sub-100ms multi-step inference loop with 99.4% task completion reliability.',
    impactScore: 'High'
  },
  {
    id: 'swot_2',
    category: 'strengths',
    title: 'Strong Founder Network',
    description: 'Direct relationships with 50+ YC W25 founders providing early beta access.',
    impactScore: 'High'
  },
  {
    id: 'swot_3',
    category: 'weaknesses',
    title: 'Limited Sales Capacity',
    description: 'Current sales pipeline handled entirely by CEO, creating outbound bottleneck.',
    impactScore: 'High'
  },
  {
    id: 'swot_4',
    category: 'weaknesses',
    title: 'Self-Serve Onboarding Friction',
    description: 'Complex API key setup leads to 18% drop-off during trial setup.',
    impactScore: 'Medium'
  },
  {
    id: 'swot_5',
    category: 'opportunities',
    title: 'Enterprise Security Compliance',
    description: 'Obtaining SOC2 Type II will unlock 8 pending enterprise POC deals worth $240k ARR.',
    impactScore: 'High'
  },
  {
    id: 'swot_6',
    category: 'opportunities',
    title: 'CONNECTYCON Marketplace Listing',
    description: 'Publishing pre-built workflows to CONNECTYCON Business Hub for instant distribution.',
    impactScore: 'Medium'
  },
  {
    id: 'swot_7',
    category: 'threats',
    title: 'Big Tech Foundation Model Capabilities',
    description: 'Hyperscalers bundling native agent tools directly into operating systems.',
    impactScore: 'High'
  },
  {
    id: 'swot_8',
    category: 'threats',
    title: 'GPU Compute Cost Volatility',
    description: 'Fluctuating inference cloud prices could squeeze gross margins below 75%.',
    impactScore: 'Medium'
  }
];

export const INITIAL_ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    id: 'rm_1',
    phase: '30 Days (Immediate)',
    title: 'SOC2 Type II Audit & Enterprise Hardening',
    description: 'Complete automated evidence collection and launch enterprise SAML/SSO integration.',
    kpis: ['SOC2 Readiness 100%', '3 Enterprise POCs Closed', 'Zero Critical Vulnerabilities'],
    status: 'in-progress',
    priority: 'Critical'
  },
  {
    id: 'rm_2',
    phase: '30 Days (Immediate)',
    title: 'Hire Founding Head of Sales',
    description: 'Recruit a senior AE with 5+ years selling developer/AI infrastructure tools.',
    kpis: ['Offer Accepted', 'Outbound Pipeline +$150k ARR', '10 Qualified Demos/Week'],
    status: 'in-progress',
    priority: 'Critical'
  },
  {
    id: 'rm_3',
    phase: '60 Days (Growth)',
    title: 'Self-Serve No-Code Workflow Builder',
    description: 'Deploy visual canvas builder allowing non-technical founders to automate back-office ops.',
    kpis: ['Onboarding Drop-off < 5%', 'Self-Serve Conversion +25%', 'NPS > 65'],
    status: 'upcoming',
    priority: 'High'
  },
  {
    id: 'rm_4',
    phase: '90 Days (Scale)',
    title: 'Seed Round Extension ($3M Target)',
    description: 'Initiate formal pitch deck rounds with tier-1 AI seed funds using CONNECTYCON network.',
    kpis: ['Term Sheet Secured', 'Valuation $18M+', '2 Strategic Value-Add Lead Investors'],
    status: 'upcoming',
    priority: 'Critical'
  }
];

export const FINANCIAL_HISTORICAL_METRICS: FinancialMetric[] = [
  { month: 'Jan', mrr: 12400, arr: 148800, arrTarget: 150000, tokenCost: 1120, newCustomers: 4 },
  { month: 'Feb', mrr: 18900, arr: 226800, arrTarget: 200000, tokenCost: 1680, newCustomers: 7 },
  { month: 'Mar', mrr: 26500, arr: 318000, arrTarget: 280000, tokenCost: 2450, newCustomers: 11 },
  { month: 'Apr', mrr: 38200, arr: 458400, arrTarget: 400000, tokenCost: 3100, newCustomers: 16 },
  { month: 'May', mrr: 51000, arr: 612000, arrTarget: 550000, tokenCost: 4200, newCustomers: 22 },
  { month: 'Jun', mrr: 68500, arr: 822000, arrTarget: 750000, tokenCost: 5150, newCustomers: 31 },
  { month: 'Jul', mrr: 84200, arr: 1010400, arrTarget: 1000000, tokenCost: 6100, newCustomers: 42 }
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'prompt_1',
    title: 'Series A Pitch Deck Critique',
    description: 'Analyze value proposition, unit economics, market size, and team slide narratives for investors.',
    category: 'Pitch Deck',
    promptText: 'Act as a top-tier YC Venture Partner. Review my startup AetherAI ($84k MRR, 35% MoM growth, 85% gross margin). Identify the top 3 narrative weaknesses in my pitch deck story and suggest concrete slide improvements.',
    tokensEstimate: 1200
  },
  {
    id: 'prompt_2',
    title: 'Usage-Based SaaS Pricing Strategy',
    description: 'Optimize tier limits, seat fees, and API token overage pricing for maximum expansion revenue.',
    category: 'Pricing Strategy',
    promptText: 'Analyze our current pricing strategy ($299/mo base + $0.02 per 1k token inference). How can we restructure into seat-plus-usage tiers to increase ACV from $3.5k to $12k while minimizing churn?',
    tokensEstimate: 950
  },
  {
    id: 'prompt_3',
    title: 'Enterprise Outbound Sequence Generator',
    description: 'Draft personalized, high-converting 4-touch email sequence for VP Engineering targets.',
    category: 'Go-To-Market',
    promptText: 'Create a 4-step cold email sequence targeting VPs of Engineering at Series B SaaS companies. Highlight our SOC2 compliance, 85ms processing speed, and 30-day risk-free pilot.',
    tokensEstimate: 800
  },
  {
    id: 'prompt_4',
    title: 'Head of Sales Compensation Model',
    description: 'Structure OTE, commission rates, ramp period, and equity vesting for first sales hire.',
    category: 'Hiring',
    promptText: 'Design a competitive compensation plan for our first Head of Sales ($140k Base / $140k Variable OTE + 1.2% Equity). Detail quota expectations and ramp schedule for Q3-Q4.',
    tokensEstimate: 1100
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_0',
    sender: 'advisor',
    text: 'Good morning, Elena! I have synchronized your latest AetherAI growth telemetry and network signals. Your MRR reached **$84,200** (+23% this month), and you have 3 pending connection requests from tier-1 seed investors. How can I assist your executive strategy today?',
    timestamp: '9:00 AM',
    suggestedActions: [
      'Generate updated 2026 SWOT Matrix',
      'Optimize Sales Outreach Sequence',
      'Review Series A Financial Runway'
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'connection_request',
    title: 'New Connection Request',
    message: 'Julian Sterling (Head of Growth @ ScaleScale AI) sent you a connection request with note: "Loved your post on agent confidence scores!"',
    timestamp: '15m ago',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'notif_2',
    type: 'ai_insight',
    title: 'AI Advisor Insight Available',
    message: 'Your Weekly Productivity Score reached 92/100! Your token consumption efficiency improved by 14% this week.',
    timestamp: '1h ago',
    read: false
  },
  {
    id: 'notif_3',
    type: 'mention',
    title: 'Mentioned in Network Post',
    message: 'Marcus Vance mentioned you in a comment: "@elena_founder Spot on Marcus! We saw our trial-to-paid conversion jump 32%..."',
    timestamp: '2h ago',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  }
];

export const ADVISOR_SESSIONS: AdvisorSession[] = [
  {
    id: 'sess_1',
    title: 'SOC2 Type II Audit & Readiness Prep',
    date: 'Jul 22, 2026',
    messagesCount: 14,
    summary: 'Reviewed automated audit controls, compliance evidence roadmap, and enterprise vendor security checklist.',
    category: 'Security & Operations'
  },
  {
    id: 'sess_2',
    title: 'GTM Outbound Strategy for Enterprise AI',
    date: 'Jul 19, 2026',
    messagesCount: 22,
    summary: 'Structured 4-step cold email cadence and defined ICP parameters for VP Engineering prospects.',
    category: 'Go-To-Market'
  },
  {
    id: 'sess_3',
    title: 'Q3 Financial Runway & Token Pricing Model',
    date: 'Jul 14, 2026',
    messagesCount: 18,
    summary: 'Modeled cash runway out to 22 months and restructured usage tiers for $12k ACV target.',
    category: 'Finance'
  }
];
