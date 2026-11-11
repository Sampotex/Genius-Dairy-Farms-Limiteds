import React, { useState } from 'react';
import {
  Package,
  Sparkles,
  Truck,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Store,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ChevronRight,
  Award,
  Layers,
  Utensils,
  Building2,
  CheckCircle2,
  FileText,
  Clock,
  Send,
  Droplets,
  HelpCircle,
  Camera,
  Maximize2,
  Search,
  SlidersHorizontal,
  Image as ImageIcon,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/companyData';
import { Logo } from '../../components/Logo';
import { WholesaleQuoteModal } from '../../components/WholesaleQuoteModal';
import { CustomerTestimonialCarousel } from '../../components/CustomerTestimonialCarousel';
import { useSiteImages, useBrandMedia } from '../../context/BrandMediaContext';
import { useRouter } from '../../context/RouterContext';
import { UdderfallHeader } from '../../components/udderfall/UdderfallHeader';
import { UdderfallFooter } from '../../components/udderfall/UdderfallFooter';
import { DAIRY_PRODUCTS_GALLERY } from '../../data/dairyProductsCatalog';

export const UdderfallSite: React.FC = () => {
  const images = useSiteImages();
  const { openLightbox, openReplaceModal, openUploadedVault, getImage } = useBrandMedia();
  const { udderfallSubPage, navigate } = useRouter();

  const [wholesaleModalOpen, setWholesaleModalOpen] = useState(false);
  const [wholesaleCategory, setWholesaleCategory] = useState<'mozzarella' | 'yogurt' | 'all'>('mozzarella');
  const [distributorModalOpen, setDistributorModalOpen] = useState(false);
  const [distributorSubmitted, setDistributorSubmitted] = useState(false);

  // Gallery filters and search
  const [galleryCategory, setGalleryCategory] = useState<'all' | 'yogurt' | 'cheese' | 'milk' | 'culinary'>('all');
  const [gallerySearch, setGallerySearch] = useState('');

  const [activeYogurtTab, setActiveYogurtTab] = useState<'plain' | 'vanilla' | 'strawberry' | 'seasonal'>('plain');
  const [activeCheeseFormat, setActiveCheeseFormat] = useState<'blocks' | 'shreds' | 'vacuum' | 'commercial'>('blocks');

  const [distributorForm, setDistributorForm] = useState({
    businessName: '',
    contactPerson: '',
    city: '',
    phone: '',
    email: '',
    businessType: 'Supermarket / Retailer',
    distributionArea: 'Iseyin / Oyo State',
    message: '',
  });

  const handleDistributorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDistributorSubmitted(true);
  };

  const openWholesaleQuote = (category: 'mozzarella' | 'yogurt' | 'all' = 'mozzarella') => {
    setWholesaleCategory(category);
    setWholesaleModalOpen(true);
  };

  return (
    <div className="w-full bg-[#FCFAF6] text-[#151A18] min-h-screen flex flex-col font-sans selection:bg-[#C89D4B]/30 selection:text-[#0D261B]">
      {/* Dedicated Independent Udderfall Header */}
      <UdderfallHeader
        onOpenWholesaleModal={() => openWholesaleQuote('all')}
        onOpenDistributorModal={() => setDistributorModalOpen(true)}
      />

      <main className="flex-1">
        {/* =========================================================================
            SUB-PAGE ROUTING OR FULL HOME VIEW
            ========================================================================= */}

        {/* 1. UDDERFALL HERO BANNER (Visible on Home or Subpages) */}
        <section
          id="udderfall-hero"
          className="relative bg-[#0D261B] text-white py-20 sm:py-28 overflow-hidden border-b border-[#1C3A2B]"
        >
          <div className="absolute inset-0 z-0">
            <img
              src={images.udderfallYogurtHero}
              alt="Udderfall pure fresh yogurt and artisan dairy"
              className="w-full h-full object-cover object-center opacity-25 filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#081710]/95 via-[#0D261B]/85 to-[#0D261B]/75" />
            <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163B29] border border-[#C89D4B]/40 text-[#C89D4B] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C89D4B]" />
                <span>Pure Goodness, Naturally</span>
              </div>
              <span className="text-xs text-[#9EB6A8] font-medium hidden sm:inline-block">
                • 100% Whole Milk from Genius 60-Acre Dairy Facility
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-6">
                <h1 className="font-heading text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
                  Premium Fresh Yogurt &amp; Artisan Mozzarella Cheese.
                </h1>
                <p className="text-base sm:text-xl text-[#CBDDD2] max-w-3xl leading-relaxed font-light">
                  Crafted by <strong className="text-white font-semibold">Udderfall</strong> using fresh, whole, unadulterated cow milk produced daily on our own integrated 60-acre dairy ranch in Iseyin, Oyo State.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => navigate('/udderfall/yogurt')}
                    className="px-6 py-3.5 bg-[#C89D4B] hover:bg-[#B38938] text-[#0D261B] text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    <span>Explore Fresh Yogurts</span>
                  </button>

                  <button
                    onClick={() => navigate('/udderfall/cheese')}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Artisan Cheeses</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openWholesaleQuote('all')}
                    className="px-6 py-3.5 bg-[#163B29] hover:bg-[#1E4D35] text-[#C89D4B] border border-[#C89D4B]/50 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Store className="w-4 h-4" />
                    <span>B2B &amp; Wholesale Supply</span>
                  </button>
                </div>
              </div>

              {/* Sub-Card Quality Indicators */}
              <div className="lg:col-span-4 bg-[#143727]/80 backdrop-blur-md rounded-2xl p-6 border border-[#234D36] space-y-4 shadow-xl">
                <h3 className="text-xs uppercase tracking-widest font-extrabold text-[#C89D4B] pb-2 border-b border-[#234D36]">
                  Udderfall Quality Benchmark
                </h3>
                <div className="space-y-3 text-xs text-[#CBDDD2]">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C89D4B] shrink-0 mt-0.5" />
                    <span><strong>100% Real Farm Milk:</strong> Sourced directly from our own pasture-fed dairy cattle in Iseyin.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C89D4B] shrink-0 mt-0.5" />
                    <span><strong>No Synthetic Thickeners:</strong> Rich stirred texture achieved through natural culturing.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C89D4B] shrink-0 mt-0.5" />
                    <span><strong>Commercial Mozzarella:</strong> High stretch &amp; melt ratio designed specifically for pizzerias and hotels.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C89D4B] shrink-0 mt-0.5" />
                    <span><strong>Refrigerated Cold Chain:</strong> Guaranteed fresh delivery from facility to your commercial shelf.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SUBPAGE VIEW OR HOME CONTENT SECTIONS */}
        {udderfallSubPage === 'about' && (
          <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#C89D4B]">
                About Udderfall
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                From Quality Milk to Premium Local Value Addition.
              </h2>
              <p className="text-base sm:text-lg text-[#55625B] leading-relaxed">
                Udderfall was founded as the consumer brand of Genius Dairy Farms Limited with a clear objective: to demonstrate that Nigeria can produce world-class dairy products from locally reared, high-yield dairy cattle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-[#EAE7DE] shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0D261B] text-[#C89D4B] flex items-center justify-center">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#151A18]">The Pure Milk Guarantee</h3>
                <p className="text-sm text-[#55625B] leading-relaxed">
                  Unlike reconstituted milk powders, every bottle of Udderfall yogurt and block of cheese originates from fresh raw milk drawn daily at our 60-acre facility in Iseyin.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-[#EAE7DE] shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0D261B] text-[#C89D4B] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#151A18]">Rigorous Food Safety</h3>
                <p className="text-sm text-[#55625B] leading-relaxed">
                  We maintain strict laboratory testing for fat content, microbial purity, and pasteurization temperatures to guarantee consumer health and freshness.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-[#EAE7DE] shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0D261B] text-[#C89D4B] flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#151A18]">Cold-Chain Logistics</h3>
                <p className="text-sm text-[#55625B] leading-relaxed">
                  Our temperature-controlled distribution ensures that from our pasteurization tanks to supermarket chillers, freshness is never compromised.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 3. YOGURT COLLECTION VIEW */}
        {(udderfallSubPage === 'home' || udderfallSubPage === 'yogurt') && (
          <section id="udderfall-yogurt" className="py-16 sm:py-24 bg-white border-b border-[#EAE7DE]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#C89D4B]">
                    Signature Dairy Range
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                    Fresh Udderfall Yogurt Collection
                  </h2>
                  <p className="text-sm sm:text-base text-[#55625B] max-w-2xl">
                    Stirred fresh from pure whole cow milk, cultured with beneficial live probiotics, and lightly sweetened for authentic richness.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#F4F4F0] p-1 rounded-xl border border-[#EAE7DE]">
                  {(['plain', 'vanilla', 'strawberry', 'seasonal'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveYogurtTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                        activeYogurtTab === tab
                          ? 'bg-[#143727] text-white shadow-xs'
                          : 'text-[#55625B] hover:text-[#151A18]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 500ml Retail Bottle */}
                <div className="bg-[#FAF8F3] border border-[#E8E2D4] rounded-2xl p-6 sm:p-8 space-y-6 hover:shadow-md transition-shadow">
                  <div className="h-52 rounded-xl overflow-hidden bg-white/60 flex items-center justify-center p-4">
                    <img
                      src={images.greekYogurtBowl || images.udderfallYogurtHero}
                      alt="Udderfall 500ml Retail Yogurt Bottle"
                      className="max-h-full object-contain hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => openLightbox(images.greekYogurtBowl || images.udderfallYogurtHero)}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C89D4B]">
                      Convenient 500ml
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-[#151A18] mt-1">
                      Grab &amp; Go Fresh Yogurt
                    </h3>
                    <p className="text-xs text-[#55625B] mt-2 leading-relaxed">
                      Ideal for school packs, quick office nutrition, individual breakfast cups, and retail convenience stores.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#EAE7DE] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#143727]">Case of 24 Units</span>
                    <button
                      onClick={() => openWholesaleQuote('yogurt')}
                      className="px-3.5 py-2 rounded-lg bg-[#143727] hover:bg-[#0D261B] text-[#C89D4B] text-xs font-bold transition-all cursor-pointer"
                    >
                      Wholesale Price
                    </button>
                  </div>
                </div>

                {/* 1 Litre Family Bottle */}
                <div className="bg-[#FAF8F3] border-2 border-[#C89D4B]/40 rounded-2xl p-6 sm:p-8 space-y-6 relative hover:shadow-lg transition-shadow">
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#C89D4B] text-[#0B2519] text-[10px] font-extrabold uppercase tracking-wide">
                    Best Seller
                  </div>
                  <div className="h-52 rounded-xl overflow-hidden bg-white/60 flex items-center justify-center p-4">
                    <img
                      src={images.udderfallYogurtHero}
                      alt="Udderfall 1 Litre Family Size Bottle"
                      className="max-h-full object-contain hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => openLightbox(images.udderfallYogurtHero)}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C89D4B]">
                      Family Standard 1 Litre
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-[#151A18] mt-1">
                      Whole Milk 1L Bottle
                    </h3>
                    <p className="text-xs text-[#55625B] mt-2 leading-relaxed">
                      Smooth, thick, and poured directly from whole milk. The preferred choice for household breakfast tables and smoothies.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#EAE7DE] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#143727]">Case of 12 Units</span>
                    <button
                      onClick={() => openWholesaleQuote('yogurt')}
                      className="px-3.5 py-2 rounded-lg bg-[#C89D4B] hover:bg-[#B38938] text-[#0B2519] text-xs font-extrabold transition-all cursor-pointer"
                    >
                      Wholesale Price
                    </button>
                  </div>
                </div>

                {/* 4 Litre Commercial Tub / Gallon */}
                <div className="bg-[#FAF8F3] border border-[#E8E2D4] rounded-2xl p-6 sm:p-8 space-y-6 hover:shadow-md transition-shadow">
                  <div className="h-52 rounded-xl overflow-hidden bg-white/60 flex items-center justify-center p-4">
                    <img
                      src={images.freshMilkPour}
                      alt="Udderfall 4 Litre Commercial Catering Container"
                      className="max-h-full object-contain hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => openLightbox(images.freshMilkPour)}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C89D4B]">
                      Commercial 4 Litres
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-[#151A18] mt-1">
                      Catering &amp; Hotel Gallon
                    </h3>
                    <p className="text-xs text-[#55625B] mt-2 leading-relaxed">
                      Supplied to corporate cafeterias, hotel buffets, bakeries, smoothie bars, and restaurants across Southwest Nigeria.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#EAE7DE] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#143727]">Bulk Gallon Packaging</span>
                    <button
                      onClick={() => openWholesaleQuote('yogurt')}
                      className="px-3.5 py-2 rounded-lg bg-[#143727] hover:bg-[#0D261B] text-[#C89D4B] text-xs font-bold transition-all cursor-pointer"
                    >
                      B2B Bulk Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. CHEESE & MOZZARELLA VIEW */}
        {(udderfallSubPage === 'home' || udderfallSubPage === 'cheese') && (
          <section id="udderfall-cheese" className="py-16 sm:py-24 bg-[#F4F4F0] border-b border-[#EAE7DE]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#C89D4B]">
                    Commercial Cheese Crafting
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                    Artisan Cheese &amp; Commercial Mozzarella
                  </h2>
                  <p className="text-sm sm:text-base text-[#55625B] max-w-2xl">
                    Fresh farm wara and low-moisture stretched-curd mozzarella engineered specifically for culinary melting, pizzeria ovens, and fine dining.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#EAE7DE]">
                  {(['blocks', 'shreds', 'vacuum', 'commercial'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setActiveCheeseFormat(fmt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                        activeCheeseFormat === fmt
                          ? 'bg-[#143727] text-white shadow-xs'
                          : 'text-[#55625B] hover:text-[#151A18]'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="h-96 rounded-2xl overflow-hidden border border-[#D5D1C4] shadow-md relative group">
                  <img
                    src={images.udderfallCheeseHero}
                    alt="Udderfall Mozzarella and artisan cheeses"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C89D4B]">
                      Pizzeria Benchmark
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl">
                      Low-Moisture Mozzarella Block
                    </h3>
                    <p className="text-xs text-[#D0DFD7] mt-1 max-w-md">
                      Superior browning and continuous elasticity on 350°C commercial stone ovens.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#EAE7DE] shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-bold text-lg text-[#151A18]">
                        Fresh Artisanal Wara
                      </h4>
                      <span className="px-2.5 py-1 rounded-full bg-[#143727]/10 text-[#143727] text-xs font-bold">
                        Nigerian Traditional Heritage
                      </span>
                    </div>
                    <p className="text-sm text-[#55625B] leading-relaxed">
                      Crafted daily using fresh morning milk and natural curdling agents. Soft, delicate, and packed in brine to preserve optimal texture.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#EAE7DE] shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-bold text-lg text-[#151A18]">
                        Commercial Shredded Mozzarella (2kg Bags)
                      </h4>
                      <span className="px-2.5 py-1 rounded-full bg-[#C89D4B]/20 text-[#B38938] text-xs font-bold">
                        B2B Supply
                      </span>
                    </div>
                    <p className="text-sm text-[#55625B] leading-relaxed">
                      Pre-shredded with minimal anti-caking agent for rapid kitchen prep. Saves labour costs for quick-service restaurant (QSR) chains.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => openWholesaleQuote('mozzarella')}
                      className="px-6 py-3.5 bg-[#143727] hover:bg-[#0D261B] text-[#C89D4B] text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md"
                    >
                      <Utensils className="w-4 h-4" />
                      <span>Request Mozzarella Commercial Samples</span>
                    </button>
                    <button
                      onClick={() => setDistributorModalOpen(true)}
                      className="px-6 py-3.5 bg-white hover:bg-neutral-50 text-[#151A18] border border-[#D5D1C4] text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      Become Cheese Distributor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4b. MEDIA GALLERY: OUR DAIRY PRODUCTS */}
        {(udderfallSubPage === 'home' || udderfallSubPage === 'gallery') && (
          <section id="dairy-products-gallery" className="py-16 sm:py-24 bg-[#FAF8F3] border-b border-[#EAE7DE]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              
              {/* Dedicated Breadcrumb & Quick Actions Bar when on /gallery */}
              {udderfallSubPage === 'gallery' && (
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E0DDD5] shadow-xs">
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => navigate('/udderfall')}
                      className="font-bold text-[#143727] hover:underline cursor-pointer"
                    >
                      Udderfall Home
                    </button>
                    <span className="text-[#8C9891]">/</span>
                    <span className="font-semibold text-[#8D6B26]">Media Gallery</span>
                    <span className="text-[#8C9891]">/</span>
                    <span className="text-[#151A18] font-bold">Our Dairy Products</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openUploadedVault()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#143727]/10 hover:bg-[#143727]/15 text-[#143727] text-xs font-bold transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#C89D4B]" />
                      <span>Farm Media Vault</span>
                    </button>
                    <button
                      onClick={() => navigate('/')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D5D1C4] hover:bg-neutral-50 text-[#151A18] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>Genius Dairy Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#8C9891]" />
                    </button>
                  </div>
                </div>
              )}

              {/* Section Header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#143727]/10 border border-[#143727]/20 text-[#143727] text-xs font-extrabold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-[#C89D4B]" />
                    <span>Visual Showcase &amp; Specifications</span>
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#151A18] tracking-tight">
                    Media Gallery: <span className="font-serif italic text-[#143727] font-normal">Our Dairy Products</span>
                  </h2>
                  <p className="text-base sm:text-lg text-[#55625B] leading-relaxed">
                    Explore high-resolution visual documentation, packaging formats, butterfat metrics, and technical specifications for all 10 Udderfall dairy foods crafted from fresh pasture-fed cow milk in Iseyin.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openWholesaleQuote('all')}
                    className="px-5 py-2.5 rounded-xl bg-[#143727] hover:bg-[#0D261B] text-[#C89D4B] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    <span>Download Product Catalog</span>
                  </button>
                </div>
              </div>

              {/* Filter Tabs & Search Bar */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E0DDD5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Category Pill Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: 'All Dairy Products', count: DAIRY_PRODUCTS_GALLERY.length },
                    { id: 'yogurt', label: 'Fresh Yogurts', count: DAIRY_PRODUCTS_GALLERY.filter(p => p.category === 'yogurt').length },
                    { id: 'cheese', label: 'Artisan Cheeses', count: DAIRY_PRODUCTS_GALLERY.filter(p => p.category === 'cheese').length },
                    { id: 'milk', label: 'Fresh Whole Milk', count: DAIRY_PRODUCTS_GALLERY.filter(p => p.category === 'milk').length },
                    { id: 'culinary', label: 'Wholesale & Culinary', count: DAIRY_PRODUCTS_GALLERY.filter(p => p.category === 'culinary').length },
                  ].map((tab) => {
                    const isActive = galleryCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setGalleryCategory(tab.id as any)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                          isActive
                            ? 'bg-[#143727] text-white shadow-xs'
                            : 'bg-[#FAF8F3] text-[#55625B] hover:text-[#151A18] hover:bg-[#F0ECE1]'
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                          isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-[#55625B]'
                        }`}>
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Instant Search Bar */}
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-[#8C9891] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={gallerySearch}
                    onChange={(e) => setGallerySearch(e.target.value)}
                    placeholder="Search dairy products..."
                    className="w-full pl-9 pr-4 py-2 bg-[#FAF8F3] border border-[#D5D1C4] focus:border-[#143727] rounded-xl text-xs text-[#151A18] placeholder-[#8C9891] focus:outline-hidden transition-colors"
                  />
                  {gallerySearch && (
                    <button
                      onClick={() => setGallerySearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C9891] hover:text-[#151A18]"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Products Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {DAIRY_PRODUCTS_GALLERY.filter((item) => {
                  if (galleryCategory !== 'all' && item.category !== galleryCategory) return false;
                  if (gallerySearch.trim()) {
                    const q = gallerySearch.toLowerCase();
                    return (
                      item.title.toLowerCase().includes(q) ||
                      item.subtitle.toLowerCase().includes(q) ||
                      item.categoryLabel.toLowerCase().includes(q) ||
                      item.packaging.toLowerCase().includes(q) ||
                      item.description.toLowerCase().includes(q)
                    );
                  }
                  return true;
                }).map((product) => {
                  const resolvedImg = getImage(product.slotKey) || (images as any)[product.defaultImageKey] || (images as any)[product.slotKey];

                  return (
                    <div
                      key={product.id}
                      id={`dairy-product-${product.id}`}
                      className="bg-white rounded-3xl border border-[#E0DDD5] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                    >
                      <div>
                        {/* Image Showcase with Hover Zoom and Overlays */}
                        <div className="h-64 relative overflow-hidden bg-[#0A1D14]">
                          <img
                            src={resolvedImg}
                            alt={product.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                          {/* Top Badges */}
                          <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#143727] text-xs font-bold shadow-xs">
                              {product.categoryLabel}
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-[#C89D4B] text-[#0A1C14] text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                              {product.badgeText}
                            </span>
                          </div>

                          {/* Top Right Quick Action overlay */}
                          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openReplaceModal(product.slotKey as any);
                              }}
                              className="p-2 rounded-full bg-white text-[#143727] hover:bg-[#FAF8F3] shadow-md transition-all cursor-pointer"
                              title="Replace or upload a photo for this product"
                            >
                              <Camera className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Bottom Image Headline */}
                          <div className="absolute bottom-3.5 inset-x-4 text-white">
                            <span className="text-[11px] font-semibold text-[#C89D4B] uppercase tracking-wider block">
                              {product.packaging}
                            </span>
                            <div className="text-xs font-medium text-[#D0DFD7] mt-0.5">
                              {product.highlightMetric}
                            </div>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 space-y-4">
                          <div>
                            <h3 className="font-heading font-extrabold text-xl text-[#151A18] leading-tight group-hover:text-[#143727] transition-colors">
                              {product.title}
                            </h3>
                            <p className="text-xs font-semibold text-[#8D6B26] mt-1">
                              {product.subtitle}
                            </p>
                          </div>

                          <p className="text-xs text-[#55625B] leading-relaxed">
                            {product.description}
                          </p>

                          {/* Technical Specs 2x2 Grid */}
                          <div className="pt-2 border-t border-[#F0ECE1] grid grid-cols-2 gap-2">
                            {product.specs.map((spec, i) => (
                              <div key={i} className="bg-[#FAF8F3] p-2.5 rounded-xl border border-[#ECE8DC]">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C8881] block">
                                  {spec.label}
                                </span>
                                <span className="text-[11px] font-bold text-[#143727] truncate block mt-0.5">
                                  {spec.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-6 pt-0 border-t border-[#F0ECE1] mt-4 flex items-center gap-2">
                        <button
                          onClick={() => openLightbox(resolvedImg)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#FAF8F3] hover:bg-[#EAE6DC] text-[#143727] text-xs font-bold transition-colors cursor-pointer border border-[#E0DDD5]"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>View Full Size</span>
                        </button>

                        <button
                          onClick={() => openWholesaleQuote(product.wholesaleTarget)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#143727] hover:bg-[#0D261B] text-[#C89D4B] text-xs font-extrabold transition-all cursor-pointer shadow-xs"
                        >
                          <Package className="w-3.5 h-3.5" />
                          <span>Wholesale Price</span>
                        </button>

                        <button
                          onClick={() => openReplaceModal(product.slotKey as any)}
                          className="p-2.5 rounded-xl bg-white hover:bg-[#FAF8F3] text-[#55625B] hover:text-[#143727] border border-[#E0DDD5] transition-colors cursor-pointer"
                          title="Change / Update photo"
                        >
                          <Camera className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Hub Strip */}
              <div className="p-8 rounded-3xl bg-[#0D261B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C89D4B] uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4 text-[#C89D4B]" />
                    <span>Permanent Production Facility Quality Guarantee</span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white">
                    Need Custom Packaging, Private Labeling, or Bulk Supply?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CBDDD2] max-w-xl">
                    Our food processing laboratory and chilled packaging plant in Iseyin can formulate tailored packaging sizes for corporate cafeterias and supermarket chains.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => openWholesaleQuote('all')}
                    className="px-6 py-3 bg-[#C89D4B] hover:bg-[#B38938] text-[#0B2519] text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    Request Bulk Quotation
                  </button>
                  <button
                    onClick={() => setDistributorModalOpen(true)}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Distributor Application
                  </button>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* 5. WHOLESALE & B2B SUPPLY VIEW */}
        {(udderfallSubPage === 'home' || udderfallSubPage === 'wholesale') && (
          <section id="udderfall-wholesale" className="py-16 sm:py-24 bg-white border-b border-[#EAE7DE]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-bold tracking-widest uppercase text-[#C89D4B]">
                  B2B Distribution
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                  Commercial Supply &amp; Authorized Retail Partners
                </h2>
                <p className="text-base sm:text-lg text-[#55625B]">
                  We partner with registered supermarkets, hotel chains, bakery distributors, and foodservice operators with refrigerated delivery guarantees.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 rounded-xl bg-[#FAF8F3] border border-[#E8E2D4] space-y-2">
                  <span className="font-heading text-2xl font-black text-[#143727]">24h</span>
                  <h4 className="font-bold text-sm text-[#151A18]">Order Dispatch</h4>
                  <p className="text-xs text-[#55625B]">Scheduled delivery from Iseyin cold-room to retail depots.</p>
                </div>

                <div className="p-6 rounded-xl bg-[#FAF8F3] border border-[#E8E2D4] space-y-2">
                  <span className="font-heading text-2xl font-black text-[#143727]">4°C</span>
                  <h4 className="font-bold text-sm text-[#151A18]">Chilled Chain</h4>
                  <p className="text-xs text-[#55625B]">Maintained temperature monitoring across the transport transit.</p>
                </div>

                <div className="p-6 rounded-xl bg-[#FAF8F3] border border-[#E8E2D4] space-y-2">
                  <span className="font-heading text-2xl font-black text-[#143727]">100%</span>
                  <h4 className="font-bold text-sm text-[#151A18]">Traceability</h4>
                  <p className="text-xs text-[#55625B]">Each batch numbered with production date and batch analysis.</p>
                </div>

                <div className="p-6 rounded-xl bg-[#FAF8F3] border border-[#E8E2D4] space-y-2">
                  <span className="font-heading text-2xl font-black text-[#143727]">3</span>
                  <h4 className="font-bold text-sm text-[#151A18]">Active Regions</h4>
                  <p className="text-xs text-[#55625B]">Direct coverage in Oyo State, Ibadan metropolis, and Lagos logistics hub.</p>
                </div>
              </div>

              {/* Distributor Inquiry Action Strip */}
              <div className="p-8 sm:p-10 rounded-2xl bg-[#0D261B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 max-w-xl text-center md:text-left">
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                    Apply to Become an Authorized Distributor
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CBDDD2]">
                    Receive preferential wholesale rates, promotional chillers, and guaranteed production priority.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setDistributorModalOpen(true)}
                    className="px-6 py-3.5 bg-[#C89D4B] hover:bg-[#B38938] text-[#0B2519] text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    Open Distributor Application
                  </button>
                  <button
                    onClick={() => openWholesaleQuote('all')}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Calculate Wholesale Quote
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. TESTIMONIALS (Shown on Home view) */}
        {udderfallSubPage === 'home' && (
          <section className="py-16 sm:py-24 bg-[#FAF8F3] border-b border-[#EAE7DE]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-bold tracking-widest uppercase text-[#C89D4B]">
                  Verified Customer Voice
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                  Trusted by Households &amp; Hospitality Leaders
                </h2>
                <p className="text-sm text-[#55625B]">
                  Real feedback from families, retail managers, and restaurant head chefs who rely on Udderfall dairy products.
                </p>
              </div>

              <CustomerTestimonialCarousel />
            </div>
          </section>
        )}

        {/* 7. CONTACT & DEPOT INQUIRY VIEW */}
        {(udderfallSubPage === 'home' || udderfallSubPage === 'contact') && (
          <section id="udderfall-contact" className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#C89D4B]">
                    Depot &amp; Sales Desk
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                    Get in Touch with Udderfall Sales
                  </h2>
                  <p className="text-sm sm:text-base text-[#55625B] leading-relaxed">
                    For direct store deliveries, distributor partnerships, catering orders, or commercial quote requests, our dedicated sales desk is ready to support your business.
                  </p>

                  <div className="space-y-4 pt-4 border-t border-[#EAE7DE]">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#FAF8F3] border border-[#EAE7DE] flex items-center justify-center shrink-0 text-[#143727]">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#151A18] block">Depot &amp; Facility Location</span>
                        <span className="text-xs text-[#55625B]">60-Acre Dairy Facility, KM 4, Olora Village, Iseyin–Ibadan Expressway, Oyo State</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#FAF8F3] border border-[#EAE7DE] flex items-center justify-center shrink-0 text-[#143727]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#151A18] block">Wholesale Phone</span>
                        <a href={COMPANY_DETAILS.phoneTel} className="text-xs font-mono text-[#C89D4B] hover:underline font-bold">
                          {COMPANY_DETAILS.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#FAF8F3] border border-[#EAE7DE] flex items-center justify-center shrink-0 text-[#143727]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#151A18] block">Commercial Email</span>
                        <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-xs text-[#55625B] hover:underline">
                          {COMPANY_DETAILS.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#FAF8F3] p-8 sm:p-10 rounded-2xl border border-[#E8E2D4] shadow-xs">
                  <h3 className="font-heading font-extrabold text-xl text-[#151A18] mb-2">
                    Send a Quick Product or Wholesale Message
                  </h3>
                  <p className="text-xs text-[#55625B] mb-6">
                    Fill out the inquiry form below and our regional sales lead will respond within 24 business hours.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert('Thank you! Your message has been sent to the Udderfall Sales Desk.');
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-[#151A18] uppercase tracking-wide block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D1C4] bg-white text-xs text-[#151A18] focus:outline-hidden focus:border-[#143727]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#151A18] uppercase tracking-wide block mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+234..."
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D1C4] bg-white text-xs text-[#151A18] focus:outline-hidden focus:border-[#143727]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#151A18] uppercase tracking-wide block mb-1">
                        Business / Store Name
                      </label>
                      <input
                        type="text"
                        placeholder="Company or Supermarket name (optional)"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D1C4] bg-white text-xs text-[#151A18] focus:outline-hidden focus:border-[#143727]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#151A18] uppercase tracking-wide block mb-1">
                        Inquiry Details *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Please describe products of interest (Yogurt 500ml/1L/4L, Block Mozzarella, Wara) and required quantities..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D1C4] bg-white text-xs text-[#151A18] focus:outline-hidden focus:border-[#143727]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#143727] hover:bg-[#0D261B] text-[#C89D4B] text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry to Udderfall</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Dedicated Independent Udderfall Footer */}
      <UdderfallFooter
        onOpenWholesaleModal={() => openWholesaleQuote('all')}
        onOpenDistributorModal={() => setDistributorModalOpen(true)}
      />

      {/* =========================================================================
          MODALS
          ========================================================================= */}
      {/* Wholesale Quote Modal */}
      <WholesaleQuoteModal
        isOpen={wholesaleModalOpen}
        onClose={() => setWholesaleModalOpen(false)}
        initialCategory={wholesaleCategory}
      />

      {/* Standalone Distributor Application Modal */}
      {distributorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-[#FBFBFA] border border-[#D5D1C4] max-w-xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE7DE]">
              <div className="flex items-center gap-3">
                <Logo size="sm" />
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#151A18]">
                    Udderfall Distributor Application
                  </h3>
                  <span className="text-xs text-[#55625B]">
                    Commercial Partner Program • Oyo &amp; Southwest Logistics
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setDistributorModalOpen(false);
                  setDistributorSubmitted(false);
                }}
                className="text-[#88958E] hover:text-[#151A18] text-sm p-1.5 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {distributorSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#143727]/10 text-[#143727] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-[#C89D4B]" />
                </div>
                <h4 className="font-heading font-extrabold text-xl text-[#151A18]">
                  Distributor Application Submitted!
                </h4>
                <p className="text-xs text-[#55625B] max-w-md mx-auto leading-relaxed">
                  Thank you for applying to distribute Udderfall products. Our commercial trade manager will review your business details and contact you within 24–48 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setDistributorModalOpen(false);
                      setDistributorSubmitted(false);
                    }}
                    className="px-6 py-2.5 bg-[#143727] text-[#C89D4B] text-xs font-bold uppercase rounded-lg cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDistributorSubmit} className="pt-5 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#151A18] block mb-1">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Metro Mart Limited"
                      value={distributorForm.businessName}
                      onChange={(e) => setDistributorForm({ ...distributorForm, businessName: e.target.value })}
                      className="w-full px-3 py-2 border border-[#D5D1C4] rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#151A18] block mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={distributorForm.contactPerson}
                      onChange={(e) => setDistributorForm({ ...distributorForm, contactPerson: e.target.value })}
                      className="w-full px-3 py-2 border border-[#D5D1C4] rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#151A18] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234..."
                      value={distributorForm.phone}
                      onChange={(e) => setDistributorForm({ ...distributorForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-[#D5D1C4] rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#151A18] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="business@example.com"
                      value={distributorForm.email}
                      onChange={(e) => setDistributorForm({ ...distributorForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-[#D5D1C4] rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#151A18] block mb-1">
                      Business Type
                    </label>
                    <select
                      value={distributorForm.businessType}
                      onChange={(e) => setDistributorForm({ ...distributorForm, businessType: e.target.value })}
                      className="w-full px-3 py-2 border border-[#D5D1C4] rounded-lg bg-white"
                    >
                      <option>Supermarket / Grocery Retailer</option>
                      <option>Wholesale Food Distributor</option>
                      <option>Hotel / Quick-Service Restaurant (QSR)</option>
                      <option>Commercial Bakery / Pizzeria</option>
                      <option>Institutional Caterer</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-[#151A18] block mb-1">
                      Target Distribution Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ibadan North / Bodija"
                      value={distributorForm.distributionArea}
                      onChange={(e) => setDistributorForm({ ...distributorForm, distributionArea: e.target.value })}
                      className="w-full px-3 py-2 border border-[#D5D1C4] rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#151A18] block mb-1">
                    Cold-Storage Facilities &amp; Experience
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your cold-storage equipment (chillers, freezers, vans) and current distribution volume..."
                    value={distributorForm.message}
                    onChange={(e) => setDistributorForm({ ...distributorForm, message: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D5D1C4] rounded-lg bg-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setDistributorModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#55625B] hover:text-[#151A18] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#143727] hover:bg-[#0D261B] text-[#C89D4B] font-bold tracking-wide transition-all cursor-pointer shadow-md"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
