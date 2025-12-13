import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, Trash2, Edit2, Copy, Download, 
  X, Search, FolderOpen, Clock, CheckCircle2 
} from 'lucide-react';
import { ResumeData, TemplateType } from '../types';
import { SavedResume, resumeStorage } from '../utils/resumeStorage';
import { exportToJSON } from '../utils/exporters';
import { analytics } from '../utils/analytics';

interface ResumeManagerProps {
  currentResume: ResumeData;
  currentTemplate: TemplateType;
  onLoadResume: (resume: SavedResume) => void;
  onNewResume: () => void;
  onClose: () => void;
}

export const ResumeManager: React.FC<ResumeManagerProps> = ({
  currentResume,
  currentTemplate,
  onLoadResume,
  onNewResume,
  onClose,
}) => {
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => {
    loadResumes();
    setCurrentId(resumeStorage.getCurrentId());
  }, []);

  const loadResumes = () => {
    const saved = resumeStorage.getAll();
    setResumes(saved.sort((a, b) => b.updatedAt - a.updatedAt));
  };

  const handleSaveCurrent = () => {
    const name = currentResume.fullName || 'Currículo sem nome';
    const id = resumeStorage.save(name, currentResume, currentTemplate);
    resumeStorage.setCurrentId(id);
    setCurrentId(id);
    analytics.trackResumeSave(id, name);
    loadResumes();
  };

  const handleLoad = (resume: SavedResume) => {
    onLoadResume(resume);
    resumeStorage.setCurrentId(resume.id);
    setCurrentId(resume.id);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este currículo?')) {
      resumeStorage.delete(id);
      if (currentId === id) {
        resumeStorage.setCurrentId(null);
        setCurrentId(null);
      }
      loadResumes();
    }
  };

  const handleDuplicate = (id: string) => {
    const newId = resumeStorage.duplicate(id);
    if (newId) {
      loadResumes();
    }
  };

  const handleStartEdit = (resume: SavedResume) => {
    setEditingId(resume.id);
    setEditingName(resume.name);
  };

  const handleSaveEdit = (id: string) => {
    resumeStorage.update(id, { name: editingName });
    setEditingId(null);
    setEditingName('');
    loadResumes();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleExport = (resume: SavedResume) => {
    exportToJSON(resume.data);
  };

  const filteredResumes = resumes.filter(resume =>
    resume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resume.data.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Meus Currículos</h2>
            <p className="text-sm text-white/90 mt-1">Gerencie seus currículos salvos</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar currículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={handleSaveCurrent}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Salvar Atual
          </button>
          <button
            onClick={onNewResume}
            className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Novo Currículo
          </button>
        </div>

        {/* Resumes List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredResumes.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">
                {searchQuery ? 'Nenhum currículo encontrado' : 'Nenhum currículo salvo ainda'}
              </p>
              <p className="text-sm text-slate-500 mt-2">
                {searchQuery ? 'Tente uma busca diferente' : 'Clique em "Salvar Atual" para começar'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResumes.map((resume) => (
                <div
                  key={resume.id}
                  className={`border-2 rounded-xl p-4 transition-all ${
                    currentId === resume.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      {editingId === resume.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm font-medium"
                            autoFocus
                            aria-label="Nome do currículo"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEdit(resume.id);
                              if (e.key === 'Escape') handleCancelEdit();
                            }}
                          />
                          <button
                            onClick={() => handleSaveEdit(resume.id)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            aria-label="Salvar"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            aria-label="Cancelar"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-purple-600" />
                          <h3 className="font-bold text-slate-900">{resume.name}</h3>
                          {currentId === resume.id && (
                            <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                              Atual
                            </span>
                          )}
                        </div>
                      )}
                      <p className="text-sm text-slate-600 mt-1">
                        {resume.data.fullName || 'Sem nome'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <Clock className="w-3 h-3" />
                    <span>Atualizado: {formatDate(resume.updatedAt)}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleLoad(resume)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                    >
                      <FolderOpen className="w-3 h-3" />
                      Abrir
                    </button>
                    <button
                      onClick={() => handleStartEdit(resume)}
                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      aria-label="Renomear"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(resume.id)}
                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      aria-label="Duplicar"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleExport(resume)}
                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      aria-label="Exportar"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
