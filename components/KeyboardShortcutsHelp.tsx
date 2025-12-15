import React, { useState } from 'react';
import { Keyboard, X } from 'lucide-react';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['Ctrl', 'S'], description: 'Salvar currículo' },
    { keys: ['Ctrl', 'P'], description: 'Baixar PDF' },
    { keys: ['Ctrl', 'E'], description: 'Focar no primeiro campo' },
    { keys: ['/'], description: 'Abrir galeria de templates' },
  ];

  const getKeyDisplay = (key: string) => {
    if (key === 'Ctrl') {
      return navigator.platform.includes('Mac') ? '⌘' : 'Ctrl';
    }
    return key;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Keyboard className="w-6 h-6" />
            <h3 className="text-2xl font-bold">Atalhos de Teclado</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                <span className="text-slate-700 font-medium">{shortcut.description}</span>
                <div className="flex items-center gap-2">
                  {shortcut.keys.map((key, keyIndex) => (
                    <React.Fragment key={keyIndex}>
                      <kbd className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 shadow-sm">
                        {getKeyDisplay(key)}
                      </kbd>
                      {keyIndex < shortcut.keys.length - 1 && (
                        <span className="text-slate-400">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Dica:</strong> Os atalhos não funcionam quando você está digitando em um campo de texto.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};


