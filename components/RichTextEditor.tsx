import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, List, ListOrdered, AlignLeft, AlignCenter, Undo, Redo, X } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  maxLength?: number;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Digite aqui...',
  label,
  maxLength = 2000,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    if (value !== history[historyIndex]) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(value);
      if (newHistory.length > 50) {
        newHistory.shift();
      }
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [value]);

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    textareaRef.current?.focus();
    // Trigger onChange manually since execCommand doesn't trigger input events
    if (textareaRef.current) {
      onChange(textareaRef.current.value);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  };

  const insertBullet = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const beforeText = text.substring(0, start);
    const selectedText = text.substring(start, end);
    const afterText = text.substring(end);

    // Check if we're at the start of a line
    const isStartOfLine = start === 0 || text[start - 1] === '\n';
    const newText = isStartOfLine
      ? `${beforeText}• ${selectedText || ''}${afterText}`
      : `${beforeText}\n• ${selectedText || ''}${afterText}`;

    onChange(newText);
    setTimeout(() => {
      textarea.focus();
      const newPosition = isStartOfLine ? start + 2 : start + 3;
      textarea.setSelectionRange(newPosition, newPosition + selectedText.length);
    }, 0);
  };

  const insertNumberedList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const beforeText = text.substring(0, start);
    const selectedText = text.substring(start, end);
    const afterText = text.substring(end);

    const isStartOfLine = start === 0 || text[start - 1] === '\n';
    const newText = isStartOfLine
      ? `${beforeText}1. ${selectedText || ''}${afterText}`
      : `${beforeText}\n1. ${selectedText || ''}${afterText}`;

    onChange(newText);
    setTimeout(() => {
      textarea.focus();
      const newPosition = isStartOfLine ? start + 3 : start + 4;
      textarea.setSelectionRange(newPosition, newPosition + selectedText.length);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl/Cmd + B for bold
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      // For plain text, we can't do bold, but we can add markdown-style
      insertMarkdown('**', '**');
    }
    // Ctrl/Cmd + Z for undo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      handleUndo();
    }
    // Ctrl/Cmd + Shift + Z for redo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
      e.preventDefault();
      handleRedo();
    }
  };

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const newText = `${text.substring(0, start)}${before}${selectedText}${after}${text.substring(end)}`;
    
    onChange(newText);
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const formatText = (format: 'bold' | 'italic' | 'bullet' | 'numbered') => {
    switch (format) {
      case 'bold':
        insertMarkdown('**', '**');
        break;
      case 'italic':
        insertMarkdown('*', '*');
        break;
      case 'bullet':
        insertBullet();
        break;
      case 'numbered':
        insertNumberedList();
        break;
    }
  };

  const remainingChars = maxLength - value.length;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">{label}</label>
      )}
      
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-slate-50 border border-slate-200 rounded-t-lg">
        <button
          type="button"
          onClick={() => formatText('bold')}
          className="p-1.5 hover:bg-slate-200 rounded transition-colors"
          title="Negrito (Ctrl+B)"
          aria-label="Negrito"
        >
          <Bold className="w-4 h-4 text-slate-700" />
        </button>
        <button
          type="button"
          onClick={() => formatText('italic')}
          className="p-1.5 hover:bg-slate-200 rounded transition-colors"
          title="Itálico"
          aria-label="Itálico"
        >
          <Italic className="w-4 h-4 text-slate-700" />
        </button>
        <div className="w-px h-6 bg-slate-300 mx-1" />
        <button
          type="button"
          onClick={() => formatText('bullet')}
          className="p-1.5 hover:bg-slate-200 rounded transition-colors"
          title="Lista com marcadores"
          aria-label="Lista com marcadores"
        >
          <List className="w-4 h-4 text-slate-700" />
        </button>
        <button
          type="button"
          onClick={() => formatText('numbered')}
          className="p-1.5 hover:bg-slate-200 rounded transition-colors"
          title="Lista numerada"
          aria-label="Lista numerada"
        >
          <ListOrdered className="w-4 h-4 text-slate-700" />
        </button>
        <div className="w-px h-6 bg-slate-300 mx-1" />
        <button
          type="button"
          onClick={handleUndo}
          disabled={historyIndex === 0}
          className="p-1.5 hover:bg-slate-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Desfazer (Ctrl+Z)"
          aria-label="Desfazer"
        >
          <Undo className="w-4 h-4 text-slate-700" />
        </button>
        <button
          type="button"
          onClick={handleRedo}
          disabled={historyIndex === history.length - 1}
          className="p-1.5 hover:bg-slate-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Refazer (Ctrl+Shift+Z)"
          aria-label="Refazer"
        >
          <Redo className="w-4 h-4 text-slate-700" />
        </button>
        <div className="flex-1" />
        {maxLength && (
          <span className={`text-xs px-2 py-1 rounded ${
            remainingChars < 50
              ? 'text-red-600 bg-red-50'
              : remainingChars < 100
              ? 'text-amber-600 bg-amber-50'
              : 'text-slate-500 bg-slate-100'
          }`}>
            {remainingChars} caracteres restantes
          </span>
        )}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          if (!maxLength || e.target.value.length <= maxLength) {
            onChange(e.target.value);
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-slate-300 rounded-b-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 resize-y min-h-[100px] text-sm"
        rows={4}
        aria-label={label || placeholder}
      />

      {/* Help Text */}
      <p className="text-xs text-slate-500">
        Dica: Use <strong>**texto**</strong> para negrito e <em>*texto*</em> para itálico. Use • para listas com marcadores.
      </p>
    </div>
  );
};

