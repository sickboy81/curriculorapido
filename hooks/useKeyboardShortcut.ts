import { useEffect } from 'react';

interface KeyboardShortcutOptions {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  callback: () => void;
  enabled?: boolean;
}

/**
 * Custom hook for handling keyboard shortcuts
 * @param shortcuts Array of keyboard shortcut configurations
 */
export const useKeyboardShortcuts = (shortcuts: KeyboardShortcutOptions[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Early return if no shortcuts
      if (shortcuts.length === 0) return;

      // Don't trigger if user is typing in an input/textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Use requestAnimationFrame to defer callback execution
      requestAnimationFrame(() => {
        shortcuts.forEach((shortcut) => {
          if (shortcut.enabled === false) return;

          const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
          const ctrlMatch = shortcut.ctrlKey ? event.ctrlKey : !event.ctrlKey;
          const shiftMatch = shortcut.shiftKey !== undefined 
            ? (shortcut.shiftKey ? event.shiftKey : !event.shiftKey)
            : true;
          const altMatch = shortcut.altKey !== undefined
            ? (shortcut.altKey ? event.altKey : !event.altKey)
            : true;
          const metaMatch = shortcut.metaKey !== undefined
            ? (shortcut.metaKey ? event.metaKey : !event.metaKey)
            : true;

          if (keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch) {
            event.preventDefault();
            shortcut.callback();
          }
        });
      });
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

