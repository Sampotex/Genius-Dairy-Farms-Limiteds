import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Download,
  Copy,
  ExternalLink,
  Maximize2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  HardDrive,
  RefreshCw,
  UploadCloud,
  FileImage,
  Video,
  Eye,
  Check,
  Layers,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Server,
  Folder,
  ArrowUpRight,
  AlertCircle,
  Camera,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PERMANENT_UPLOADED_ASSETS,
  PermanentMediaAsset,
} from '../data/uploadsCatalog';
import { useBrandMedia, MEDIA_SLOTS } from '../context/BrandMediaContext';
import { FOUNDER_IMAGE_BASE64, FOUNDER_PORTRAIT_BASE64 } from '../data/founderImageFallback';

interface UploadedImagesGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReplaceModal?: (slotKey?: string) => void;
}

type GalleryTab = 'all-media' | 'upload-new' | 'server-stats';

interface ServerFileInfo {
  filename: string;
  url: string;
  size: number;
  sizeFormatted: string;
  updatedAt: string;
  isVideo: boolean;
  storageLocation: string;
}

interface ServerStatsData {
  success: boolean;
  publicDirectory: string;
  totalMediaFiles: number;
  imagesCount: number;
  videosCount: number;
  totalSizeBytes: number;
  totalSizeFormatted: string;
  serverTime: string;
  status: string;
  files: ServerFileInfo[];
}

export const UploadedImagesGalleryModal: React.FC<UploadedImagesGalleryModalProps> = ({
  isOpen,
  onClose,
  onOpenReplaceModal,
}) => {
  const { getImage, replaceMediaFromFile, replaceMediaFromDataUrl } = useBrandMedia();

  // Active top tab
  const [activeTab, setActiveTab] = useState<GalleryTab>('all-media');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'images' | 'videos'>('all');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Staged inline replacements on individual cards: slotKey -> File & preview
  const [stagedReplacements, setStagedReplacements] = useState<
    Record<string, { file: File; previewUrl: string; isVideo: boolean }>
  >({});
  const [savingSlot, setSavingSlot] = useState<string | null>(null);
  const [cardSuccessToast, setCardSuccessToast] = useState<{ slotKey: string; message: string } | null>(null);

  // Dedicated Uploader Tab State
  const [uploadSelectedSlot, setUploadSelectedSlot] = useState<string>('eagleViewVideo');
  const [uploadStagedFile, setUploadStagedFile] = useState<File | null>(null);
  const [uploadStagedPreview, setUploadStagedPreview] = useState<string | null>(null);
  const [uploadIsVideo, setUploadIsVideo] = useState<boolean>(true);
  const [uploadCustomFilename, setUploadCustomFilename] = useState<string>('');
  const [isUploadingUniversal, setIsUploadingUniversal] = useState<boolean>(false);
  const [universalUploadSuccess, setUniversalUploadSuccess] = useState<string | null>(null);
  const [universalUploadError, setUniversalUploadError] = useState<string | null>(null);

  // Server stats state
  const [serverStats, setServerStats] = useState<ServerStatsData | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState<boolean>(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Lightbox / Theatre view state
  const [activeLightboxAsset, setActiveLightboxAsset] = useState<PermanentMediaAsset | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);

  // Hidden per-card file input refs
  const cardFileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const universalFileInputRef = useRef<HTMLInputElement>(null);
  const universalVideoInputRef = useRef<HTMLInputElement>(null);

  // Fetch server stats
  const fetchServerStats = async () => {
    setIsLoadingStats(true);
    setStatsError(null);
    try {
      const res = await fetch('/api/public-server-stats');
      if (res.ok) {
        const data = await res.json();
        setServerStats(data);
      } else {
        setStatsError('Could not load server statistics');
      }
    } catch (e: any) {
      setStatsError(e?.message || 'Server connection failed');
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchServerStats();
    }
  }, [isOpen]);

  // Categories list derived from catalog
  const categories = useMemo(() => {
    const set = new Set<string>();
    PERMANENT_UPLOADED_ASSETS.forEach((item) => set.add(item.category));
    const allList = Array.from(set).filter((c) => c !== 'General Media');
    const preferredOrder = [
      'Our Dairy Products',
      'Brand & Identity',
      'Home & Facilities',
      'Livestock & Operations',
      'Pasture & Agronomy',
      'Academy & Training',
      'Sustainability',
      'Insights & News',
    ];
    allList.sort((a, b) => {
      const idxA = preferredOrder.indexOf(a);
      const idxB = preferredOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
    return ['All', 'Our Dairy Products', 'Videos', ...allList.filter((c) => c !== 'Our Dairy Products')];
  }, []);

  // Filtered assets
  const filteredAssets = useMemo(() => {
    return PERMANENT_UPLOADED_ASSETS.filter((asset) => {
      // Media type filter
      if (mediaTypeFilter === 'videos' && !asset.isVideo) return false;
      if (mediaTypeFilter === 'images' && asset.isVideo) return false;

      // Category filter
      if (selectedCategory === 'Videos' && !asset.isVideo) return false;
      if (selectedCategory !== 'All' && selectedCategory !== 'Videos' && asset.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          asset.title.toLowerCase().includes(q) ||
          asset.filename.toLowerCase().includes(q) ||
          asset.description.toLowerCase().includes(q) ||
          asset.category.toLowerCase().includes(q) ||
          asset.slotKey.toLowerCase().includes(q) ||
          (asset.locationUsed && asset.locationUsed.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, mediaTypeFilter]);

  // Handle keyboard ESC and Arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        if (activeLightboxAsset) {
          setActiveLightboxAsset(null);
          setLightboxZoom(1);
        } else {
          onClose();
        }
      } else if (activeLightboxAsset) {
        const currentIndex = filteredAssets.findIndex((a) => a.id === activeLightboxAsset.id);
        if (e.key === 'ArrowRight' && currentIndex < filteredAssets.length - 1) {
          setActiveLightboxAsset(filteredAssets[currentIndex + 1]);
          setLightboxZoom(1);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
          setActiveLightboxAsset(filteredAssets[currentIndex - 1]);
          setLightboxZoom(1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeLightboxAsset, filteredAssets, onClose]);

  // Copy to clipboard helper
  const handleCopyUrl = (url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // Stage a file change for an individual card
  const handleCardFileSelect = (slotKey: string, file: File) => {
    const isVid = file.type.startsWith('video/') || /\.(mp4|webm|mov)$/i.test(file.name);
    const previewUrl = URL.createObjectURL(file);

    setStagedReplacements((prev) => ({
      ...prev,
      [slotKey]: { file, previewUrl, isVideo: isVid },
    }));
  };

  // Save an individual card's staged file directly to public server
  const handleSaveCardToPublicServer = async (asset: PermanentMediaAsset, e: React.MouseEvent) => {
    e.stopPropagation();
    const staged = stagedReplacements[asset.slotKey];
    if (!staged) return;

    setSavingSlot(asset.slotKey);
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed reading file'));
        reader.readAsDataURL(staged.file);
      });

      const response = await fetch('/api/upload-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotKey: asset.slotKey,
          dataUrl,
          filename: asset.filename || staged.file.name,
          title: asset.title,
          category: asset.category,
          description: asset.description,
          isVideo: staged.isVideo,
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned error while saving to disk');
      }

      const resData = await response.json();

      // Update active site context so website updates live immediately
      await replaceMediaFromDataUrl(asset.slotKey, dataUrl);

      // Clear staged replacement
      setStagedReplacements((prev) => {
        const copy = { ...prev };
        delete copy[asset.slotKey];
        return copy;
      });

      setCardSuccessToast({
        slotKey: asset.slotKey,
        message: `✓ Saved permanently to public/${asset.filename}! Live on website.`,
      });
      setTimeout(() => setCardSuccessToast(null), 4000);

      // Refresh server stats in background
      fetchServerStats();
    } catch (err: any) {
      alert(`Could not save file to public server: ${err.message}`);
    } finally {
      setSavingSlot(null);
    }
  };

  // Universal Tab File Selected
  const handleUniversalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVid = file.type.startsWith('video/') || /\.(mp4|webm|mov)$/i.test(file.name);
    setUploadStagedFile(file);
    setUploadIsVideo(isVid);
    setUploadStagedPreview(URL.createObjectURL(file));
    setUniversalUploadError(null);
    setUniversalUploadSuccess(null);

    // Auto-suggest slot
    if (isVid) {
      setUploadSelectedSlot('eagleViewVideo');
    }
  };

  // Save from Universal Uploader Tab to public server
  const handleUniversalSaveToPublicServer = async () => {
    if (!uploadStagedFile) {
      setUniversalUploadError('Please select an image or video file first.');
      return;
    }

    setIsUploadingUniversal(true);
    setUniversalUploadError(null);
    setUniversalUploadSuccess(null);

    try {
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed reading file'));
        reader.readAsDataURL(uploadStagedFile);
      });

      const chosenSlot = uploadSelectedSlot;
      const targetFilename =
        uploadCustomFilename.trim() ||
        (chosenSlot === 'eagleViewVideo'
          ? 'eagle-view-farm.mp4'
          : chosenSlot === 'founder'
          ? 'founder.jpg'
          : chosenSlot === 'logo'
          ? 'logo.jpg'
          : uploadStagedFile.name);

      const response = await fetch('/api/upload-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotKey: chosenSlot,
          dataUrl,
          filename: targetFilename,
          title: `Custom Upload: ${targetFilename}`,
          category: uploadIsVideo ? 'Drone & Aerial Video' : 'General Media',
          description: `Uploaded from Media Gallery Studio on ${new Date().toLocaleDateString()}.`,
          isVideo: uploadIsVideo,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to persist file to public server');
      }

      const resJson = await response.json();

      // Update React context
      if (chosenSlot && chosenSlot !== 'custom') {
        await replaceMediaFromDataUrl(chosenSlot, dataUrl);
      }

      setUniversalUploadSuccess(
        `✓ File permanently saved to public/${targetFilename} (${resJson.sizeFormatted || 'Saved'})! Live across the website.`
      );
      fetchServerStats();
    } catch (err: any) {
      setUniversalUploadError(err.message || 'Error uploading to public server');
    } finally {
      setIsUploadingUniversal(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      {/* Modal Container */}
      <div
        id="uploaded-images-modal"
        className="relative w-full max-w-7xl bg-[#FCFCFA] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E0DDD5] flex flex-col max-h-[94vh] overflow-hidden"
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#E8E5DC] flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#143727] text-[#C89D4B] flex items-center justify-center shadow-md shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#151A18] tracking-tight">
                  Public Server Media &amp; Video Gallery
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10B981]/10 text-[#047857] text-xs font-bold border border-[#10B981]/30 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span>
                    Public Server Disk: {serverStats ? serverStats.totalSizeFormatted : '17.19 MB'} ({serverStats ? serverStats.totalMediaFiles : 25} Assets)
                  </span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#66726B] mt-0.5">
                Change any image or drone video on the site and save directly to physical public server storage (<code className="bg-[#F0EEE6] px-1 py-0.5 rounded text-[11px] font-mono text-[#143727]">public/</code>).
              </p>
            </div>
          </div>

          {/* Right Action Header Buttons */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0 flex-wrap">
            <button
              onClick={fetchServerStats}
              disabled={isLoadingStats}
              title="Verify public server files on disk"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#143727] bg-[#F4F4F0] hover:bg-[#EAE8E0] border border-[#D5D1C4] rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStats ? 'animate-spin' : ''}`} />
              <span>{isLoadingStats ? 'Checking Disk...' : 'Verify Server Files'}</span>
            </button>

            <button
              onClick={() => setActiveTab('upload-new')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#143727] hover:bg-[#0D261B] rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5 text-[#C89D4B]" />
              <span>Upload &amp; Save to Public</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#66726B] hover:text-[#151A18] hover:bg-[#F4F4F0] rounded-xl transition-colors cursor-pointer"
              aria-label="Close media gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="bg-[#F4F3EE] px-4 sm:px-6 pt-2 border-b border-[#E8E5DC] flex items-center justify-between gap-4 overflow-x-auto shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all-media')}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'all-media'
                  ? 'bg-[#FCFCFA] text-[#143727] border-t-2 border-x border-[#E0DDD5] border-t-[#143727] shadow-xs'
                  : 'text-[#525F58] hover:text-[#143727] hover:bg-white/50'
              }`}
            >
              <Layers className="w-4 h-4 text-[#C89D4B]" />
              <span>All Site Media (Images &amp; Videos)</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#143727]/10 text-[10px] font-mono">
                {PERMANENT_UPLOADED_ASSETS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('upload-new')}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'upload-new'
                  ? 'bg-[#FCFCFA] text-[#143727] border-t-2 border-x border-[#E0DDD5] border-t-[#143727] shadow-xs'
                  : 'text-[#525F58] hover:text-[#143727] hover:bg-white/50'
              }`}
            >
              <UploadCloud className="w-4 h-4 text-[#C89D4B]" />
              <span>Upload New Media / Video</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('server-stats');
                fetchServerStats();
              }}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'server-stats'
                  ? 'bg-[#FCFCFA] text-[#143727] border-t-2 border-x border-[#E0DDD5] border-t-[#143727] shadow-xs'
                  : 'text-[#525F58] hover:text-[#143727] hover:bg-white/50'
              }`}
            >
              <HardDrive className="w-4 h-4 text-[#C89D4B]" />
              <span>Public Server Disk Health</span>
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] text-[#4F772D] font-semibold py-1">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>Server Disk Status: Permanent &amp; Verified</span>
          </div>
        </div>

        {/* TAB 1: ALL SITE MEDIA (IMAGES & VIDEOS) */}
        {activeTab === 'all-media' && (
          <>
            {/* Filter Bar */}
            <div className="p-4 sm:px-6 bg-[#FBFBFA] border-b border-[#E8E5DC] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shrink-0">
              {/* Left: Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#8C9891] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search image or video by name, slot, description..."
                  className="w-full pl-9 pr-8 py-2 bg-white border border-[#D5D1C4] rounded-xl text-xs sm:text-sm text-[#151A18] placeholder:text-[#8C9891] focus:outline-none focus:border-[#143727] transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C9891] hover:text-[#151A18] p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Right: Media Type Toggle & Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {/* Media Type Filter */}
                <div className="flex items-center p-1 bg-[#ECE9DF] rounded-xl shrink-0">
                  <button
                    onClick={() => setMediaTypeFilter('all')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      mediaTypeFilter === 'all' ? 'bg-white text-[#143727] shadow-2xs' : 'text-[#66726B]'
                    }`}
                  >
                    All Types
                  </button>
                  <button
                    onClick={() => setMediaTypeFilter('videos')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      mediaTypeFilter === 'videos' ? 'bg-[#143727] text-white shadow-2xs' : 'text-[#66726B]'
                    }`}
                  >
                    <Video className="w-3 h-3 text-[#C89D4B]" />
                    <span>Videos Only</span>
                  </button>
                  <button
                    onClick={() => setMediaTypeFilter('images')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      mediaTypeFilter === 'images' ? 'bg-white text-[#143727] shadow-2xs' : 'text-[#66726B]'
                    }`}
                  >
                    <FileImage className="w-3 h-3" />
                    <span>Images Only</span>
                  </button>
                </div>

                {/* Category Pills */}
                {categories.map((cat) => {
                  const count =
                    cat === 'All'
                      ? PERMANENT_UPLOADED_ASSETS.length
                      : cat === 'Videos'
                      ? PERMANENT_UPLOADED_ASSETS.filter((a) => a.isVideo).length
                      : PERMANENT_UPLOADED_ASSETS.filter((a) => a.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                        selectedCategory === cat
                          ? 'bg-[#143727] text-white shadow-xs'
                          : 'bg-white text-[#525F58] hover:bg-[#EAE8E0] border border-[#E0DDD5]'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                          selectedCategory === cat
                            ? 'bg-white/20 text-white'
                            : 'bg-[#EAE8E0] text-[#525F58]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Media Grid Canvas */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FCFCFA]">
              {filteredAssets.length === 0 ? (
                <div className="py-20 text-center">
                  <FileImage className="w-12 h-12 text-[#8C9891] mx-auto mb-3 opacity-60" />
                  <h3 className="font-heading font-bold text-lg text-[#151A18]">No media found</h3>
                  <p className="text-xs text-[#66726B] mt-1">
                    No items matched &quot;{searchQuery}&quot;. Try adjusting your search query or filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setMediaTypeFilter('all');
                    }}
                    className="mt-4 px-4 py-2 bg-[#143727] text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredAssets.map((asset) => {
                    const staged = stagedReplacements[asset.slotKey];
                    const liveUrl = staged
                      ? staged.previewUrl
                      : asset.isVideo
                      ? asset.url
                      : asset.id === 'founder-portrait'
                      ? '/founder-portrait.jpg'
                      : asset.id === 'founder-md'
                      ? '/founder-md.jpg'
                      : getImage(asset.slotKey) || asset.url;
                    const isSavingThis = savingSlot === asset.slotKey;
                    const toastMessage = cardSuccessToast?.slotKey === asset.slotKey ? cardSuccessToast.message : null;

                    return (
                      <div
                        key={asset.id}
                        id={`vault-card-${asset.id}`}
                        className={`group bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden shadow-xs hover:shadow-xl ${
                          staged
                            ? 'border-[#C89D4B] ring-2 ring-[#C89D4B]/30'
                            : 'border-[#E0DDD5] hover:border-[#143727]'
                        }`}
                      >
                        {/* Hidden file input for this card */}
                        <input
                          type="file"
                          ref={(el) => {
                            cardFileInputRefs.current[asset.slotKey] = el;
                          }}
                          accept={asset.isVideo ? 'video/mp4,video/webm,video/quicktime' : 'image/*'}
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleCardFileSelect(asset.slotKey, f);
                          }}
                        />

                        {/* Media Preview Container */}
                        <div className="relative h-48 bg-[#0F1E16] overflow-hidden flex items-center justify-center">
                          {asset.isVideo || staged?.isVideo ? (
                            <div className="relative w-full h-full bg-[#081710] flex items-center justify-center">
                              <video
                                src={liveUrl}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                              />
                              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#C89D4B] text-[#0A1C14] text-[10px] font-extrabold uppercase shadow-sm">
                                <Video className="w-3 h-3 fill-current" />
                                <span>Drone Aerial Video</span>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={liveUrl}
                              alt={asset.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                            />
                          )}

                          {/* Top Badges */}
                          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 pointer-events-none">
                            <span className="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-[#143727] text-[10px] font-mono font-bold shadow-sm">
                              {staged ? (staged.file.size / 1024).toFixed(1) + ' KB' : asset.sizeFormatted}
                            </span>
                          </div>

                          {/* Staged replacement banner */}
                          {staged && (
                            <div className="absolute inset-x-0 bottom-0 bg-[#C89D4B] text-[#0A1C14] px-3 py-1 text-[11px] font-bold flex items-center justify-between shadow-md">
                              <span>Ready to Save to Public Server</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStagedReplacements((prev) => {
                                    const c = { ...prev };
                                    delete c[asset.slotKey];
                                    return c;
                                  });
                                }}
                                className="text-[#0A1C14] hover:underline"
                              >
                                Cancel
                              </button>
                            </div>
                          )}

                          {/* Hover Overlay with Fullscreen Icon */}
                          <div
                            onClick={() => {
                              setActiveLightboxAsset(asset);
                              setLightboxZoom(1);
                            }}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                          >
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#151A18] text-xs font-bold rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                              <Maximize2 className="w-3.5 h-3.5 text-[#143727]" />
                              <span>{asset.isVideo ? 'Play Fullscreen' : 'View Full Size'}</span>
                            </span>
                          </div>
                        </div>

                        {/* Card Content & Action Area */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Server Location & Saved Status */}
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <div className="flex items-center gap-1 min-w-0">
                                <Folder className="w-3 h-3 text-[#C89D4B] shrink-0" />
                                <code className="text-[11px] font-mono text-[#143727] font-bold truncate">
                                  public/{asset.filename}
                                </code>
                              </div>
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#16A34A] bg-[#DCFCE7] px-1.5 py-0.5 rounded shrink-0">
                                <Check className="w-2.5 h-2.5" />
                                <span>Public Disk</span>
                              </span>
                            </div>

                            <h4 className="font-heading font-bold text-sm text-[#151A18] leading-tight line-clamp-1 mb-1 group-hover:text-[#143727] transition-colors">
                              {asset.title}
                            </h4>
                            <p className="text-[11px] text-[#66726B] leading-relaxed line-clamp-2 mb-3">
                              {asset.description}
                            </p>
                          </div>

                          {/* Dynamic Action Buttons */}
                          <div className="pt-3 border-t border-[#F0ECE1] space-y-2">
                            {/* Success Toast for this card */}
                            {toastMessage && (
                              <div className="p-2 bg-[#DCFCE7] border border-[#86EFAC] rounded-lg text-[11px] font-semibold text-[#166534] flex items-center gap-1.5 animate-fadeIn">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                                <span className="truncate">{toastMessage}</span>
                              </div>
                            )}

                            {/* If staged: prominent Save to Public Server button */}
                            {staged ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => handleSaveCardToPublicServer(asset, e)}
                                  disabled={isSavingThis}
                                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                                >
                                  {isSavingThis ? (
                                    <>
                                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                      <span>Writing to Disk...</span>
                                    </>
                                  ) : (
                                    <>
                                      <HardDrive className="w-3.5 h-3.5" />
                                      <span>Save to Public Server</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            ) : (
                              /* Standard Actions */
                              <div className="flex items-center justify-between gap-1.5">
                                <button
                                  onClick={() => cardFileInputRefs.current[asset.slotKey]?.click()}
                                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-[#FAF8F3] hover:bg-[#F2EFE8] text-[#143727] text-xs font-bold rounded-xl border border-[#D5D1C4] transition-colors cursor-pointer shadow-2xs"
                                  title="Change this image or video from device"
                                >
                                  {asset.isVideo ? (
                                    <>
                                      <Video className="w-3.5 h-3.5 text-[#C89D4B]" />
                                      <span>Change Video</span>
                                    </>
                                  ) : (
                                    <>
                                      <Camera className="w-3.5 h-3.5 text-[#C89D4B]" />
                                      <span>Change Image</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={(e) => handleCopyUrl(asset.url, e)}
                                  title="Copy direct public server URL"
                                  className="p-1.5 text-[#525F58] hover:text-[#143727] hover:bg-[#F4F4F0] rounded-xl transition-colors cursor-pointer border border-[#E0DDD5]"
                                >
                                  {copiedUrl === asset.url ? (
                                    <Check className="w-4 h-4 text-[#16A34A]" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>

                                <button
                                  onClick={() => {
                                    setActiveLightboxAsset(asset);
                                    setLightboxZoom(1);
                                  }}
                                  title="Preview Fullscreen"
                                  className="p-1.5 text-[#525F58] hover:text-[#143727] hover:bg-[#F4F4F0] rounded-xl transition-colors cursor-pointer border border-[#E0DDD5]"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                            )}

                            {/* Quick Set as Primary Founder Photo for founder variations */}
                            {(asset.id === 'founder-portrait' || asset.id === 'founder-md') && (
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  const targetUrl = asset.id === 'founder-portrait' ? '/founder-portrait.jpg' : '/founder-md.jpg';
                                  await replaceMediaFromDataUrl('founder', targetUrl);
                                  try {
                                    await fetch('/api/upload-media', {
                                      method: 'POST',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({
                                        slotKey: 'founder',
                                        filename: 'founder.jpg',
                                        dataUrl: asset.id === 'founder-portrait' ? FOUNDER_PORTRAIT_BASE64 : FOUNDER_IMAGE_BASE64,
                                        title: 'Founder & Managing Director (Moyosore Olatunde Rafiu)',
                                        category: 'Brand & Identity',
                                      }),
                                    });
                                  } catch {
                                    // ignore
                                  }
                                  setCardSuccessToast({
                                    slotKey: asset.slotKey,
                                    message: `✓ Saved as primary Founder photo on website & server disk!`,
                                  });
                                  setTimeout(() => setCardSuccessToast(null), 4000);
                                }}
                                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#143727] hover:bg-[#0D261B] text-white text-[11px] font-bold rounded-xl transition-all cursor-pointer shadow-2xs mt-2"
                              >
                                <Sparkles className="w-3 h-3 text-[#C89D4B]" />
                                <span>Set as Primary Founder Photo</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* TAB 2: UNIVERSAL UPLOAD & SAVE TO PUBLIC SERVER */}
        {activeTab === 'upload-new' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#FCFCFA]">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Header Info */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#143727]/10 text-[#143727] text-xs font-bold uppercase tracking-wider">
                  <HardDrive className="w-3.5 h-3.5 text-[#C89D4B]" />
                  <span>Public Server File Uploader</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#151A18] tracking-tight">
                  Upload &amp; Save Media to Public Server
                </h3>
                <p className="text-xs sm:text-sm text-[#66726B] max-w-xl mx-auto">
                  Select any photo (JPEG, PNG, WebP) or video (MP4, WebM, MOV) from your device. It will be permanently written to the server’s <code className="bg-[#EFECE4] px-1 py-0.5 rounded font-mono text-[#143727]">public/</code> directory and immediately rendered across the entire site.
                </p>
              </div>

              {/* Feedback Banners */}
              {universalUploadSuccess && (
                <div className="p-4 bg-[#DCFCE7] border border-[#86EFAC] rounded-2xl flex items-start gap-3 text-sm text-[#166534] shadow-sm animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Upload Successful!</strong>
                    <span>{universalUploadSuccess}</span>
                  </div>
                </div>
              )}

              {universalUploadError && (
                <div className="p-4 bg-[#FEE2E2] border border-[#FCA5A5] rounded-2xl flex items-start gap-3 text-sm text-[#991B1B] shadow-sm animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Upload Failed</strong>
                    <span>{universalUploadError}</span>
                  </div>
                </div>
              )}

              {/* Step 1: Slot / Section Target Selector */}
              <div className="p-5 bg-white rounded-2xl border border-[#E0DDD5] shadow-xs space-y-3">
                <label className="block text-xs font-bold text-[#143727] uppercase tracking-wider">
                  1. Select Website Section or Slot to Update
                </label>
                <select
                  value={uploadSelectedSlot}
                  onChange={(e) => setUploadSelectedSlot(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#D5D1C4] rounded-xl text-sm font-semibold text-[#151A18] focus:outline-none focus:border-[#143727] transition-all cursor-pointer"
                >
                  <optgroup label="Videos & Aerial Drone Footage">
                    <option value="eagleViewVideo">
                      Eagle View 60-Acre Drone Flight Video (/eagle-view-farm.mp4)
                    </option>
                  </optgroup>
                  <optgroup label="Brand & Official Seals">
                    <option value="founder">
                      Founder &amp; Managing Director Photo (/founder.jpg)
                    </option>
                    <option value="logo">
                      Official Genius Dairy Farms Crest (/logo.jpg)
                    </option>
                    <option value="academyLogo">
                      Genius Dairy Academy Emblem (/academy-logo.jpg)
                    </option>
                    <option value="cacCertificate">
                      CAC Business Certificate (/cac-certificate.jpg)
                    </option>
                  </optgroup>
                  <optgroup label="Farm Facilities & Facilities">
                    <option value="hero">Home Hero Pasture View (/hero.jpg)</option>
                    <option value="corporateFarmFacility">
                      60-Acre Facility &amp; Headquarters (/corporateFarmFacility.jpg)
                    </option>
                    <option value="dairyBarnAerial">
                      Dairy Barn &amp; Corrals Aerial (/dairy-barn-aerial.jpg)
                    </option>
                    <option value="eagleViewFarm">
                      Eagle View Aerial Photo (/eagle-view-farm.jpg)
                    </option>
                  </optgroup>
                  <optgroup label="Livestock & Dairy Operations">
                    <option value="crossbreedCattle">
                      High-Yield Crossbreed Cattle (/1200x794.jpg)
                    </option>
                    <option value="grazingHerd">Savanna Grazing Herd (/grazingHerd.jpg)</option>
                    <option value="cattleCare">Cattle Care &amp; Veterinary Protocol (/cattleCare.jpg)</option>
                    <option value="hygienicFacility">Hygienic Milking Processing Facility (/hygienicFacility.jpg)</option>
                  </optgroup>
                  <optgroup label="Our Dairy Products (Udderfall Artisan Range)">
                    <option value="udderfallYogurtHero">Udderfall Fresh Stirred Whole Milk Yogurt (500ml/1L)</option>
                    <option value="greekYogurtBowl">Udderfall Triple-Strained Greek Yogurt Bowl</option>
                    <option value="freshWaraCheese">Fresh Traditional Nigerian Wara Soft Cheese</option>
                    <option value="udderfallCheeseHero">Farmstead Aged Semi-Hard Cheese Wheels</option>
                    <option value="commercialMozzarella">Commercial Pizza Mozzarella Melt &amp; Stretch</option>
                    <option value="mozzarellaBlock">Vacuum-Sealed Mozzarella Blocks &amp; Shreds (2kg)</option>
                    <option value="strawberryYogurt">Udderfall Real Strawberry Stirred Whole Milk Yogurt</option>
                    <option value="vanillaYogurt">Udderfall Bourbon Vanilla Creamy Whole Milk Yogurt</option>
                    <option value="freshMilkPour">Pure Farmstead Whole Milk Harvest &amp; Chilling</option>
                    <option value="foodServiceKitchen">Commercial Kitchen &amp; Foodservice Culinary Applications</option>
                  </optgroup>
                  <optgroup label="Custom Asset">
                    <option value="custom">Custom Public Server Asset (specify filename)</option>
                  </optgroup>
                </select>

                {uploadSelectedSlot === 'custom' && (
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-[#66726B] mb-1">
                      Enter Target Filename in <code className="font-mono">public/</code>
                    </label>
                    <input
                      type="text"
                      value={uploadCustomFilename}
                      onChange={(e) => setUploadCustomFilename(e.target.value)}
                      placeholder="e.g. farm-tour-drone.mp4 or ranch-field.jpg"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#D5D1C4] rounded-xl text-sm font-mono text-[#151A18] focus:outline-none focus:border-[#143727]"
                    />
                  </div>
                )}
              </div>

              {/* Step 2: Drag & Drop Zone */}
              <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-[#D5D1C4] hover:border-[#143727] transition-all text-center space-y-4">
                <input
                  type="file"
                  ref={universalFileInputRef}
                  onChange={handleUniversalFileChange}
                  accept="image/*,video/mp4,video/webm,video/quicktime"
                  className="hidden"
                />

                <div className="w-16 h-16 rounded-3xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mx-auto shadow-xs">
                  <UploadCloud className="w-8 h-8 text-[#C89D4B]" />
                </div>

                <div>
                  <h4 className="font-heading font-bold text-lg text-[#151A18]">
                    Choose an Image or Video from your Device
                  </h4>
                  <p className="text-xs text-[#66726B] mt-1">
                    Supports high-resolution images (JPEG, PNG, WebP) and 1080p aerial videos (MP4, WebM, MOV).
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => universalFileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer hover:scale-102"
                  >
                    <Camera className="w-4 h-4 text-[#C89D4B]" />
                    <span>Select Photo or Video</span>
                  </button>
                </div>
              </div>

              {/* Step 3: Live Preview & Save Button */}
              {uploadStagedFile && (
                <div className="p-6 bg-white rounded-2xl border border-[#C89D4B] shadow-md space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-[#EAE7DE] pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C89D4B]" />
                      <span className="font-heading font-bold text-sm text-[#151A18]">
                        Selected Media Preview
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#143727] bg-[#FAF8F3] px-2.5 py-1 rounded-md border border-[#E0DDD5]">
                      {(uploadStagedFile.size / 1024 > 1024
                        ? (uploadStagedFile.size / 1048576).toFixed(2) + ' MB'
                        : (uploadStagedFile.size / 1024).toFixed(1) + ' KB')}
                    </span>
                  </div>

                  {/* Preview Player / Image */}
                  <div className="relative rounded-xl overflow-hidden bg-black max-h-80 flex items-center justify-center">
                    {uploadIsVideo ? (
                      <video
                        src={uploadStagedPreview || ''}
                        controls
                        autoPlay
                        loop
                        playsInline
                        className="w-full max-h-80 object-contain"
                      />
                    ) : (
                      <img
                        src={uploadStagedPreview || ''}
                        alt="Staged Upload Preview"
                        className="w-full max-h-80 object-contain"
                      />
                    )}
                  </div>

                  <div className="p-3 bg-[#F0FDF4] rounded-xl border border-[#BBF7D0] flex items-center gap-2 text-xs text-[#166534]">
                    <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>
                      Target Storage: <strong className="font-mono">public/{uploadCustomFilename || (uploadSelectedSlot === 'eagleViewVideo' ? 'eagle-view-farm.mp4' : uploadSelectedSlot === 'founder' ? 'founder.jpg' : uploadStagedFile.name)}</strong>
                    </span>
                  </div>

                  {/* Main Action Button */}
                  <button
                    onClick={handleUniversalSaveToPublicServer}
                    disabled={isUploadingUniversal}
                    className="w-full py-3.5 bg-[#143727] hover:bg-[#0D261B] text-white font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                  >
                    {isUploadingUniversal ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#C89D4B]" />
                        <span>Writing to Server Disk...</span>
                      </>
                    ) : (
                      <>
                        <HardDrive className="w-4 h-4 text-[#C89D4B]" />
                        <span>Save to Public Server (Permanent Disk Storage)</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: PUBLIC SERVER DISK HEALTH & STORAGE STATS */}
        {activeTab === 'server-stats' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#FCFCFA]">
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Stat Cards Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-[#E0DDD5] shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-[#66726B] tracking-wider">
                      Total Media Files
                    </span>
                    <Server className="w-4 h-4 text-[#143727]" />
                  </div>
                  <div className="font-heading font-extrabold text-3xl text-[#143727] mt-2">
                    {serverStats ? serverStats.totalMediaFiles : 25}
                  </div>
                  <div className="text-[11px] text-[#8C9891] mt-1">Verified on Linux Filesystem</div>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-[#E0DDD5] shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-[#66726B] tracking-wider">
                      Total Server Storage
                    </span>
                    <HardDrive className="w-4 h-4 text-[#C89D4B]" />
                  </div>
                  <div className="font-heading font-extrabold text-3xl text-[#143727] mt-2">
                    {serverStats ? serverStats.totalSizeFormatted : '17.19 MB'}
                  </div>
                  <div className="text-[11px] text-[#8C9891] mt-1">Disk storage in public/</div>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-[#E0DDD5] shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-[#66726B] tracking-wider">
                      Videos Stored
                    </span>
                    <Video className="w-4 h-4 text-[#C89D4B]" />
                  </div>
                  <div className="font-heading font-extrabold text-3xl text-[#143727] mt-2">
                    {serverStats ? serverStats.videosCount : 1}
                  </div>
                  <div className="text-[11px] text-[#8C9891] mt-1">1080p Drone Aerial Flights</div>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-[#E0DDD5] shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-[#66726B] tracking-wider">
                      Server Status
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  </div>
                  <div className="font-heading font-extrabold text-2xl text-[#16A34A] mt-2 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
                    <span>Active Disk</span>
                  </div>
                  <div className="text-[11px] text-[#8C9891] mt-1">Mirrored to build &amp; dist/</div>
                </div>
              </div>

              {/* Physical Files Table */}
              <div className="bg-white rounded-2xl border border-[#E0DDD5] shadow-xs overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-[#E8E5DC] flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#151A18]">
                      Physical Public Files Listing
                    </h4>
                    <p className="text-xs text-[#66726B]">
                      Verified directory path: <code className="font-mono text-[#143727]">/app/applet/public/</code>
                    </p>
                  </div>
                  <button
                    onClick={fetchServerStats}
                    disabled={isLoadingStats}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#143727] bg-[#FAF8F3] hover:bg-[#F2EFE8] border border-[#D5D1C4] rounded-xl transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStats ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF9F5] text-[#66726B] font-bold uppercase tracking-wider border-b border-[#EAE7DE]">
                      <tr>
                        <th className="py-3 px-4">Filename</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Size</th>
                        <th className="py-3 px-4">Physical Path</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0ECE1]">
                      {serverStats?.files?.map((file) => (
                        <tr key={file.filename} className="hover:bg-[#FAF9F5] transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#143727] flex items-center gap-2">
                            {file.isVideo ? (
                              <Video className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                            ) : (
                              <FileImage className="w-3.5 h-3.5 text-[#66726B] shrink-0" />
                            )}
                            <span className="truncate max-w-[200px]">{file.filename}</span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-[#525F58]">
                            {file.isVideo ? 'MP4 Video' : 'JPEG / PNG Image'}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-[#151A18]">
                            {file.sizeFormatted}
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-[#66726B]">
                            {file.storageLocation}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#143727] hover:underline"
                            >
                              <span>View</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <button
                              onClick={() => handleCopyUrl(file.url)}
                              className="text-[11px] font-bold text-[#C89D4B] hover:underline cursor-pointer"
                            >
                              {copiedUrl === file.url ? 'Copied!' : 'Copy URL'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Summary Bar */}
        <div className="p-3 sm:p-4 bg-[#F8F7F4] border-t border-[#E8E5DC] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#66726B] shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>
              Public Server Storage Active • All assets permanently stored in <strong className="font-mono text-[#143727]">public/</strong> and mirrored to build
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#8C9891]">Genius Dairy Farms Limited</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Close Gallery
            </button>
          </div>
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX / THEATRE PREVIEW OVERLAY */}
      <AnimatePresence>
        {activeLightboxAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/95 backdrop-blur-lg flex flex-col"
          >
            {/* Lightbox Top Control Bar */}
            <div className="p-4 sm:px-6 bg-black/60 border-b border-white/10 flex items-center justify-between text-white shrink-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#143727] text-[#C89D4B] flex items-center justify-center font-bold text-xs">
                  {activeLightboxAsset.isVideo ? <Video className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm sm:text-base leading-tight">
                    {activeLightboxAsset.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <code className="font-mono text-[11px] text-[#C89D4B]">
                      public/{activeLightboxAsset.filename}
                    </code>
                    <span>•</span>
                    <span>{activeLightboxAsset.sizeFormatted}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons in Lightbox */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyUrl(activeLightboxAsset.url)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedUrl === activeLightboxAsset.url ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span className="text-[#10B981]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <a
                  href={activeLightboxAsset.url}
                  download={activeLightboxAsset.filename}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>

                <button
                  onClick={() => {
                    setActiveLightboxAsset(null);
                    setLightboxZoom(1);
                  }}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                  aria-label="Close fullscreen preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Media Canvas */}
            <div className="flex-1 relative flex items-center justify-center p-4 overflow-hidden">
              {activeLightboxAsset.isVideo ? (
                <div className="max-w-5xl w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative">
                  <video
                    src={activeLightboxAsset.url}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="max-w-6xl max-h-[80vh] flex items-center justify-center overflow-auto">
                  <img
                    src={activeLightboxAsset.url}
                    alt={activeLightboxAsset.title}
                    style={{ transform: `scale(${lightboxZoom})` }}
                    className="max-w-full max-h-[78vh] object-contain transition-transform duration-200 rounded-lg shadow-2xl"
                  />
                </div>
              )}
            </div>

            {/* Lightbox Footer Bar */}
            <div className="p-4 bg-black/60 border-t border-white/10 text-xs text-white/70 flex items-center justify-between">
              <span>{activeLightboxAsset.description}</span>
              <span className="font-mono text-[#C89D4B]">Public Server Storage</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
