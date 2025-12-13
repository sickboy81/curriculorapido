import React from 'react';
import { ResumeData } from '../types';
import { AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';

interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  field?: string;
}

interface ResumeValidatorProps {
  resumeData: ResumeData;
  onFix?: (issue: ValidationIssue) => void;
}

export const ResumeValidator: React.FC<ResumeValidatorProps> = ({ resumeData, onFix }) => {
  const validate = (): ValidationIssue[] => {
    const issues: ValidationIssue[] = [];

    // Required fields
    if (!resumeData.fullName || resumeData.fullName.trim().length === 0) {
      issues.push({
        type: 'error',
        message: 'Nome completo é obrigatório',
        field: 'fullName'
      });
    }

    if (!resumeData.email || resumeData.email.trim().length === 0) {
      issues.push({
        type: 'error',
        message: 'E-mail é obrigatório',
        field: 'email'
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resumeData.email)) {
      issues.push({
        type: 'error',
        message: 'E-mail inválido',
        field: 'email'
      });
    }

    if (!resumeData.phone || resumeData.phone.trim().length === 0) {
      issues.push({
        type: 'error',
        message: 'Telefone é obrigatório',
        field: 'phone'
      });
    }

    // Warnings
    if (!resumeData.title || resumeData.title.trim().length === 0) {
      issues.push({
        type: 'warning',
        message: 'Cargo/Objetivo não preenchido',
        field: 'title'
      });
    }

    if (!resumeData.summary || resumeData.summary.length < 50) {
      issues.push({
        type: 'warning',
        message: 'Resumo profissional muito curto (mínimo 50 caracteres)',
        field: 'summary'
      });
    }

    if (resumeData.experience.length === 0) {
      issues.push({
        type: 'warning',
        message: 'Nenhuma experiência profissional adicionada',
        field: 'experience'
      });
    }

    if (resumeData.education.length === 0) {
      issues.push({
        type: 'warning',
        message: 'Nenhuma formação acadêmica adicionada',
        field: 'education'
      });
    }

    const skillsCount = resumeData.skills ? resumeData.skills.split(',').filter(s => s.trim()).length : 0;
    if (skillsCount < 3) {
      issues.push({
        type: 'info',
        message: 'Adicione pelo menos 3 habilidades para destacar suas competências',
        field: 'skills'
      });
    }

    // Info
    if (!resumeData.photo) {
      issues.push({
        type: 'info',
        message: 'Adicionar foto profissional pode aumentar suas chances',
        field: 'photo'
      });
    }

    return issues;
  };

  const issues = validate();

  if (issues.length === 0) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-emerald-900">Currículo Completo!</p>
            <p className="text-sm text-emerald-700">Todos os campos essenciais estão preenchidos.</p>
          </div>
        </div>
      </div>
    );
  }

  const errors = issues.filter(i => i.type === 'error');
  const warnings = issues.filter(i => i.type === 'warning');
  const infos = issues.filter(i => i.type === 'info');

  const getIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-900';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
        Validação do Currículo
      </h3>

      <div className="space-y-3">
        {errors.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-red-700 mb-2 uppercase">Erros ({errors.length})</h4>
            <div className="space-y-2">
              {errors.map((issue, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${getColor(issue.type)} flex items-start gap-2`}
                >
                  {getIcon(issue.type)}
                  <p className="text-sm flex-1">{issue.message}</p>
                  {onFix && issue.field && (
                    <button
                      onClick={() => onFix(issue)}
                      className="text-xs font-medium underline hover:no-underline"
                    >
                      Corrigir
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {warnings.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-amber-700 mb-2 uppercase">Avisos ({warnings.length})</h4>
            <div className="space-y-2">
              {warnings.map((issue, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${getColor(issue.type)} flex items-start gap-2`}
                >
                  {getIcon(issue.type)}
                  <p className="text-sm flex-1">{issue.message}</p>
                  {onFix && issue.field && (
                    <button
                      onClick={() => onFix(issue)}
                      className="text-xs font-medium underline hover:no-underline"
                    >
                      Corrigir
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {infos.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-blue-700 mb-2 uppercase">Sugestões ({infos.length})</h4>
            <div className="space-y-2">
              {infos.map((issue, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${getColor(issue.type)} flex items-start gap-2`}
                >
                  {getIcon(issue.type)}
                  <p className="text-sm flex-1">{issue.message}</p>
                  {onFix && issue.field && (
                    <button
                      onClick={() => onFix(issue)}
                      className="text-xs font-medium underline hover:no-underline"
                    >
                      Adicionar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

