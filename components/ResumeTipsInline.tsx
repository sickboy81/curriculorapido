import React, { useState } from 'react';
import { Lightbulb, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Tip {
  title: string;
  content: string;
  category: 'geral' | 'ats' | 'design' | 'conteudo';
}

const tips: Tip[] = [
  {
    title: 'Use palavras-chave da vaga',
    content: 'Inclua termos técnicos mencionados na descrição da vaga para passar nos filtros ATS.',
    category: 'ats'
  },
  {
    title: 'Seja específico com números',
    content: 'Em vez de "aumentei as vendas", use "aumentei as vendas em 30% no primeiro trimestre".',
    category: 'conteudo'
  },
  {
    title: 'Mantenha o formato simples',
    content: 'Evite gráficos, tabelas complexas ou fontes decorativas que podem confundir sistemas ATS.',
    category: 'ats'
  },
  {
    title: 'Revise a ortografia',
    content: 'Erros de português podem eliminar sua candidatura. Use um corretor ortográfico.',
    category: 'geral'
  },
  {
    title: 'Adapte para cada vaga',
    content: 'Crie versões diferentes do seu currículo destacando experiências relevantes para cada posição.',
    category: 'geral'
  },
  {
    title: 'Mantenha o foco',
    content: 'Um currículo de 1 página é ideal para início de carreira. Máximo 2 páginas para profissionais seniores.',
    category: 'design'
  },
];

export const ResumeTipsInline: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'geral', label: 'Geral' },
    { id: 'ats', label: 'ATS' },
    { id: 'conteudo', label: 'Conteúdo' },
    { id: 'design', label: 'Design' },
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Fechar dicas' : 'Abrir dicas'}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Lightbulb className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Dicas Rápidas</h3>
            <p className="text-xs text-slate-600">Melhore seu currículo com estas dicas</p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-600" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tips List */}
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {filteredTips.map((tip, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  {tip.title}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};





