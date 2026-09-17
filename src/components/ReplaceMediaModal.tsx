import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  X,
  Upload,
  Camera,
  Check,
  RotateCcw,
  Sparkles,
  Smartphone,
  Layers,
  ShieldCheck,
  Trash2,
  Eye,
  RefreshCw,
  Search,
  Download,
  Link2,
  Grid,
  CheckCircle2,
  FileText,
  Video,
} from 'lucide-react';
import {
  useBrandMedia,
  MEDIA_SLOTS,
  ALL_CANONICAL_SLOT_KEYS,
  MediaSlotKey,
  MediaCategory,
} from '../context/BrandMediaContext';
import { UploadEagleVideoModal } from './UploadEagleVideoModal';

type ModalTab = 'batch' | 'all-grid' | 'single' | 'backup' | 'video';

export const ReplaceMediaModal: React.FC = () => {
  const {
    isReplaceModalOpen,
    activeModalSlot,
    closeReplaceModal,
    mediaUrls,
    getImage,
    customSlots,
    customSlotsCount,
    totalSlotsCount,
    replaceMediaFromFile,
    replaceMediaFromDataUrl,
    batchReplaceMedia,
    resetMediaSlot,
    resetAllMedia,
    exportImageBackup,
    importImageBackup,
  } = useBrandMedia();

  // Active view tab
  const [activeTab, setActiveTab] = useState<ModalTab>('all-grid');
  const [showEagleVideoModal, setShowEagleVideoModal] = useState<boolean>(false);

  // Single slot focus
  const [selectedSlot, setSelectedSlot] = useState<string>(activeModalSlot || 'hero');
  const [singleStagedFile, setSingleStagedFile] = useState<File | null>(null);
  const [singleStagedPreview, setSingleStagedPreview] = useState<string | null>(null);
  const [singleUrlInput, setSingleUrlInput] = useState<string>('');
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);

  // Search & Filter in All Grid view
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'custom' | 'default'>('all');

  // Batch Replace Studio state
  interface BatchItem {
    id: string;
    file: File;
    previewUrl: string;
    assignedSlot: string | null;
  }
  const [batchQueue, setBatchQueue] = useState<BatchItem[]>([]);
  const [batchDragActive, setBatchDragActive] = useState(false);

  // General feedback toasts & states
  const [isProcessing, setIsProcessing] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  // File input refs
  const singleGalleryInputRef = useRef<HTMLInputElement>(null);
  const singleCameraInputRef = useRef<HTMLInputElement>(null);
  const batchMultipleInputRef = useRef<HTMLInputElement>(null);
  const importBackupInputRef = useRef<HTMLInputElement>(null);
  const perCardInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Sync active slot on modal open
  useEffect(() => {
    if (isReplaceModalOpen) {
      if (activeModalSlot) {
        setSelectedSlot(activeModalSlot);
      }
      setSingleStagedFile(null);
      setSingleStagedPreview(null);
      setSingleUrlInput('');
      setShowUrlInput(false);
      setErrorToast(null);
    }
  }, [isReplaceModalOpen, activeModalSlot]);

  if (!isReplaceModalOpen) return null;

  const currentSlotDef = MEDIA_SLOTS[selectedSlot] || MEDIA_SLOTS['hero'];
  const currentActiveUrl = getImage(selectedSlot);
  const isSelectedCustom = Boolean(customSlots[selectedSlot]);

  // Categories list
  const categories: string[] = [
    'All',
    'Brand & Identity',
    'Home & Facilities',
    'Livestock & Operations',
    'Pasture & Agronomy',
    'Udderfall Dairy Foods',
    'Academy & Training',
    'Sustainability',
  ];

  // Filtered slots for All Images Grid
  const filteredSlots = ALL_CANONICAL_SLOT_KEYS.filter((key) => {
    const def = MEDIA_SLOTS[key];
    if (!def) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        def.name.toLowerCase().includes(q) ||
        def.shortLabel.toLowerCase().includes(q) ||
        def.description.toLowerCase().includes(q) ||
        def.locationUsed.toLowerCase().includes(q) ||
        def.category.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Category filter
    if (categoryFilter !== 'All' && def.category !== categoryFilter) {
      return false;
    }

    // Status filter
    const isCustom = Boolean(customSlots[key]);
    if (statusFilter === 'custom' && !isCustom) return false;
    if (statusFilter === 'default' && isCustom) return false;

    return true;
  });

  // Tolerant check for mobile photos
  const isImageFile = (file: File): boolean => {
    if (!file) return false;
    return (
      file.type.startsWith('image/') ||
      /\.(jpe?g|png|webp|gif|bmp|heic|heif|svg)$/i.test(file.name) ||
      file.type === '' ||
      file.type === 'application/octet-stream'
    );
  };

  // Immediate upload and save for single slot
  const handleDirectSlotUpload = async (slotKey: string, file: File) => {
    if (!isImageFile(file)) {
      setErrorToast('Please select a valid image file from your gallery.');
      return;
    }

    setIsProcessing(true);
    setErrorToast(null);
    const objectUrl = URL.createObjectURL(file);
    setSingleStagedPreview(objectUrl);
    setSingleStagedFile(file);

    try {
      await replaceMediaFromFile(slotKey, file);
      const slotDef = MEDIA_SLOTS[slotKey as MediaSlotKey];
      setSuccessToast(`✓ Updated ${slotDef?.name || slotKey} successfully! Now live across the website.`);
      setTimeout(() => setSuccessToast(null), 4000);
    } catch (err) {
      console.error('Failed to replace media:', err);
      setErrorToast(err instanceof Error ? err.message : 'Could not save photo. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle single file pick from gallery or camera
  const handleSingleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleDirectSlotUpload(selectedSlot, files[0]);
    }
    e.target.value = '';
  };

  // Direct card upload (immediate replacement from grid)
  const handleDirectCardUpload = async (slotKey: string, file: File) => {
    if (!isImageFile(file)) {
      setErrorToast('Please select a valid image file from your gallery.');
      return;
    }
    setIsProcessing(true);
    setErrorToast(null);
    try {
      await replaceMediaFromFile(slotKey, file);
      setSuccessToast(`✓ Updated ${MEDIA_SLOTS[slotKey as MediaSlotKey]?.shortLabel || slotKey} successfully! Live on website.`);
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err) {
      setErrorToast(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle single apply
  const handleApplySingle = async () => {
    if (singleUrlInput.trim()) {
      setIsProcessing(true);
      setErrorToast(null);
      try {
        await replaceMediaFromDataUrl(selectedSlot, singleUrlInput.trim());
        setSuccessToast(`✓ Applied image URL to ${currentSlotDef.shortLabel}! Live on website.`);
        setSingleUrlInput('');
        setShowUrlInput(false);
        setTimeout(() => setSuccessToast(null), 3500);
      } catch (err) {
        setErrorToast('Could not load image from URL. Please check the link.');
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    if (!singleStagedFile) return;

    setIsProcessing(true);
    setErrorToast(null);
    try {
      await replaceMediaFromFile(selectedSlot, singleStagedFile);
      setSuccessToast(`✓ Successfully updated ${currentSlotDef.name}! Live on website.`);
      setTimeout(() => setSuccessToast(null), 3500);
    } catch (err) {
      setErrorToast(err instanceof Error ? err.message : 'Could not update image.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Batch Files selection (multiple photos at once)
  const handleBatchFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    addFilesToBatchQueue(Array.from(files));
    e.target.value = '';
  };

  const addFilesToBatchQueue = (files: File[]) => {
    const newItems: BatchItem[] = files
      .filter((f) => isImageFile(f))
      .map((file, idx) => ({
        id: `batch-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        assignedSlot: null,
      }));

    if (newItems.length === 0) {
      setErrorToast('No valid images detected. Please select image files (JPG, PNG, WebP).');
      return;
    }

    setBatchQueue((prev) => [...prev, ...newItems]);
    setErrorToast(null);
  };

  // Auto assign in sequential order
  const handleAutoAssignBatch = () => {
    if (batchQueue.length === 0) return;

    // Find slots that are not yet assigned or uncustomized
    const availableSlots = [...ALL_CANONICAL_SLOT_KEYS];

    setBatchQueue((prev) =>
      prev.map((item, index) => {
        const slot = availableSlots[index % availableSlots.length];
        return {
          ...item,
          assignedSlot: slot,
        };
      })
    );

    setSuccessToast(`Auto-assigned ${batchQueue.length} photos to website slots!`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Apply all batch items that have an assigned slot
  const handleApplyAllBatch = async () => {
    const assignable = batchQueue.filter((item) => item.assignedSlot !== null);
    if (assignable.length === 0) {
      setErrorToast('Please assign at least one photo to an image slot before applying.');
      return;
    }

    setIsProcessing(true);
    setErrorToast(null);

    try {
      const itemsToUpdate = assignable.map((item) => ({
        slotKey: item.assignedSlot as MediaSlotKey,
        file: item.file,
      }));

      const { successCount } = await batchReplaceMedia(itemsToUpdate);
      setSuccessToast(`Successfully replaced ${successCount} website images!`);
      // Remove applied from batch queue
      setBatchQueue((prev) => prev.filter((item) => item.assignedSlot === null));
      setTimeout(() => setSuccessToast(null), 4000);
    } catch (err) {
      setErrorToast(err instanceof Error ? err.message : 'Error applying batch replacements.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Export JSON backup
  const handleExportBackup = () => {
    const jsonStr = exportImageBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `genius-dairy-custom-images-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setSuccessToast('Image backup exported successfully!');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Import JSON backup
  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        setIsProcessing(true);
        const count = await importImageBackup(content);
        setSuccessToast(`Restored ${count} custom images from backup file!`);
        setTimeout(() => setSuccessToast(null), 4000);
      } catch (err) {
        setErrorToast(err instanceof Error ? err.message : 'Invalid backup file format.');
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div
      id="replace-media-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="replace-media-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeReplaceModal();
      }}
    >
      <div className="bg-[#FAF9F5] w-full max-w-5xl rounded-xs border border-[#D5D1C4] shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* =========================================================================
            1. MODAL HEADER
            ========================================================================= */}
        <div className="p-4 sm:p-5 bg-[#143727] text-white border-b border-[#234D37] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C89D4B]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#C89D4B] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Media Replacement Center</span>
              </div>
              <h2
                id="replace-media-modal-title"
                className="font-heading font-extrabold text-base sm:text-xl text-white tracking-tight flex items-center gap-2"
              >
                <span>Replace Site Images</span>
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-white/15 text-[#C89D4B] border border-white/10">
                  {customSlotsCount} of {totalSlotsCount} Custom
                </span>
              </h2>
            </div>
          </div>

          <button
            id="close-replace-modal-btn"
            onClick={closeReplaceModal}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* =========================================================================
            2. TOP VIEW TABS: Batch Replace All | All 29 Images | Single Studio | Backup
            ========================================================================= */}
        <div className="bg-[#EAE7DE] border-b border-[#D5D1C4] px-4 sm:px-6 pt-2 shrink-0 flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              id="tab-all-grid-btn"
              type="button"
              onClick={() => setActiveTab('all-grid')}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xs transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
                activeTab === 'all-grid'
                  ? 'bg-[#FAF9F5] text-[#143727] border-[#D5D1C4] shadow-xs translate-y-[1px]'
                  : 'bg-transparent text-[#5B6760] hover:text-[#151A18] hover:bg-white/40 border-transparent'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>All 29 Site Images</span>
            </button>

            <button
              id="tab-batch-btn"
              type="button"
              onClick={() => setActiveTab('batch')}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xs transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
                activeTab === 'batch'
                  ? 'bg-[#FAF9F5] text-[#143727] border-[#D5D1C4] shadow-xs translate-y-[1px]'
                  : 'bg-transparent text-[#5B6760] hover:text-[#151A18] hover:bg-white/40 border-transparent'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#C89D4B]" />
              <span>Batch Upload (Replace Multiple)</span>
              {batchQueue.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#143727] text-[#C89D4B] text-[10px] flex items-center justify-center font-bold">
                  {batchQueue.length}
                </span>
              )}
            </button>

            <button
              id="tab-single-btn"
              type="button"
              onClick={() => setActiveTab('single')}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xs transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
                activeTab === 'single'
                  ? 'bg-[#FAF9F5] text-[#143727] border-[#D5D1C4] shadow-xs translate-y-[1px]'
                  : 'bg-transparent text-[#5B6760] hover:text-[#151A18] hover:bg-white/40 border-transparent'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Compare Live View</span>
            </button>

            <button
              id="tab-backup-btn"
              type="button"
              onClick={() => setActiveTab('backup')}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xs transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
                activeTab === 'backup'
                  ? 'bg-[#FAF9F5] text-[#143727] border-[#D5D1C4] shadow-xs translate-y-[1px]'
                  : 'bg-transparent text-[#5B6760] hover:text-[#151A18] hover:bg-white/40 border-transparent'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup & Restore</span>
            </button>

            <button
              id="tab-video-btn"
              type="button"
              onClick={() => setShowEagleVideoModal(true)}
              className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xs transition-all flex items-center gap-2 cursor-pointer border-t border-x bg-transparent text-[#5B6760] hover:text-[#151A18] hover:bg-white/40 border-transparent"
            >
              <Video className="w-3.5 h-3.5 text-[#C89D4B]" />
              <span>Eagle View Video</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-[#6B7871] pb-1">
            <span className="font-mono text-[11px] text-[#143727] font-semibold">
              {Math.round((customSlotsCount / totalSlotsCount) * 100)}% Replaced
            </span>
            <div className="w-16 h-2 rounded-full bg-neutral-200 overflow-hidden">
              <div
                className="h-full bg-[#C89D4B] transition-all duration-300"
                style={{ width: `${(customSlotsCount / totalSlotsCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        {successToast && (
          <div className="mx-4 sm:mx-6 mt-3 p-3 bg-[#E8F4EC] border border-[#2D6A4F] text-[#143727] rounded-xs text-xs font-semibold flex items-center justify-between animate-fadeIn shrink-0">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successToast}</span>
            </div>
            <button
              onClick={() => setSuccessToast(null)}
              className="text-xs hover:underline text-[#2D6A4F] cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {errorToast && (
          <div className="mx-4 sm:mx-6 mt-3 p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-xs text-xs font-semibold flex items-center justify-between gap-2 animate-fadeIn shrink-0">
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorToast}</span>
            </div>
            <button
              onClick={() => setErrorToast(null)}
              className="text-xs hover:underline text-rose-700 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* =========================================================================
            3. TAB CONTENT
            ========================================================================= */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* -----------------------------------------------------------------------
              TAB 1: ALL 29 IMAGES GRID (Quick Replacement Hub)
              ----------------------------------------------------------------------- */}
          {activeTab === 'all-grid' && (
            <div className="space-y-4">
              {/* Drone Video Spotlight Banner */}
              <div className="bg-[#143727] text-white p-3.5 sm:p-4 rounded-xs border border-[#2D6A4F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1E4D38] border border-[#2D6A4F] flex items-center justify-center text-[#C89D4B] shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-white flex items-center gap-2">
                      <span>Eagle View Drone Aerial Video</span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#C89D4B] text-[#0D261B] rounded-xs font-bold">
                        Video Footage
                      </span>
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#9BB0A3]">
                      Upload or replace the 4K drone surveillance video playing in the Eagle View farm tour section.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  id="replace-modal-upload-drone-video-btn"
                  onClick={() => setShowEagleVideoModal(true)}
                  className="w-full sm:w-auto px-3.5 py-2 bg-[#C89D4B] hover:bg-[#B38938] text-[#0D261B] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Drone Video</span>
                </button>
              </div>

              {/* Filter and Search Controls */}
              <div className="bg-white p-3 sm:p-4 rounded-xs border border-[#E0DDD5] flex flex-col md:flex-row items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-[#8C9891] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="search-images-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, page, location..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF9F5] border border-[#D5D1C4] rounded-xs text-[#151A18] placeholder-[#8C9891] focus:outline-none focus:border-[#143727]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Pills Strip */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-2xs whitespace-nowrap transition-colors cursor-pointer border ${
                        categoryFilter === cat
                          ? 'bg-[#143727] text-[#C89D4B] border-[#143727]'
                          : 'bg-[#F4F2EB] text-[#55635C] hover:bg-[#EAE7DE] border-[#DDD9CE]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Status Toggle (All / Custom / Default) */}
                <div className="flex items-center gap-1 text-[11px] font-semibold shrink-0">
                  <button
                    type="button"
                    onClick={() => setStatusFilter('all')}
                    className={`px-2 py-1 rounded-2xs cursor-pointer ${
                      statusFilter === 'all'
                        ? 'bg-[#0D261B] text-white'
                        : 'text-[#6A7870] hover:bg-neutral-100'
                    }`}
                  >
                    All ({ALL_CANONICAL_SLOT_KEYS.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('custom')}
                    className={`px-2 py-1 rounded-2xs cursor-pointer ${
                      statusFilter === 'custom'
                        ? 'bg-emerald-800 text-white'
                        : 'text-[#6A7870] hover:bg-neutral-100'
                    }`}
                  >
                    Custom ({customSlotsCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('default')}
                    className={`px-2 py-1 rounded-2xs cursor-pointer ${
                      statusFilter === 'default'
                        ? 'bg-neutral-700 text-white'
                        : 'text-[#6A7870] hover:bg-neutral-100'
                    }`}
                  >
                    Default ({totalSlotsCount - customSlotsCount})
                  </button>
                </div>
              </div>

              {/* Progress and Batch Callout */}
              <div className="bg-[#F0ECE2] p-3.5 rounded-xs border border-[#DDD8CB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C89D4B]" />
                  <span className="text-[#143727]">
                    Tap <strong>Choose Photo</strong> on any card to replace it instantly from your phone gallery. Or switch to <strong>Batch Upload</strong> to select multiple photos at once!
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('batch')}
                  className="px-3 py-1.5 bg-[#143727] hover:bg-[#0D261B] text-[#C89D4B] hover:text-white rounded-xs font-bold uppercase tracking-wider text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  Switch to Batch Upload
                </button>
              </div>

              {/* Grid of Image Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSlots.map((key) => {
                  const def = MEDIA_SLOTS[key];
                  const liveSrc = getImage(key);
                  const isCustom = Boolean(customSlots[key]);

                  return (
                    <div
                      key={key}
                      id={`media-card-${key}`}
                      className="bg-white rounded-xs border border-[#E0DDD5] hover:border-[#C89D4B] transition-all shadow-2xs overflow-hidden flex flex-col group"
                    >
                      {/* Card Image Preview */}
                      <div className="relative h-44 bg-neutral-900 overflow-hidden flex items-center justify-center">
                        {key === 'logo' ? (
                          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/40 shadow-lg bg-white p-1">
                            <img
                              src={liveSrc}
                              alt={def.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                        ) : (
                          <img
                            src={liveSrc}
                            alt={def.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}

                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-2xs text-[10px] font-bold tracking-wider uppercase bg-black/75 text-white backdrop-blur-xs">
                            {def.category}
                          </span>
                        </div>

                        <div className="absolute top-2 right-2">
                          {isCustom ? (
                            <span className="px-2 py-0.5 rounded-2xs text-[10px] font-bold tracking-wider uppercase bg-emerald-700 text-white flex items-center gap-1 shadow-sm">
                              <CheckCircle2 className="w-3 h-3" />
                              Custom
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-2xs text-[10px] font-medium tracking-wider uppercase bg-black/60 text-white/90">
                              Default
                            </span>
                          )}
                        </div>

                        {/* Aspect Ratio Badge */}
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-[10px] text-white/90 px-1.5 py-0.5 rounded-2xs font-mono">
                          {def.aspectRatioLabel}
                        </div>
                      </div>

                      {/* Card Info & Details */}
                      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-baseline justify-between gap-1">
                            <h4 className="font-heading font-bold text-sm text-[#143727] leading-snug">
                              {def.shortLabel}
                            </h4>
                          </div>
                          <p className="text-[11px] text-[#63726A] line-clamp-2 mt-1 leading-relaxed">
                            {def.description}
                          </p>
                          <div className="mt-2 text-[10px] text-[#84948B] font-medium flex items-center gap-1">
                            <span className="font-semibold text-[#5A6860]">Location:</span>
                            <span className="truncate">{def.locationUsed}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 border-t border-[#F0EDE5] flex items-center justify-between gap-1.5">
                          {/* Hidden per-card file input */}
                          <input
                            ref={(el) => {
                              perCardInputRefs.current[key] = el;
                            }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                handleDirectCardUpload(key, e.target.files[0]);
                              }
                              e.target.value = '';
                            }}
                          />

                          <button
                            type="button"
                            onClick={() => perCardInputRefs.current[key]?.click()}
                            disabled={isProcessing}
                            className="flex-1 py-1.5 px-2.5 bg-[#143727] hover:bg-[#0D261B] text-[#C89D4B] hover:text-white rounded-xs text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                            title="Replace this image with a photo from your phone gallery"
                          >
                            <Smartphone className="w-3 h-3" />
                            <span>Replace Photo</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedSlot(key);
                              setActiveTab('single');
                            }}
                            className="p-1.5 bg-[#F4F2EB] hover:bg-[#EAE7DE] text-[#143727] rounded-xs border border-[#DDD9CE] transition-colors cursor-pointer"
                            title="Open detailed side-by-side comparison"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {isCustom && (
                            <button
                              type="button"
                              onClick={async () => {
                                if (window.confirm(`Reset ${def.shortLabel} back to default?`)) {
                                  await resetMediaSlot(key);
                                  setSuccessToast(`Reset ${def.shortLabel} to original default.`);
                                }
                              }}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xs border border-rose-200 transition-colors cursor-pointer"
                              title="Reset this image to default stock asset"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredSlots.length === 0 && (
                <div className="p-12 text-center bg-white rounded-xs border border-[#E0DDD5] text-[#718078] space-y-2">
                  <Search className="w-8 h-8 mx-auto text-[#C89D4B]" />
                  <p className="font-semibold text-sm text-[#151A18]">
                    No images found matching your filter criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('All');
                      setStatusFilter('all');
                    }}
                    className="text-xs text-[#143727] font-bold underline cursor-pointer"
                  >
                    Clear filters and show all 29 images
                  </button>
                </div>
              )}
            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB 2: BATCH UPLOAD (REPLACE MULTIPLE / ALL AT ONCE)
              ----------------------------------------------------------------------- */}
          {activeTab === 'batch' && (
            <div className="space-y-6">
              {/* Hidden multiple files input */}
              <input
                ref={batchMultipleInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleBatchFilesChange}
              />

              {/* Batch Drop / Picker Zone */}
              <div
                className={`p-8 sm:p-10 rounded-xs border-2 border-dashed text-center transition-all cursor-pointer ${
                  batchDragActive
                    ? 'border-[#C89D4B] bg-[#FFFBF0]'
                    : 'border-[#C5C0B3] bg-white hover:bg-[#FAF8F2]'
                }`}
                onClick={() => batchMultipleInputRef.current?.click()}
                onDrop={(e) => {
                  e.preventDefault();
                  setBatchDragActive(false);
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    addFilesToBatchQueue(Array.from(e.dataTransfer.files));
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setBatchDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setBatchDragActive(false);
                }}
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#EAE7DE] flex items-center justify-center text-[#143727] mb-3">
                  <Upload className="w-7 h-7 text-[#C89D4B]" />
                </div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#143727]">
                  Select Multiple Photos from Your Phone Gallery
                </h3>
                <p className="text-xs text-[#627068] mt-1 max-w-md mx-auto leading-relaxed">
                  Choose 5, 10, or up to 29 photos at once from your camera roll or albums. You can auto-assign them or match each photo to specific sections across the website.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[#143727] text-[#C89D4B] hover:text-white rounded-xs font-bold text-xs uppercase tracking-wider shadow-sm transition-colors">
                  <Smartphone className="w-4 h-4" />
                  <span>Choose Photos (Select Multiple)</span>
                </div>
              </div>

              {/* Uploaded Photos Queue & Assignment */}
              {batchQueue.length > 0 && (
                <div className="bg-white p-5 rounded-xs border border-[#E0DDD5] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EDEAE2]">
                    <div>
                      <h4 className="font-heading font-bold text-base text-[#143727]">
                        Staged Photos Queue ({batchQueue.length})
                      </h4>
                      <p className="text-xs text-[#627068]">
                        Assign each photo to an image slot, or tap Auto-Assign to sequence them automatically.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleAutoAssignBatch}
                        className="px-3 py-1.5 bg-[#EAE7DE] hover:bg-[#DDD8CB] text-[#143727] text-xs font-bold rounded-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C89D4B]" />
                        <span>Auto-Assign in Sequence</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBatchQueue([])}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xs transition-colors cursor-pointer"
                      >
                        Clear Queue
                      </button>
                    </div>
                  </div>

                  {/* Batch Items List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
                    {batchQueue.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-3 bg-[#FAF9F5] rounded-xs border border-[#E5E2D9] flex items-center gap-3 relative group"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xs bg-neutral-900 overflow-hidden shrink-0 border border-neutral-300">
                          <img
                            src={item.previewUrl}
                            alt="Batch item"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Slot Selector */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <span className="text-[11px] font-bold text-[#143727] block truncate">
                            Photo #{idx + 1}: {item.file.name}
                          </span>
                          <select
                            value={item.assignedSlot || ''}
                            onChange={(e) => {
                              const val = e.target.value || null;
                              setBatchQueue((prev) =>
                                prev.map((q) => (q.id === item.id ? { ...q, assignedSlot: val } : q))
                              );
                            }}
                            className="w-full text-xs py-1 px-2 bg-white border border-[#D5D1C4] rounded-xs text-[#151A18] focus:outline-none focus:border-[#143727]"
                          >
                            <option value="">-- Choose Slot to Replace --</option>
                            {ALL_CANONICAL_SLOT_KEYS.map((key) => {
                              const def = MEDIA_SLOTS[key];
                              return (
                                <option key={key} value={key}>
                                  {def.category}: {def.shortLabel}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        {/* Remove item button */}
                        <button
                          type="button"
                          onClick={() =>
                            setBatchQueue((prev) => prev.filter((q) => q.id !== item.id))
                          }
                          className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer"
                          title="Remove from batch"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Batch Action Bar */}
                  <div className="pt-4 border-t border-[#EDEAE2] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-[#627068]">
                      {batchQueue.filter((q) => q.assignedSlot !== null).length} of {batchQueue.length} photos assigned to slots.
                    </span>

                    <button
                      type="button"
                      disabled={
                        isProcessing ||
                        batchQueue.filter((q) => q.assignedSlot !== null).length === 0
                      }
                      onClick={handleApplyAllBatch}
                      className={`w-full sm:w-auto px-6 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        batchQueue.some((q) => q.assignedSlot !== null) && !isProcessing
                          ? 'bg-[#C89D4B] hover:bg-[#B38938] text-[#0D261B] shadow-sm'
                          : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Applying Replacements...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>
                            Apply All {batchQueue.filter((q) => q.assignedSlot !== null).length} Assigned Photos
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB 3: SINGLE SLOT STUDIO (Side-by-side comparison & URL input)
              ----------------------------------------------------------------------- */}
          {activeTab === 'single' && (
            <div className="space-y-6">
              {/* Slot Selector Strip */}
              <div className="bg-white p-3.5 rounded-xs border border-[#E0DDD5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label htmlFor="slot-select-dropdown" className="text-xs font-bold text-[#143727] whitespace-nowrap">
                    Focus Slot:
                  </label>
                  <select
                    id="slot-select-dropdown"
                    value={selectedSlot}
                    onChange={(e) => {
                      setSelectedSlot(e.target.value);
                      setSingleStagedFile(null);
                      setSingleStagedPreview(null);
                    }}
                    className="py-1.5 px-3 bg-[#FAF9F5] border border-[#D5D1C4] rounded-xs text-xs font-semibold text-[#143727] focus:outline-none focus:border-[#143727] w-full sm:w-72"
                  >
                    {ALL_CANONICAL_SLOT_KEYS.map((k) => {
                      const def = MEDIA_SLOTS[k];
                      return (
                        <option key={k} value={k}>
                          {def.category} — {def.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[11px] font-bold text-[#866826] bg-[#F9F5EC] px-2 py-0.5 rounded-2xs border border-[#E8DFC9]">
                    {currentSlotDef.aspectRatioLabel}
                  </span>
                  {isSelectedCustom ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-2xs border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Customized
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#718078]">Default Stock Asset</span>
                  )}
                </div>
              </div>

              {/* Side-by-Side Visual Comparison & Stage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Currently Live */}
                <div className="bg-white p-4 rounded-xs border border-[#E0DDD5] flex flex-col">
                  <div className="flex items-center justify-between mb-3 text-xs font-bold text-[#143727]">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#C89D4B]" />
                      <span>Live on Website</span>
                    </span>
                    <span className="text-[10px] uppercase font-mono text-[#8C9891]">
                      {isSelectedCustom ? 'Custom Upload' : 'Default Asset'}
                    </span>
                  </div>

                  <div
                    className={`w-full bg-[#111] rounded-xs overflow-hidden flex items-center justify-center relative ${
                      selectedSlot === 'logo' ? 'h-56 bg-neutral-900' : 'h-56'
                    }`}
                  >
                    {selectedSlot === 'logo' ? (
                      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/30 shadow-lg bg-white p-1">
                        <img
                          src={currentActiveUrl}
                          alt="Current Live Logo"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <img
                        src={currentActiveUrl}
                        alt={`Current ${currentSlotDef.shortLabel}`}
                        className="w-full h-full object-cover"
                      />
                    )}

                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-2xs">
                      Active
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-[#525F58] leading-relaxed">
                    <span className="font-bold text-[#143727] block">{currentSlotDef.name}</span>
                    <span className="text-[11px]">{currentSlotDef.locationUsed}</span>
                  </div>
                </div>

                {/* Staged New Photo */}
                <div className="bg-white p-4 rounded-xs border border-[#E0DDD5] flex flex-col">
                  <div className="flex items-center justify-between mb-3 text-xs font-bold text-[#143727]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C89D4B]" />
                      <span>New Photo Preview</span>
                    </span>
                    {singleStagedPreview && (
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-2xs">
                        Ready to Apply
                      </span>
                    )}
                  </div>

                  <div
                    className={`w-full bg-[#F4F2EB] rounded-xs overflow-hidden flex items-center justify-center relative border-2 border-dashed border-[#D5D1C4] ${
                      selectedSlot === 'logo' ? 'h-56' : 'h-56'
                    }`}
                  >
                    {singleStagedPreview ? (
                      selectedSlot === 'logo' ? (
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#143727] shadow-xl bg-white p-1">
                          <img
                            src={singleStagedPreview}
                            alt="Staged New Logo"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      ) : (
                        <img
                          src={singleStagedPreview}
                          alt="Staged New Selection"
                          className="w-full h-full object-cover"
                        />
                      )
                    ) : (
                      <div className="p-6 text-center text-[#74827B] space-y-2">
                        <div className="w-10 h-10 mx-auto rounded-full bg-[#EAE7DE] flex items-center justify-center text-[#143727]">
                          <Upload className="w-5 h-5 text-[#C89D4B]" />
                        </div>
                        <p className="text-xs font-semibold text-[#151A18]">
                          No new photo staged yet
                        </p>
                        <p className="text-[11px] text-[#86948D] max-w-xs">
                          Tap below to select a photo from your gallery or paste a URL.
                        </p>
                      </div>
                    )}
                  </div>

                  {singleStagedPreview && (
                    <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-[#EDEAE2]">
                      <span className="text-[11px] text-[#6E7B74] truncate max-w-[200px]">
                        {singleStagedFile?.name}
                      </span>
                      <button
                        onClick={() => {
                          setSingleStagedFile(null);
                          setSingleStagedPreview(null);
                        }}
                        className="text-[11px] text-rose-600 hover:underline font-semibold cursor-pointer"
                      >
                        Cancel selection
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Single Slot Action Controls */}
              <div className="bg-[#EFECE6] p-4 sm:p-5 rounded-xs border border-[#DDD9CE] space-y-3">
                <input
                  ref={singleGalleryInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSingleFileChange}
                />
                <input
                  ref={singleCameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleSingleFileChange}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => singleGalleryInputRef.current?.click()}
                    className="py-3 px-4 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <Smartphone className="w-4 h-4 text-[#C89D4B] group-hover:scale-110 transition-transform" />
                    <span>Choose from Phone</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => singleCameraInputRef.current?.click()}
                    className="py-3 px-4 bg-white hover:bg-[#FAF9F5] text-[#143727] border border-[#C5C0B3] text-xs font-bold uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4 text-[#C89D4B]" />
                    <span>Take Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="py-3 px-4 bg-[#EAE7DE] hover:bg-[#DDD8CB] text-[#143727] border border-[#C5C0B3] text-xs font-bold uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Link2 className="w-4 h-4 text-[#C89D4B]" />
                    <span>Paste Image URL</span>
                  </button>
                </div>

                {showUrlInput && (
                  <div className="p-3 bg-white rounded-xs border border-[#D5D1C4] flex items-center gap-2 animate-fadeIn">
                    <input
                      type="url"
                      value={singleUrlInput}
                      onChange={(e) => setSingleUrlInput(e.target.value)}
                      placeholder="https://example.com/my-photo.jpg"
                      className="flex-1 px-3 py-1.5 text-xs bg-[#FAF9F5] border border-[#D5D1C4] rounded-xs text-[#151A18] focus:outline-none focus:border-[#143727]"
                    />
                    <button
                      type="button"
                      disabled={!singleUrlInput.trim()}
                      onClick={handleApplySingle}
                      className="px-4 py-1.5 bg-[#143727] text-[#C89D4B] hover:text-white rounded-xs text-xs font-bold uppercase cursor-pointer"
                    >
                      Apply URL
                    </button>
                  </div>
                )}

                {/* Save status & manual trigger */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#D5D1C4]">
                  {singleStagedFile ? (
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleApplySingle}
                      className="w-full sm:flex-1 py-2.5 px-4 bg-[#C89D4B] hover:bg-[#B38938] text-[#0D261B] text-xs font-bold uppercase tracking-wider rounded-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Apply Staged Photo Live to Website</span>
                    </button>
                  ) : (
                    <p className="text-[11px] text-[#63726A] flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Photos picked from phone are saved automatically and appear live across the site.</span>
                    </p>
                  )}

                  {isSelectedCustom && (
                    <button
                      type="button"
                      onClick={async () => {
                        if (window.confirm(`Reset ${currentSlotDef.shortLabel} back to default?`)) {
                          await resetMediaSlot(selectedSlot);
                          setSingleStagedPreview(null);
                          setSingleStagedFile(null);
                          setSuccessToast(`Reset ${currentSlotDef.shortLabel} to original default.`);
                        }
                      }}
                      className="py-2 px-3 bg-white hover:bg-rose-50 text-rose-700 rounded-xs border border-[#D5D1C4] hover:border-rose-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Default</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB 4: BACKUP & RESTORE
              ----------------------------------------------------------------------- */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xs border border-[#E0DDD5] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAF9F5] border border-[#EAE7DE] flex items-center justify-center text-[#C89D4B]">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-[#143727]">
                      Export & Import Custom Image Package
                    </h3>
                    <p className="text-xs text-[#627068]">
                      Save all your custom replacements to a single file, or transfer them between devices.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Export */}
                  <div className="p-4 bg-[#FAF9F5] rounded-xs border border-[#E5E2D9] space-y-3">
                    <h4 className="font-bold text-xs text-[#143727] uppercase tracking-wider flex items-center gap-1.5">
                      <Download className="w-4 h-4 text-[#C89D4B]" />
                      <span>Export Backup File</span>
                    </h4>
                    <p className="text-xs text-[#627068] leading-relaxed">
                      Download a JSON backup containing all your customized company photos, logo, and pasture shots.
                    </p>
                    <button
                      type="button"
                      disabled={customSlotsCount === 0}
                      onClick={handleExportBackup}
                      className={`w-full py-2 px-4 rounded-xs text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                        customSlotsCount > 0
                          ? 'bg-[#143727] hover:bg-[#0D261B] text-[#C89D4B]'
                          : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Image Package ({customSlotsCount} Custom)</span>
                    </button>
                  </div>

                  {/* Import */}
                  <div className="p-4 bg-[#FAF9F5] rounded-xs border border-[#E5E2D9] space-y-3">
                    <input
                      ref={importBackupInputRef}
                      type="file"
                      accept=".json,application/json"
                      className="hidden"
                      onChange={handleImportBackup}
                    />
                    <h4 className="font-bold text-xs text-[#143727] uppercase tracking-wider flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-[#C89D4B]" />
                      <span>Restore from Backup File</span>
                    </h4>
                    <p className="text-xs text-[#627068] leading-relaxed">
                      Restore previously exported images in one second by selecting your JSON backup file.
                    </p>
                    <button
                      type="button"
                      onClick={() => importBackupInputRef.current?.click()}
                      className="w-full py-2 px-4 bg-white hover:bg-[#FAF9F5] border border-[#C5C0B3] text-[#143727] rounded-xs text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#C89D4B]" />
                      <span>Select Backup JSON File</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Reset All Site Images */}
              <div className="bg-rose-50/70 p-5 rounded-xs border border-rose-200 space-y-3">
                <div className="flex items-center gap-2 text-rose-800">
                  <Trash2 className="w-4 h-4" />
                  <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider">
                    Reset All Images to Default Stock Photos
                  </h4>
                </div>
                <p className="text-xs text-rose-700 leading-relaxed max-w-xl">
                  This will clear all 29 customized image slots in your browser and revert the website back to its original stock library. This action cannot be undone unless you have an exported backup.
                </p>
                <button
                  type="button"
                  onClick={async () => {
                    if (window.confirm('Are you sure you want to reset ALL 29 site images to original defaults?')) {
                      await resetAllMedia();
                      setSuccessToast('All site images reset to original defaults.');
                      setTimeout(() => setSuccessToast(null), 3000);
                    }
                  }}
                  className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xs text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All 29 Images Now</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            4. MODAL FOOTER
            ========================================================================= */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-[#D5D1C4] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#6B7871]">
            <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
            <span>Changes persist automatically in your browser's IndexedDB storage.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              id="cancel-modal-btn"
              type="button"
              onClick={closeReplaceModal}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#4A554F] hover:text-[#151A18] hover:bg-[#F4F2EB] rounded-xs transition-colors cursor-pointer"
            >
              Close
            </button>

            {activeTab === 'single' && singleStagedFile && (
              <button
                id="apply-single-staged-btn"
                type="button"
                disabled={isProcessing}
                onClick={handleApplySingle}
                className="px-6 py-2 text-xs font-bold uppercase tracking-wider bg-[#C89D4B] hover:bg-[#B38938] text-[#0D261B] rounded-xs shadow-sm transition-colors cursor-pointer flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Apply Staged Photo</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Upload Eagle Video Modal */}
      <UploadEagleVideoModal
        isOpen={showEagleVideoModal}
        onClose={() => setShowEagleVideoModal(false)}
        onVideoUploaded={() => {
          setSuccessToast('Drone video updated successfully!');
          setTimeout(() => setSuccessToast(null), 4000);
        }}
      />
    </div>
  );
};
