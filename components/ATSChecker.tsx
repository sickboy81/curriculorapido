import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, FileCheck, Search, Zap, Shield, X } from 'lucide-react';
import { ResumeData } from '../types';
import { analytics } from '../utils/analytics';

interface ATSCheckerProps {
  resumeData: ResumeData;
  showAsSection?: boolean; // If true, shows full content without wrapper button
}

interface CheckResult {
  id: string;
  title: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  suggestion?: string;
}

export const ATSChecker: React.FC<ATSCheckerProps> = ({ resumeData, showAsSection = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<CheckResult[]>([]);

  const runATSCheckFromForm = () => {
    const checks: CheckResult[] = [];

    // 1. Check for contact information
    if (!resumeData.email || !resumeData.phone) {
      checks.push({
        id: 'contact',
        title: 'Informações de Contato',
        status: 'fail',
        message: 'Email ou telefone estão faltando',
        suggestion: 'Adicione email e telefone para facilitar o contato dos recrutadores'
      });
    } else {
      checks.push({
        id: 'contact',
        title: 'Informações de Contato',
        status: 'pass',
        message: 'Email e telefone presentes'
      });
    }

    // 2. Check for professional summary
    if (!resumeData.summary || resumeData.summary.length < 50) {
      checks.push({
        id: 'summary',
        title: 'Resumo Profissional',
        status: 'warning',
        message: 'Resumo muito curto ou ausente',
        suggestion: 'Adicione um resumo profissional de 3-4 linhas destacando sua experiência e valor'
      });
    } else if (resumeData.summary.length > 300) {
      checks.push({
        id: 'summary',
        title: 'Resumo Profissional',
        status: 'warning',
        message: 'Resumo muito longo',
        suggestion: 'Mantenha o resumo entre 50-300 caracteres para melhor legibilidade'
      });
    } else {
      checks.push({
        id: 'summary',
        title: 'Resumo Profissional',
        status: 'pass',
        message: 'Resumo profissional adequado'
      });
    }

    // 3. Check for experience
    if (resumeData.experience.length === 0) {
      checks.push({
        id: 'experience',
        title: 'Experiência Profissional',
        status: 'warning',
        message: 'Nenhuma experiência adicionada',
        suggestion: 'Adicione pelo menos uma experiência profissional, mesmo que seja estágio ou trabalho voluntário'
      });
    } else {
      const hasDescriptions = resumeData.experience.every(exp => exp.description && exp.description.length > 20);
      if (!hasDescriptions) {
        checks.push({
          id: 'experience',
          title: 'Experiência Profissional',
          status: 'warning',
          message: 'Algumas experiências têm descrições muito curtas',
          suggestion: 'Adicione descrições detalhadas usando a fórmula CAR (Contexto, Ação, Resultado)'
        });
      } else {
        checks.push({
          id: 'experience',
          title: 'Experiência Profissional',
          status: 'pass',
          message: `${resumeData.experience.length} experiência(s) com descrições adequadas`
        });
      }
    }

    // 4. Check for education
    if (resumeData.education.length === 0) {
      checks.push({
        id: 'education',
        title: 'Formação Acadêmica',
        status: 'warning',
        message: 'Nenhuma formação adicionada',
        suggestion: 'Adicione sua formação acadêmica, mesmo que esteja em andamento'
      });
    } else {
      checks.push({
        id: 'education',
        title: 'Formação Acadêmica',
        status: 'pass',
        message: `${resumeData.education.length} formação(ões) adicionada(s)`
      });
    }

    // 5. Check for skills
    const skillsArray = resumeData.skills ? resumeData.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
    if (skillsArray.length === 0) {
      checks.push({
        id: 'skills',
        title: 'Habilidades',
        status: 'fail',
        message: 'Nenhuma habilidade adicionada',
        suggestion: 'Adicione habilidades técnicas e comportamentais relevantes para a vaga'
      });
    } else if (skillsArray.length < 3) {
      checks.push({
        id: 'skills',
        title: 'Habilidades',
        status: 'warning',
        message: 'Poucas habilidades adicionadas',
        suggestion: 'Adicione mais habilidades para destacar suas competências'
      });
    } else {
      checks.push({
        id: 'skills',
        title: 'Habilidades',
        status: 'pass',
        message: `${skillsArray.length} habilidade(s) adicionada(s)`
      });
    }

    // 6. Check for keywords density
    const allText = [
      resumeData.fullName,
      resumeData.title,
      resumeData.summary,
      ...resumeData.experience.map(e => `${e.role} ${e.company} ${e.description}`),
      ...resumeData.education.map(e => `${e.degree} ${e.school}`),
      resumeData.skills
    ].join(' ').toLowerCase();

    const commonKeywords = ['gestão', 'liderança', 'resultados', 'projetos', 'equipe', 'desenvolvimento', 'implementação', 'análise', 'planejamento', 'comunicação'];
    const foundKeywords = commonKeywords.filter(keyword => allText.includes(keyword.toLowerCase()));
    
    if (foundKeywords.length < 3) {
      checks.push({
        id: 'keywords',
        title: 'Palavras-Chave',
        status: 'warning',
        message: `Apenas ${foundKeywords.length} palavra(s)-chave comum(is) encontrada(s)`,
        suggestion: 'Inclua mais palavras-chave relevantes da área e da descrição da vaga'
      });
    } else {
      checks.push({
        id: 'keywords',
        title: 'Palavras-Chave',
        status: 'pass',
        message: `${foundKeywords.length} palavra(s)-chave relevante(s) encontrada(s)`
      });
    }

    // 7. Check for quantified results
    const hasNumbers = /\d+/.test(allText);
    if (!hasNumbers) {
      checks.push({
        id: 'numbers',
        title: 'Resultados Quantificáveis',
        status: 'warning',
        message: 'Nenhum número ou resultado quantificável encontrado',
        suggestion: 'Adicione números, percentuais, valores ou métricas para destacar seus resultados'
      });
    } else {
      checks.push({
        id: 'numbers',
        title: 'Resultados Quantificáveis',
        status: 'pass',
        message: 'Resultados quantificáveis presentes no currículo'
      });
    }

    // 8. Check for languages
    if (resumeData.languages.length === 0) {
      checks.push({
        id: 'languages',
        title: 'Idiomas',
        status: 'warning',
        message: 'Nenhum idioma adicionado',
        suggestion: 'Adicione idiomas que você domina, especialmente inglês e espanhol'
      });
    } else {
      checks.push({
        id: 'languages',
        title: 'Idiomas',
        status: 'pass',
        message: `${resumeData.languages.length} idioma(s) adicionado(s)`
      });
    }

    return checks;
  };

  const handleCheckClick = () => {
    const checks = runATSCheckFromForm();
    
    // Calculate score
    const passCount = checks.filter(c => c.status === 'pass').length;
    const warningCount = checks.filter(c => c.status === 'warning').length;
    const failCount = checks.filter(c => c.status === 'fail').length;
    const totalChecks = checks.length;
    const score = Math.round((passCount / totalChecks) * 100);

    checks.unshift({
      id: 'score',
      title: 'Pontuação ATS',
      status: score >= 80 ? 'pass' : score >= 60 ? 'warning' : 'fail',
      message: `${score}% - ${passCount} passou, ${warningCount} avisos, ${failCount} falhas`,
      suggestion: score < 80 ? 'Melhore os itens marcados para aumentar suas chances de passar no ATS' : undefined
    });

    setResults(checks);
    setIsOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'fail':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  // If showAsSection is true, show content directly without wrapper button
  if (showAsSection) {
    return (
      <>
        <div className="space-y-6">
          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={handleCheckClick}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold text-base"
            >
              <FileCheck className="w-5 h-5" />
              <span>Verificar ATS do Currículo</span>
            </button>
          </div>

          {/* Show results if available */}
          {results.length > 0 && !isOpen && (
            <div className="mt-6 space-y-4">
              {results.map((result) => (
                <div
                  key={result.id}
                  className={`border-2 rounded-xl p-4 ${getStatusColor(result.status)} transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getStatusIcon(result.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">{result.title}</h4>
                      <p className="text-sm mb-2">{result.message}</p>
                      {result.suggestion && (
                        <div className="mt-2 pt-2 border-t border-current/20">
                          <p className="text-xs font-medium opacity-90">
                            <Zap className="w-3 h-3 inline mr-1" />
                            {result.suggestion}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal for results when showAsSection is true */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Verificador de ATS</h3>
                    <p className="text-sm text-white/90">
                      Análise de compatibilidade com sistemas de triagem
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className={`border-2 rounded-xl p-4 ${getStatusColor(result.status)} transition-all`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getStatusIcon(result.status)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-1">{result.title}</h4>
                        <p className="text-sm mb-2">{result.message}</p>
                        {result.suggestion && (
                          <div className="mt-2 pt-2 border-t border-current/20">
                            <p className="text-xs font-medium opacity-90">
                              <Zap className="w-3 h-3 inline mr-1" />
                              {result.suggestion}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Search className="w-5 h-5 text-purple-600" />
                    Dicas para Melhorar
                  </h4>
                  <ul className="text-sm text-slate-700 space-y-2 list-disc list-inside">
                    <li>Use palavras-chave da descrição da vaga no seu currículo</li>
                    <li>Mantenha o formato simples, evitando tabelas e colunas complexas</li>
                    <li>Use nomes de seções padrão: "Experiência Profissional", "Formação Acadêmica"</li>
                    <li>Salve sempre em PDF para preservar a formatação</li>
                    <li>Inclua números e resultados quantificáveis nas descrições</li>
                    <li>Revise ortografia e gramática cuidadosamente</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Original compact mode (for backward compatibility)
  return (
    <>
      <div className="flex flex-col gap-2">
        <button
          onClick={handleCheckClick}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-medium text-sm"
        >
          <FileCheck className="w-4 h-4" />
          <span>Verificar ATS</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Verificador de ATS</h3>
                  <p className="text-sm text-white/90">
                    Análise de compatibilidade com sistemas de triagem
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {results.map((result) => (
                <div
                  key={result.id}
                  className={`border-2 rounded-xl p-4 ${getStatusColor(result.status)} transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getStatusIcon(result.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">{result.title}</h4>
                      <p className="text-sm mb-2">{result.message}</p>
                      {result.suggestion && (
                        <div className="mt-2 pt-2 border-t border-current/20">
                          <p className="text-xs font-medium opacity-90">
                            <Zap className="w-3 h-3 inline mr-1" />
                            {result.suggestion}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Search className="w-5 h-5 text-purple-600" />
                  Dicas para Melhorar
                </h4>
                <ul className="text-sm text-slate-700 space-y-2 list-disc list-inside">
                  <li>Use palavras-chave da descrição da vaga no seu currículo</li>
                  <li>Mantenha o formato simples, evitando tabelas e colunas complexas</li>
                  <li>Use nomes de seções padrão: "Experiência Profissional", "Formação Acadêmica"</li>
                  <li>Salve sempre em PDF para preservar a formatação</li>
                  <li>Inclua números e resultados quantificáveis nas descrições</li>
                  <li>Revise ortografia e gramática cuidadosamente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
