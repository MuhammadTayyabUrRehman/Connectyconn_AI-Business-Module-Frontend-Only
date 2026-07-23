import React from 'react';
import { ArrowLeft, Compass } from 'lucide-react';
import { PageView } from '../../types';

interface NotFoundViewProps {
  setActiveView: (view: PageView) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ setActiveView }) => {
  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1c1c1a] flex items-center justify-center p-6 text-center">
      <div className="w-full max-w-md bg-white border border-[#e5e5e0] rounded-3xl p-8 shadow-sm space-y-4">
        <Compass className="w-12 h-12 text-[#5a5a40] mx-auto" />
        <h1 className="text-2xl font-bold text-[#1c1c1a]">404 - Page Not Found</h1>
        <p className="text-xs text-gray-500 leading-relaxed">
          The requested executive route does not exist or has been relocated within the CONNECTYCON network.
        </p>
        <button
          onClick={() => setActiveView('dashboard')}
          className="px-6 py-2.5 bg-[#5a5a40] text-white text-xs font-bold rounded-xl shadow-soft inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-[#f2d2bd]" />
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};
