import React, { useState } from 'react';
import { ResumeData } from '../types';
import { analyzeJobMatch, JobAnalysis, JobSuggestion } from '../services/jobSuggestionsService';
import { Sparkles, Loader2, CheckCircle2, AlertCircle, TrendingUp, Target, Lightbulb, X } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface JobSuggestionsProps {
  resumeData: ResumeData;
  onApplySuggestion?: (suggestion: JobSuggestion) => void;
}

export const JobSuggestions: React.FC<JobSuggestionsProps> = ({ resumeData, onApplySuggestion }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Por favor, cole a descrição da vaga');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      // Usar setTimeout para simular processamento assíncrono
      const result = await new Promise<JobAnalysis>((resolve) => {
        setTimeout(() => {
          resolve(analyzeJobMatch(resumeData, jobDescription));
        }, 500);
      });
      
      setAnalysis(result);
    } catch (err) {
      setError('Erro ao analisar. Tente novamente.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50';
    if (score >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-amber-200 bg-amber-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'skill':
        return <Target className="w-4 h-4" />;
      case 'experience':
        return <TrendingUp className="w-4 h-4" />;
      case 'summary':
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Análise de Compatibilidade com Vaga</h2>
        </div>
        <p className="text-white/90 text-sm">
          Cole a descrição da vaga e receba sugestões personalizadas para adaptar seu currículo (100% gratuito, sem API)
        </p>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Descrição da Vaga
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => {
              setJobDescription(e.target.value);
              setWordCount(e.target.value.trim().split(/\s+/).filter(w => w.length > 0).length);
            }}
            placeholder="Cole aqui a descrição completa da vaga que você está se candidatando..."
            className="w-full p-4 border border-slate-300 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 resize-none"
            rows={6}
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-slate-500">
              Quanto mais detalhada a descrição, melhores serão as sugestões
            </p>
            <p className="text-xs text-slate-400">
              {wordCount} palavra{wordCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !jobDescription.trim()}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analisando...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analisar Compatibilidade
            </>
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {analysis && (
          <div className="space-y-6 mt-6">
            {/* Score Card */}
            <div className={`p-6 rounded-xl border-2 ${getScoreColor(analysis.matchScore)}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium opacity-80 mb-1">Compatibilidade com a Vaga</p>
                  <p className="text-4xl font-bold">{analysis.matchScore}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-80 mb-1">Status</p>
                  <p className="font-semibold text-lg">
                    {analysis.matchScore >= 80 ? 'Excelente' : 
                     analysis.matchScore >= 60 ? 'Bom' : 
                     analysis.matchScore >= 40 ? 'Regular' :
                     'Precisa Melhorar'}
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    analysis.matchScore >= 80 ? 'bg-emerald-600' :
                    analysis.matchScore >= 60 ? 'bg-amber-600' :
                    'bg-red-600'
                  }`}
                  style={{ width: `${analysis.matchScore}%` }}
                />
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/30">
                <div>
                  <p className="text-xs opacity-70 mb-1">Encontradas</p>
                  <p className="text-lg font-semibold">
                    {analysis.matchedKeywords?.length || 0} keywords
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-70 mb-1">Faltando</p>
                  <p className="text-lg font-semibold">
                    {analysis.missingKeywords.length} keywords
                  </p>
                </div>
              </div>
            </div>

            {/* Strengths */}
            {analysis.strengths.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Pontos Fortes
                </h3>
                <div className="space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <div key={index} className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <p className="text-sm text-emerald-900">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matched Keywords */}
            {analysis.matchedKeywords && analysis.matchedKeywords.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Palavras-chave Encontradas ({analysis.matchedKeywords.length})
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Estas palavras-chave da vaga já estão no seu currículo:
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.matchedKeywords.slice(0, 15).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                  {analysis.matchedKeywords.length > 15 && (
                    <span className="px-3 py-1.5 bg-slate-100 border border-slate-300 text-slate-600 rounded-lg text-sm font-medium">
                      +{analysis.matchedKeywords.length - 15} mais
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Missing Keywords */}
            {analysis.missingKeywords.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  Palavras-chave Faltando ({analysis.missingKeywords.length})
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Adicione estas palavras-chave ao seu currículo para aumentar a compatibilidade:
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.slice(0, 15).map((keyword, index) => (
                    <Tooltip key={index} content={`Adicione "${keyword}" no resumo, experiências ou habilidades`} position="top">
                      <span className="px-3 py-1.5 bg-amber-100 border border-amber-300 text-amber-800 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors cursor-help">
                        {keyword}
                      </span>
                    </Tooltip>
                  ))}
                  {analysis.missingKeywords.length > 15 && (
                    <span className="px-3 py-1.5 bg-slate-100 border border-slate-300 text-slate-600 rounded-lg text-sm font-medium">
                      +{analysis.missingKeywords.length - 15} mais
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {analysis.suggestions.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                  Sugestões de Melhoria
                </h3>
                <div className="space-y-3">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg ${getPriorityColor(suggestion.priority)}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 bg-white rounded-lg border border-slate-200">
                            {getTypeIcon(suggestion.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-slate-900">{suggestion.title}</h4>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                                suggestion.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {suggestion.priority === 'high' ? 'Alta' :
                                 suggestion.priority === 'medium' ? 'Média' : 'Baixa'}
                              </span>
                            </div>
                            <p className="text-sm text-slate-700 mb-2">{suggestion.description}</p>
                            {suggestion.action && (
                              <p className="text-xs text-slate-600 bg-white/50 p-2 rounded border border-slate-200">
                                <strong>Ação:</strong> {suggestion.action}
                              </p>
                            )}
                          </div>
                        </div>
                        {onApplySuggestion && (
                          <Tooltip content="Aplicar sugestão" position="left">
                            <button
                              onClick={() => onApplySuggestion(suggestion)}
                              className="p-2 hover:bg-white/80 rounded-lg transition-colors flex-shrink-0"
                            >
                              <CheckCircle2 className="w-5 h-5 text-purple-600" />
                            </button>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvements */}
            {analysis.improvements.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Melhorias Gerais
                </h3>
                <div className="space-y-2">
                  {analysis.improvements.map((improvement, index) => (
                    <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900">{improvement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
