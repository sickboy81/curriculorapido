import React, { useEffect, useRef } from 'react';
import { useConsent } from '../utils/consent';

type AdPlacement = 'editor' | 'preview' | 'footer' | 'guide';

interface AdPlaceholderProps {
  placement: AdPlacement;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_ENABLED = import.meta.env.VITE_ADSENSE_ENABLED === 'true';
const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT?.trim();
const AD_SLOTS: Record<AdPlacement, string | undefined> = {
  editor: import.meta.env.VITE_ADSENSE_EDITOR_SLOT?.trim(),
  preview: import.meta.env.VITE_ADSENSE_PREVIEW_SLOT?.trim(),
  footer: import.meta.env.VITE_ADSENSE_FOOTER_SLOT?.trim(),
  guide: import.meta.env.VITE_ADSENSE_GUIDE_SLOT?.trim(),
};
const VALID_SLOT = /^\d{6,}$/;

const getSlotId = (placement: AdPlacement) => AD_SLOTS[placement];

const loadAdSenseScript = () => new Promise<void>((resolve, reject) => {
  const existing = document.querySelector<HTMLScriptElement>('script[src*="pagead/js/adsbygoogle.js"]');
  if (existing) {
    if (existing.dataset.loaded === 'true' || window.adsbygoogle) resolve();
    else {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('AdSense script failed to load')), { once: true });
    }
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.dataset.adsenseLoader = 'true';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT!)}`;
  script.addEventListener('load', () => {
    script.dataset.loaded = 'true';
    resolve();
  }, { once: true });
  script.addEventListener('error', () => reject(new Error('AdSense script failed to load')), { once: true });
  document.head.appendChild(script);
});

/**
 * Slots are enabled only with a valid approved AdSense configuration. Keep a
 * clear visual separation from editor controls and download actions.
 */
export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ placement, className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const { consent } = useConsent();
  const slotId = getSlotId(placement);
  const isConfigured = Boolean(consent?.advertising) && ADSENSE_ENABLED && Boolean(ADSENSE_CLIENT) && Boolean(slotId && VALID_SLOT.test(slotId));

  useEffect(() => {
    if (!isConfigured || !slotId || !adRef.current) return;

    let cancelled = false;
    loadAdSenseScript()
      .then(() => {
        if (cancelled || !adRef.current || adRef.current.dataset.initialized === 'true') return;
        const ins = document.createElement('ins');
        ins.className = 'adsbygoogle';
        ins.style.display = 'block';
        ins.setAttribute('data-ad-client', ADSENSE_CLIENT!);
        ins.setAttribute('data-ad-slot', slotId);
        ins.setAttribute('data-ad-format', 'auto');
        ins.setAttribute('data-full-width-responsive', 'true');
        adRef.current.appendChild(ins);
        adRef.current.dataset.initialized = 'true';
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      })
      .catch(() => {
        // Ad delivery must never break the editorial page or the application.
      });

    return () => {
      cancelled = true;
    };
  }, [isConfigured, slotId]);

  if (!isConfigured) return null;

  return (
    <aside aria-label="Publicidade" className={`w-full ${className}`}>
      <p className="mb-2 text-center text-xs font-medium uppercase tracking-widest text-slate-400">Publicidade</p>
      <div ref={adRef} className="min-h-[100px]" />
    </aside>
  );
};
