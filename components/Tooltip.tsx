import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'right',
  className = '',
}) => {
  const [show, setShow] = useState(false);

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ position: 'relative' }}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          className="absolute z-[9999] px-2 py-1 text-xs text-white bg-slate-800 rounded shadow-lg whitespace-nowrap"
          style={{
            left: position === 'right' ? 'calc(100% + 6px)' : undefined,
            right: position === 'left' ? 'calc(100% + 6px)' : undefined,
            top: position === 'right' || position === 'left' ? '50%' : undefined,
            transform: position === 'right' || position === 'left' ? 'translateY(-50%)' : 
                       position === 'bottom' ? 'translateX(-50%)' : 'translateX(-50%)',
            bottom: position === 'top' ? 'calc(100% + 6px)' : undefined,
            top: position === 'bottom' ? 'calc(100% + 6px)' : undefined,
            left: position === 'top' || position === 'bottom' ? '50%' : undefined,
            pointerEvents: 'none',
          }}
        >
          {content}
        </span>
      )}
    </span>
  );
};
