import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Building2,
  GraduationCap,
  Sparkles,
  Milk,
  CheckCircle2,
  MessageCircle,
  Phone,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { PageId } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { Logo } from '../components/Logo';
import { useBrandMedia, useSiteImages } from '../context/BrandMediaContext';
import {
  getCustomInsightImages,
  loadCustomInsightImagesAsync,
} from '../utils/insightsImageStorage';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenPartnerModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenPartnerModal,
}) => {
  const { heroUrl } = useBrandMedia();
  const images = useSiteImages();
  const [customInsightImage, setCustomInsightImage] = useState<string>('/1200x794.jpg');

  // Load custom uploaded insight image without altering or replacing it
  useEffect(() => {
    const existing = getCustomInsightImages();
    const firstCustom = Object.values(existing)[0];
    if (firstCustom) {
      setCustomInsightImage(firstCustom);
    }

    loadCustomInsightImagesAsync().then((imgs) => {
      if (imgs && Object.keys(imgs).length > 0) {
        const val = Object.values(imgs)[0];
        if (val) {
          setCustomInsightImage(val);
        }
      }
    });
  }, []);

  const coreDivisions = [
    {
      id: 'udderfall',
      badge: 'Consumer Dairy Products',
      title: 'Udderfall Yogurt & Cheese',
      tagline: 'From Quality Milk to Quality Products',
      description:
        'Pure whole milk stirred yogurts, authentic artisan wara, high-protein Greek yogurts, and semi-hard cheeses crafted with strict cold-chain integrity and zero synthetic chemicals.',
      image: images.udderfallYogurtHero,
      ctaLabel: 'Explore Dairy Products',
      targetPage: 'udderfall' as PageId,
      highlights: [
        'Stirred & High-Protein Greek Yogurts',
        'Artisan Fresh Wara & Farmstead Cheese',
        '100% Farm Fresh Whole Milk',
        'Direct Cold-Chain Temperature Control',
      ],
    },
    {
      id: 'academy',
      badge: 'Accredited Capacity Hub',
      title: 'Genius Dairy Academy',
      tagline: 'Knowledge. Skills. Opportunity.',
      description:
        'Accredited educational division (RC: 8888771) delivering residential hands-on training, bovine genetics & artificial insemination, and university SIWES internships on an active 60-acre ranch.',
      image: images.studentGroup,
      ctaLabel: 'Discover Genius Academy',
      targetPage: 'academy' as PageId,
      highlights: [
        'Officially Registered Division (RC: 8888771)',
        'Bovine Genetics & Artificial Insemination',
        'Over 70% Practical In-Barn Training',
        'Structured SIWES Student Placements',
      ],
    },
    {
      id: 'farm',
      badge: '60-Acre Commercial Ranch',
      title: 'Commercial Farm & Livestock',
      tagline: 'Precision milk harvesting and herd genetics in Oyo State',
      description:
        'Operating an intensive 60-acre commercial dairy ranch in Iseyin featuring climate-adapted milking herds yielding 10–15L daily, permanent Super Napier forage banks, and veterinary hygiene.',
      image: images.corporateFarmFacility,
      ctaLabel: 'Explore Farm & Livestock',
      targetPage: 'farm' as PageId,
      highlights: [
        '60-Acre Commercial Dairy Facility in Iseyin',
        'Selective Breeding Yielding 10–15L Daily / Cow',
        'Year-Round Silage Forage Security',
        'Automated Stainless Milking Equipment',
      ],
    },
    {
      id: 'insights',
      badge: 'Knowledge & Updates',
      title: 'Technical Insights & News',
      tagline: 'Field perspectives on tropical dairy farming in Nigeria',
      description:
        'Insights, research notes, and field updates covering tropical dairy genetics, silage conservation, agribusiness economics, and commercial ranching developments.',
      image: customInsightImage || '/1200x794.jpg',
      ctaLabel: 'Read Dairy Insights',
      targetPage: 'insights' as PageId,
      highlights: [
        'Pasture Agronomy & Silage Strategies',
        'Cattle Breeding & Genetic Selection',
        'Agribusiness Investment Perspectives',
        'Genius Dairy Field Milestones',
      ],
    },
  ];

  return (
    <div className="w-full bg-[#FCFCFA] text-[#151A18] selection:bg-[#C89D4B]/30 selection:text-[#0D261B]">
      {/* =========================================================================
          HERO SECTION — SIMPLE, FOCUSED & HIGH-IMPACT
          ========================================================================= */}
      <section
        id="hero-section"
        className="relative min-h-[88vh] flex items-center bg-[#06140D] text-white overflow-hidden"
      >
        {/* Visual Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroUrl}
            alt="Genius Dairy Farms commercial dairy operations in Nigeria"
            className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
          />
          {/* Depth Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#05110B]/95 via-[#081B12]/88 to-[#0B2519]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06140D] via-transparent to-[#05110B]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:36px_36px] opacity-15" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-3xl">
            {/* Corporate Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#143727]/90 border border-[#C89D4B]/40 text-[#E0BA6E] text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-md backdrop-blur-md">
              <Logo size="xs" />
              <span>GENIUS DAIRY FARMS LIMITED</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 drop-shadow-sm">
              Building the Future of{' '}
              <span className="font-serif italic text-[#C89D4B] font-normal">
                Dairy Farming
              </span>{' '}
              in Nigeria
            </h1>

            {/* Short Supporting Description */}
            <p className="text-base sm:text-xl text-[#CBDDD2] max-w-2xl font-normal leading-relaxed mb-6">
              Pioneering commercial dairy ranching, wholesome dairy processing through Udderfall, and practical agribusiness education via Genius Dairy Academy from our 60-acre facility in Iseyin, Oyo State.
            </p>

            {/* Location Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-[#C89D4B] font-medium tracking-wide mb-10">
              <MapPin className="w-4 h-4 shrink-0 text-[#C89D4B]" />
              <span>60-Acre Dairy Facility • Iseyin, Oyo State, Nigeria • Established 2009</span>
            </div>

            {/* Clear Navigation Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-explore-products-btn"
                onClick={() => onNavigate('udderfall')}
                className="px-8 py-4 bg-[#C89D4B] hover:bg-[#B38737] text-[#0D261B] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2.5 group"
              >
                <span>Explore Our Dairy Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-discover-academy-btn"
                onClick={() => onNavigate('academy')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 backdrop-blur-md shadow-md"
              >
                <span>Discover Our Academy</span>
                <ArrowUpRight className="w-4 h-4 text-[#C89D4B]" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credibility Strip */}
        <div className="absolute bottom-0 inset-x-0 bg-[#040E08]/90 backdrop-blur-md border-t border-white/10 py-3.5 hidden md:block">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between text-xs font-medium text-[#9BB0A3]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C89D4B]" />
              <span>Commercial Dairy Ranching</span>
            </span>
            <span className="text-[#C89D4B]">•</span>
            <span>Udderfall Yogurt &amp; Artisan Cheese</span>
            <span className="text-[#C89D4B]">•</span>
            <span>Genius Dairy Academy (RC: 8888771)</span>
            <span className="text-[#C89D4B]">•</span>
            <span>Sustainable Pasture &amp; High-Yield Genetics</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY OPERATIONAL METRICS
          ========================================================================= */}
      <section className="bg-[#143727] text-white py-8 border-b border-[#1A4532]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="border-r border-white/10 last:border-none px-2">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#C89D4B]">60 Acres</div>
              <div className="text-xs uppercase tracking-wider text-[#CBDDD2] mt-1 font-semibold">Commercial Facility</div>
              <div className="text-[11px] text-[#8DA799] mt-0.5">Iseyin, Oyo State</div>
            </div>
            <div className="border-r border-white/10 last:border-none px-2">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#C89D4B]">10–15L</div>
              <div className="text-xs uppercase tracking-wider text-[#CBDDD2] mt-1 font-semibold">Daily Yield / Cow</div>
              <div className="text-[11px] text-[#8DA799] mt-0.5">Selective Genetics</div>
            </div>
            <div className="border-r border-white/10 last:border-none px-2">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#C89D4B]">15+ Years</div>
              <div className="text-xs uppercase tracking-wider text-[#CBDDD2] mt-1 font-semibold">Field Track Record</div>
              <div className="text-[11px] text-[#8DA799] mt-0.5">Established 2009</div>
            </div>
            <div className="px-2">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#C89D4B]">RC: 8888771</div>
              <div className="text-xs uppercase tracking-wider text-[#CBDDD2] mt-1 font-semibold">Accredited Academy</div>
              <div className="text-[11px] text-[#8DA799] mt-0.5">Agribusiness Education</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WELCOME / ABOUT SPOTLIGHT (FOCUSED & CONCISE)
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-[#FAF8F3] border-b border-[#EAE6DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#143727]/10 text-[#143727] text-xs uppercase tracking-[0.2em] font-bold">
                Welcome to Genius Dairy Farms
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight leading-tight">
                Transforming Nigerian Dairy Through{' '}
                <span className="font-serif italic text-[#143727] font-normal">
                  Science, Genetics &amp; Quality
                </span>
              </h2>
              <p className="text-base text-[#4A554F] leading-relaxed">
                Founded in 2009 with just five cattle, Genius Dairy Farms Limited has grown into an integrated livestock and dairy agribusiness based in Iseyin, Oyo State. We demonstrate that Nigeria can produce world-class dairy products locally through disciplined ranching, high-tonnage forage agronomy, and modern cold-chain handling.
              </p>
              <p className="text-sm text-[#55625B] leading-relaxed">
                Our 60-acre integrated campus powers consumer dairy processing under the Udderfall brand, intensive herd management, and practical agribusiness education through the accredited Genius Dairy Academy.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4 text-[#C89D4B]" />
                </button>
                <button
                  onClick={() => onNavigate('farm')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#F4F4F0] text-[#143727] border border-[#143727] text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  <span>Explore 60-Acre Ranch</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-7 rounded-3xl border border-[#E0DDD5] shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#151A18]">Integrated Value Chain</h4>
                    <span className="text-xs text-[#6F7D75]">From pasture to packaged dairy</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-[#4A554F]">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#143727] shrink-0 mt-0.5" />
                    <span>Commercial milk harvesting with 10–15L daily cow yields</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#143727] shrink-0 mt-0.5" />
                    <span>Udderfall stirred yogurts, Greek yogurts, wara, and cheeses</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#143727] shrink-0 mt-0.5" />
                    <span>Genius Dairy Academy hands-on practical agribusiness training</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#143727] shrink-0 mt-0.5" />
                    <span>Commercial advisory and turnkey dairy farm setup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CORE DIVISIONS (FOCUSED GATEWAY CARDS TO SEPARATE PAGES)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FCFCFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#143727]/10 text-[#143727] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Operational Divisions
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#151A18] tracking-tight">
              Explore Our <span className="font-serif italic text-[#143727] font-normal">Core Areas</span>
            </h2>
            <p className="text-base text-[#55625B] mt-3 leading-relaxed">
              Discover each operational arm of Genius Dairy Farms Limited. Visit our dedicated sections to learn more about our products, academy curriculum, and ranch operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreDivisions.map((division) => (
              <div
                key={division.id}
                className="bg-white rounded-3xl border border-[#E0DDD5] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="h-60 relative overflow-hidden bg-[#0A1D14]">
                    <img
                      src={division.image}
                      alt={division.title}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== window.location.origin + '/1200x794.jpg') {
                          target.src = '/1200x794.jpg';
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-[#143727] shadow-sm">
                      {division.badge}
                    </div>
                    <div className="absolute bottom-4 left-6 right-6 text-white">
                      <span className="text-xs font-medium text-[#C89D4B] tracking-wider uppercase block mb-1">
                        {division.tagline}
                      </span>
                      <h3 className="font-heading font-extrabold text-2xl text-white">
                        {division.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-7 space-y-4">
                    <p className="text-sm text-[#4A554F] leading-relaxed">
                      {division.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#F0ECE1]">
                      {division.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#2D3A32]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#143727] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <button
                    onClick={() => onNavigate(division.targetPage)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm group-hover:bg-[#C89D4B] group-hover:text-[#0D261B] cursor-pointer"
                  >
                    <span>{division.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOCUSED CALL TO ACTION
          ========================================================================= */}
      <section className="py-20 bg-[#0D261B] text-white border-t border-[#1C3A2B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163B29] text-[#C89D4B] text-xs font-bold uppercase tracking-widest border border-[#C89D4B]/30">
              Commercial Agribusiness Partnership
            </span>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Let’s Build a Stronger Dairy Value Chain Together
            </h2>

            <p className="text-base sm:text-lg text-[#CBDDD2] max-w-2xl mx-auto leading-relaxed">
              Whether you are seeking wholesale dairy supplies, accredited hands-on agribusiness education, commercial farm investment, or advisory setup, Genius Dairy Farms Limited is ready to partner with you.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenPartnerModal}
                className="w-full sm:w-auto px-8 py-4 bg-[#C89D4B] hover:bg-[#B38737] text-[#0D261B] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Partner With Us</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Contact Our Office</span>
              </button>

              <a
                href={COMPANY_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
