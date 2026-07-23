import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  MapPin,
  Briefcase,
  Award,
  Sparkles,
  Edit,
  Globe,
  Share2,
  Check,
  Zap
} from 'lucide-react';
import { UserProfile, PageView } from '../../types';

interface ProfileViewProps {
  user: UserProfile;
  setActiveView: (view: PageView) => void;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, setActiveView, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user.bio);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveBio = () => {
    onUpdateUser({ bio });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#1c1c1a]">
      {/* Cover Banner & Profile Card */}
      <div className="rounded-3xl border border-[#e5e5e0] bg-white shadow-sm overflow-hidden">
        {/* Cover Graphic */}
        <div className="h-32 md:h-44 bg-[#1c1c1a] relative p-4 flex items-end justify-between">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-[#f2d2bd] text-[10px] font-bold uppercase rounded-full">
            CONNECTYCON Verified Founder Profile
          </span>
        </div>

        {/* User Details Row */}
        <div className="p-6 pt-0 relative flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e5e5e0]">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-12 md:-mt-16">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover ring-4 ring-white shadow-soft"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#1c1c1a]">{user.name}</h1>
                <ShieldCheck className="w-5 h-5 text-[#2d7a58]" />
              </div>
              <div className="text-xs font-semibold text-[#5a5a40]">{user.role} @ {user.company}</div>
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {user.location}</span>
                <span>•</span>
                <span>{user.industry}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-white hover:bg-[#f5f5f0] border border-[#e5e5e0] text-[#1c1c1a] font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all"
            >
              <Edit className="w-3.5 h-3.5 text-[#5a5a40]" /> {isEditing ? 'Cancel Edit' : 'Edit Executive Bio'}
            </button>
            <button
              onClick={() => setActiveView('ai-advisor')}
              className="px-4 py-2 bg-[#5a5a40] hover:bg-[#484832] text-white font-bold text-xs rounded-xl shadow-soft flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#f2d2bd]" /> AI Audit Profile
            </button>
          </div>
        </div>

        {/* Bio Section */}
        <div className="p-6 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Executive Summary</h2>
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full h-24 p-3 bg-[#f5f5f0] border border-[#e5e5e0] rounded-xl text-xs text-[#1c1c1a] outline-none"
              />
              <button
                onClick={handleSaveBio}
                className="px-4 py-2 bg-[#2d7a58] text-white font-bold text-xs rounded-xl"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <p className="text-xs md:text-sm text-[#1c1c1a] leading-relaxed max-w-3xl">
              {user.bio}
            </p>
          )}

          {savedSuccess && (
            <div className="text-xs text-[#2d7a58] font-bold flex items-center gap-1">
              <Check className="w-4 h-4" /> Profile updated successfully!
            </div>
          )}
        </div>
      </div>

      {/* Grid: Business Pitch Card & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Business Pitch Card */}
        <div className="p-6 bg-white border border-[#e5e5e0] rounded-3xl space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e5e5e0] pb-2">
            <h3 className="font-bold text-sm text-[#1c1c1a] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#d2691e]" /> Venture Teaser
            </h3>
            <span className="text-[10px] font-bold bg-[#f2d2bd]/40 text-[#d2691e] px-2.5 py-0.5 rounded-full">
              YC W25 Batch
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Current MRR:</span>
              <span className="font-bold text-[#1c1c1a]">$84,200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">MoM Growth:</span>
              <span className="font-bold text-[#2d7a58]">+23.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Gross Margin:</span>
              <span className="font-bold text-[#1c1c1a]">85.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Target Round:</span>
              <span className="font-bold text-[#5a5a40]">$3.0M Seed</span>
            </div>
          </div>
        </div>

        {/* Skills & Endorsements */}
        <div className="md:col-span-2 p-6 bg-white border border-[#e5e5e0] rounded-3xl space-y-3 shadow-sm">
          <h3 className="font-bold text-sm text-[#1c1c1a]">Core Executive Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-[#f5f5f0] border border-[#e5e5e0] text-[#1c1c1a] text-xs font-semibold rounded-xl flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#2d7a58]" /> {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
