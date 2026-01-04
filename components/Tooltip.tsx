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

  const getPositionStyle = () => {
    switch (position) {
      case 'right':
        return { left: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' };
      case 'left':
        return { right: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' };
      case 'top':
        return { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' };
      default:
        return { left: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' };
    }
  };

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          className="absolute z-[9999] px-2 py-1 text-xs text-white bg-slate-800 rounded shadow-lg whitespace-nowrap pointer-events-none"
          style={getPositionStyle()}
        >
          {content}
        </span>
      )}
    </span>
  );
};
