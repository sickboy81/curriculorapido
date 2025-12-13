import React from 'react';
import { ResumeData } from '../types';
import { Copy, Download, Share2, FileText, Printer, Eye } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface QuickActionsProps {
  resumeData: ResumeData;
  onCopy?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onPrint?: () => void;
  onPreview?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  resumeData,
  onCopy,
  onDownload,
  onShare,
  onPrint,
  onPreview,
}) => {
  const handleCopyText = () => {
    const text = `
${resumeData.fullName || 'Nome'}
${resumeData.title || 'Cargo'}
${resumeData.email || ''} | ${resumeData.phone || ''}
${resumeData.location || ''}

${resumeData.summary || ''}

EXPERIÊNCIA:
${resumeData.experience.map(exp => 
  `${exp.role} - ${exp.company}\n${exp.dates}\n${exp.description}`
).join('\n\n')}

FORMAÇÃO:
${resumeData.education.map(edu => 
  `${edu.degree} - ${edu.school}\n${edu.dates}`
).join('\n\n')}

HABILIDADES: ${resumeData.skills || ''}
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      onCopy?.();
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
        Ações Rápidas
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <Tooltip content="Copiar texto do currículo" position="top">
          <button
            onClick={handleCopyText}
            className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg transition-all hover:shadow-md group"
            aria-label="Copiar texto do currículo"
          >
            <Copy className="w-5 h-5 text-slate-600 group-hover:text-purple-600" />
            <span className="text-xs font-medium text-slate-700 group-hover:text-purple-700">Copiar</span>
          </button>
        </Tooltip>

        <Tooltip content="Baixar PDF" position="top">
          <button
            onClick={onDownload}
            className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg transition-all hover:shadow-md group"
            aria-label="Baixar PDF"
          >
            <Download className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
            <span className="text-xs font-medium text-slate-700 group-hover:text-blue-700">PDF</span>
          </button>
        </Tooltip>

        <Tooltip content="Compartilhar" position="top">
          <button
            onClick={onShare}
            className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-green-50 border border-slate-200 hover:border-green-300 rounded-lg transition-all hover:shadow-md group"
            aria-label="Compartilhar currículo"
          >
            <Share2 className="w-5 h-5 text-slate-600 group-hover:text-green-600" />
            <span className="text-xs font-medium text-slate-700 group-hover:text-green-700">Compartilhar</span>
          </button>
        </Tooltip>

        <Tooltip content="Imprimir" position="top">
          <button
            onClick={onPrint}
            className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-lg transition-all hover:shadow-md group"
            aria-label="Imprimir currículo"
          >
            <Printer className="w-5 h-5 text-slate-600 group-hover:text-amber-600" />
            <span className="text-xs font-medium text-slate-700 group-hover:text-amber-700">Imprimir</span>
          </button>
        </Tooltip>

        <Tooltip content="Visualizar" position="top">
          <button
            onClick={onPreview}
            className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg transition-all hover:shadow-md group"
            aria-label="Visualizar currículo"
          >
            <Eye className="w-5 h-5 text-slate-600 group-hover:text-purple-600" />
            <span className="text-xs font-medium text-slate-700 group-hover:text-purple-700">Visualizar</span>
          </button>
        </Tooltip>

        <Tooltip content="Ver estatísticas" position="top">
          <button
            onClick={() => {
              const element = document.getElementById('resume-stats');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-lg transition-all hover:shadow-md group"
            aria-label="Ver estatísticas"
          >
            <FileText className="w-5 h-5 text-slate-600 group-hover:text-slate-700" />
            <span className="text-xs font-medium text-slate-700">Estatísticas</span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

