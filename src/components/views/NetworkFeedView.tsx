import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  Plus,
  Send,
  ShieldCheck,
  TrendingUp,
  Filter,
  Check
} from 'lucide-react';
import { Post, UserProfile } from '../../types';

interface NetworkFeedViewProps {
  posts: Post[];
  user: UserProfile;
  onLikePost: (postId: string) => void;
  onBookmarkPost: (postId: string) => void;
  onCreatePost: (newPost: Partial<Post>) => void;
}

export const NetworkFeedView: React.FC<NetworkFeedViewProps> = ({
  posts,
  user,
  onLikePost,
  onBookmarkPost,
  onCreatePost
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<Post['category']>('Founder Update');
  const [isPolishing, setIsPolishing] = useState(false);

  const categories = ['All', 'Founder Update', 'Investor Insight', 'AI Analysis', 'Strategy'];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  const handleAiPolish = () => {
    if (!postContent.trim()) return;
    setIsPolishing(true);
    setTimeout(() => {
      setPostContent(prev => `${prev}\n\n[AI Executive Summary]: Focuses on strategic execution and measurable ARR acceleration.`);
      setIsPolishing(false);
    }, 600);
  };

  const handleSubmitPost = () => {
    if (!postContent.trim()) return;
    onCreatePost({
      content: postContent,
      category: postCategory,
      aiSummary: 'Executive update shared with CONNECTYCON Network.',
      tags: ['#ExecutiveLeadership', '#CONNECTYCON2026']
    });
    setPostContent('');
    setShowCreateModal(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#1c1c1a]">
      {/* Header & Create Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#e5e5e0] rounded-3xl shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#1c1c1a]">Networking Feed</h1>
          <p className="text-xs text-gray-500">High-signal executive posts with instant AI summaries.</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 bg-[#5a5a40] hover:bg-[#484832] text-white font-bold text-xs rounded-xl shadow-soft transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#f2d2bd]" />
          <span>Publish Executive Post</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-gray-400 flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full font-semibold text-xs whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#5a5a40] text-white shadow-soft'
                : 'bg-white border border-[#e5e5e0] text-[#1c1c1a] hover:bg-[#f5f5f0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Feed + Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posts Stream */}
        <div className="lg:col-span-2 space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="p-6 bg-white rounded-3xl border border-[#e5e5e0] shadow-sm space-y-4">
              {/* Author Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-xs text-[#1c1c1a] flex items-center gap-1">
                      {post.author.name}
                      {post.author.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#2d7a58]" />}
                    </div>
                    <div className="text-[10px] text-gray-500">{post.author.role} • {post.author.company}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#f5f5f0] border border-[#e5e5e0] text-[#1c1c1a] text-[10px] font-semibold rounded-full">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-gray-400">{post.timestamp}</span>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-xs md:text-sm text-[#1c1c1a] leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* AI Summary Banner */}
              {post.aiSummary && (
                <div className="p-3 bg-[#f2d2bd]/30 border border-[#f2d2bd]/60 rounded-2xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#d2691e]">
                    <Sparkles className="w-3.5 h-3.5 text-[#d2691e]" />
                    AI Executive Summary
                  </div>
                  <p className="text-[11px] text-[#1c1c1a] font-medium leading-relaxed">
                    {post.aiSummary}
                  </p>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] text-gray-400 font-mono hover:underline cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Engagement Bar */}
              <div className="pt-3 border-t border-[#e5e5e0] flex items-center justify-between text-xs text-gray-500">
                <button
                  onClick={() => onLikePost(post.id)}
                  className={`flex items-center gap-1.5 font-bold transition-colors ${
                    post.isLiked ? 'text-[#c25244]' : 'hover:text-[#1c1c1a]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>

                <div className="flex items-center gap-1.5 font-bold">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.commentsCount} Comments</span>
                </div>

                <button
                  onClick={() => onBookmarkPost(post.id)}
                  className={`flex items-center gap-1.5 font-bold transition-colors ${
                    post.isBookmarked ? 'text-[#2d7a58]' : 'hover:text-[#1c1c1a]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                  <span>{post.bookmarksCount}</span>
                </button>
              </div>

              {/* Comments Section */}
              {post.comments && post.comments.length > 0 && (
                <div className="pt-2 space-y-2">
                  {post.comments.map((c) => (
                    <div key={c.id} className="p-3 bg-[#f5f5f0] rounded-2xl text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1c1c1a]">{c.authorName} ({c.authorRole})</span>
                        <span className="text-[10px] text-gray-400">{c.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-[#1c1c1a]">{c.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-[#e5e5e0] space-y-3 shadow-sm">
            <h3 className="font-bold text-sm text-[#1c1c1a] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#2d7a58]" /> Trending Topics
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { tag: '#AutonomousAgents', count: '1,420 discussions' },
                { tag: '#SeriesA_TermSheets', count: '890 discussions' },
                { tag: '#SOC2_Compliance', count: '640 discussions' },
                { tag: '#PLG_Expansion', count: '510 discussions' }
              ].map((t, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-[#f5f5f0] cursor-pointer">
                  <span className="font-bold text-[#5a5a40]">{t.tag}</span>
                  <span className="text-[10px] text-gray-400">{t.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white border border-[#e5e5e0] rounded-3xl shadow-elevated p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#e5e5e0] pb-3">
              <h3 className="font-bold text-base text-[#1c1c1a]">Publish Executive Update</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-[#1c1c1a]">✕</button>
            </div>

            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share strategic insights, metrics, or GTM milestones with CONNECTYCON Network..."
              className="w-full h-32 p-3 bg-[#f5f5f0] border border-[#e5e5e0] rounded-2xl text-xs text-[#1c1c1a] outline-none resize-none"
            />

            <div className="flex items-center justify-between">
              <button
                onClick={handleAiPolish}
                disabled={isPolishing || !postContent.trim()}
                className="px-3 py-1.5 bg-[#f2d2bd] hover:bg-[#e8be9e] text-[#d2691e] text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d2691e]" />
                {isPolishing ? 'Enhancing...' : 'AI Polish Content'}
              </button>

              <button
                onClick={handleSubmitPost}
                className="px-5 py-2 bg-[#5a5a40] hover:bg-[#484832] text-white font-bold text-xs rounded-xl shadow-soft"
              >
                Publish Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
