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
  position = 'right',
  className = '',
}) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  const updatePosition = () => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'right':
        top = rect.top + scrollY + rect.height / 2;
        left = rect.right + scrollX + 8;
        break;
      case 'left':
        top = rect.top + scrollY + rect.height / 2;
        left = rect.left + scrollX - 8;
        break;
      case 'top':
        top = rect.top + scrollY - 8;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + scrollY + 8;
        left = rect.left + scrollX + rect.width / 2;
        break;
      default:
        top = rect.top + scrollY + rect.height / 2;
        left = rect.right + scrollX + 8;
    }

    setCoords({ top, left });
  };

  useEffect(() => {
    if (show) {
      updatePosition();
    }
  }, [show, position]);

  return (
    <>
      <span 
        ref={ref}
        className={`relative inline-block ${className}`}
        onMouseEnter={() => {
          setShow(true);
          setTimeout(updatePosition, 0);
        }}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>
      {show && typeof document !== 'undefined' && createPortal(
        <span
          role="tooltip"
          className="fixed z-[99999] px-2 py-1 text-xs text-white bg-slate-800 rounded shadow-lg whitespace-nowrap pointer-events-none"
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            transform: position === 'right' || position === 'left' ? 'translateY(-50%)' : 'translateX(-50%)',
          }}
        >
          {content}
        </span>,
        document.body
      )}
    </>
  );
};
