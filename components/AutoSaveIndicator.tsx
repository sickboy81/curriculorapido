import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface AutoSaveIndicatorProps {
  status: SaveStatus;
  lastSaved?: Date;
}

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({ status, lastSaved }) => {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (status === 'saved') {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (status === 'idle' && !showSaved) return null;

  const getStatusDisplay = () => {
    switch (status) {
      case 'saving':
        return {
          icon: Loader2,
          text: 'Salvando...',
          className: 'text-blue-600',
          iconClassName: 'animate-spin',
        };
      case 'saved':
        return {
          icon: CheckCircle2,
          text: 'Salvo',
          className: 'text-emerald-600',
          iconClassName: '',
        };
      case 'error':
        return {
          icon: AlertCircle,
          text: 'Erro ao salvar',
          className: 'text-red-600',
          iconClassName: '',
        };
      default:
        return null;
    }
  };

  const statusDisplay = getStatusDisplay();
  if (!statusDisplay) return null;

  const Icon = statusDisplay.icon;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-lg border border-slate-200 transition-all duration-300 ${
        showSaved && status === 'saved' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
      role="status"
      aria-live="polite"
    >
      <Icon className={`w-4 h-4 ${statusDisplay.iconClassName} ${statusDisplay.className}`} />
      <span className={`text-sm font-medium ${statusDisplay.className}`}>
        {statusDisplay.text}
      </span>
      {lastSaved && status === 'saved' && (
        <span className="text-xs text-slate-500">
          {formatLastSaved(lastSaved)}
        </span>
      )}
    </div>
  );
};

const formatLastSaved = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);

  if (seconds < 10) return 'agora';
  if (seconds < 60) return `há ${seconds}s`;
  if (minutes === 1) return 'há 1 min';
  if (minutes < 60) return `há ${minutes} min`;
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};





