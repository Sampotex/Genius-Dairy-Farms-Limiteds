import React from 'react';
import { Sparkles } from 'lucide-react';
import { useFounderPhoto } from '../context/FounderPhotoContext';
import { useBrandMedia } from '../context/BrandMediaContext';
import { FOUNDER_IMAGE_BASE64 } from '../data/founderImageFallback';
import { Logo } from './Logo';

interface FounderProfileCardProps {
  className?: string;
  variant?: 'full' | 'compact';
}

export const FounderProfileCard: React.FC<FounderProfileCardProps> = ({
  className = '',
  variant = 'full',
}) => {
  const { photoUrl, objectPosition, isCustom } = useFounderPhoto();
  const { getImage } = useBrandMedia();

  const effectivePhotoUrl = getImage('founder') || photoUrl || FOUNDER_IMAGE_BASE64;
  const effectiveIsCustom = isCustom;

  return (
    <div
      id="founder-profile-card-container"
      className={`relative rounded-2xl overflow-hidden border border-[#D5D1C4] shadow-lg bg-white ring-1 ring-black/5 hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Main Portrait Image displaying the inserted photo */}
      <div className="relative overflow-hidden bg-[#151A18]/5 group/founder-img">
        <img
          id="founder-portrait-image"
          src={effectivePhotoUrl || FOUNDER_IMAGE_BASE64}
          alt="Founder & Managing Director Moyosore Olatunde Rafiu, Genius Dairy Farms Limited"
          className={`w-full ${
            variant === 'compact' ? 'h-80 sm:h-96' : 'h-[480px] sm:h-[530px]'
          } object-cover transition-transform duration-500 group-hover/founder-img:scale-[1.03]`}
          style={{ objectPosition }}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== FOUNDER_IMAGE_BASE64) {
              target.src = FOUNDER_IMAGE_BASE64;
            }
          }}
        />

        {/* Gradient vignette for executive elegance */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Top action strip: Custom tag on left if custom */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          {effectiveIsCustom ? (
            <span className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 bg-[#143727]/90 backdrop-blur-md text-[#C89D4B] text-[11px] font-bold rounded-full border border-[#C89D4B]/40 shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>Custom Portrait</span>
            </span>
          ) : <div />}
        </div>
      </div>

      {/* Founder Details Bottom Footer */}
      <div className="p-6 border-t border-[#ECE8DE] flex items-center justify-between bg-gradient-to-b from-white to-[#FAF9F5]">
        <div>
          <div className="font-heading font-extrabold text-lg text-[#151A18] tracking-tight">
            Moyosore Olatunde Rafiu
          </div>
          <div className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider mt-0.5">
            Founder &amp; Managing Director
          </div>
          <div className="text-xs text-[#75827B] mt-1 font-medium">
            Genius Dairy Farms Limited (est. 2009)
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Logo size="md" className="shrink-0 shadow-xs rounded-full" />
        </div>
      </div>
    </div>
  );
};
