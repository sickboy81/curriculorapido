import React, { useEffect, useState } from 'react';
import { ConsentProvider, useConsent } from '../utils/consent';

declare global { interface Window { dataLayer?: any[]; gtag?: (...args: any[]) => void; } }

export const ConsentUi: React.FC = () => {
  const { consent, preferencesOpen, openPreferences, closePreferences, savePreferences, acceptAll, rejectNonEssential } = useConsent();
  const [analytics, setAnalytics] = useState(false); const [advertising, setAdvertising] = useState(false);
  useEffect(() => { setAnalytics(consent?.analytics ?? false); setAdvertising(consent?.advertising ?? false); }, [consent, preferencesOpen]);
  useEffect(() => {
    if (!consent?.analytics || document.querySelector('script[data-consent="analytics"]')) return;
    const script = document.createElement('script'); script.async = true; script.dataset.consent = 'analytics'; script.src = 'https://www.googletagmanager.com/gtag/js?id=G-9HMM1DR4JE';
    window.dataLayer = window.dataLayer || []; window.gtag = (...args: any[]) => window.dataLayer!.push(args); window.gtag('js', new Date()); window.gtag('config', 'G-9HMM1DR4JE'); document.head.appendChild(script);
  }, [consent?.analytics]);
  if (consent && !preferencesOpen) return null;
  const preferences = preferencesOpen || Boolean(consent);
  return <>
    {preferences && <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/50 p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="consent-title">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><h2 id="consent-title" className="text-xl font-bold text-slate-900">Preferências de privacidade</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">Escolha quais tecnologias podemos usar. O armazenamento necessário mantém o editor funcionando; Analytics e anúncios só são ativados com sua autorização.</p>
        <div className="mt-5 space-y-3"><label className="flex items-center justify-between rounded-lg border p-3"><span><strong className="block text-sm">Necessário</strong><small className="text-slate-500">Sempre ativo para segurança e funcionamento.</small></span><input type="checkbox" checked disabled aria-label="Necessário sempre ativo" /></label><label className="flex items-center justify-between rounded-lg border p-3"><span><strong className="block text-sm">Analytics</strong><small className="text-slate-500">Mede uso agregado para melhorar o site.</small></span><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} aria-label="Ativar Analytics" /></label><label className="flex items-center justify-between rounded-lg border p-3"><span><strong className="block text-sm">Publicidade</strong><small className="text-slate-500">Permite carregar anúncios do Google AdSense.</small></span><input type="checkbox" checked={advertising} onChange={e => setAdvertising(e.target.checked)} aria-label="Ativar publicidade" /></label></div>
        <div className="mt-6 flex flex-wrap justify-end gap-2"><button onClick={closePreferences} className="rounded-lg px-4 py-2 text-sm text-slate-600">Cancelar</button><button onClick={() => savePreferences(analytics, advertising)} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white">Salvar preferências</button></div>
      </div></div>}
    {!consent && !preferencesOpen && <div className="fixed inset-0 z-[110] flex items-end justify-center bg-slate-950/55 p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="consent-first-title"><div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-7"><div className="mb-4 inline-flex rounded-xl bg-violet-100 p-3 text-violet-700"><span aria-hidden="true" className="text-xl">🔒</span></div><h2 id="consent-first-title" className="text-2xl font-extrabold text-slate-900">Sua privacidade, sua escolha</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">O editor funciona com tecnologias necessárias. Analytics e publicidade permanecem desativados até você autorizar.</p><div className="mt-6 grid gap-2"><button onClick={acceptAll} className="rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white hover:bg-violet-700">Aceitar todos</button><button onClick={rejectNonEssential} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50">Recusar não essenciais</button><button onClick={openPreferences} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-violet-700 hover:bg-violet-50">Configurar preferências</button></div><p className="mt-4 text-center text-xs text-slate-500">Você pode alterar esta decisão pelo rodapé.</p></div></div>}
  </>;
};
export const ConsentManager: React.FC = () => <ConsentProvider><ConsentUi /></ConsentProvider>;
