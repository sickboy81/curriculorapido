import { useContext, useEffect, useState } from 'react';

export type ConsentState = { version: 1; necessary: true; analytics: boolean; advertising: boolean; updatedAt: string };
const KEY = 'curriculo_rapido_consent_v1';
const listeners = new Set<(value: ConsentState | null) => void>();
export const readConsent = (): ConsentState | null => {
  if (typeof window === 'undefined') return null;
  try { const value = JSON.parse(localStorage.getItem(KEY) || 'null'); return value?.version === 1 && value.necessary === true ? value : null; } catch { return null; }
};
export const saveConsent = (analytics: boolean, advertising: boolean) => {
  const value: ConsentState = { version: 1, necessary: true, analytics, advertising, updatedAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(value)); listeners.forEach((fn) => fn(value)); return value;
};
export const subscribeConsent = (fn: (value: ConsentState | null) => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
export const hasConsent = (category: 'analytics' | 'advertising') => Boolean(readConsent()?.[category]);
export const useConsent = () => {
  const context = useContext(ConsentContext); if (!context) throw new Error('useConsent must be used inside ConsentProvider'); return context;
};
export type ConsentContextValue = { consent: ConsentState | null; preferencesOpen: boolean; openPreferences: () => void; closePreferences: () => void; savePreferences: (analytics: boolean, advertising: boolean) => void; acceptAll: () => void; rejectNonEssential: () => void };
import React, { createContext, ReactNode } from 'react';
export const ConsentContext = createContext<ConsentContextValue | null>(null);
export const ConsentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<ConsentState | null>(() => readConsent());
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  useEffect(() => subscribeConsent(setConsent), []);
  useEffect(() => { const onStorage = () => setConsent(readConsent()); window.addEventListener('storage', onStorage); return () => window.removeEventListener('storage', onStorage); }, []);
  const value: ConsentContextValue = { consent, preferencesOpen, openPreferences: () => setPreferencesOpen(true), closePreferences: () => setPreferencesOpen(false), savePreferences: (a, b) => { saveConsent(a, b); setPreferencesOpen(false); }, acceptAll: () => { saveConsent(true, true); setPreferencesOpen(false); }, rejectNonEssential: () => { saveConsent(false, false); setPreferencesOpen(false); } };
  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
};
