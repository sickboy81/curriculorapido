import React, { useState, useRef, useEffect } from 'react';
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

    switch (position) {
      case 'top':
        top = rect.top + scrollY - 8;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + scrollY + 8;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case 'left':
        top = rect.top + scrollY + rect.height / 2;
        left = rect.left + scrollX - 8;
        break;
      case 'right':
        top = rect.top + scrollY + rect.height / 2;
        left = rect.right + scrollX + 8;
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

  const getTransformClasses = () => {
    switch (position) {
      case 'top':
        return '-translate-x-1/2 -translate-y-full';
      case 'bottom':
        return '-translate-x-1/2';
      case 'left':
        return '-translate-x-full -translate-y-1/2';
      case 'right':
        return '-translate-y-1/2';
      default:
        return '-translate-x-1/2 -translate-y-full';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 -translate-x-1/2 -mt-[3px] border-l-transparent border-r-transparent border-b-transparent border-t-slate-900';
      case 'bottom':
        return 'bottom-full left-1/2 -translate-x-1/2 -mb-[3px] border-l-transparent border-r-transparent border-t-transparent border-b-slate-900';
      case 'left':
        return 'left-full top-1/2 -translate-y-1/2 -ml-[3px] border-t-transparent border-b-transparent border-r-transparent border-l-slate-900';
      case 'right':
        return 'right-full top-1/2 -translate-y-1/2 -mr-[3px] border-t-transparent border-b-transparent border-l-transparent border-r-slate-900';
      default:
        return 'top-full left-1/2 -translate-x-1/2 -mt-[3px] border-l-transparent border-r-transparent border-b-transparent border-t-slate-900';
    }
  };

  const tooltipContent = isVisible && (
    <div
      role="tooltip"
      className={`fixed z-[99999] px-3 py-1.5 text-xs text-white bg-slate-900 rounded-lg shadow-xl whitespace-nowrap pointer-events-none ${getTransformClasses()}`}
      style={{
        top: `${coords.top}px`,
        left: `${coords.left}px`,
      }}
    >
      {content}
      <span className={`absolute w-0 h-0 border-[5px] ${getArrowClasses()}`} />
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
