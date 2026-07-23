import React, { useState } from 'react';
import {
  User,
  Building2,
  Target,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  Briefcase
} from 'lucide-react';
import { PageView, UserProfile } from '../../types';

interface ProfileSetupViewProps {
  setActiveView: (view: PageView) => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const ProfileSetupView: React.FC<ProfileSetupViewProps> = ({
  setActiveView,
  user,
  onUpdateUser
}) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(user.role);
  const [company, setCompany] = useState(user.company);
  const [location, setLocation] = useState(user.location);
  const [industry, setIndustry] = useState(user.industry);
  const [experienceLevel, setExperienceLevel] = useState(user.experienceLevel);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(user.businessGoals);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(user.skills);

  const goalOptions = [
    'Scale MRR to $100k+',
    'Raise Capital / Seed Round',
    'Hire Lead Technical Talent',
    'Strategic Enterprise Partnerships',
    'Find Executive Advisor',
    'M&A Opportunities'
  ];

  const skillOptions = [
    'AI Architecture',
    'GTM Strategy',
    'B2B SaaS Growth',
    'Fundraising & Term Sheets',
    'Product Engineering',
    'PLG Automation',
    'SOC2 Compliance',
    'Financial Modeling'
  ];

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleFinish = () => {
    onUpdateUser({
      role,
      company,
      location,
      industry,
      experienceLevel,
      businessGoals: selectedGoals,
      skills: selectedSkills
    });
    setActiveView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1c1c1a] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white border border-[#e5e5e0] rounded-3xl shadow-sm overflow-hidden flex flex-col">
        {/* Progress Header */}
        <div className="p-6 bg-[#5a5a40] text-white flex items-center justify-between border-b border-[#484832]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#f2d2bd]">Step {step} of 4</div>
            <div className="font-bold text-lg text-white">
              {step === 1 && 'Executive Identity'}
              {step === 2 && 'Industry & Experience'}
              {step === 3 && 'Strategic Business Goals'}
              {step === 4 && 'Core Competencies & Network'}
            </div>
          </div>

          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-8 h-2 rounded-full transition-all ${
                  i <= step ? 'bg-[#f2d2bd]' : 'bg-[#484832]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-[#f5f5f0] rounded-2xl border border-[#e5e5e0]">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#5a5a40]"
                />
                <div>
                  <button className="px-3 py-1.5 bg-white hover:bg-[#f5f5f0] text-xs font-semibold text-[#1c1c1a] border border-[#e5e5e0] rounded-xl flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#5a5a40]" />
                    Upload Profile Photo
                  </button>
                  <p className="text-[10px] text-gray-400 mt-1">Recommended: 400x400px high contrast professional shot.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1c1a] mb-1">Executive Role / Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f5f5f0] border border-[#e5e5e0] rounded-xl text-xs font-medium text-[#1c1c1a] outline-none focus:border-[#5a5a40]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1c1a] mb-1">Organization / Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f5f5f0] border border-[#e5e5e0] rounded-xl text-xs font-medium text-[#1c1c1a] outline-none focus:border-[#5a5a40]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1c1a] mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f5f5f0] border border-[#e5e5e0] rounded-xl text-xs font-medium text-[#1c1c1a] outline-none focus:border-[#5a5a40]"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1c1c1a] mb-1">Primary Industry Focus</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f5f5f0] border border-[#e5e5e0] rounded-xl text-xs font-medium text-[#1c1c1a] outline-none"
                >
                  <option value="Artificial Intelligence & SaaS">Artificial Intelligence & SaaS</option>
                  <option value="Fintech & Digital Assets">Fintech & Digital Assets</option>
                  <option value="Developer Tools & Cloud Infra">Developer Tools & Cloud Infra</option>
                  <option value="Venture Capital & Private Equity">Venture Capital & Private Equity</option>
                  <option value="Healthcare Tech">Healthcare Tech</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1c1a] mb-1">Leadership Track / Experience</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'First-time Founder',
                    'Serial Entrepreneur (8+ yrs)',
                    'Venture Partner / Investor',
                    'VP / C-Level Executive'
                  ].map((exp) => (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => setExperienceLevel(exp)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        experienceLevel === exp
                          ? 'bg-[#5a5a40] text-white border-[#5a5a40]'
                          : 'bg-[#f5f5f0] text-[#1c1c1a] border-[#e5e5e0] hover:bg-[#e5e5e0]'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500">
                Select the primary objectives your AI Business Advisor should optimize for:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {goalOptions.map((goal) => {
                  const active = selectedGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        active
                          ? 'bg-[#5a5a40] text-white border-[#5a5a40]'
                          : 'bg-[#f5f5f0] text-[#1c1c1a] border-[#e5e5e0] hover:bg-[#e5e5e0]'
                      }`}
                    >
                      <span>{goal}</span>
                      {active && <Check className="w-4 h-4 text-[#f2d2bd]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500">
                Tag core skills to receive high-precision founder and investor connection recommendations:
              </p>

              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => {
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        active
                          ? 'bg-[#5a5a40] text-white shadow-soft'
                          : 'bg-[#f5f5f0] border border-[#e5e5e0] text-[#1c1c1a] hover:bg-[#e5e5e0]'
                      }`}
                    >
                      <span>{skill}</span>
                      {active && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#e5e5e0] bg-[#f5f5f0] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-bold text-[#5a5a40] hover:text-[#1c1c1a] flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-[#5a5a40] hover:bg-[#484832] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-soft"
            >
              Next Step <ArrowRight className="w-4 h-4 text-[#f2d2bd]" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-8 py-2.5 bg-[#5a5a40] hover:bg-[#484832] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-soft"
            >
              Complete Onboarding & Launch <Sparkles className="w-4 h-4 text-[#f2d2bd]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
