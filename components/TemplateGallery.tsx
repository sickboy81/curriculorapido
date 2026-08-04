import React from 'react';
import { Check } from 'lucide-react';
import { TemplateType } from '../types';

const templates: Array<{ id: TemplateType; name: string; description: string; color: string }> = [
  { id: 'modern', name: 'Moderno', description: 'Limpo e versátil', color: 'bg-violet-600' },
  { id: 'classic', name: 'Clássico', description: 'Tradicional e direto', color: 'bg-slate-700' },
  { id: 'elegant', name: 'Elegante', description: 'Sofisticado e discreto', color: 'bg-rose-500' },
  { id: 'creative', name: 'Criativo', description: 'Para áreas autorais', color: 'bg-fuchsia-600' },
  { id: 'tech', name: 'Tech', description: 'Objetivo e técnico', color: 'bg-cyan-600' },
  { id: 'executive', name: 'Executivo', description: 'Foco em liderança', color: 'bg-amber-600' },
  { id: 'minimalist', name: 'Minimalista', description: 'Essencial e leve', color: 'bg-emerald-600' },
  { id: 'sidebar', name: 'Sidebar', description: 'Competências em destaque', color: 'bg-indigo-600' },
  { id: 'compact', name: 'Compacto', description: 'Conteúdo em uma página', color: 'bg-orange-600' },
  { id: 'bold', name: 'Bold', description: 'Tipografia marcante', color: 'bg-red-600' },
  { id: 'timeline', name: 'Timeline', description: 'Trajetória visual', color: 'bg-blue-600' },
  { id: 'swiss', name: 'Swiss', description: 'Grade precisa', color: 'bg-teal-600' },
  { id: 'grid', name: 'Grid', description: 'Organização moderna', color: 'bg-pink-600' },
];

interface TemplateGalleryProps { value: TemplateType; onChange: (template: TemplateType) => void; color: string; onColorChange: (color: string) => void; }

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ value, onChange, color, onColorChange }) => (
  <section aria-labelledby="templates-title" className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
    <div className="mb-3 flex items-start justify-between gap-2">
      <div><h2 id="templates-title" className="font-bold text-slate-900">Escolha o seu modelo</h2><p className="mt-1 text-xs text-slate-500">Você pode trocar a qualquer momento, sem perder dados.</p></div>
      <label className="flex shrink-0 cursor-pointer items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-700"><input type="color" value={color || '#7c3aed'} onChange={(event) => onColorChange(event.target.value)} aria-label="Cor de destaque" className="h-4 w-4 cursor-pointer rounded-full border-0 bg-transparent p-0" /> Cor</label>
    </div>
    <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5 lg:grid-cols-7">
      {templates.map((template) => {
        const selected = value === template.id;
        return <button key={template.id} type="button" onClick={() => onChange(template.id)} aria-pressed={selected} title={template.description} className={`relative min-w-0 overflow-hidden rounded-lg border p-1.5 text-center transition-all ${selected ? 'border-violet-500 bg-violet-50 ring-1 ring-violet-200' : 'border-slate-200 hover:border-violet-300 hover:bg-slate-50'}`}>
          <div className={`mx-auto mb-1 h-7 w-full max-w-16 rounded-md ${template.color} p-1 shadow-sm`}><div className="h-1 w-2/3 rounded bg-white/90" /><div className="mt-1 h-0.5 w-full rounded bg-white/50" /><div className="mt-0.5 h-0.5 w-4/5 rounded bg-white/50" /></div>
          <span className="block truncate text-[10px] font-semibold leading-tight text-slate-800 sm:text-[11px]">{template.name}</span>
          {selected && <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-white"><Check className="h-2.5 w-2.5" /></span>}
        </button>;
      })}
    </div>
  </section>
);
