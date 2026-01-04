import React, { useState, useRef } from 'react';

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
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (position) {
        case 'right':
          top = rect.top + rect.height / 2;
          left = rect.right + 8;
          break;
        case 'left':
          top = rect.top + rect.height / 2;
          left = rect.left - 8;
          break;
        case 'top':
          top = rect.top - 8;
          left = rect.left + rect.width / 2;
          break;
        case 'bottom':
          top = rect.bottom + 8;
          left = rect.left + rect.width / 2;
          break;
      }

      setPos({ top, left });
    }
    setShow(true);
  };

  const getTransform = () => {
    switch (position) {
      case 'right': return 'translateY(-50%)';
      case 'left': return 'translate(-100%, -50%)';
      case 'top': return 'translate(-50%, -100%)';
      case 'bottom': return 'translateX(-50%)';
      default: return 'translateY(-50%)';
    }
  };

  return (
    <>
      <span 
        ref={ref}
        className={`inline-flex ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>
      {show && (
        <div
          role="tooltip"
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            transform: getTransform(),
            zIndex: 99999,
            padding: '4px 8px',
            fontSize: '12px',
            color: 'white',
            backgroundColor: '#1e293b',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {content}
        </div>
      )}
    </>
  );
};
