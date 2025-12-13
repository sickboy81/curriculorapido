import React, { useState } from 'react';
import { X, Search, Grid, List, CheckCircle2, Eye } from 'lucide-react';
import { TemplateType } from '../types';
import { ResumeData } from '../types';
import { ResumePreview } from './ResumePreview';

interface TemplateGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
  resumeData: ResumeData;
}

interface TemplateInfo {
  id: TemplateType;
  name: string;
  description: string;
  category: 'classic' | 'creative' | 'executive';
  tags: string[];
  previewColor: string;
}

const templates: TemplateInfo[] = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Design limpo e contemporâneo, ideal para áreas criativas e tecnologia',
    category: 'classic',
    tags: ['Moderno', 'Limpo', 'Tecnologia'],
    previewColor: 'bg-blue-500'
  },
  {
    id: 'classic',
    name: 'Clássico',
    description: 'Formato tradicional e profissional, perfeito para áreas corporativas',
    category: 'classic',
    tags: ['Tradicional', 'Corporativo', 'Profissional'],
    previewColor: 'bg-slate-600'
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    description: 'Layout com barra lateral destacando informações principais',
    category: 'classic',
    tags: ['Sidebar', 'Organizado', 'Estruturado'],
    previewColor: 'bg-emerald-600'
  },
  {
    id: 'minimalist',
    name: 'Minimalista',
    description: 'Design minimalista com foco no conteúdo essencial',
    category: 'classic',
    tags: ['Minimalista', 'Simples', 'Elegante'],
    previewColor: 'bg-slate-500'
  },
  {
    id: 'executive',
    name: 'Executivo',
    description: 'Formato executivo para cargos de liderança e gestão',
    category: 'executive',
    tags: ['Executivo', 'Liderança', 'Gestão'],
    previewColor: 'bg-indigo-600'
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Layout ousado com tipografia destacada para impacto visual',
    category: 'creative',
    tags: ['Bold', 'Ousado', 'Impacto'],
    previewColor: 'bg-red-600'
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Linha do tempo visual destacando sua trajetória profissional',
    category: 'creative',
    tags: ['Timeline', 'Visual', 'Trajetória'],
    previewColor: 'bg-amber-600'
  },
  {
    id: 'swiss',
    name: 'Swiss',
    description: 'Estilo suíço minimalista com tipografia precisa e espaçamento perfeito',
    category: 'classic',
    tags: ['Swiss', 'Minimalista', 'Preciso'],
    previewColor: 'bg-slate-700'
  },
  {
    id: 'grid',
    name: 'Grid',
    description: 'Layout em grade moderno e organizado para apresentação clara',
    category: 'creative',
    tags: ['Grid', 'Moderno', 'Organizado'],
    previewColor: 'bg-purple-600'
  }
];

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  isOpen,
  onClose,
  currentTemplate,
  onSelectTemplate,
  resumeData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'classic' | 'creative' | 'executive'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateType | null>(null);

  if (!isOpen) return null;

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (template: TemplateType) => {
    onSelectTemplate(template);
    onClose();
  };

  const handlePreview = (template: TemplateType) => {
    setPreviewTemplate(template);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Galeria de Templates</h3>
              <p className="text-sm text-white/90 mt-1">Escolha o modelo perfeito para seu currículo</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Filters and Search */}
          <div className="p-6 border-b border-slate-200 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar template..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            {/* Category Filter and View Mode */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setSelectedCategory('classic')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'classic'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Clássicos
                </button>
                <button
                  onClick={() => setSelectedCategory('creative')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'creative'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Criativos
                </button>
                <button
                  onClick={() => setSelectedCategory('executive')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'executive'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Executivos
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  aria-label="Visualização em grade"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  aria-label="Visualização em lista"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Templates Grid/List */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <p className="text-lg">Nenhum template encontrado.</p>
                <p className="text-sm mt-2">Tente ajustar os filtros de busca.</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`group relative bg-white border-2 rounded-xl transition-all duration-300 hover:shadow-xl ${
                      currentTemplate === template.id
                        ? 'border-purple-500 shadow-lg'
                        : 'border-slate-200 hover:border-purple-300'
                    }`}
                    style={{ overflow: 'visible' }}
                  >
                    {/* Preview Area */}
                    <div className="relative h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-t-xl" style={{ overflow: 'hidden' }}>
                      <div className={`absolute inset-0 ${template.previewColor} opacity-10 rounded-t-xl`} />
                      <div className="absolute inset-0 flex items-center justify-center" style={{ padding: '4px' }}>
                        {/* Preview container - A4 dimensions scaled down */}
                        <div 
                          className="bg-white rounded shadow-sm"
                          style={{ 
                            width: '210mm',
                            minHeight: '297mm',
                            transform: 'scale(0.2)',
                            transformOrigin: 'center center',
                            maxWidth: '100vw',
                            maxHeight: '100vh'
                          }}
                        >
                          <div className="pointer-events-none select-none" style={{ width: '100%', height: '100%' }}>
                            <ResumePreview data={resumeData} template={template.id} />
                          </div>
                        </div>
                      </div>
                      {currentTemplate === template.id && (
                        <div className="absolute top-2 right-2 bg-purple-600 text-white p-1.5 rounded-full z-10 shadow-lg">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="p-4">
                      <h4 className="font-bold text-slate-900 mb-1">{template.name}</h4>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{template.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePreview(template.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                        <button
                          onClick={() => handleSelectTemplate(template.id)}
                          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                            currentTemplate === template.id
                              ? 'bg-purple-600 text-white'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {currentTemplate === template.id ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Selecionado
                            </>
                          ) : (
                            'Usar Este'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl transition-all ${
                      currentTemplate === template.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="w-24 h-24 bg-white rounded-lg shadow-sm flex-shrink-0 relative" style={{ minWidth: '96px', minHeight: '96px', overflow: 'visible' }}>
                      <div 
                        className="absolute top-0 left-0 pointer-events-none bg-white rounded-lg"
                        style={{ 
                          width: '210mm',
                          minHeight: '297mm',
                          transform: 'scale(0.12)',
                          transformOrigin: 'top left',
                          position: 'absolute'
                        }}
                      >
                        <ResumePreview data={resumeData} template={template.id} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-900">{template.name}</h4>
                        {currentTemplate === template.id && (
                          <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{template.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handlePreview(template.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleSelectTemplate(template.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                          currentTemplate === template.id
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        {currentTemplate === template.id ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Selecionado
                          </>
                        ) : (
                          'Usar Este'
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/70 z-[1001] flex items-center justify-center p-4" onClick={() => setPreviewTemplate(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Preview: {templates.find(t => t.id === previewTemplate)?.name}</h3>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Fechar preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <ResumePreview data={resumeData} template={previewTemplate} />
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  handleSelectTemplate(previewTemplate);
                  setPreviewTemplate(null);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Usar Este Template
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

