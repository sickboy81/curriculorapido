import React, { useState, useEffect } from 'react';
import { Accessibility, ZoomIn, ZoomOut, Type } from 'lucide-react';

export const AccessibilityHelper: React.FC = () => {
  const [fontSize, setFontSize] = useState(16);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    return () => {
      document.documentElement.style.fontSize = '';
    };
  }, [fontSize]);

  const increaseFont = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFont = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  const resetFont = () => {
    setFontSize(16);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all hover:scale-110 active:scale-95"
        aria-label="Abrir opções de acessibilidade"
        title="Acessibilidade"
      >
        <Accessibility className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 w-64">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Accessibility className="w-5 h-5 text-purple-600" />
          <h3 className="font-bold text-slate-900">Acessibilidade</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Fechar"
        >
          <span className="text-slate-600">×</span>
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Type className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Tamanho da Fonte</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={decreaseFont}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              aria-label="Diminuir fonte"
            >
              <ZoomOut className="w-4 h-4 text-slate-600" />
            </button>
            <span className="flex-1 text-center text-sm font-medium text-slate-700">
              {fontSize}px
            </span>
            <button
              onClick={increaseFont}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              aria-label="Aumentar fonte"
            >
              <ZoomIn className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={resetFont}
              className="px-3 py-2 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors font-medium"
              aria-label="Resetar fonte"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Use estas opções para melhorar sua experiência de navegação
          </p>
        </div>
      </div>
    </div>
  );
};


