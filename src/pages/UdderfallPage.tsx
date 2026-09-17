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
  ExternalLink,
  Flame,
  Award,
  Layers,
  Utensils,
  Building2,
  GraduationCap,
  Users,
  CheckCircle2,
  FileText,
  Clock,
  Send,
} from 'lucide-react';
import { PageId } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { Logo } from '../components/Logo';
import { WholesaleQuoteModal } from '../components/WholesaleQuoteModal';
import { FounderProfileCard } from '../components/FounderProfileCard';
import { CustomerTestimonialCarousel } from '../components/CustomerTestimonialCarousel';
import { useSiteImages } from '../context/BrandMediaContext';

interface UdderfallPageProps {
  onNavigate: (page: PageId) => void;
}

export const UdderfallPage: React.FC<UdderfallPageProps> = ({ onNavigate }) => {
  const images = useSiteImages();
  const [wholesaleModalOpen, setWholesaleModalOpen] = useState(false);
  const [wholesaleCategory, setWholesaleCategory] = useState<'mozzarella' | 'yogurt' | 'all'>(
    'mozzarella'
  );
  const [distributorModalOpen, setDistributorModalOpen] = useState(false);
  const [distributorSubmitted, setDistributorSubmitted] = useState(false);
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWholesaleQuote = (category: 'mozzarella' | 'yogurt' | 'all' = 'mozzarella') => {
    setWholesaleCategory(category);
    setWholesaleModalOpen(true);
  };

  return (
    <div className="w-full bg-[#FBFBFA] text-[#151A18]">
      {/* =========================================================================
          HERO SECTION — UDDERFALL YOGURT & CHEESE
          ========================================================================= */}
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
          {/* Sub-badge: A Genius Dairy Farms Brand */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#163B29]/90 border border-[#C89D4B]/40 text-[#E0BA6E] text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-xs">
            <Logo size="xs" />
            <span>A Genius Dairy Farms Brand • Iseyin, Oyo State, Nigeria</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-3 max-w-4xl">
            UDDERFALL YOGURT & CHEESE
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-lg sm:text-2xl font-heading font-medium text-[#C89D4B] mb-6">
            <span>Pure Goodness, Naturally.</span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="text-white font-normal text-base sm:text-xl">Fresh Dairy. Thoughtfully Made.</span>
          </div>

          <p className="text-base sm:text-lg text-[#CBDDD2] max-w-3xl leading-relaxed mb-8">
            Udderfall Yogurt & Cheese is a Nigerian dairy brand developed by Genius Dairy Farms Limited in Iseyin, Oyo State.
            We transform quality Nigerian fresh milk into delicious, nutritious and conveniently packaged yogurt and cheese for households, retailers, food-service businesses and distributors.
          </p>

          <p className="text-sm sm:text-base text-[#9EB6A8] max-w-2xl leading-relaxed mb-10">
            From milk sourcing to processing and packaging, Udderfall is built around quality, responsible production and the belief that locally produced dairy can create lasting value for consumers and communities.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection('udderfall-products')}
              className="px-8 py-4 bg-[#C89D4B] hover:bg-[#B38737] text-[#0D261B] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Explore Our Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setDistributorModalOpen(true)}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center gap-2 backdrop-blur-xs"
            >
              <Truck className="w-4 h-4 text-[#C89D4B]" />
              <span>Become a Distributor</span>
            </button>

            <button
              onClick={() => scrollToSection('udderfall-contact')}
              className="px-6 py-4 text-xs sm:text-sm text-[#CBDDD2] hover:text-white uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              Contact Us →
            </button>
          </div>
        </div>

        {/* In-Page Sticky/Scroll Anchor Sub-bar */}
        <div className="mt-14 border-t border-white/10 bg-black/20 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-6 overflow-x-auto text-xs font-semibold uppercase tracking-wider text-[#CBDDD2] no-scrollbar">
            <button onClick={() => scrollToSection('farm-to-table')} className="hover:text-[#C89D4B] whitespace-nowrap cursor-pointer">
              Farm to Table
            </button>
            <button onClick={() => scrollToSection('udderfall-yogurt')} className="hover:text-[#C89D4B] whitespace-nowrap cursor-pointer">
              Yogurt
            </button>
            <button onClick={() => scrollToSection('udderfall-cheese')} className="hover:text-[#C89D4B] whitespace-nowrap cursor-pointer">
              Cheese & Mozzarella
            </button>
            <button onClick={() => scrollToSection('why-udderfall')} className="hover:text-[#C89D4B] whitespace-nowrap cursor-pointer">
              Why Udderfall
            </button>
            <button onClick={() => scrollToSection('dairy-journey')} className="hover:text-[#C89D4B] whitespace-nowrap cursor-pointer">
              Dairy Journey
            </button>
            <button onClick={() => scrollToSection('quality-commitment')} className="hover:text-[#C89D4B] whitespace-nowrap cursor-pointer">
              Quality Commitment
            </button>
            <button onClick={() => scrollToSection('who-we-serve')} className="hover:text-[#C89D4B] whitespace-nowrap cursor-pointer">
              Who We Serve
            </button>
            <button onClick={() => scrollToSection('distribution-partners')} className="hover:text-[#C89D4B] whitespace-nowrap cursor-pointer">
              Distribution & Partners
            </button>
            <button onClick={() => scrollToSection('company-behind')} className="hover:text-[#C89D4B] whitespace-nowrap cursor-pointer">
              The Company Behind
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1 — FROM FARM TO TABLE
          ========================================================================= */}
      <section id="farm-to-table" className="py-20 sm:py-28 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#2D6A4F] font-bold block">
                FROM FARM TO TABLE
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#151A18] tracking-tight leading-tight">
                Quality Milk. Quality Dairy. Nigerian Roots.
              </h2>
              <p className="text-base sm:text-lg text-[#4A554F] leading-relaxed">
                Backed by the dairy farming experience and infrastructure of Genius Dairy Farms Limited, Udderfall connects local milk production with modern dairy processing and value addition.
              </p>
              <p className="text-sm sm:text-base text-[#4A554F] leading-relaxed">
                Our growing product range is designed to serve everyday consumers while meeting the needs of businesses across Nigeria's food and hospitality sector.
              </p>

              {/* Two Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div
                  onClick={() => scrollToSection('udderfall-yogurt')}
                  className="bg-white p-6 rounded-xs border border-[#E0DDD5] hover:border-[#143727] transition-all shadow-xs cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#143727]/10 text-[#143727] flex items-center justify-center font-heading font-bold mb-4 group-hover:bg-[#143727] group-hover:text-white transition-colors">
                    01
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#151A18] mb-2 group-hover:text-[#143727]">
                    Yogurt
                  </h3>
                  <p className="text-xs sm:text-sm text-[#55625B] leading-relaxed">
                    Fresh, smooth and delicious yogurt available in convenient bottle and sachet formats.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C89D4B] mt-4">
                    Explore Yogurt Range →
                  </span>
                </div>

                <div
                  onClick={() => scrollToSection('udderfall-cheese')}
                  className="bg-white p-6 rounded-xs border border-[#E0DDD5] hover:border-[#C89D4B] transition-all shadow-xs cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#C89D4B]/20 text-[#0D261B] flex items-center justify-center font-heading font-bold mb-4 group-hover:bg-[#C89D4B] group-hover:text-[#0D261B] transition-colors">
                    02
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#151A18] mb-2 group-hover:text-[#C89D4B]">
                    Cheese & Mozzarella
                  </h3>
                  <p className="text-xs sm:text-sm text-[#55625B] leading-relaxed">
                    Quality cheese solutions for households, retailers, restaurants, bakeries, pizzerias and other food-service businesses.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#143727] mt-4">
                    Explore Cheese Solutions →
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xs overflow-hidden shadow-lg border border-[#E3DFD5] group/pour">
                <img
                  src={images.freshMilkPour}
                  alt="Farm milk pouring directly into Udderfall processing"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C89D4B]" />
                    <span className="text-[11px] uppercase tracking-widest text-[#E0BA6E] font-bold">
                      Direct Farm Milk
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    Processed Fresh in Iseyin, Oyo State
                  </h4>
                  <p className="text-xs text-[#CBDDD2] mt-1">
                    Connecting livestock genetics with clean-label dairy manufacturing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — OUR PRODUCTS (UDDERFALL YOGURT)
          ========================================================================= */}
      <section
        id="udderfall-products"
        className="py-20 sm:py-28 bg-[#F4F4F0] border-y border-[#EAE7DE]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2D6A4F] font-bold block mb-2">
              OUR PRODUCTS
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#151A18] tracking-tight">
              Dairy Made for Everyday Life
            </h2>
            <p className="text-base text-[#55625B] mt-3">
              Udderfall is focused on creating quality dairy products that combine freshness, convenience and great taste.
            </p>
          </div>

          {/* Sub-section: Udderfall Yogurt */}
          <div
            id="udderfall-yogurt"
            className="bg-white rounded-xs border border-[#DFDCDE] p-8 sm:p-12 shadow-xs mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-block px-3 py-1 bg-[#143727] text-[#C89D4B] text-xs font-bold uppercase tracking-widest rounded-xs">
                  Fresh. Smooth. Delicious.
                </div>

                <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                  Udderfall Yogurt
                </h3>

                <p className="text-base text-[#4A554F] leading-relaxed">
                  Our yogurt range is developed from fresh cow milk and designed for everyday enjoyment—from breakfast and family meals to school lunchboxes, retail shelves and on-the-go refreshment.
                </p>

                {/* Available Varieties Interactive Tabs */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#143727] mb-3">
                    Available Varieties
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    <button
                      onClick={() => setActiveYogurtTab('plain')}
                      className={`p-3 text-left rounded-xs border text-xs transition-all cursor-pointer ${
                        activeYogurtTab === 'plain'
                          ? 'border-[#143727] bg-[#143727] text-white shadow-xs'
                          : 'border-[#E0DDD5] bg-[#FBFBFA] text-[#151A18] hover:border-[#143727]/50'
                      }`}
                    >
                      <div className="font-bold">Natural Plain</div>
                      <div className={`text-[10px] mt-0.5 ${activeYogurtTab === 'plain' ? 'text-[#C89D4B]' : 'text-[#66726B]'}`}>
                        Pure & Wholesome
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveYogurtTab('vanilla')}
                      className={`p-3 text-left rounded-xs border text-xs transition-all cursor-pointer ${
                        activeYogurtTab === 'vanilla'
                          ? 'border-[#143727] bg-[#143727] text-white shadow-xs'
                          : 'border-[#E0DDD5] bg-[#FBFBFA] text-[#151A18] hover:border-[#143727]/50'
                      }`}
                    >
                      <div className="font-bold">Vanilla</div>
                      <div className={`text-[10px] mt-0.5 ${activeYogurtTab === 'vanilla' ? 'text-[#C89D4B]' : 'text-[#66726B]'}`}>
                        Rich & Aromatic
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveYogurtTab('strawberry')}
                      className={`p-3 text-left rounded-xs border text-xs transition-all cursor-pointer ${
                        activeYogurtTab === 'strawberry'
                          ? 'border-[#143727] bg-[#143727] text-white shadow-xs'
                          : 'border-[#E0DDD5] bg-[#FBFBFA] text-[#151A18] hover:border-[#143727]/50'
                      }`}
                    >
                      <div className="font-bold">Strawberry</div>
                      <div className={`text-[10px] mt-0.5 ${activeYogurtTab === 'strawberry' ? 'text-[#C89D4B]' : 'text-[#66726B]'}`}>
                        Fruity Favourite
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveYogurtTab('seasonal')}
                      className={`p-3 text-left rounded-xs border text-xs transition-all cursor-pointer ${
                        activeYogurtTab === 'seasonal'
                          ? 'border-[#143727] bg-[#143727] text-white shadow-xs'
                          : 'border-[#E0DDD5] bg-[#FBFBFA] text-[#151A18] hover:border-[#143727]/50'
                      }`}
                    >
                      <div className="font-bold">Other Flavours</div>
                      <div className={`text-[10px] mt-0.5 ${activeYogurtTab === 'seasonal' ? 'text-[#C89D4B]' : 'text-[#66726B]'}`}>
                        Seasonal Expansion
                      </div>
                    </button>
                  </div>

                  {/* Variety Detail Card */}
                  <div className="p-4 bg-[#F7F6F2] rounded-xs border border-[#E8E5DC] text-xs leading-relaxed text-[#4A554F]">
                    {activeYogurtTab === 'plain' && (
                      <p>
                        <strong>Natural Plain:</strong> Smooth, creamy and naturally wholesome. Contains zero added sugars or artificial fillers, naturally fermented with beneficial active cultures for gut health and daily wellness.
                      </p>
                    )}
                    {activeYogurtTab === 'vanilla' && (
                      <p>
                        <strong>Vanilla:</strong> A rich and aromatic classic. Blends whole farm milk with velvety vanilla notes for a balanced sweet treat enjoyed by all generations.
                      </p>
                    )}
                    {activeYogurtTab === 'strawberry' && (
                      <p>
                        <strong>Strawberry:</strong> A refreshing fruity favourite with bright berry notes, vibrant color, and an uplifting creamy texture ideal for school lunchboxes and retail shelves.
                      </p>
                    )}
                    {activeYogurtTab === 'seasonal' && (
                      <p>
                        <strong>Other Flavours & Innovations:</strong> Additional varieties and seasonal tropical fruit infusions as our dairy processing range expands to meet Nigerian consumer preferences.
                      </p>
                    )}
                  </div>
                </div>

                {/* Available Formats */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#143727] mb-2.5">
                    Available Formats
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 bg-white border border-[#D5D1C4] rounded-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#143727]" />
                      <span className="font-semibold text-[#151A18]">100ml Sachet</span>
                    </div>
                    <div className="p-2.5 bg-white border border-[#D5D1C4] rounded-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#143727]" />
                      <span className="font-semibold text-[#151A18]">200ml Sachet</span>
                    </div>
                    <div className="p-2.5 bg-white border border-[#D5D1C4] rounded-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C89D4B]" />
                      <span className="font-semibold text-[#151A18]">250ml Bottle</span>
                    </div>
                    <div className="p-2.5 bg-white border border-[#D5D1C4] rounded-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C89D4B]" />
                      <span className="font-semibold text-[#151A18]">350ml Bottle</span>
                    </div>
                    <div className="p-2.5 bg-white border border-[#D5D1C4] rounded-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C89D4B]" />
                      <span className="font-semibold text-[#151A18]">500ml Bottle</span>
                    </div>
                    <div className="p-2.5 bg-white border border-[#D5D1C4] rounded-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#143727]" />
                      <span className="font-semibold text-[#151A18]">1 Litre Bottle</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openWholesaleQuote('yogurt')}
                    className="px-6 py-3 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>Explore Udderfall Yogurt</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C89D4B]" />
                  </button>
                  <button
                    onClick={() => setDistributorModalOpen(true)}
                    className="px-6 py-3 bg-[#EFECE6] text-[#143727] hover:bg-[#E2DFD5] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                  >
                    Distributor Inquiries
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-xs overflow-hidden border border-[#D5D1C4] shadow-md group/yogurt">
                  <img
                    src={images.udderfallYogurtHero}
                    alt="Udderfall Smooth Creamy Yogurt"
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-xs overflow-hidden border border-[#D5D1C4] group/straw">
                    <img
                      src={images.strawberryYogurt}
                      alt="Udderfall Strawberry Yogurt"
                      className="w-full h-36 object-cover"
                    />
                  </div>
                  <div className="relative rounded-xs overflow-hidden border border-[#D5D1C4] group/van">
                    <img
                      src={images.vanillaYogurt}
                      alt="Udderfall Vanilla Yogurt"
                      className="w-full h-36 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              SECTION 3 — UDDERFALL CHEESE & COMMERCIAL MOZZARELLA
              ========================================================================= */}
          <div
            id="udderfall-cheese"
            className="bg-white rounded-xs border border-[#DFDCDE] p-8 sm:p-12 shadow-xs"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
                <div className="relative rounded-xs overflow-hidden border border-[#D5D1C4] shadow-md group/mozz">
                  <img
                    src={images.commercialMozzarella}
                    alt="Commercial Mozzarella melt and stretch on pizza"
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-xs overflow-hidden border border-[#D5D1C4] group/block">
                    <img
                      src={images.mozzarellaBlock}
                      alt="Udderfall Mozzarella Blocks and Shreds"
                      className="w-full h-36 object-cover"
                    />
                  </div>
                  <div className="relative rounded-xs overflow-hidden border border-[#D5D1C4] group/wara">
                    <img
                      src={images.freshWaraCheese}
                      alt="Udderfall Artisan Fresh Cheese"
                      className="w-full h-36 object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <div className="inline-block px-3 py-1 bg-[#C89D4B] text-[#0D261B] text-xs font-bold uppercase tracking-widest rounded-xs">
                  Made for Homes. Designed for Business.
                </div>

                <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                  Udderfall Cheese
                </h3>

                <p className="text-base text-[#4A554F] leading-relaxed">
                  Our cheese range is developed to serve both everyday consumers and professional food businesses. From household kitchens to pizzerias, restaurants, hotels and bakeries, Udderfall provides versatile dairy solutions for a growing Nigerian food market.
                </p>

                {/* Commercial Mozzarella Spotlight */}
                <div className="p-6 bg-[#143727] text-white rounded-xs border border-[#234D37] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#C89D4B] font-bold">
                      Flagship Commercial Line
                    </span>
                    <Flame className="w-4 h-4 text-[#C89D4B]" />
                  </div>

                  <h4 className="font-heading font-extrabold text-xl text-white">
                    Commercial Mozzarella
                  </h4>

                  <p className="text-xs sm:text-sm text-[#CBDDD2] leading-relaxed">
                    Our mozzarella is designed for applications where melt, texture and stretch matter.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/15">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#E0BA6E] font-bold block mb-2">
                        Ideal for:
                      </span>
                      <ul className="text-xs space-y-1.5 text-[#E6EFEA]">
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                          <span>Pizzerias</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                          <span>Restaurants</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                          <span>Hotels & Hospitality</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                          <span>Bakeries & Pastry Kitchens</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                          <span>Fast-Food Businesses</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                          <span>Food-Service Operators</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#E0BA6E] font-bold block mb-2">
                        Packaging Options:
                      </span>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-white/10 rounded-xs border border-white/10">
                          <span className="font-semibold text-white">Blocks</span>
                          <p className="text-[10px] text-[#CBDDD2]">1kg, 2.5kg & 5kg commercial blocks</p>
                        </div>
                        <div className="p-2 bg-white/10 rounded-xs border border-white/10">
                          <span className="font-semibold text-white">Shreds</span>
                          <p className="text-[10px] text-[#CBDDD2]">Pre-shredded high-melt pizza format</p>
                        </div>
                        <div className="p-2 bg-white/10 rounded-xs border border-white/10">
                          <span className="font-semibold text-white">Vacuum Packs</span>
                          <p className="text-[10px] text-[#CBDDD2]">Aroma & moisture sealed portion packs</p>
                        </div>
                        <div className="p-2 bg-white/10 rounded-xs border border-white/10">
                          <span className="font-semibold text-white">Commercial Formats</span>
                          <p className="text-[10px] text-[#CBDDD2]">Custom batching for industrial food processors</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => openWholesaleQuote('mozzarella')}
                    className="px-7 py-3.5 bg-[#C89D4B] hover:bg-[#B38737] text-[#0D261B] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <span>Request a Wholesale Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => scrollToSection('who-we-serve')}
                    className="px-6 py-3.5 bg-[#EFECE6] text-[#143727] hover:bg-[#E2DFD5] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                  >
                    Explore Udderfall Cheese
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — WHY UDDERFALL?
          ========================================================================= */}
      <section id="why-udderfall" className="py-20 sm:py-28 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2D6A4F] font-bold block mb-2">
              WHY UDDERFALL?
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
              More Than Just Dairy
            </h2>
            <p className="text-base text-[#55625B] mt-3">
              Udderfall brings together the experience and resources of Genius Dairy Farms Limited with a clear focus on quality dairy processing and value addition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-white p-7 rounded-xs border border-[#E0DDD5] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#143727]/10 text-[#143727] flex items-center justify-center font-heading font-bold text-sm">
                01
              </div>
              <h3 className="font-heading font-bold text-lg text-[#151A18]">
                Local Milk Supply
              </h3>
              <p className="text-xs sm:text-sm text-[#55625B] leading-relaxed">
                Our connection to the Genius Dairy Farms ecosystem provides a foundation for local milk sourcing and dairy development.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-7 rounded-xs border border-[#E0DDD5] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#143727]/10 text-[#143727] flex items-center justify-center font-heading font-bold text-sm">
                02
              </div>
              <h3 className="font-heading font-bold text-lg text-[#151A18]">
                Dairy Experience
              </h3>
              <p className="text-xs sm:text-sm text-[#55625B] leading-relaxed">
                Built on years of experience in cattle rearing, milk production and livestock management.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-7 rounded-xs border border-[#E0DDD5] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#C89D4B]/20 text-[#0D261B] flex items-center justify-center font-heading font-bold text-sm">
                03
              </div>
              <h3 className="font-heading font-bold text-lg text-[#151A18]">
                Value Addition
              </h3>
              <p className="text-xs sm:text-sm text-[#55625B] leading-relaxed">
                We transform fresh milk into convenient, higher-value dairy products for consumers and businesses.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-7 rounded-xs border border-[#E0DDD5] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#143727]/10 text-[#143727] flex items-center justify-center font-heading font-bold text-sm">
                04
              </div>
              <h3 className="font-heading font-bold text-lg text-[#151A18]">
                Growing Product Range
              </h3>
              <p className="text-xs sm:text-sm text-[#55625B] leading-relaxed">
                Our focus begins with two core categories—yogurt and cheese—with opportunities for continued product development.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="bg-white p-7 rounded-xs border border-[#E0DDD5] shadow-xs space-y-3 md:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 rounded-full bg-[#143727] text-[#C89D4B] flex items-center justify-center font-heading font-bold text-sm">
                05
              </div>
              <h3 className="font-heading font-bold text-lg text-[#151A18]">
                Local Impact
              </h3>
              <p className="text-xs sm:text-sm text-[#55625B] leading-relaxed">
                By developing locally produced dairy products, Udderfall contributes to a stronger Nigerian dairy value chain and creates opportunities across production, processing and distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — OUR DAIRY JOURNEY
          ========================================================================= */}
      <section id="dairy-journey" className="py-20 sm:py-28 bg-[#0D261B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C89D4B] font-bold block mb-2">
              OUR DAIRY JOURNEY
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              From Fresh Milk to Pure Goodness
            </h2>
            <p className="text-base text-[#CBDDD2] mt-3">
              Every Udderfall product begins with a commitment to responsible sourcing, careful processing and quality-focused production.
            </p>
          </div>

          {/* 6 Sequential Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#143727] p-7 rounded-xs border border-[#234D37] space-y-3">
              <div className="text-xs font-mono font-bold text-[#C89D4B] tracking-wider">
                STEP 01
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                Milk Supply
              </h3>
              <p className="text-xs sm:text-sm text-[#CBDDD2] leading-relaxed">
                Fresh cow milk sourced through the dairy production ecosystem of Genius Dairy Farms Limited.
              </p>
            </div>

            <div className="bg-[#143727] p-7 rounded-xs border border-[#234D37] space-y-3">
              <div className="text-xs font-mono font-bold text-[#C89D4B] tracking-wider">
                STEP 02
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                Processing
              </h3>
              <p className="text-xs sm:text-sm text-[#CBDDD2] leading-relaxed">
                Milk is handled through controlled dairy processing procedures designed to preserve quality and consistency.
              </p>
            </div>

            <div className="bg-[#143727] p-7 rounded-xs border border-[#234D37] space-y-3">
              <div className="text-xs font-mono font-bold text-[#C89D4B] tracking-wider">
                STEP 03
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                Quality Control
              </h3>
              <p className="text-xs sm:text-sm text-[#CBDDD2] leading-relaxed">
                Production processes incorporate appropriate hygiene, testing and quality-control procedures.
              </p>
            </div>

            <div className="bg-[#143727] p-7 rounded-xs border border-[#234D37] space-y-3">
              <div className="text-xs font-mono font-bold text-[#C89D4B] tracking-wider">
                STEP 04
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                Packaging
              </h3>
              <p className="text-xs sm:text-sm text-[#CBDDD2] leading-relaxed">
                Products are packaged in convenient formats designed for households, retailers and food-service businesses.
              </p>
            </div>

            <div className="bg-[#143727] p-7 rounded-xs border border-[#234D37] space-y-3">
              <div className="text-xs font-mono font-bold text-[#C89D4B] tracking-wider">
                STEP 05
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                Distribution
              </h3>
              <p className="text-xs sm:text-sm text-[#CBDDD2] leading-relaxed">
                Our growing distribution network connects Udderfall products with consumers and businesses across Nigeria.
              </p>
            </div>

            <div className="bg-[#163B29] p-7 rounded-xs border border-[#C89D4B]/40 space-y-3">
              <div className="text-xs font-mono font-bold text-[#C89D4B] tracking-wider">
                STEP 06
              </div>
              <h3 className="font-heading font-bold text-lg text-[#E0BA6E]">
                Customer
              </h3>
              <p className="text-xs sm:text-sm text-[#E3EDE7] leading-relaxed">
                Quality dairy made to bring Pure Goodness, Naturally to more people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — OUR QUALITY COMMITMENT
          ========================================================================= */}
      <section id="quality-commitment" className="py-20 sm:py-28 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#2D6A4F] font-bold block">
                OUR QUALITY COMMITMENT
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                Quality at Every Stage
              </h2>
              <p className="text-base text-[#4A554F] leading-relaxed">
                At Udderfall, quality is not simply a product feature. It is part of how we approach our entire dairy value chain.
              </p>
              <p className="text-sm text-[#55625B]">
                We are committed to developing production systems that prioritize:
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 bg-white rounded-xs border border-[#E0DDD5]">
                  <CheckCircle className="w-5 h-5 text-[#143727] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm text-[#151A18] block">Food Safety</strong>
                    <span className="text-xs text-[#55625B]">Maintaining appropriate hygiene and food-safety practices throughout production.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white rounded-xs border border-[#E0DDD5]">
                  <CheckCircle className="w-5 h-5 text-[#143727] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm text-[#151A18] block">Quality Control</strong>
                    <span className="text-xs text-[#55625B]">Monitoring key production stages to promote product consistency.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white rounded-xs border border-[#E0DDD5]">
                  <CheckCircle className="w-5 h-5 text-[#143727] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm text-[#151A18] block">Traceability</strong>
                    <span className="text-xs text-[#55625B]">Maintaining appropriate production and batch records.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white rounded-xs border border-[#E0DDD5]">
                  <CheckCircle className="w-5 h-5 text-[#143727] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm text-[#151A18] block">Responsible Production</strong>
                    <span className="text-xs text-[#55625B]">Building efficient and sustainable dairy-processing practices.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white rounded-xs border border-[#E0DDD5]">
                  <CheckCircle className="w-5 h-5 text-[#143727] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm text-[#151A18] block">Continuous Improvement</strong>
                    <span className="text-xs text-[#55625B]">Continuously improving our products, processes and customer experience.</span>
                  </div>
                </div>
              </div>

              {/* Regulatory Notice Quote */}
              <div className="p-4 bg-[#EFECE6] border-l-4 border-[#143727] rounded-xs">
                <p className="text-xs sm:text-sm italic text-[#394840] leading-relaxed">
                  «All applicable regulatory, food-safety and certification requirements will be pursued and maintained as the business develops.»
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-xs overflow-hidden border border-[#D5D1C4] shadow-md group/hyg">
                <img
                  src={images.hygienicFacility}
                  alt="Quality control and hygienic dairy production"
                  className="w-full h-[460px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — WHO WE SERVE
          ========================================================================= */}
      <section id="who-we-serve" className="py-20 sm:py-28 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2D6A4F] font-bold block mb-2">
              WHO WE SERVE
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
              Dairy Products for Every Market
            </h2>
            <p className="text-base text-[#55625B] mt-3">
              Udderfall is building a distribution network capable of serving both consumers and commercial customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Supermarkets & Retailers */}
            <div className="bg-white p-6 rounded-xs border border-[#E0DDD5] shadow-xs space-y-2.5">
              <Store className="w-7 h-7 text-[#143727]" />
              <h3 className="font-heading font-bold text-base text-[#151A18]">
                Supermarkets & Retailers
              </h3>
              <p className="text-xs text-[#55625B] leading-relaxed">
                Convenient yogurt and cheese formats for retail shelves and chilled displays.
              </p>
            </div>

            {/* 2. Schools & Institutions */}
            <div className="bg-white p-6 rounded-xs border border-[#E0DDD5] shadow-xs space-y-2.5">
              <GraduationCap className="w-7 h-7 text-[#143727]" />
              <h3 className="font-heading font-bold text-base text-[#151A18]">
                Schools & Institutions
              </h3>
              <p className="text-xs text-[#55625B] leading-relaxed">
                Dairy products suitable for institutional food programmes and everyday consumption.
              </p>
            </div>

            {/* 3. Hotels & Restaurants */}
            <div className="bg-white p-6 rounded-xs border border-[#E0DDD5] shadow-xs space-y-2.5">
              <Building2 className="w-7 h-7 text-[#143727]" />
              <h3 className="font-heading font-bold text-base text-[#151A18]">
                Hotels & Restaurants
              </h3>
              <p className="text-xs text-[#55625B] leading-relaxed">
                Quality dairy products for kitchens, menus and hospitality operations.
              </p>
            </div>

            {/* 4. Bakeries & Pizzerias */}
            <div className="bg-white p-6 rounded-xs border border-[#E0DDD5] shadow-xs space-y-2.5">
              <Utensils className="w-7 h-7 text-[#C89D4B]" />
              <h3 className="font-heading font-bold text-base text-[#151A18]">
                Bakeries & Pizzerias
              </h3>
              <p className="text-xs text-[#55625B] leading-relaxed">
                Commercial cheese and mozzarella solutions for baking and pizza applications.
              </p>
            </div>

            {/* 5. Fast-Food Businesses */}
            <div className="bg-white p-6 rounded-xs border border-[#E0DDD5] shadow-xs space-y-2.5">
              <Flame className="w-7 h-7 text-[#143727]" />
              <h3 className="font-heading font-bold text-base text-[#151A18]">
                Fast-Food Businesses
              </h3>
              <p className="text-xs text-[#55625B] leading-relaxed">
                Reliable dairy supply for growing food-service operations.
              </p>
            </div>

            {/* 6. Distributors & Wholesalers */}
            <div className="bg-white p-6 rounded-xs border border-[#E0DDD5] shadow-xs space-y-2.5">
              <Truck className="w-7 h-7 text-[#143727]" />
              <h3 className="font-heading font-bold text-base text-[#151A18]">
                Distributors & Wholesalers
              </h3>
              <p className="text-xs text-[#55625B] leading-relaxed">
                Factory-connected supply opportunities for businesses looking to distribute quality Nigerian dairy products.
              </p>
            </div>

            {/* 7. Households & Families */}
            <div className="bg-white p-6 rounded-xs border border-[#E0DDD5] shadow-xs space-y-2.5 md:col-span-2">
              <Users className="w-7 h-7 text-[#143727]" />
              <h3 className="font-heading font-bold text-base text-[#151A18]">
                Households & Families
              </h3>
              <p className="text-xs text-[#55625B] leading-relaxed">
                Convenient dairy products for everyday meals, refreshment and enjoyment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CUSTOMER TESTIMONIAL CAROUSEL — REVIEWS & CASE STUDIES
          ========================================================================= */}
      <CustomerTestimonialCarousel />

      {/* =========================================================================
          SECTION 8 — DISTRIBUTION & PARTNERSHIPS
          ========================================================================= */}
      <section id="distribution-partners" className="py-20 sm:py-28 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#143727] text-white p-8 sm:p-14 rounded-xs border border-[#234D37] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C89D4B] font-bold block">
                  DISTRIBUTION & PARTNERSHIPS
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Let's Grow Together
                </h2>
                <p className="text-sm sm:text-base text-[#CBDDD2] leading-relaxed">
                  We are building relationships with distributors, retailers and food businesses that share our vision of making quality Nigerian dairy products more accessible.
                </p>

                <div className="pt-2">
                  <h3 className="font-heading font-bold text-xl text-[#E0BA6E] mb-2">
                    Become an Udderfall Distributor
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CBDDD2] leading-relaxed mb-4">
                    Whether you operate a supermarket, wholesale business, food-service company or distribution network, Udderfall offers an opportunity to grow with an emerging Nigerian dairy brand.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#C89D4B] font-bold mb-3">
                    Why Partner With Us?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#E3EDE7]">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                      <span>Direct supply from Iseyin, Oyo State</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                      <span>Growing portfolio of yogurt and cheese products</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                      <span>Commercial dairy solutions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                      <span>Dedicated business support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                      <span>Opportunities for regional distribution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                      <span>Long-term partnership opportunities</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white text-[#151A18] p-6 sm:p-8 rounded-xs shadow-lg space-y-4">
                <div className="border-b border-[#EAE7DE] pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C89D4B] block">
                    Fast Application
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#151A18]">
                    Distributor Inquiry Form
                  </h3>
                </div>

                {distributorSubmitted ? (
                  <div className="py-6 text-center space-y-3">
                    <CheckCircle className="w-12 h-12 text-[#143727] mx-auto" />
                    <h4 className="font-heading font-bold text-lg text-[#151A18]">
                      Request Received
                    </h4>
                    <p className="text-xs text-[#55625B] leading-relaxed">
                      Thank you. Our distribution desk will reach out within 24 business hours to discuss allocation, cold-chain schedules, and wholesale pricing.
                    </p>
                    <button
                      onClick={() => setDistributorSubmitted(false)}
                      className="px-5 py-2 bg-[#143727] text-white text-xs font-semibold uppercase tracking-wider rounded-xs mt-2"
                    >
                      Submit Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleDistributorSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-[#151A18] mb-1">Business Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Western Grocers Ltd"
                        value={distributorForm.businessName}
                        onChange={(e) => setDistributorForm({ ...distributorForm, businessName: e.target.value })}
                        className="w-full px-3 py-2 border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-[#151A18] mb-1">Contact Person *</label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={distributorForm.contactPerson}
                          onChange={(e) => setDistributorForm({ ...distributorForm, contactPerson: e.target.value })}
                          className="w-full px-3 py-2 border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#151A18] mb-1">City / Region *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ibadan, Oyo"
                          value={distributorForm.city}
                          onChange={(e) => setDistributorForm({ ...distributorForm, city: e.target.value })}
                          className="w-full px-3 py-2 border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-[#151A18] mb-1">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+234..."
                          value={distributorForm.phone}
                          onChange={(e) => setDistributorForm({ ...distributorForm, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#151A18] mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="sales@business.com"
                          value={distributorForm.email}
                          onChange={(e) => setDistributorForm({ ...distributorForm, email: e.target.value })}
                          className="w-full px-3 py-2 border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-[#151A18] mb-1">Business Type</label>
                      <select
                        value={distributorForm.businessType}
                        onChange={(e) => setDistributorForm({ ...distributorForm, businessType: e.target.value })}
                        className="w-full px-3 py-2 border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                      >
                        <option>Supermarket / Retailer</option>
                        <option>Regional Wholesaler</option>
                        <option>Food-Service / Hospitality</option>
                        <option>Bakery / Pizzeria</option>
                        <option>Institutional Catering</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#143727] hover:bg-[#0D261B] text-white font-bold uppercase tracking-wider rounded-xs cursor-pointer shadow-sm transition-colors text-center"
                      >
                        Become a Distributor
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — GENIUS DAIRY FARMS LIMITED: THE COMPANY BEHIND UDDERFALL
          ========================================================================= */}
      <section id="company-behind" className="py-20 sm:py-28 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <FounderProfileCard variant="compact" />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#2D6A4F] font-bold block">
                GENIUS DAIRY FARMS LIMITED
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight leading-tight">
                The Company Behind Udderfall
              </h2>
              <p className="text-base text-[#4A554F] leading-relaxed">
                Udderfall Yogurt & Cheese is a dairy brand of Genius Dairy Farms Limited, a commercial dairy enterprise based in Iseyin, Oyo State, Nigeria.
              </p>

              <div>
                <h3 className="text-xs uppercase tracking-wider text-[#143727] font-bold mb-3">
                  Genius Dairy Farms brings together:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#2D3A32]">
                  <div className="flex items-center gap-2 p-2.5 bg-white border border-[#E0DDD5] rounded-xs">
                    <CheckCircle className="w-4 h-4 text-[#C89D4B] shrink-0" />
                    <span>Dairy farming experience</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-white border border-[#E0DDD5] rounded-xs">
                    <CheckCircle className="w-4 h-4 text-[#C89D4B] shrink-0" />
                    <span>Local milk production</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-white border border-[#E0DDD5] rounded-xs">
                    <CheckCircle className="w-4 h-4 text-[#C89D4B] shrink-0" />
                    <span>Livestock management</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-white border border-[#E0DDD5] rounded-xs">
                    <CheckCircle className="w-4 h-4 text-[#C89D4B] shrink-0" />
                    <span>Farm infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-white border border-[#E0DDD5] rounded-xs">
                    <CheckCircle className="w-4 h-4 text-[#C89D4B] shrink-0" />
                    <span>Dairy value-chain development</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-white border border-[#E0DDD5] rounded-xs">
                    <CheckCircle className="w-4 h-4 text-[#C89D4B] shrink-0" />
                    <span>Agricultural knowledge & capacity building</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#4A554F] leading-relaxed">
                Udderfall represents the company's move toward greater value addition—connecting local milk production with professionally processed dairy products for Nigerian consumers and businesses.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3.5 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer inline-flex items-center gap-2 group shadow-sm"
                >
                  <span>Discover Genius Dairy Farms</span>
                  <ArrowRight className="w-4 h-4 text-[#C89D4B] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 — OUR LOCATION
          ========================================================================= */}
      <section id="our-location" className="py-16 sm:py-20 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-xs border border-[#E0DDD5] shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#2D6A4F] font-bold">
                  <MapPin className="w-4 h-4 text-[#C89D4B]" />
                  <span>OUR LOCATION</span>
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                  Proudly Made in Iseyin
                </h2>

                <div className="space-y-1 text-sm sm:text-base text-[#151A18] font-medium">
                  <p className="font-heading font-bold text-lg text-[#143727]">
                    Genius Dairy Farms Limited / Udderfall
                  </p>
                  <p className="text-[#55625B]">
                    Kilometer 4, Olora Village, along the Iseyin–Ibadan Expressway, Iseyin, Oyo State, Nigeria.
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#55625B] leading-relaxed max-w-2xl">
                  Our location connects our dairy operations with a growing agricultural community and major consumer markets across southwestern Nigeria.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <a
                  href={COMPANY_DETAILS.phoneTel}
                  className="px-5 py-3 bg-[#143727] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#0D261B] text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#C89D4B]" />
                  <span>Call Dairy Desk</span>
                </a>
                <a
                  href={COMPANY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#1EBE5D] text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Location Pin</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11 — LET'S TALK DAIRY (CONTACT & ACTION BUTTONS)
          ========================================================================= */}
      <section id="udderfall-contact" className="py-20 sm:py-28 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#143727] text-white p-8 sm:p-14 rounded-xs border border-[#234D37] shadow-xl">
            <div className="max-w-3xl space-y-4 mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C89D4B] font-bold block">
                LET'S TALK DAIRY
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Bring Pure Goodness to More People
              </h2>
              <p className="text-sm sm:text-base text-[#CBDDD2] leading-relaxed">
                Whether you are looking for Udderfall products, wholesale supply, distribution opportunities or strategic business partnerships, we would love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-xs sm:text-sm border-y border-white/15 py-6">
              <div className="space-y-1">
                <span className="text-xs text-[#C89D4B] uppercase tracking-wider font-bold block">
                  Phone / WhatsApp
                </span>
                <a href={COMPANY_DETAILS.phoneTel} className="font-mono text-white text-base hover:underline block">
                  {COMPANY_DETAILS.phone}
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-[#C89D4B] uppercase tracking-wider font-bold block">
                  Email
                </span>
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-white text-base hover:underline block">
                  {COMPANY_DETAILS.email}
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-[#C89D4B] uppercase tracking-wider font-bold block">
                  Location
                </span>
                <span className="text-white text-base block">
                  Iseyin, Oyo State, Nigeria
                </span>
              </div>
            </div>

            {/* Requested 4 Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={COMPANY_DETAILS.phoneTel}
                className="px-7 py-3.5 bg-[#C89D4B] hover:bg-[#B38737] text-[#0D261B] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-md flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>

              <a
                href={COMPANY_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-md flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`mailto:${COMPANY_DETAILS.email}?subject=Udderfall%20Dairy%20Inquiry`}
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#C89D4B]" />
                <span>Send an Email</span>
              </a>

              <button
                onClick={() => setDistributorModalOpen(true)}
                className="px-7 py-3.5 bg-white hover:bg-[#F4F4F0] text-[#143727] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-md"
              >
                Become a Distributor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12 — FINAL BRAND STATEMENT
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-[#F4F4F0] border-t border-[#EAE7DE] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C89D4B] font-bold block">
            FINAL BRAND STATEMENT
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#151A18] tracking-tight">
            From Fresh Milk. To Pure Goodness.
          </h2>
          <p className="text-base sm:text-lg text-[#55625B] leading-relaxed max-w-2xl mx-auto">
            Udderfall is more than a dairy products brand. It represents a vision to strengthen Nigeria's dairy value chain by connecting local milk production with quality processing, thoughtful product development and responsible growth.
          </p>
          <div className="pt-2">
            <span className="font-heading text-xl sm:text-2xl font-bold text-[#143727] tracking-tight">
              Pure Goodness, Naturally.
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13 — UDDERFALL DEDICATED BRAND FOOTER
          ========================================================================= */}
      <footer className="bg-[#091B13] text-white border-t border-[#163B29] pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <Logo size="sm" className="bg-white/10 p-0.5 rounded-full" />
                <div>
                  <h3 className="font-heading font-extrabold text-lg tracking-tight text-white">
                    UDDERFALL
                  </h3>
                  <span className="text-xs tracking-wider text-[#C89D4B] font-bold uppercase block">
                    Yogurt & Cheese
                  </span>
                </div>
              </div>
              <div className="text-xs text-[#9EB6A8] leading-relaxed">
                <span className="text-[#E0BA6E] font-medium block mb-1">A Genius Dairy Farms Brand</span>
                <span>Pure Goodness, Naturally. Made with fresh milk from our 60-acre dairy development facility in Iseyin, Oyo State.</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D4B]">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs text-[#CBDDD2]">
                <li>
                  <button onClick={() => scrollToSection('udderfall-hero')} className="hover:text-white cursor-pointer">
                    Home (Udderfall)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('farm-to-table')} className="hover:text-white cursor-pointer">
                    About Udderfall
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('udderfall-yogurt')} className="hover:text-white cursor-pointer">
                    Yogurt
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('udderfall-cheese')} className="hover:text-white cursor-pointer">
                    Cheese & Mozzarella
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('why-udderfall')} className="hover:text-white cursor-pointer">
                    Why Udderfall
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('dairy-journey')} className="hover:text-white cursor-pointer">
                    Our Dairy Journey
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('quality-commitment')} className="hover:text-white cursor-pointer">
                    Quality & Food Safety
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('who-we-serve')} className="hover:text-white cursor-pointer">
                    Markets We Serve
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('distribution-partners')} className="hover:text-white cursor-pointer">
                    Distribution & Partners
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('udderfall-contact')} className="hover:text-white cursor-pointer">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Business Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D4B]">
                Business
              </h4>
              <ul className="space-y-2 text-xs text-[#CBDDD2]">
                <li>
                  <button onClick={() => setDistributorModalOpen(true)} className="hover:text-white cursor-pointer text-left">
                    Become a Distributor
                  </button>
                </li>
                <li>
                  <button onClick={() => openWholesaleQuote('all')} className="hover:text-white cursor-pointer text-left">
                    Wholesale Supply
                  </button>
                </li>
                <li>
                  <button onClick={() => openWholesaleQuote('mozzarella')} className="hover:text-white cursor-pointer text-left">
                    B2B Commercial Supply
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('distribution-partners')} className="hover:text-white cursor-pointer text-left">
                    Partnerships
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D4B]">
                Contact
              </h4>
              <div className="space-y-2 text-xs text-[#CBDDD2]">
                <p>Iseyin, Oyo State, Nigeria</p>
                <p>
                  <a href={COMPANY_DETAILS.phoneTel} className="font-mono text-[#E0BA6E] hover:underline">
                    {COMPANY_DETAILS.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-[#E0BA6E] hover:underline">
                    {COMPANY_DETAILS.email}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A9385] gap-4">
            <p>© 2026 Genius Dairy Farms Limited. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer">
                Genius Corporate Portal
              </button>
              <span>•</span>
              <button onClick={() => onNavigate('contact')} className="hover:text-white cursor-pointer">
                Direct Desk
              </button>
            </div>
          </div>
        </div>
      </footer>

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
          <div className="bg-[#FBFBFA] border border-[#D5D1C4] max-w-xl w-full rounded-xs shadow-2xl p-6 sm:p-8 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE7DE]">
              <div className="flex items-center gap-3">
                <Logo size="sm" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#C89D4B] font-bold block">
                    Udderfall Commercial
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#151A18]">
                    Become an Udderfall Distributor
                  </h3>
                </div>
              </div>
              <button
                onClick={() => {
                  setDistributorModalOpen(false);
                  setDistributorSubmitted(false);
                }}
                className="text-[#66726B] hover:text-[#151A18] text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {distributorSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-[#143727] mx-auto" />
                <h4 className="font-heading font-bold text-lg text-[#151A18]">
                  Application Successfully Logged
                </h4>
                <p className="text-xs text-[#55625B] leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{distributorForm.contactPerson}</strong>. Our commercial trade manager will contact you within 24–48 hours to discuss pricing schedules and delivery terms for {distributorForm.city}.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setDistributorSubmitted(false);
                      setDistributorModalOpen(false);
                    }}
                    className="px-5 py-2.5 bg-[#143727] text-white text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDistributorSubmit} className="pt-4 space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-[#151A18] mb-1">
                    Store / Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Premier Mart Ibadan"
                    value={distributorForm.businessName}
                    onChange={(e) =>
                      setDistributorForm({ ...distributorForm, businessName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#151A18] mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={distributorForm.contactPerson}
                      onChange={(e) =>
                        setDistributorForm({ ...distributorForm, contactPerson: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#151A18] mb-1">
                      City / State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ibadan, Oyo"
                      value={distributorForm.city}
                      onChange={(e) =>
                        setDistributorForm({ ...distributorForm, city: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#151A18] mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234..."
                      value={distributorForm.phone}
                      onChange={(e) =>
                        setDistributorForm({ ...distributorForm, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#151A18] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="orders@retail.com"
                      value={distributorForm.email}
                      onChange={(e) =>
                        setDistributorForm({ ...distributorForm, email: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#151A18] mb-1">
                    Business Model / Outlet Count
                  </label>
                  <select
                    value={distributorForm.businessType}
                    onChange={(e) =>
                      setDistributorForm({ ...distributorForm, businessType: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                  >
                    <option>Supermarket (1-3 Outlets)</option>
                    <option>Supermarket Chain (4+ Outlets)</option>
                    <option>Regional Wholesaler / Depot</option>
                    <option>Pizzeria / Bakery / Restaurant Chain</option>
                    <option>Hotel / Hospitality Supplier</option>
                    <option>School / University Food Programme</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#151A18] mb-1">
                    Message / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your distribution territory or initial volume..."
                    value={distributorForm.message}
                    onChange={(e) =>
                      setDistributorForm({ ...distributorForm, message: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setDistributorModalOpen(false)}
                    className="px-4 py-2 font-semibold text-[#66726B] hover:text-[#151A18] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#143727] hover:bg-[#0D261B] text-white font-bold uppercase tracking-wider rounded-xs cursor-pointer shadow-xs"
                  >
                    Submit Distributor Request
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
