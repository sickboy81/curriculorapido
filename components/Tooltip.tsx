import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    let top = 0;
    let left = 0;

    // Espaçamento entre o ícone e o tooltip
    const gap = 8;

    switch (position) {
      case 'top':
        top = rect.top + scrollY;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + scrollY + gap;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case 'left':
        top = rect.top + scrollY + rect.height / 2;
        left = rect.left + scrollX;
        break;
      case 'right':
        // Posiciona verticalmente no centro do ícone
        top = rect.top + scrollY + rect.height / 2;
        // Posiciona horizontalmente logo após o ícone
        left = rect.right + scrollX + gap;
        break;
    }

    setCoords({ top, left });
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
    updatePosition();
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const tooltipContent = isVisible && (
    <div
      role="tooltip"
      className="fixed z-[99999] px-3 py-2 text-xs text-white bg-slate-900 rounded-lg shadow-xl whitespace-nowrap pointer-events-none"
      style={{
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        transform: position === 'right' ? 'translateY(-50%)' : 
                   position === 'left' ? 'translate(-100%, -50%)' :
                   position === 'bottom' ? 'translateX(-50%)' :
                   'translate(-50%, calc(-100% - 8px))',
      }}
    >
      {content}
    </div>
  );

  return (
    <>
      <span
        ref={triggerRef}
        className={`inline-block ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
      {isVisible && createPortal(tooltipContent, document.body)}
    </>
  );
};
