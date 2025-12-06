import React from 'react';

interface AdPlaceholderProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  label?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ 
  slotId = "1234567890", 
  format = "auto",
  className = "",
  label = "Publicidade"
}) => {
  // Em produção, você substituiria este visual pelo script real do AdSense
  // Exemplo de como seria o script real:
  /*
  useEffect(() => {
     try {
       (window.adsbygoogle = window.adsbygoogle || []).push({});
     } catch (e) {}
  }, []);
  
  return (
     <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-SEU_ID_AQUI"
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"></ins>
  );
  */

  return (
    <div className={`w-full bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 p-4 min-h-[100px] overflow-hidden ${className}`}>
      <span className="text-xs font-bold uppercase tracking-widest mb-1">{label}</span>
      <span className="text-[10px] text-center px-4">
        O bloco de anúncio AdSense aparecerá aqui.<br/>
        (Slot: {slotId})
      </span>
    </div>
  );
};