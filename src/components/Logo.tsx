import React, { useState, useEffect } from 'react';
import { useBrandMedia } from '../context/BrandMediaContext';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: 'dark' | 'light';
  variant?: 'circular' | 'badge';
  withReplaceButton?: boolean;
  onLogoClick?: (e: React.MouseEvent) => void;
}

const sizeClasses = {
  xs: 'w-7 h-7',
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-28 h-28',
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'sm',
  showText = false,
  textColor = 'dark',
  variant = 'circular',
  withReplaceButton = false,
  onLogoClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const { logoUrl, isCustomLogo } = useBrandMedia();

  // Ensure new uploaded logo displays immediately
  useEffect(() => {
    setImageError(false);
  }, [logoUrl]);

  const handleEmblemClick = (e: React.MouseEvent) => {
    if (onLogoClick) {
      e.preventDefault();
      e.stopPropagation();
      onLogoClick(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (onLogoClick) {
        e.preventDefault();
        e.stopPropagation();
        onLogoClick(e as unknown as React.MouseEvent);
      }
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official Circular Logo Emblem */}
      <div className="relative inline-block">
        <div
          role={onLogoClick ? 'button' : undefined}
          tabIndex={onLogoClick ? 0 : undefined}
          onClick={handleEmblemClick}
          onKeyDown={handleKeyDown}
          title="Genius Dairy Farms Limited"
          aria-label="Genius Dairy Farms Limited Official Logo"
          className={`group/logo relative ${sizeClasses[size]} shrink-0 rounded-full overflow-hidden bg-white shadow-xs border ${
            isCustomLogo ? 'border-[#C89D4B] ring-1 ring-[#C89D4B]/60' : 'border-[#143727]/15'
          } flex items-center justify-center transition-all ${
            onLogoClick ? 'cursor-pointer hover:scale-105 hover:ring-2 hover:ring-[#C89D4B]' : ''
          } focus:outline-hidden`}
        >
          {!imageError ? (
            <img
              src={logoUrl || '/logo.jpg'}
              alt="Genius Dairy Farms Limited Official Logo"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/logo.jpg') && !target.src.endsWith('/genius-dairy-logo.jpg')) {
                  target.src = '/logo.jpg';
                } else if (target.src.endsWith('/logo.jpg') && !target.src.endsWith('/genius-dairy-logo.jpg')) {
                  target.src = '/genius-dairy-logo.jpg';
                } else {
                  setImageError(true);
                }
              }}
              referrerPolicy="no-referrer"
            />
          ) : (
            /* SVG Vector Fallback maintaining visual fidelity */
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full p-1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Sky */}
              <circle cx="100" cy="100" r="94" fill="#EBF4F0" stroke="#143727" strokeWidth="4" />
              {/* Green Top Leaves */}
              <path
                d="M92 28 C80 18 84 8 96 14 C100 22 96 26 92 28 Z"
                fill="#2E7D32"
              />
              <path
                d="M108 28 C120 18 116 8 104 14 C100 22 104 26 108 28 Z"
                fill="#388E3C"
              />
              {/* Green Pasture Mound */}
              <path
                d="M15 130 Q100 95 185 130 L185 190 L15 190 Z"
                fill="#388E3C"
              />
              {/* Dairy Cow Silhouette in Pasture */}
              <path
                d="M70 115 C75 110 82 108 90 108 C100 108 108 106 118 107 C122 108 126 112 128 116 L128 132 L122 132 L121 122 L105 122 L104 132 L98 132 L99 122 L86 122 L84 132 L78 132 L80 118 C76 118 72 116 70 115 Z"
                fill="#1B2620"
              />
              {/* White Holstein patch */}
              <circle cx="102" cy="114" r="5" fill="#FFFFFF" />
              {/* Milk Bottle & Jug */}
              <rect x="130" y="112" width="8" height="18" rx="2" fill="#FFFFFF" stroke="#143727" strokeWidth="1.5" />
              <path d="M142 118 Q148 118 148 124 Q148 130 142 130 Z" fill="#2E7D32" />
              {/* Arched Company Ribbon */}
              <path
                d="M30 152 Q100 138 170 152 L166 174 Q100 160 34 174 Z"
                fill="#143727"
                stroke="#C89D4B"
                strokeWidth="1.5"
              />
              <text
                x="100"
                y="167"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="10"
                fontWeight="bold"
                letterSpacing="1"
              >
                DAIRY FARMS LTD
              </text>
              <text
                x="100"
                y="55"
                textAnchor="middle"
                fill="#151A18"
                fontSize="16"
                fontWeight="900"
                letterSpacing="2"
              >
                GENIUS
              </text>
            </svg>
          )}

        </div>
      </div>

      {showText && (
        <div className="flex items-center gap-2">
          <div>
            <div
              className={`font-heading font-extrabold text-base sm:text-lg tracking-tight leading-tight ${
                textColor === 'light' ? 'text-white' : 'text-[#151A18]'
              }`}
            >
              GENIUS DAIRY FARMS
            </div>
            <div
              className={`text-[10px] tracking-[0.2em] font-semibold uppercase ${
                textColor === 'light' ? 'text-[#C89D4B]' : 'text-[#667069]'
              }`}
            >
              Limited • Established 2009
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
