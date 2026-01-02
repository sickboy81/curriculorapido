import React, { useEffect, useRef } from 'react';

interface AdPlaceholderProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  label?: string;
}

// Declaração global para TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// IMPORTANTE: Defina como true apenas após a aprovação do AdSense
const ADSENSE_APPROVED = false; // Mude para true quando o site for aprovado

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ 
  slotId, 
  format = "auto",
  className = "",
  label = "Publicidade"
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const adClient = "ca-pub-7650087188632188";

  useEffect(() => {
    // Só carrega anúncios se o AdSense estiver aprovado e houver slotId
    if (!ADSENSE_APPROVED || !slotId || typeof window === 'undefined') return;

    const initializeAd = () => {
      try {
        // Verifica se o script do AdSense está carregado
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }

        // Inicializa o anúncio apenas uma vez
        if (adRef.current && !adRef.current.querySelector('.adsbygoogle')) {
          // Cria o elemento ins para o anúncio
          const ins = document.createElement('ins');
          ins.className = 'adsbygoogle';
          ins.style.display = 'block';
          ins.setAttribute('data-ad-client', adClient);
          ins.setAttribute('data-ad-slot', slotId);
          ins.setAttribute('data-ad-format', format);
          ins.setAttribute('data-full-width-responsive', 'true');
          
          adRef.current.appendChild(ins);
          
          // Inicializa o anúncio
          window.adsbygoogle.push({});
        }
      } catch (error) {
        console.error('Erro ao carregar anúncio AdSense:', error);
      }
    };

    // Se o script já está carregado, inicializa imediatamente
    if (window.adsbygoogle) {
      initializeAd();
    } else {
      // Aguarda o carregamento do script
      const checkScript = setInterval(() => {
        if (window.adsbygoogle) {
          clearInterval(checkScript);
          initializeAd();
        }
      }, 100);

      // Timeout após 5 segundos
      setTimeout(() => {
        clearInterval(checkScript);
      }, 5000);
    }
  }, [slotId, format, adClient]);

  // Se o AdSense não estiver aprovado, não mostra nada para evitar violações
  if (!ADSENSE_APPROVED) {
    // Não renderiza nada enquanto aguarda aprovação
    // Isso evita tentar exibir anúncios antes da aprovação (violação de política)
    return null;
  }

  // Se não houver slotId após aprovação, mostra placeholder
  if (!slotId) {
    return (
      <div className={`w-full bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 p-4 min-h-[100px] overflow-hidden ${className}`}>
        <span className="text-xs font-bold uppercase tracking-widest mb-1">{label}</span>
        <span className="text-[10px] text-center px-4">
          Configure o slotId para exibir anúncios do AdSense
        </span>
      </div>
    );
  }

  return (
    <div 
      ref={adRef} 
      className={`w-full ${className}`}
      style={{ minHeight: format === 'rectangle' ? '250px' : '100px' }}
    >
      {/* O elemento ins será inserido aqui pelo useEffect */}
    </div>
  );
};