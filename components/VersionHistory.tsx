import React, { useState, useEffect } from 'react';
import { Clock, RotateCcw, Trash2, X, History, FileText } from 'lucide-react';
import { ResumeVersion, versionHistory } from '../utils/versionHistory';
import { ResumeData, TemplateType } from '../types';

interface VersionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  resumeId: string;
  onRestore: (version: ResumeVersion) => void;
}

export const VersionHistory: React.FC<VersionHistoryProps> = ({
  isOpen,
  onClose,
  resumeId,
  onRestore,
}) => {
  const [versions, setVersions] = useState<ResumeVersion[]>([]);

  useEffect(() => {
    if (isOpen && resumeId) {
      setVersions(versionHistory.getAll(resumeId));
    }
  }, [isOpen, resumeId]);

  const handleRestore = (version: ResumeVersion) => {
    if (confirm('Tem certeza que deseja restaurar esta versão? Os dados atuais serão substituídos.')) {
      onRestore(version);
      onClose();
    }
  };

  const handleDelete = (versionId: string) => {
    if (confirm('Tem certeza que deseja excluir esta versão?')) {
      versionHistory.delete(resumeId, versionId);
      setVersions(versionHistory.getAll(resumeId));
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `${diffMins} minuto${diffMins > 1 ? 's' : ''} atrás`;
    if (diffHours < 24) return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
    if (diffDays < 7) return `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Histórico de Versões</h3>
              <p className="text-sm text-white/90">Restaurar versões anteriores do currículo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Versions List */}
        <div className="flex-1 overflow-y-auto p-4">
          {versions.length === 0 ? (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">Nenhuma versão salva ainda</p>
              <p className="text-sm text-slate-500 mt-2">
                As versões são salvas automaticamente quando você faz alterações
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className="border-2 border-slate-200 rounded-xl p-4 hover:border-purple-300 transition-colors bg-white"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <h4 className="font-semibold text-slate-900">
                          {version.name || 'Versão sem nome'}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(version.timestamp)}</span>
                      </div>
                      <div className="mt-2 text-xs text-slate-600">
                        <span className="font-medium">Template:</span> {version.template}
                        {version.data.fullName && (
                          <>
                            {' • '}
                            <span className="font-medium">Nome:</span> {version.data.fullName}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRestore(version)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Restaurar
                    </button>
                    <button
                      onClick={() => handleDelete(version.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Excluir versão"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <p className="text-xs text-slate-600 text-center">
            As versões são salvas automaticamente. Mantemos até 50 versões por currículo.
          </p>
        </div>
      </div>
    </div>
  );
};


