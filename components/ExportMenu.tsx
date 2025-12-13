import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, FileJson, Printer, ChevronDown, Loader2 } from 'lucide-react';
import { ResumeData } from '../types';
import { exportToWord, exportToJSON, importFromJSON } from '../utils/exporters';

interface ExportMenuProps {
  resumeData: ResumeData;
  onImport?: (data: ResumeData) => void;
  onExportPdf?: () => void;
  isGeneratingPdf?: boolean;
  success?: (message: string) => void;
  error?: (message: string) => void;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({
  resumeData,
  onImport,
  onExportPdf,
  isGeneratingPdf = false,
  success,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExportingWord, setIsExportingWord] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleExportWord = async () => {
    try {
      setIsExportingWord(true);
      await exportToWord(resumeData);
      success?.('Currículo exportado para Word com sucesso!');
    } catch (err) {
      error?.('Erro ao exportar para Word. Por favor, tente novamente.');
      console.error('Word export error:', err);
    } finally {
      setIsExportingWord(false);
      setIsOpen(false);
    }
  };

  const handleExportJSON = () => {
    try {
      exportToJSON(resumeData);
      success?.('Backup exportado com sucesso!');
    } catch (err) {
      error?.('Erro ao exportar backup. Por favor, tente novamente.');
      console.error('JSON export error:', err);
    } finally {
      setIsOpen(false);
    }
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const data = await importFromJSON(file);
          onImport?.(data);
          success?.('Backup importado com sucesso!');
        } catch (err) {
          error?.('Erro ao importar backup. Verifique se o arquivo é válido.');
          console.error('JSON import error:', err);
        }
      }
    };
    input.click();
    setIsOpen(false);
  };

  const handlePrint = () => {
    window.print();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors shadow-sm text-sm"
        aria-label="Menu de exportação"
        aria-expanded={isOpen}
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Exportar</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
          <button
            onClick={onExportPdf}
            disabled={isGeneratingPdf}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPdf ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
            ) : (
              <FileText className="w-4 h-4 text-slate-600" />
            )}
            <span className="text-sm font-medium text-slate-700">
              {isGeneratingPdf ? 'Gerando PDF...' : 'Baixar PDF'}
            </span>
          </button>

          <button
            onClick={handleExportWord}
            disabled={isExportingWord}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExportingWord ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
            ) : (
              <FileText className="w-4 h-4 text-slate-600" />
            )}
            <span className="text-sm font-medium text-slate-700">
              {isExportingWord ? 'Exportando...' : 'Exportar Word'}
            </span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Imprimir</span>
          </button>

          <div className="border-t border-slate-200 my-1" />

          <button
            onClick={handleExportJSON}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors"
          >
            <FileJson className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Exportar Backup</span>
          </button>

          <button
            onClick={handleImportJSON}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors"
          >
            <FileJson className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Importar Backup</span>
          </button>
        </div>
      )}
    </div>
  );
};

