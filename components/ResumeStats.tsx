import React from 'react';
import { ResumeData } from '../types';
import { FileText, Briefcase, GraduationCap, CheckCircle2, Languages, Award } from 'lucide-react';

interface ResumeStatsProps {
  resumeData: ResumeData;
}

export const ResumeStats: React.FC<ResumeStatsProps> = ({ resumeData }) => {
  const stats = {
    experiences: resumeData.experience.length,
    education: resumeData.education.length,
    skills: resumeData.skills ? resumeData.skills.split(',').filter(s => s.trim()).length : 0,
    languages: (resumeData.languages || []).length,
    summaryLength: resumeData.summary.length,
    hasPhoto: !!resumeData.photo,
  };

  const totalWords = [
    resumeData.summary,
    ...resumeData.experience.map(e => e.description),
    ...resumeData.education.map(e => e.description),
  ]
    .join(' ')
    .split(/\s+/)
    .filter(w => w.length > 0).length;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
        Estatísticas do Currículo
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-slate-200">
          <Briefcase className="w-5 h-5 text-purple-600 mb-2" />
          <p className="text-2xl font-bold text-slate-900">{stats.experiences}</p>
          <p className="text-xs text-slate-500">Experiências</p>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-slate-200">
          <GraduationCap className="w-5 h-5 text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-slate-900">{stats.education}</p>
          <p className="text-xs text-slate-500">Formações</p>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-slate-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
          <p className="text-2xl font-bold text-slate-900">{stats.skills}</p>
          <p className="text-xs text-slate-500">Habilidades</p>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-slate-200">
          <Languages className="w-5 h-5 text-amber-600 mb-2" />
          <p className="text-2xl font-bold text-slate-900">{stats.languages}</p>
          <p className="text-xs text-slate-500">Idiomas</p>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-slate-200">
          <FileText className="w-5 h-5 text-slate-600 mb-2" />
          <p className="text-2xl font-bold text-slate-900">{totalWords}</p>
          <p className="text-xs text-slate-500">Palavras</p>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-slate-200">
          <Award className="w-5 h-5 text-purple-600 mb-2" />
          <p className="text-2xl font-bold text-slate-900">{stats.hasPhoto ? 'Sim' : 'Não'}</p>
          <p className="text-xs text-slate-500">Foto</p>
        </div>
      </div>
    </div>
  );
};





