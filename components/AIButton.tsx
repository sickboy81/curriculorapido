import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIButtonProps {
  onClick: () => void;
  isLoading: boolean;
  label: string;
}

export const AIButton: React.FC<AIButtonProps> = ({ onClick, isLoading, label }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={isLoading}
      className="flex items-center gap-2 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1"
      title="Enhance with Gemini AI"
    >
      {isLoading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <Sparkles className="w-3 h-3" />
      )}
      {label}
    </button>
  );
};