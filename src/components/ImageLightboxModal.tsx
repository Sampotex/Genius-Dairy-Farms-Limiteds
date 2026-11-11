import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ExternalLink,
} from 'lucide-react';
import { useBrandMedia } from '../context/BrandMediaContext';

export const ImageLightboxModal: React.FC = () => {
  const {
    isLightboxOpen,
    lightboxAsset,
    lightboxIndex,
    lightboxTotal,
    closeLightbox,
    nextLightbox,
    prevLightbox,
  } = useBrandMedia();

  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reset zoom on slide change
  useEffect(() => {
    setZoom(1);
  }, [lightboxAsset?.id]);

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevLightbox();
      } else if (e.key === '+' || e.key === '=') {
        setZoom((z) => Math.min(3, z + 0.25));
      } else if (e.key === '-') {
        setZoom((z) => Math.max(0.5, z - 0.25));
      } else if (e.key === '0') {
        setZoom(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, closeLightbox, nextLightbox, prevLightbox]);

  const handleCopyLink = useCallback(async () => {
    if (!lightboxAsset) return;
    try {
      const fullUrl = window.location.origin + lightboxAsset.url;
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }, [lightboxAsset]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  if (!isLightboxOpen || !lightboxAsset) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        id="website-image-lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col select-none"
        role="dialog"
        aria-modal="true"
        aria-label={lightboxAsset.title || 'Image Preview'}
      >
        {/* Top Control Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-black/70 border-b border-white/10 flex items-center justify-between text-white shrink-0 z-20">
          {/* Left Title & Counter */}
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <span className="px-2.5 py-1 rounded-full bg-[#C89D4B] text-[#0A1C14] text-[11px] font-bold uppercase tracking-wider shrink-0">
              {lightboxAsset.category || 'Farm Gallery'}
            </span>
            <div className="min-w-0">
              <h2 className="font-heading font-bold text-sm sm:text-base text-white truncate max-w-xs sm:max-w-md md:max-w-xl">
                {lightboxAsset.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-white/60 font-mono">
                <span>
                  Photo {lightboxIndex + 1} of {lightboxTotal}
                </span>
                {lightboxAsset.aspectRatio && (
                  <>
                    <span>•</span>
                    <span>{lightboxAsset.aspectRatio}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-xl p-1 border border-white/10">
              <button
                type="button"
                id="lightbox-zoom-out-btn"
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono px-2 text-white/80 min-w-[44px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                id="lightbox-zoom-in-btn"
                onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              {zoom !== 1 && (
                <button
                  type="button"
                  id="lightbox-zoom-reset-btn"
                  onClick={() => setZoom(1)}
                  className="text-[10px] font-bold px-2 py-1 text-[#C89D4B] hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Copy Link */}
            <button
              type="button"
              id="lightbox-copy-btn"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/15 transition-colors cursor-pointer"
              title="Copy photo link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-white/80" />
                  <span className="hidden sm:inline">Copy Link</span>
                </>
              )}
            </button>

            {/* Download Full-Res */}
            <a
              id="lightbox-download-btn"
              href={lightboxAsset.url}
              download={lightboxAsset.filename || 'genius-dairy-photo.jpg'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C89D4B] hover:bg-[#B38938] text-[#0D261B] text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
              title="Download full resolution photo"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* External Tab */}
            <a
              id="lightbox-external-btn"
              href={lightboxAsset.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer hidden md:flex items-center justify-center"
              title="Open full resolution in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Toggle Browser Fullscreen */}
            <button
              type="button"
              id="lightbox-fullscreen-toggle"
              onClick={toggleFullscreen}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer hidden sm:flex items-center justify-center"
              title="Toggle fullscreen view"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              id="lightbox-close-btn"
              onClick={closeLightbox}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors cursor-pointer ml-1"
              title="Close Preview (Esc)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Central Stage */}
        <div className="flex-1 relative flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Previous Button */}
          {lightboxTotal > 1 && (
            <button
              type="button"
              id="lightbox-prev-btn"
              onClick={prevLightbox}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Previous photo (Left Arrow)"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          )}

          {/* Next Button */}
          {lightboxTotal > 1 && (
            <button
              type="button"
              id="lightbox-next-btn"
              onClick={nextLightbox}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Next photo (Right Arrow)"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          )}

          {/* Image Display */}
          <div className="max-w-full max-h-full flex items-center justify-center overflow-auto p-2">
            <motion.img
              key={lightboxAsset.id + lightboxAsset.url}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: zoom, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightboxAsset.url}
              alt={lightboxAsset.title}
              className="max-h-[70vh] sm:max-h-[74vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-200"
              referrerPolicy="no-referrer"
              style={{
                cursor: zoom > 1 ? 'grab' : 'zoom-in',
              }}
              onClick={() => {
                if (zoom === 1) setZoom(1.75);
                else setZoom(1);
              }}
            />
          </div>
        </div>

        {/* Bottom Details Footer */}
        <div className="px-4 sm:px-8 py-3.5 bg-black/80 border-t border-white/10 shrink-0 z-20">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-3xl">
              <span className="font-semibold text-white mr-1.5">{lightboxAsset.title}:</span>
              <span>{lightboxAsset.description}</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-white/50 shrink-0 font-medium">
              <span className="hidden sm:inline">Use Arrow Keys (← →) to navigate</span>
              <span className="hidden sm:inline">•</span>
              <span>Click photo to toggle zoom</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
