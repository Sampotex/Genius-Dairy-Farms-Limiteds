import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Video,
  Play,
  Pause,
  RotateCcw,
  Check,
  AlertCircle,
  Sparkles,
  Smartphone,
  Link2,
  FileVideo,
  Image as ImageIcon,
  Info,
} from 'lucide-react';
import {
  saveDroneVideoFile,
  saveDroneVideoUrl,
  loadDroneVideo,
  resetDroneVideo,
  DroneVideoMeta,
  DEFAULT_DRONE_VIDEO,
} from '../utils/droneVideoStorage';
import { useBrandMedia } from '../context/BrandMediaContext';

interface UploadEagleVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoUploaded?: (videoUrl: string) => void;
  onImageUploaded?: (imageUrl: string) => void;
}

export const UploadEagleVideoModal: React.FC<UploadEagleVideoModalProps> = ({
  isOpen,
  onClose,
  onVideoUploaded,
  onImageUploaded,
}) => {
  const { replaceMediaFromFile, customSlots, resetMediaSlot, getImage } = useBrandMedia();

  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [currentMeta, setCurrentMeta] = useState<DroneVideoMeta | null>(null);
  const [isCurrentCustomVideo, setIsCurrentCustomVideo] = useState<boolean>(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>(DEFAULT_DRONE_VIDEO);

  // Staging state
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [stagedPreviewUrl, setStagedPreviewUrl] = useState<string | null>(null);
  const [stagedKind, setStagedKind] = useState<'video' | 'image' | null>(null);
  const [videoUrlInput, setVideoUrlInput] = useState<string>('');

  // UI state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Preview video element
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasCustomAerialPhoto = !!customSlots.eagleViewFarm;

  // Load existing state when opened
  useEffect(() => {
    if (!isOpen) return;

    loadDroneVideo().then(({ url, isCustom, meta }) => {
      setCurrentVideoUrl(url);
      setIsCurrentCustomVideo(isCustom);
      setCurrentMeta(meta);
    }).catch(() => {
      // Handled silently
    });

    setStagedFile(null);
    setStagedPreviewUrl(null);
    setStagedKind(null);
    setVideoUrlInput('');
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsPreviewPlaying(false);
  }, [isOpen]);

  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      if (stagedPreviewUrl && stagedPreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(stagedPreviewUrl);
      }
    };
  }, [stagedPreviewUrl]);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const isImage =
      file.type.startsWith('image/') ||
      /\.(jpe?g|png|webp|gif|bmp|heic|heif|svg)$/i.test(file.name);

    const isVideo =
      file.type.startsWith('video/') ||
      /\.(mp4|webm|mov|m4v|ogg|ogv|mkv|3gp)$/i.test(file.name) ||
      (!isImage && (file.type === '' || file.type === 'application/octet-stream'));

    if (!isImage && !isVideo) {
      setErrorMessage('Please select a valid video file (MP4, MOV, WebM) or aerial image (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > 500 * 1024 * 1024) {
      setErrorMessage('File size is larger than 500MB. Please choose a slightly smaller or compressed file.');
      return;
    }

    if (stagedPreviewUrl && stagedPreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(stagedPreviewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setStagedFile(file);
    setStagedPreviewUrl(objectUrl);
    setStagedKind(isImage ? 'image' : 'video');
    setIsPreviewPlaying(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
    e.target.value = '';
  };

  const handleApplyStagedFile = async () => {
    if (!stagedFile || !stagedKind) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (stagedKind === 'image') {
        // Save as Eagle View custom aerial photo
        const savedUrl = await replaceMediaFromFile('eagleViewFarm', stagedFile);
        setSuccessMessage('✓ Eagle View aerial photo saved! It is now active as the aerial visual across the site.');
        onImageUploaded?.(savedUrl);

        setTimeout(() => {
          onClose();
        }, 1600);
      } else {
        // Save as Eagle View custom drone video
        const result = await saveDroneVideoFile(stagedFile);
        setIsCurrentCustomVideo(true);
        setCurrentMeta(result.meta);
        setCurrentVideoUrl(result.url);
        setSuccessMessage('✓ Drone video saved! It is now playing live in the Eagle View section.');
        onVideoUploaded?.(result.url);

        setTimeout(() => {
          onClose();
        }, 1600);
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Could not save file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyUrl = async () => {
    if (!videoUrlInput.trim()) {
      setErrorMessage('Please enter a valid video link.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await saveDroneVideoUrl(videoUrlInput.trim());
      setIsCurrentCustomVideo(true);
      setCurrentMeta(result.meta);
      setCurrentVideoUrl(result.url);
      setSuccessMessage('✓ Drone video link applied to Eagle View section!');
      onVideoUploaded?.(result.url);

      setTimeout(() => {
        onClose();
      }, 1600);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Could not save video URL.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetVideoToDefault = async () => {
    if (!window.confirm('Reset Eagle View to the default 4K farm tour video?')) {
      return;
    }

    setIsProcessing(true);
    try {
      await resetDroneVideo();
      setIsCurrentCustomVideo(false);
      setCurrentMeta(null);
      setCurrentVideoUrl(DEFAULT_DRONE_VIDEO);
      setStagedFile(null);
      setStagedPreviewUrl(null);
      setSuccessMessage('Reverted to default Eagle View farm video.');
      onVideoUploaded?.(DEFAULT_DRONE_VIDEO);
    } catch {
      setErrorMessage('Failed to reset video.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetPhotoToDefault = async () => {
    if (!window.confirm('Reset Eagle View aerial photo to default farm image?')) {
      return;
    }

    setIsProcessing(true);
    try {
      await resetMediaSlot('eagleViewFarm');
      setSuccessMessage('Reverted Eagle View photo to original farm aerial image.');
    } catch {
      setErrorMessage('Failed to reset photo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (!bytes || bytes === 0) return 'Unknown size';
    const mb = bytes / (1024 * 1024);
    if (mb >= 1) return `${mb.toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#0F2218] border border-[#2D6A4F] text-white rounded-xs shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0B1A13] border-b border-[#1E4D38] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1E4D38] border border-[#2D6A4F] flex items-center justify-center text-[#C89D4B]">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                Upload Eagle View Media
              </h3>
              <p className="text-xs text-[#9BB0A3] mt-0.5">
                Drone Aerial Footage & High-Res Photography • 60-Acre Dairy Facility, Iseyin
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#9BB0A3] hover:text-white hover:bg-white/10 rounded-xs transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Media Status Bar */}
        <div className="px-5 sm:px-6 py-3 bg-[#132C1F] border-b border-[#1E4D38] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[#9BB0A3]">Active Video:</span>
              {isCurrentCustomVideo ? (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#C89D4B]/20 text-[#C89D4B] border border-[#C89D4B]/40 rounded-xs font-semibold">
                  <Sparkles className="w-3 h-3" />
                  <span>Custom Video ({currentMeta?.name || 'Uploaded'})</span>
                  {currentMeta?.size ? ` • ${formatFileSize(currentMeta.size)}` : ''}
                </span>
              ) : (
                <span className="text-[#CBDDD2] font-medium">
                  Default 4K Farm Tour (/eagle-view-farm.mp4)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#9BB0A3]">Active Photo:</span>
              {hasCustomAerialPhoto ? (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/40 rounded-xs font-semibold">
                  <Sparkles className="w-3 h-3 text-[#C89D4B]" />
                  <span>Custom Aerial Photo Active</span>
                </span>
              ) : (
                <span className="text-[#9BB0A3]">Original Farm Aerial Image</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {isCurrentCustomVideo && (
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleResetVideoToDefault}
                className="inline-flex items-center gap-1 text-rose-300 hover:text-rose-200 hover:underline transition-colors cursor-pointer"
                title="Revert video to default"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Video</span>
              </button>
            )}

            {hasCustomAerialPhoto && (
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleResetPhotoToDefault}
                className="inline-flex items-center gap-1 text-rose-300 hover:text-rose-200 hover:underline transition-colors cursor-pointer"
                title="Revert photo to default"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Photo</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Toast / Alert Feedback */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-950/80 border border-rose-800 text-rose-200 rounded-xs text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 bg-emerald-950/80 border border-emerald-700 text-emerald-200 rounded-xs text-xs flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Mode Selector Tabs */}
          <div className="flex items-center border-b border-[#1E4D38] gap-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`pb-2.5 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'upload'
                  ? 'border-[#C89D4B] text-[#C89D4B]'
                  : 'border-transparent text-[#9BB0A3] hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Upload Video or Aerial Image</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`pb-2.5 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'url'
                  ? 'border-[#C89D4B] text-[#C89D4B]'
                  : 'border-transparent text-[#9BB0A3] hover:text-white'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Paste Video Web Link (URL)</span>
            </button>
          </div>

          {/* TAB 1: File Upload */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-m4v,video/*,image/jpeg,image/png,image/webp,image/heic,image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xs p-7 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                  isDragging
                    ? 'border-[#C89D4B] bg-[#1A3D2C]'
                    : 'border-[#2D6A4F] hover:border-[#C89D4B]/70 bg-[#0A1A12]/50 hover:bg-[#0E2319]'
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[#1E4D38] text-[#C89D4B] flex items-center justify-center shadow-lg">
                  <Upload className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-white">
                    Tap to Choose Video or Aerial Image
                  </h4>
                  <p className="text-xs text-[#9BB0A3] mt-1 max-w-md mx-auto">
                    Drag and drop your drone flight video or high-res aerial farm photo, or click to browse files on your phone or computer.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-[#143727] text-[#C89D4B] text-[10px] rounded-xs font-mono uppercase font-bold">
                    Videos: MP4, MOV, WEBM
                  </span>
                  <span className="px-2 py-0.5 bg-[#143727] text-emerald-300 text-[10px] rounded-xs font-mono uppercase font-bold">
                    Photos: JPG, PNG, WEBP
                  </span>
                </div>
              </div>

              {/* Staged File Preview Area */}
              {stagedPreviewUrl && stagedFile && (
                <div className="bg-[#0A1911] border border-[#2D6A4F] rounded-xs p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      {stagedKind === 'image' ? (
                        <ImageIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <FileVideo className="w-4 h-4 text-[#C89D4B] shrink-0" />
                      )}
                      <span className="text-xs font-semibold text-white truncate">
                        {stagedFile.name}
                      </span>
                      <span className="text-[11px] text-[#9BB0A3] font-mono shrink-0">
                        ({formatFileSize(stagedFile.size)})
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-xs font-semibold uppercase tracking-wider bg-white/10 text-white shrink-0">
                        {stagedKind === 'image' ? 'Aerial Image' : 'Drone Video'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setStagedFile(null);
                        setStagedPreviewUrl(null);
                        setStagedKind(null);
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 hover:underline cursor-pointer shrink-0"
                    >
                      Clear
                    </button>
                  </div>

                  {/* Preview Element: Image vs Video */}
                  {stagedKind === 'image' ? (
                    <div className="relative rounded-xs overflow-hidden border border-[#1E4D38] aspect-video bg-black flex items-center justify-center">
                      <img
                        src={stagedPreviewUrl}
                        alt="Staged aerial preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black/70 px-2.5 py-1 rounded-xs text-[11px] font-semibold text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#C89D4B]" />
                        <span>High-Resolution Aerial Image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-xs overflow-hidden border border-[#1E4D38] aspect-video bg-black">
                      <video
                        ref={previewVideoRef}
                        src={stagedPreviewUrl}
                        controls
                        playsInline
                        className="w-full h-full object-cover"
                        onPlay={() => setIsPreviewPlaying(true)}
                        onPause={() => setIsPreviewPlaying(false)}
                      />
                    </div>
                  )}

                  {/* Apply Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleApplyStagedFile}
                      className="w-full sm:flex-1 py-3 px-5 bg-[#C89D4B] hover:bg-[#B38938] text-[#0D261B] text-xs font-bold uppercase tracking-wider rounded-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#0D261B] border-t-transparent rounded-full animate-spin" />
                          <span>Saving to Farm Database...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>
                            {stagedKind === 'image'
                              ? 'Save Aerial Image for Eagle View'
                              : 'Apply Video to Eagle View Live'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Web Video URL */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#0A1911] border border-[#2D6A4F] rounded-xs space-y-3">
                <label className="block text-xs font-semibold text-white">
                  Direct Video Stream or Cloud Link URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    placeholder="https://example.com/aerial-drone-footage.mp4"
                    className="w-full bg-[#132C1F] border border-[#2D6A4F] rounded-xs py-2.5 px-3 text-xs text-white placeholder-[#637C70] focus:outline-none focus:border-[#C89D4B]"
                  />
                </div>
                <p className="text-[11px] text-[#9BB0A3] leading-relaxed">
                  Provide a direct link to an MP4 or WebM file hosted on a CDN, Cloud Storage, or public server.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    disabled={isProcessing || !videoUrlInput.trim()}
                    onClick={handleApplyUrl}
                    className="w-full py-2.5 px-4 bg-[#C89D4B] hover:bg-[#B38938] disabled:opacity-50 text-[#0D261B] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Apply Link to Eagle View</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Explanatory Info Box */}
          <div className="p-4 bg-[#143727]/50 border border-[#2D6A4F] rounded-xs flex items-start gap-3 text-xs text-[#9BB0A3]">
            <Info className="w-4 h-4 text-[#C89D4B] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Videos and aerial photos uploaded from your phone or computer are safely stored in your browser's persistent database and remain active across site navigation.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0B1A13] border-t border-[#1E4D38] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
