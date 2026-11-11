import React, { useState, useMemo, useRef } from 'react';
import {
  MapPin,
  Dna,
  Sprout,
  Activity,
  Camera,
  Images,
  Maximize2,
  Search,
  Eye,
  Sparkles,
  Video,
  HardDrive,
  RefreshCw,
  Check,
  CheckCircle2,
  Folder,
  UploadCloud,
  Layers,
} from 'lucide-react';
import { PageId } from '../types';
import { EagleViewSection } from '../components/EagleViewSection';
import { useBrandMedia, useSiteImages } from '../context/BrandMediaContext';
import { FOUNDER_IMAGE_BASE64 } from '../data/founderImageFallback';
import { CAC_CERTIFICATE_BASE64 } from '../data/cacCertificateFallback';
import {
  PERMANENT_UPLOADED_ASSETS,
  PermanentMediaAsset,
} from '../data/uploadsCatalog';

interface OurFarmPageProps {
  onNavigate: (page: PageId) => void;
  onOpenPartnerModal: () => void;
}

export const OurFarmPage: React.FC<OurFarmPageProps> = ({ onNavigate }) => {
  const { getImage, openLightbox, openUploadedVault, replaceMediaFromDataUrl } = useBrandMedia();
  const images = useSiteImages();

  // Photo & video gallery filter & search state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'images' | 'videos'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Staged inline replacements on individual cards: slotKey -> File & preview
  const [stagedReplacements, setStagedReplacements] = useState<
    Record<string, { file: File; previewUrl: string; isVideo: boolean }>
  >({});
  const [savingSlot, setSavingSlot] = useState<string | null>(null);
  const [cardSuccessToast, setCardSuccessToast] = useState<{ slotKey: string; message: string } | null>(null);

  // Hidden per-card file input refs
  const cardFileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // All permanent uploaded assets (both images and videos)
  const allMediaAssets = useMemo(() => {
    return PERMANENT_UPLOADED_ASSETS;
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    allMediaAssets.forEach((a) => set.add(a.category));
    return ['All', 'Videos', ...Array.from(set)];
  }, [allMediaAssets]);

  const filteredAssets = useMemo(() => {
    return allMediaAssets.filter((asset) => {
      // Media type filter
      if (mediaTypeFilter === 'videos' && !asset.isVideo) return false;
      if (mediaTypeFilter === 'images' && asset.isVideo) return false;

      // Category filter
      if (selectedCategory === 'Videos' && !asset.isVideo) return false;
      if (selectedCategory !== 'All' && selectedCategory !== 'Videos' && asset.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchQuery =
          asset.title.toLowerCase().includes(q) ||
          asset.description.toLowerCase().includes(q) ||
          asset.category.toLowerCase().includes(q) ||
          asset.filename.toLowerCase().includes(q);
        if (!matchQuery) return false;
      }

      return true;
    });
  }, [allMediaAssets, selectedCategory, mediaTypeFilter, searchQuery]);

  // Stage file replacement for a specific card
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

      // Update live context so the whole site reflects it immediately
      await replaceMediaFromDataUrl(asset.slotKey, dataUrl);

      // Clear staged state
      setStagedReplacements((prev) => {
        const copy = { ...prev };
        delete copy[asset.slotKey];
        return copy;
      });

      setCardSuccessToast({
        slotKey: asset.slotKey,
        message: `✓ Saved permanently to public/${asset.filename}! Live on website and server disk.`,
      });
      setTimeout(() => setCardSuccessToast(null), 4500);
    } catch (err: any) {
      alert(`Could not save file to public server: ${err.message}`);
    } finally {
      setSavingSlot(null);
    }
  };

  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="bg-[#081710] text-white py-24 sm:py-32 border-b border-[#1C3A2B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#163B29] text-[#C89D4B] text-xs font-bold uppercase tracking-widest rounded-full mb-6 border border-[#C89D4B]/25">
            <span>Production &amp; Ranching Hub</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
            Our 60-Acre Dairy Facility in <span className="font-serif italic text-[#C89D4B] font-normal">Iseyin</span>
          </h1>
          <p className="text-base sm:text-xl text-[#CBDDD2] max-w-3xl mt-6 leading-relaxed font-normal">
            A specialized commercial livestock facility designed to demonstrate modern dairy genetics, intensive pasture agronomy, and high-welfare management in Southwest Nigeria.
          </p>
          <div className="flex items-center gap-2.5 mt-8 text-sm text-[#C89D4B] font-medium bg-[#143727]/60 px-4 py-2 rounded-full w-fit border border-[#C89D4B]/30 backdrop-blur-md">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>Kilometer 4, Olora Village, Iseyin–Ibadan Expressway, Oyo State</span>
          </div>
        </div>
      </section>

      {/* 60-Acre Master Layout Overview */}
      <section className="py-24 sm:py-32 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold">
                Facility Overview
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight leading-tight">
                An Integrated Ecosystem for <span className="font-serif italic text-[#143727] font-normal">Modern Dairy</span>
              </h2>
              <p className="text-base text-[#4A554F] leading-relaxed">
                Our 60-acre facility in Iseyin is laid out into specialized operational zones: perimeter-fenced paddocks for rotational grazing, dedicated fodder banks for silage preservation, semi-open loose housing designed for tropical heat mitigation, a hygienic milking parlor, and dedicated quarters for academy trainees.
              </p>
              <p className="text-base text-[#4A554F] leading-relaxed">
                By integrating herd breeding, feed production, hygienic milk collection, and agricultural education in one location, Genius Dairy Farms provides a replicable commercial template for sustainable dairy development.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#EAE7DE]">
                <div>
                  <div className="text-2xl font-extrabold text-[#143727] font-mono">60 Acres</div>
                  <div className="text-xs text-[#6B7871] mt-0.5">Secure Perimeter Ranch</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#143727] font-mono">100% Off-Grid</div>
                  <div className="text-xs text-[#6B7871] mt-0.5">Solar Borehole &amp; Power</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D5D1C4] group">
                <img
                  src={getImage('corporateFarmFacility') || images.corporateFarmFacility}
                  alt="60-Acre Dairy Facility Headquarters"
                  className="w-full h-[400px] object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white">
                    <div className="text-xs uppercase font-bold text-[#C89D4B] tracking-widest">Master Layout</div>
                    <div className="font-heading text-xl font-bold mt-1">Farm Headquarters &amp; Paddock System</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eagle View 60-Acre Aerial Drone Video Section */}
      <EagleViewSection />

      {/* Farm Operations & Complete Visual Documentation Section (Interactive Gallery) */}
      <section id="farm-documentation-section" className="py-24 sm:py-32 bg-[#F4F4F0] border-t border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#143727]/10 text-[#143727] text-xs font-bold uppercase tracking-wider mb-3">
                <Camera className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>Interactive Facility &amp; Media Gallery</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
                Farm Facility &amp; <span className="font-serif italic text-[#143727] font-normal">Operational Gallery</span>
              </h2>
              <p className="text-base text-[#55625B] mt-3 max-w-2xl leading-relaxed">
                Explore high-resolution authentic photography and drone videos of our daily ranching operations. You can change any photo or video below and save them directly to the public server.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#7B8B82] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search photos &amp; videos..."
                  className="pl-9 pr-4 py-2.5 bg-white border border-[#D5D1C4] rounded-xl text-xs text-[#151A18] placeholder-[#8A9790] focus:outline-none focus:border-[#143727] w-full sm:w-56 shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Open Full Media Studio Modal Button */}
              <button
                onClick={openUploadedVault}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C89D4B] hover:bg-[#B38938] text-[#0A1C14] text-xs font-bold tracking-wider uppercase rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0"
                title="Open Public Server Media Studio to manage all assets, upload new videos, or inspect server disk"
              >
                <UploadCloud className="w-4 h-4 text-[#0A1C14]" />
                <span>Media Studio</span>
              </button>

              {filteredAssets.length > 0 && (
                <button
                  onClick={() => openLightbox(filteredAssets[0], filteredAssets)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold tracking-wider uppercase rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0"
                  title="View fullscreen image slideshow directly on the website"
                >
                  <Eye className="w-4 h-4 text-[#C89D4B]" />
                  <span>Slideshow ({filteredAssets.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* Filters Bar: Media Type & Categories */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar w-full sm:w-auto">
              {categories.map((cat) => {
                const count =
                  cat === 'All'
                    ? allMediaAssets.length
                    : cat === 'Videos'
                    ? allMediaAssets.filter((a) => a.isVideo).length
                    : allMediaAssets.filter((a) => a.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#143727] text-white shadow-xs'
                        : 'bg-white text-[#4A554F] hover:bg-[#EAE7DE] border border-[#D5D1C4]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? 'bg-[#C89D4B] text-[#0A1C14] font-bold'
                          : 'bg-[#ECE8DE] text-[#6A7870]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Media Type Toggle */}
            <div className="flex items-center p-1 bg-[#ECE9DF] rounded-xl shrink-0 self-end sm:self-auto">
              <button
                onClick={() => setMediaTypeFilter('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mediaTypeFilter === 'all' ? 'bg-white text-[#143727] shadow-2xs' : 'text-[#66726B]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setMediaTypeFilter('videos')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mediaTypeFilter === 'videos' ? 'bg-[#143727] text-white shadow-2xs' : 'text-[#66726B]'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-[#C89D4B]" />
                <span>Videos</span>
              </button>
              <button
                onClick={() => setMediaTypeFilter('images')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mediaTypeFilter === 'images' ? 'bg-white text-[#143727] shadow-2xs' : 'text-[#66726B]'
                }`}
              >
                Photos
              </button>
            </div>
          </div>

          {/* Photo & Video Grid - Interactive Cards with In-Place Change & Save */}
          {filteredAssets.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E0DDD5] p-12 text-center my-6">
              <Camera className="w-10 h-10 text-[#8A9790] mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-[#151A18]">
                No media found
              </h3>
              <p className="text-xs text-[#6A7870] mt-1 max-w-sm mx-auto">
                No items matched your search criteria. Try a different search term or category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setMediaTypeFilter('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-[#143727] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAssets.map((asset) => {
                const staged = stagedReplacements[asset.slotKey];
                const effectiveUrl = staged
                  ? staged.previewUrl
                  : asset.isVideo
                  ? asset.url
                  : getImage(asset.slotKey) || asset.url;
                const isSavingThis = savingSlot === asset.slotKey;
                const toastMessage = cardSuccessToast?.slotKey === asset.slotKey ? cardSuccessToast.message : null;

                return (
                  <div
                    key={asset.id}
                    id={`farm-media-${asset.id}`}
                    className={`bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group ${
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

                    {/* Media Container: Photo or Video */}
                    <div className="h-64 overflow-hidden relative bg-[#EAE7DE] flex items-center justify-center">
                      {asset.isVideo || staged?.isVideo ? (
                        <div className="relative w-full h-full bg-[#081710] flex items-center justify-center">
                          <video
                            src={effectiveUrl}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                          />
                          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C89D4B] text-[#0A1C14] text-[10px] font-extrabold uppercase shadow-sm">
                            <Video className="w-3 h-3 fill-current" />
                            <span>Drone Aerial Video</span>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={effectiveUrl}
                          alt={asset.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (asset.id.includes('founder')) {
                              if (target.src !== FOUNDER_IMAGE_BASE64) {
                                target.src = FOUNDER_IMAGE_BASE64;
                              }
                            } else if (asset.id.includes('cac')) {
                              if (target.src !== CAC_CERTIFICATE_BASE64) {
                                target.src = CAC_CERTIFICATE_BASE64;
                              }
                            }
                          }}
                        />
                      )}

                      {/* Staged replacement banner */}
                      {staged && (
                        <div className="absolute inset-x-0 bottom-0 bg-[#C89D4B] text-[#0A1C14] px-3 py-1.5 text-xs font-bold flex items-center justify-between shadow-md z-20">
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

                      {/* Hover Overlay with Preview Icon */}
                      <div
                        onClick={() => openLightbox(asset, filteredAssets)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      >
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-[#151A18] text-xs font-bold rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Maximize2 className="w-3.5 h-3.5 text-[#143727]" />
                          <span>{asset.isVideo ? 'Play Fullscreen' : 'Click to Preview Fullscreen'}</span>
                        </span>
                      </div>

                      {/* Category Tag (if not video banner) */}
                      {!asset.isVideo && (
                        <div className="absolute top-3.5 left-3.5">
                          <div className="bg-[#143727]/90 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-md backdrop-blur-xs">
                            {asset.category}
                          </div>
                        </div>
                      )}

                      {/* Aspect Ratio / File Size Badge */}
                      <div className="absolute bottom-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity">
                        <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                          {staged ? (staged.file.size / 1024).toFixed(1) + ' KB' : asset.sizeFormatted}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Server Location tag */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#143727] mb-2">
                          <span className="flex items-center gap-1">
                            <Folder className="w-3.5 h-3.5 text-[#C89D4B]" />
                            <span className="font-bold">public/{asset.filename}</span>
                          </span>
                          <span className="text-[10px] bg-[#DCFCE7] text-[#166534] px-1.5 py-0.5 rounded font-sans font-semibold">
                            Public Server
                          </span>
                        </div>

                        <h4 className="font-heading font-bold text-base text-[#151A18] mb-1.5 group-hover:text-[#143727] transition-colors">
                          {asset.title}
                        </h4>
                        <p className="text-xs text-[#66726B] leading-relaxed line-clamp-2">
                          {asset.description}
                        </p>
                      </div>

                      {/* Card Action Strip */}
                      <div className="pt-4 mt-4 border-t border-[#EAE7DE] space-y-2.5">
                        {/* Toast message if saved */}
                        {toastMessage && (
                          <div className="p-2 bg-[#DCFCE7] border border-[#86EFAC] rounded-lg text-xs font-semibold text-[#166534] flex items-center gap-1.5 animate-fadeIn">
                            <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                            <span className="truncate">{toastMessage}</span>
                          </div>
                        )}

                        {/* Staged Save Button */}
                        {staged ? (
                          <button
                            onClick={(e) => handleSaveCardToPublicServer(asset, e)}
                            disabled={isSavingThis}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                          >
                            {isSavingThis ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Saving to public/{asset.filename}...</span>
                              </>
                            ) : (
                              <>
                                <HardDrive className="w-4 h-4" />
                                <span>Save to Public Server</span>
                              </>
                            )}
                          </button>
                        ) : (
                          /* Change File Button */
                          <div className="flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => cardFileInputRefs.current[asset.slotKey]?.click()}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#FAF8F3] hover:bg-[#F2EFE8] text-[#143727] text-xs font-bold rounded-xl border border-[#D5D1C4] transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                              title="Select a replacement file from your device"
                            >
                              {asset.isVideo ? (
                                <>
                                  <Video className="w-3.5 h-3.5 text-[#C89D4B]" />
                                  <span>Change Video</span>
                                </>
                              ) : (
                                <>
                                  <Camera className="w-3.5 h-3.5 text-[#C89D4B]" />
                                  <span>Change Photo</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => openLightbox(asset, filteredAssets)}
                              className="px-3 py-2 text-[#525F58] hover:text-[#143727] hover:bg-[#F4F4F0] rounded-xl text-xs font-semibold border border-[#E0DDD5] transition-colors cursor-pointer"
                            >
                              <span>Preview</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Schedule a Visit Notice */}
          <div className="mt-16 p-8 sm:p-12 bg-white border border-[#E0DDD5] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div>
              <h3 className="font-heading font-bold text-2xl text-[#151A18]">
                Arrange a Guided Physical Tour of Our Ranch
              </h3>
              <p className="text-sm text-[#66726B] mt-1 max-w-xl">
                We welcome investors, agricultural researchers, dairy cooperatives, and academic groups to visit our 60-acre facility in Iseyin.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
            >
              Book Farm Inspection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
