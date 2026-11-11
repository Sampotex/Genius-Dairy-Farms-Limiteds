import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Maximize2,
  Camera,
  Check,
  HardDrive,
  RefreshCw,
  Folder,
  Layers,
} from 'lucide-react';
import { useFounderPhoto } from '../context/FounderPhotoContext';
import { useBrandMedia } from '../context/BrandMediaContext';
import { FOUNDER_IMAGE_BASE64, FOUNDER_PORTRAIT_BASE64 } from '../data/founderImageFallback';
import { Logo } from './Logo';

interface FounderProfileCardProps {
  className?: string;
  variant?: 'full' | 'compact';
}

export const FounderProfileCard: React.FC<FounderProfileCardProps> = ({
  className = '',
  variant = 'full',
}) => {
  const { photoUrl, setPhotoFromUrl } = useFounderPhoto();
  const { getImage, openLightbox, replaceMediaFromDataUrl } = useBrandMedia();

  // Reference for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active founder candidate
  const candidateUrl = getImage('founder');
  const [selectedPhotoChoice, setSelectedPhotoChoice] = useState<'md' | 'portrait' | 'custom'>(
    candidateUrl && candidateUrl.includes('founder-portrait') ? 'portrait' : 'md'
  );

  // Staged custom upload state
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [stagedPreview, setStagedPreview] = useState<string | null>(null);
  const [isSavingToDisk, setIsSavingToDisk] = useState<boolean>(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Resolve current active photo URL
  const effectivePhotoUrl =
    stagedPreview ||
    (selectedPhotoChoice === 'portrait' ? '/founder-portrait.jpg' : candidateUrl || '/founder.jpg') ||
    FOUNDER_IMAGE_BASE64;

  // Handle switching between uploaded photos
  const handleSelectPredefined = async (choice: 'md' | 'portrait') => {
    setSelectedPhotoChoice(choice);
    setStagedFile(null);
    setStagedPreview(null);
    const chosenUrl = choice === 'portrait' ? '/founder-portrait.jpg' : '/founder.jpg';
    setPhotoFromUrl(chosenUrl);
    await replaceMediaFromDataUrl('founder', chosenUrl);
  };

  // Handle file select from user's device
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setStagedFile(file);
    setStagedPreview(preview);
    setSelectedPhotoChoice('custom');
    setSaveSuccessMessage(null);
  };

  // Save selected or uploaded photo directly to public server disk
  const handleSaveToPublicServer = async () => {
    setIsSavingToDisk(true);
    setSaveSuccessMessage(null);

    try {
      let dataUrlToSave = '';

      if (stagedFile) {
        const reader = new FileReader();
        dataUrlToSave = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('Failed reading image file'));
          reader.readAsDataURL(stagedFile);
        });
      } else {
        // Saving the selected predefined photo as the active public/founder.jpg
        dataUrlToSave = selectedPhotoChoice === 'portrait' ? FOUNDER_PORTRAIT_BASE64 : FOUNDER_IMAGE_BASE64;
      }

      const res = await fetch('/api/upload-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotKey: 'founder',
          filename: 'founder.jpg',
          dataUrl: dataUrlToSave,
          title: 'Founder & Managing Director (Moyosore Olatunde Rafiu)',
          category: 'Brand & Identity',
          description: 'Authentic photograph of Founder & Managing Director Moyosore Olatunde Rafiu.',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed writing to public/founder.jpg on server disk');
      }

      // Update live context
      setPhotoFromUrl('/founder.jpg');
      await replaceMediaFromDataUrl('founder', '/founder.jpg');
      setStagedFile(null);
      setStagedPreview(null);

      setSaveSuccessMessage('✓ Saved permanently to public/founder.jpg on public server!');
      setTimeout(() => setSaveSuccessMessage(null), 4500);
    } catch (err: any) {
      alert(`Could not save to public server: ${err.message}`);
    } finally {
      setIsSavingToDisk(false);
    }
  };

  return (
    <div
      id="founder-profile-card-container"
      className={`relative rounded-2xl overflow-hidden border border-[#D5D1C4] shadow-lg bg-white ring-1 ring-black/5 hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Main Portrait Image displaying the inserted photo */}
      <div
        onClick={() => openLightbox('founder')}
        className="relative overflow-hidden bg-[#151A18]/5 group/founder-img cursor-pointer"
        title="Click to preview Founder & Managing Director portrait in high-resolution fullscreen"
      >
        <img
          id="founder-portrait-image"
          src={effectivePhotoUrl}
          alt="Founder & Managing Director Moyosore Olatunde Rafiu, Genius Dairy Farms Limited"
          className={`w-full ${
            variant === 'compact' ? 'h-80 sm:h-96' : 'h-[460px] sm:h-[520px]'
          } object-cover object-top sm:object-[center_18%] transition-transform duration-500 group-hover/founder-img:scale-[1.02]`}
          style={{ objectPosition: 'center 18%' }}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== FOUNDER_IMAGE_BASE64) {
              target.src = FOUNDER_IMAGE_BASE64;
            }
          }}
        />

        {/* Hover preview indicator */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/founder-img:opacity-100 transition-opacity flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-[#151A18] text-xs font-bold rounded-full shadow-md">
            <Maximize2 className="w-3.5 h-3.5 text-[#143727]" />
            <span>Click to Preview Fullscreen</span>
          </span>
        </div>

        {/* Gradient vignette for executive elegance */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70 pointer-events-none" />

        {/* Top action strip: Founder & Managing Director tag */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 bg-[#143727]/90 backdrop-blur-md text-[#C89D4B] text-[11px] font-bold rounded-full border border-[#C89D4B]/40 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#C89D4B]" />
            <span>Founder &amp; Managing Director</span>
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 hover:bg-white text-[#143727] hover:text-[#0D261B] text-[11px] font-bold rounded-full shadow-md transition-all cursor-pointer border border-[#143727]/20"
            title="Upload or change Founder & Managing Director photo"
          >
            <Camera className="w-3 h-3 text-[#C89D4B]" />
            <span>Change Photo</span>
          </button>
        </div>

        {/* Bottom overlay: Quick Photo Switcher Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md p-2 rounded-xl border border-white/20 text-white flex flex-wrap items-center justify-between gap-2 shadow-lg"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-white/70 font-semibold uppercase tracking-wider hidden sm:inline-block">
              Photo:
            </span>
            <button
              type="button"
              onClick={() => handleSelectPredefined('md')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                selectedPhotoChoice === 'md' && !stagedPreview
                  ? 'bg-[#C89D4B] text-[#0A1C14] shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Switch to original uploaded on-site photo (855 KB)"
            >
              Farm Photo (Uploaded)
            </button>
            <button
              type="button"
              onClick={() => handleSelectPredefined('portrait')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                selectedPhotoChoice === 'portrait' && !stagedPreview
                  ? 'bg-[#C89D4B] text-[#0A1C14] shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Switch to uploaded executive portrait (750 KB)"
            >
              Portrait
            </button>
          </div>

          {/* If custom photo staged or switched, allow saving directly to public server */}
          {stagedPreview ? (
            <button
              type="button"
              onClick={handleSaveToPublicServer}
              disabled={isSavingToDisk}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#16A34A] hover:bg-[#15803D] text-white text-[11px] font-bold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {isSavingToDisk ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                <HardDrive className="w-3 h-3" />
              )}
              <span>{isSavingToDisk ? 'Saving...' : 'Save to Public Server'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 text-[10px] text-[#C89D4B] font-mono">
              <Folder className="w-3 h-3 shrink-0" />
              <span>public/founder.jpg</span>
            </div>
          )}
        </div>
      </div>

      {/* Success Notification Bar */}
      {saveSuccessMessage && (
        <div className="bg-[#DCFCE7] text-[#166534] border-t border-[#86EFAC] px-4 py-2 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-[#16A34A] shrink-0" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

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
