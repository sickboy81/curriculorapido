import React from 'react';
import { ResumeData } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface ResumeProgressProps {
  resumeData: ResumeData;
}

export const ResumeProgress: React.FC<ResumeProgressProps> = ({ resumeData }) => {
  const calculateProgress = (): number => {
    let completed = 0;
    let total = 0;

    // Personal Info (4 fields)
    total += 4;
    if (resumeData.fullName) completed++;
    if (resumeData.email) completed++;
    if (resumeData.phone) completed++;
    if (resumeData.title) completed++;

    // Summary (1 field)
    total += 1;
    if (resumeData.summary && resumeData.summary.length >= 50) completed++;

    // Experience (at least 1)
    total += 1;
    if (resumeData.experience.length > 0) completed++;

    // Education (at least 1)
    total += 1;
    if (resumeData.education.length > 0) completed++;

    // Skills (at least 3)
    total += 1;
    const skillsCount = resumeData.skills ? resumeData.skills.split(',').filter(s => s.trim()).length : 0;
    if (skillsCount >= 3) completed++;

    // Languages (optional, but counts if present)
    total += 1;
    if (resumeData.languages && resumeData.languages.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  const progress = calculateProgress();

  const getProgressColor = () => {
    if (progress >= 80) return 'bg-emerald-500';
    if (progress >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getProgressText = () => {
    if (progress >= 80) return 'Currículo Completo!';
    if (progress >= 60) return 'Quase lá!';
    if (progress >= 40) return 'Em progresso';
    return 'Começando';
  };

  const checkItems = [
    { label: 'Dados Pessoais', checked: !!(resumeData.fullName && resumeData.email && resumeData.phone) },
    { label: 'Cargo/Objetivo', checked: !!resumeData.title },
    { label: 'Resumo Profissional', checked: !!(resumeData.summary && resumeData.summary.length >= 50) },
    { label: 'Experiências', checked: resumeData.experience.length > 0 },
    { label: 'Formação', checked: resumeData.education.length > 0 },
    { label: 'Habilidades', checked: (resumeData.skills?.split(',').filter(s => s.trim()).length || 0) >= 3 },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Progresso do Currículo
        </h3>
        <span className={`text-sm font-bold ${getProgressColor().replace('bg-', 'text-')}`}>
          {progress}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-500 ease-out`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-1 text-center">{getProgressText()}</p>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {checkItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {item.checked ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
            )}
            <span className={item.checked ? 'text-slate-700' : 'text-slate-400'}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};


