import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  TrendingUp,
  Dna,
  Sprout,
  GraduationCap,
  Layers,
  Sparkles,
  Award,
  Globe2,
  Users,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Building2,
  Compass,
  Video,
  Camera,
  Smartphone,
} from 'lucide-react';
import { PageId } from '../types';
import { COMPANY_DETAILS, TIMELINE_MILESTONES, THREE_PLATFORMS, CORE_VALUES, IMPACT_AREAS } from '../data/companyData';
import { IMAGES } from '../data/images';
import { Logo } from '../components/Logo';
import { useBrandMedia, useSiteImages } from '../context/BrandMediaContext';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenPartnerModal: () => void;
  onOpenDistributorModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenPartnerModal,
  onOpenDistributorModal,
}) => {
  const { heroUrl, farmUrl, customSlots } = useBrandMedia();
  const images = useSiteImages();
  return (
    <div className="w-full">
      {/* =========================================================================
          SECTION 1 — HERO
          ========================================================================= */}
      <section
        id="hero-section"
        className="relative min-h-[92vh] flex items-center justify-center bg-[#081710] text-white overflow-hidden"
      >
        {/* Real Agricultural Background Image with refined corporate overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroUrl}
            alt="Healthy dairy cattle grazing on green pasture at Genius Dairy Farms"
            className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07150E]/95 via-[#0A1F15]/90 to-[#0A1F15]/75" />
          <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 text-center sm:text-left">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#163B29]/90 border border-[#C89D4B]/40 text-[#E0BA6E] text-xs font-semibold tracking-[0.2em] uppercase mb-8 shadow-md backdrop-blur-md">
            <Logo size="xs" />
            <span>GENIUS DAIRY FARMS LIMITED</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 max-w-4xl drop-shadow-sm">
            From Five Cows to a Modern <span className="font-serif italic text-[#C89D4B] font-normal">Dairy Enterprise</span>
          </h1>

          <p className="text-base sm:text-xl text-[#CBDDD2] max-w-2xl font-normal leading-relaxed mb-8">
            Building a commercially viable, technologically driven and sustainable dairy ecosystem for the future of Nigeria.
          </p>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-[#C89D4B] font-medium tracking-wide mb-10">
            <MapPin className="w-4 h-4 shrink-0 text-[#C89D4B]" />
            <span>60-Acre Dairy Facility | Iseyin, Oyo State, Nigeria</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              id="hero-primary-cta"
              onClick={() => onNavigate('about')}
              className="px-8 py-4 bg-[#C89D4B] hover:bg-[#B38737] text-[#0D261B] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2.5 group"
            >
              <span>Explore Our Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-secondary-cta"
              onClick={() => onNavigate('farm')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 backdrop-blur-md shadow-md"
            >
              <span>Explore Our Farm</span>
              <ArrowUpRight className="w-4 h-4 text-[#C89D4B]" />
            </button>
          </div>
        </div>

        {/* Bottom subtle banner highlight */}
        <div className="absolute bottom-0 inset-x-0 bg-[#05100B]/85 backdrop-blur-md border-t border-white/10 py-3.5 hidden md:block">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between text-xs font-medium text-[#9BB0A3]">
            <span>Commercial Dairy Ranching</span>
            <span className="text-[#C89D4B]">•</span>
            <span>Udderfall Dairy Products</span>
            <span className="text-[#C89D4B]">•</span>
            <span>Genius Dairy Farm Academy</span>
            <span className="text-[#C89D4B]">•</span>
            <span>Southwest Nigeria Dairy Development</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — CORPORATE INTRODUCTION
          ========================================================================= */}
      <section id="corporate-intro-section" className="py-24 sm:py-32 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left side: Large farm image */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -top-4 -left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#143727]/15 shadow-lg hidden sm:flex items-center gap-2.5">
                <Logo size="xs" />
                <span className="text-[11px] font-extrabold text-[#143727] tracking-wider uppercase">
                  Genius Dairy Farms Ltd.
                </span>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E3DFD5] group/facility ring-1 ring-black/5">
                <img
                  src={images.corporateFarmFacility}
                  alt="Genius Dairy Farms commercial facility in Iseyin"
                  className="w-full h-[420px] sm:h-[500px] object-cover transition-transform duration-700 group-hover/facility:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] uppercase tracking-widest text-[#C89D4B] font-bold block mb-1">
                    Facility Overview
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-white/95 leading-snug">
                    Strategic 60-acre dairy development site in Iseyin, Oyo State
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-5 bg-[#143727] text-white p-6 rounded-2xl border border-[#C89D4B]/40 shadow-xl hidden sm:block">
                <div className="text-3xl font-heading font-extrabold text-[#C89D4B]">60 Acres</div>
                <div className="text-xs text-[#CBDDD2] uppercase tracking-wider font-semibold">Dedicated Facility</div>
              </div>
            </div>

            {/* Right side: Corporate Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#143727]/10 text-[#143727] text-xs uppercase tracking-[0.2em] font-bold">
                Corporate Introduction
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight leading-tight">
                Building the Future of <span className="font-serif italic text-[#143727] font-normal">Dairy in Nigeria</span>
              </h2>

              <p className="text-base text-[#4A554F] leading-relaxed">
                Genius Dairy Farms Limited, originally founded as Genius Integrated Farms, has evolved from a small family cattle-rearing venture into one of Southwest Nigeria's pioneering privately owned commercial dairy farms.
              </p>

              <p className="text-base text-[#4A554F] leading-relaxed">
                Located on a 60-acre facility in Iseyin, Oyo State, the farm represents a journey of innovation, resilience and modern agricultural transformation.
              </p>

              <div className="pt-3">
                <button
                  id="intro-discover-story-btn"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer group"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4 text-[#C89D4B] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — OUR STORY TIMELINE
          ========================================================================= */}
      <section id="our-story-timeline-section" className="py-24 sm:py-32 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Evolutionary Heritage
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              A Journey of Growth, Innovation and <span className="font-serif italic text-[#143727] font-normal">Transformation</span>
            </h2>
          </div>

          {/* Desktop Timeline Grid / Mobile Stack */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Horizontal Line on Desktop */}
            <div className="hidden md:block absolute top-7 left-8 right-8 h-[2px] bg-[#D5D1C4] z-0" />

            {TIMELINE_MILESTONES.map((item, idx) => (
              <div
                key={item.year}
                className="relative z-10 flex flex-col bg-white md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none border md:border-none border-[#DFDCDE] shadow-xs md:shadow-none"
              >
                {/* Marker */}
                <div className="flex items-center gap-3 md:block mb-5">
                  <div className="w-12 h-12 rounded-full bg-[#143727] text-[#C89D4B] font-bold text-xs flex items-center justify-center border-2 border-white shadow-md shrink-0">
                    {idx + 1}
                  </div>
                  <span className="font-heading font-extrabold text-xl text-[#143727] md:mt-3 md:block tracking-tight">
                    {item.year}
                  </span>
                </div>

                <div className="bg-white md:p-6 rounded-2xl md:border md:border-[#E0DDD5] md:shadow-sm md:hover:shadow-md transition-all flex-1 flex flex-col">
                  <div className="text-[11px] uppercase tracking-wider font-extrabold text-[#C89D4B] mb-1.5">
                    {item.badge}
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#151A18] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#525F58] leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — TRANSFORMATION STATISTIC
          ========================================================================= */}
      <section id="transformation-stat-section" className="py-24 sm:py-32 bg-[#0A2016] text-white relative overflow-hidden">
        {/* Subtle geometric background */}
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163B29] border border-[#C89D4B]/30 text-xs uppercase tracking-[0.25em] text-[#C89D4B] font-bold mb-3 shadow-xs">
              Documented Dairy Performance
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              From 1 Litre to <span className="font-serif italic text-[#C89D4B] font-normal">10–15 Litres</span>
            </h2>
          </div>

          {/* Transformation Visual Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center max-w-5xl mx-auto">
            {/* THEN */}
            <div className="lg:col-span-3 bg-[#06140D] border border-[#2B4B3A] p-8 rounded-2xl text-center shadow-xl">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8DA799] block mb-2">
                THEN
              </span>
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-[#E0E7E2] tracking-tight mb-2">
                1–1.5 L
              </div>
              <div className="text-xs text-[#9BB0A3] uppercase tracking-wider font-semibold">
                per cow per day
              </div>
              <p className="text-xs text-[#7B9284] mt-3 pt-3 border-t border-[#1F3E2F]">
                Traditional local cattle practices
              </p>
            </div>

            {/* ARROW & ENGINES */}
            <div className="lg:col-span-5 bg-[#143727] border border-[#C89D4B]/40 p-6 sm:p-8 rounded-2xl text-center shadow-2xl relative ring-1 ring-[#C89D4B]/20">
              <div className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#C89D4B] mb-4">
                GENETIC IMPROVEMENT
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-left text-xs text-[#E3EDE7]">
                <div className="p-2.5 bg-[#0D261B] rounded-xl border border-[#295640] flex items-center gap-2">
                  <Dna className="w-4 h-4 text-[#C89D4B] shrink-0" />
                  <span className="font-medium">Artificial Insemination</span>
                </div>
                <div className="p-2.5 bg-[#0D261B] rounded-xl border border-[#295640] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C89D4B] shrink-0" />
                  <span className="font-medium">Improved Genetics</span>
                </div>
                <div className="p-2.5 bg-[#0D261B] rounded-xl border border-[#295640] flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-[#C89D4B] shrink-0" />
                  <span className="font-medium">Nutrition</span>
                </div>
                <div className="p-2.5 bg-[#0D261B] rounded-xl border border-[#295640] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#C89D4B] shrink-0" />
                  <span className="font-medium">Pasture Management</span>
                </div>
              </div>
              <div className="mt-3.5 p-2.5 bg-[#0D261B] rounded-xl border border-[#295640] text-center text-xs text-[#C89D4B] font-semibold">
                Herd Health &amp; Preventative Protocols
              </div>
            </div>

            {/* TODAY */}
            <div className="lg:col-span-3 bg-[#06140D] border-2 border-[#C89D4B] p-8 rounded-2xl text-center shadow-2xl relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-[#C89D4B] text-[#0D261B] text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-sm">
                Verified Outcome
              </div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C89D4B] block mb-2">
                TODAY
              </span>
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-[#C89D4B] tracking-tight mb-2">
                10–15 L
              </div>
              <div className="text-xs text-[#E3EDE7] uppercase tracking-wider font-bold">
                per cow per day
              </div>
              <p className="text-xs text-[#9BB0A3] mt-3 pt-3 border-t border-[#1F3E2F]">
                Demonstrating West African dairy viability
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#CBDDD2] max-w-3xl mx-auto text-center mt-12 leading-relaxed">
            Through improved cattle genetics, artificial insemination, better nutrition, pasture management, herd health and modern dairy practices, Genius Dairy Farms has demonstrated the potential for improved dairy productivity within the Nigerian environment.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — WHERE WE ARE TODAY
          ========================================================================= */}
      <section id="where-we-are-section" className="py-24 sm:py-32 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Present Operations
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight mb-4">
              More Than a <span className="font-serif italic text-[#143727] font-normal">Dairy Farm</span>
            </h2>
            <p className="text-base text-[#4A554F] leading-relaxed">
              Today, Genius Dairy Farms Limited has evolved from a smallholder cattle operation into a modern dairy enterprise with a 60-acre production facility dedicated to sustainable livestock and dairy development.
            </p>
            <p className="text-base text-[#4A554F] leading-relaxed mt-2">
              Beyond milk production, the farm is committed to strengthening Nigeria's dairy value chain by promoting local milk production, agricultural innovation, youth development and practical dairy education.
            </p>
          </div>

          {/* Four Visual Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-[#E0DDD5] shadow-sm hover:shadow-md hover:border-[#143727] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6 group-hover:bg-[#143727] group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#151A18] mb-2">
                Dairy Production
              </h3>
              <p className="text-sm text-[#55625B] leading-relaxed">
                Modern livestock and dairy development.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E0DDD5] shadow-sm hover:shadow-md hover:border-[#143727] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6 group-hover:bg-[#143727] group-hover:text-white transition-colors">
                <Dna className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#151A18] mb-2">
                Genetic Improvement
              </h3>
              <p className="text-sm text-[#55625B] leading-relaxed">
                Improved cattle genetics for greater productivity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E0DDD5] shadow-sm hover:shadow-md hover:border-[#143727] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6 group-hover:bg-[#143727] group-hover:text-white transition-colors">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#151A18] mb-2">
                Sustainable Pasture
              </h3>
              <p className="text-sm text-[#55625B] leading-relaxed">
                Productive and responsible pasture management.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E0DDD5] shadow-sm hover:shadow-md hover:border-[#143727] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6 group-hover:bg-[#143727] group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#151A18] mb-2">
                Capacity Development
              </h3>
              <p className="text-sm text-[#55625B] leading-relaxed">
                Practical knowledge and skills for the next generation of agricultural professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — THREE INTEGRATED PLATFORMS
          ========================================================================= */}
      <section id="three-platforms-section" className="py-24 sm:py-32 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Unified Corporate Architecture
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              One Vision. Three <span className="font-serif italic text-[#143727] font-normal">Integrated Platforms</span>.
            </h2>
            <p className="text-xs text-[#66726B] mt-3 font-mono font-medium tracking-wide">
              GENIUS DAIRY FARMS LIMITED ↓ Dairy Production | Udderfall | Academy
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CARD 1: Genius Dairy Farms */}
            <div className="bg-white rounded-2xl border border-[#E0DDD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-8 sm:p-9 group hover:-translate-y-1">
              <div className="text-xs uppercase tracking-wider font-extrabold text-[#2D6A4F] mb-3">
                Platform 01
              </div>
              <h3 className="font-heading text-2xl font-extrabold text-[#151A18] mb-1.5 tracking-tight">
                Genius Dairy Farms
              </h3>
              <div className="text-xs font-bold text-[#C89D4B] uppercase tracking-wide mb-4">
                Commercial Dairy &amp; Livestock Development
              </div>
              <p className="text-sm text-[#55625B] leading-relaxed mb-6 flex-1">
                Developing a sustainable model for modern commercial dairy ranching in Nigeria.
              </p>
              <div className="pt-5 border-t border-[#EFECE6]">
                <button
                  id="platform-btn-farm"
                  onClick={() => onNavigate('farm')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#143727] group-hover:text-[#C89D4B] transition-colors cursor-pointer"
                >
                  <span>Explore Our Farm</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* CARD 2: Udderfall Yogurt & Cheese */}
            <div className="bg-white rounded-2xl border border-[#E0DDD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-8 sm:p-9 group hover:-translate-y-1">
              <div className="text-xs uppercase tracking-wider font-extrabold text-[#2D6A4F] mb-3">
                Platform 02
              </div>
              <h3 className="font-heading text-2xl font-extrabold text-[#151A18] mb-1.5 tracking-tight">
                Udderfall Yogurt &amp; Cheese
              </h3>
              <div className="text-xs font-bold text-[#C89D4B] uppercase tracking-wide mb-4">
                From Quality Milk to Quality Products
              </div>
              <p className="text-sm text-[#55625B] leading-relaxed mb-6 flex-1">
                Transforming quality milk into nutritious and enjoyable yogurt and cheese for consumers and the wider dairy market.
              </p>
              <div className="pt-5 border-t border-[#EFECE6]">
                <button
                  id="platform-btn-udderfall"
                  onClick={() => onNavigate('udderfall')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#143727] group-hover:text-[#C89D4B] transition-colors cursor-pointer"
                >
                  <span>Discover Udderfall</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* CARD 3: Genius Dairy Farm Academy */}
            <div className="bg-white rounded-2xl border border-[#E0DDD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-8 sm:p-9 group hover:-translate-y-1">
              <div className="text-xs uppercase tracking-wider font-extrabold text-[#2D6A4F] mb-3">
                Platform 03
              </div>
              <h3 className="font-heading text-2xl font-extrabold text-[#151A18] mb-1.5 tracking-tight">
                Genius Dairy Farm Academy
              </h3>
              <div className="text-xs font-bold text-[#C89D4B] uppercase tracking-wide mb-4">
                Knowledge. Skills. Opportunity.
              </div>
              <p className="text-sm text-[#55625B] leading-relaxed mb-6 flex-1">
                Providing practical dairy and agribusiness education for farmers, students, entrepreneurs and agricultural professionals.
              </p>
              <div className="pt-5 border-t border-[#EFECE6]">
                <button
                  id="platform-btn-academy"
                  onClick={() => onNavigate('academy')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#143727] group-hover:text-[#C89D4B] transition-colors cursor-pointer"
                >
                  <span>Explore the Academy</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — OUR FARM
          ========================================================================= */}
      <section id="our-farm-spotlight-section" className="py-24 sm:py-32 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-[#D5D1C4] shadow-2xl ring-1 ring-black/5">
            {/* Background Image: Aerial Eagle View */}
            <div className="h-[480px] sm:h-[540px] relative group/eagle">
              <img
                src={images.eagleViewFarm}
                alt="Eagle View of Genius Dairy Farm 60-acre facility in Iseyin, Oyo State"
                className="w-full h-full object-cover transition-transform duration-700 group-hover/eagle:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07160F]/95 via-[#0A1F15]/85 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 sm:p-14 flex flex-col justify-between text-white max-w-2xl">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E4D38]/90 backdrop-blur-md border border-[#2D6A4F] text-[#C89D4B] text-[11px] font-bold uppercase tracking-wider mb-4 shadow-sm">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Eagle View • Drone Aerial Tour</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                  A 60-Acre Facility for the <span className="font-serif italic text-[#C89D4B] font-normal">Future of Dairy</span>
                </h2>
                <p className="text-sm sm:text-base text-[#CBDDD2] leading-relaxed mb-6">
                  Our 60-acre facility in Iseyin, Oyo State, is being developed as more than a dairy farm. It is envisioned as a model center for collaborative dairy development—bringing together production, knowledge, innovation, skills development and sustainable agricultural practices.
                </p>
              </div>

              {/* Highlights */}
              <div>
                <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-6 mb-8">
                  <div>
                    <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#C89D4B]">
                      60 Acres
                    </div>
                    <div className="text-[11px] text-[#A6BCB0] uppercase tracking-wider font-medium mt-0.5">
                      Dairy Development Facility
                    </div>
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#C89D4B]">
                      Iseyin
                    </div>
                    <div className="text-[11px] text-[#A6BCB0] uppercase tracking-wider font-medium mt-0.5">
                      Oyo State, Nigeria
                    </div>
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#C89D4B]">
                      Integrated
                    </div>
                    <div className="text-[11px] text-[#A6BCB0] uppercase tracking-wider font-medium mt-0.5">
                      Dairy Development Ecosystem
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    id="farm-spotlight-cta"
                    onClick={() => onNavigate('farm')}
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#C89D4B] hover:bg-[#B38737] text-[#0D261B] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Explore Our Farm</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — OUR APPROACH
          ========================================================================= */}
      <section id="our-approach-section" className="py-24 sm:py-32 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Operational Methodology
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              How We Are Transforming <span className="font-serif italic text-[#143727] font-normal">Dairy</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Genetic Improvement */}
            <div className="bg-white p-8 rounded-2xl border border-[#E0DDD5] shadow-xs hover:shadow-md hover:border-[#143727] transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#143727] text-[#C89D4B] text-xs font-bold flex items-center justify-center mb-5 shadow-xs">
                01
              </div>
              <h3 className="font-heading font-bold text-lg text-[#151A18] mb-2">
                Genetic Improvement
              </h3>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Strategic genetic improvement designed to increase dairy productivity while supporting animals adapted to the Nigerian environment.
              </p>
            </div>

            {/* 2. Sustainable Pasture Management */}
            <div className="bg-white p-8 rounded-2xl border border-[#E0DDD5] shadow-xs hover:shadow-md hover:border-[#143727] transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#143727] text-[#C89D4B] text-xs font-bold flex items-center justify-center mb-5 shadow-xs">
                02
              </div>
              <h3 className="font-heading font-bold text-lg text-[#151A18] mb-2">
                Sustainable Pasture Management
              </h3>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Developing productive pasture systems that support animal nutrition, farm efficiency and long-term land productivity.
              </p>
            </div>

            {/* 3. Modern Ranching Systems */}
            <div className="bg-white p-8 rounded-2xl border border-[#E0DDD5] shadow-xs hover:shadow-md hover:border-[#143727] transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#143727] text-[#C89D4B] text-xs font-bold flex items-center justify-center mb-5 shadow-xs">
                03
              </div>
              <h3 className="font-heading font-bold text-lg text-[#151A18] mb-2">
                Modern Ranching Systems
              </h3>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Applying modern livestock management, nutrition, hygiene, herd health and dairy production practices.
              </p>
            </div>

            {/* 4. Capacity Development */}
            <div className="bg-white p-8 rounded-2xl border border-[#E0DDD5] shadow-xs hover:shadow-md hover:border-[#143727] transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#143727] text-[#C89D4B] text-xs font-bold flex items-center justify-center mb-5 shadow-xs">
                04
              </div>
              <h3 className="font-heading font-bold text-lg text-[#151A18] mb-2">
                Capacity Development
              </h3>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Sharing knowledge and practical skills with farmers, students, entrepreneurs and agricultural professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — UDDERFALL FEATURE
          ========================================================================= */}
      <section id="udderfall-feature-section" className="py-24 sm:py-32 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D4B]/15 text-[#8F6B1E] text-xs uppercase tracking-[0.25em] font-extrabold mb-3">
              FROM OUR DAIRY ECOSYSTEM TO THE CONSUMER
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight mb-4">
              Meet Udderfall <span className="font-serif italic text-[#143727] font-normal">Yogurt & Cheese</span>
            </h2>
            <p className="text-base text-[#4A554F] leading-relaxed">
              Udderfall is the consumer-facing dairy products brand within the Genius Dairy Farms ecosystem, focused on transforming quality milk into nutritious, enjoyable and accessible dairy products.
            </p>
          </div>

          {/* Two Product Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Yogurt Card */}
            <div className="bg-white rounded-2xl border border-[#E0DDD5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="h-68 overflow-hidden relative">
                <img
                  src={images.udderfallYogurtHero}
                  alt="Udderfall Fresh Yogurt"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#143727] text-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md">
                  Yogurt Collection
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold text-[#151A18] mb-2">
                  Yogurt
                </h3>
                <p className="text-sm text-[#55625B] leading-relaxed mb-5">
                  Fresh, velvety whole-milk stirred and Greek-style yogurts packed with natural probiotics and zero artificial thickeners.
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#143727]">
                  <span className="px-2.5 py-1 bg-[#143727]/10 rounded-md">Whole Farm Milk</span>
                  <span>•</span>
                  <span className="px-2.5 py-1 bg-[#143727]/10 rounded-md">Natural Cultures</span>
                  <span>•</span>
                  <span className="px-2.5 py-1 bg-[#143727]/10 rounded-md">Unsweetened & Sweetened</span>
                </div>
              </div>
            </div>

            {/* Cheese Card */}
            <div className="bg-white rounded-2xl border border-[#E0DDD5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="h-68 overflow-hidden relative">
                <img
                  src={images.udderfallCheeseHero}
                  alt="Udderfall Fresh Cheese"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#C89D4B] text-[#0D261B] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md">
                  Artisanal Cheese
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold text-[#151A18] mb-2">
                  Cheese
                </h3>
                <p className="text-sm text-[#55625B] leading-relaxed mb-5">
                  Hygienically refined traditional Nigerian wara cheese and cured semi-hard farm varieties crafted by skilled dairy artisans.
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#143727]">
                  <span className="px-2.5 py-1 bg-[#143727]/10 rounded-md">Artisan Wara</span>
                  <span>•</span>
                  <span className="px-2.5 py-1 bg-[#143727]/10 rounded-md">Aged Wheels</span>
                  <span>•</span>
                  <span className="px-2.5 py-1 bg-[#143727]/10 rounded-md">Culinary Grade</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EAE7DE]">
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="udderfall-explore-btn"
                onClick={() => onNavigate('udderfall')}
                className="px-8 py-4 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
              >
                Explore Udderfall
              </button>
              <button
                id="udderfall-distributor-btn"
                onClick={() => onNavigate('udderfall')}
                className="px-8 py-4 bg-white hover:bg-[#F4F4F0] text-[#143727] border border-[#143727] text-xs font-bold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
              >
                Become a Distributor
              </button>
            </div>

            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#F4F4F0] rounded-full border border-[#E0DDD5] text-xs text-[#2D3A32]">
              <ShieldCheck className="w-4 h-4 text-[#C89D4B]" />
              <span className="font-semibold">
                100% Fresh Farm Milk • Hygienically Processed in Iseyin
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 — GENIUS DAIRY FARM ACADEMY
          ========================================================================= */}
      <section id="academy-feature-section" className="py-24 sm:py-32 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Official Academy Crest & Category Header Lockup */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-8 border-b border-[#E0DDD5]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white p-1.5 shadow-md border-2 border-[#C89D4B]/60 flex items-center justify-center shrink-0">
                <img
                  src={images.academyLogo}
                  alt="Genius Dairy Academy Official Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-sm uppercase tracking-[0.2em] text-[#2D6A4F] font-extrabold block">
                  Genius Dairy Farm Academy
                </span>
                <span className="text-xs text-[#55625B] font-medium block mt-0.5">
                  Official Practical Training &amp; SIWES Capacity Hub • Learn • Grow • Lead
                </span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#143727]/10 text-[#143727] text-xs font-bold rounded-full border border-[#143727]/20">
              <span>RC: 8888771 Registered Division</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
                Knowledge &amp; Human Capital
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight mb-4">
                Developing the Next Generation of <span className="font-serif italic text-[#143727] font-normal">Agricultural Professionals</span>
              </h2>
              <p className="text-base text-[#4A554F] leading-relaxed">
                Our vision extends beyond running a successful dairy farm. Through Genius Dairy Farm Academy, we are creating opportunities for farmers, young entrepreneurs, students and aspiring agropreneurs to gain practical knowledge and skills for the modern dairy industry.
              </p>
            </div>
            <div className="lg:col-span-5 flex lg:justify-end">
              <button
                id="academy-explore-btn"
                onClick={() => onNavigate('academy')}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer group"
              >
                <span>Explore the Academy</span>
                <ArrowRight className="w-4 h-4 text-[#C89D4B] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-8 rounded-2xl border border-[#E0DDD5] shadow-xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-[#143727]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#151A18] mb-2">
                Training
              </h3>
              <p className="text-sm text-[#55625B] leading-relaxed">
                Practical agricultural and dairy training.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E0DDD5] shadow-xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-[#143727]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#151A18] mb-2">
                Capacity Building
              </h3>
              <p className="text-sm text-[#55625B] leading-relaxed">
                Developing farmers, entrepreneurs and agricultural professionals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E0DDD5] shadow-xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-[#143727]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#151A18] mb-2">
                Agribusiness Education
              </h3>
              <p className="text-sm text-[#55625B] leading-relaxed">
                Building the knowledge required to create sustainable agricultural enterprises.
              </p>
            </div>
          </div>

          {/* Guiding Conviction Banner */}
          <div className="mt-8 p-8 sm:p-10 bg-white border border-[#E0DDD5] rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#2D6A4F] block">
                  Why We Are Bringing Genius Dairy Academy on Board
                </span>
                <p className="text-base sm:text-lg font-heading font-medium text-[#151A18] italic">
                  &ldquo;Improved genetics and modern infrastructure can build a farm, but competent people and good management are what sustain it.&rdquo;
                </p>
              </div>
              <button
                onClick={() => onNavigate('academy')}
                className="shrink-0 px-5 py-2.5 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              >
                Read Full Academy Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11 — MISSION
          ========================================================================= */}
      <section id="mission-section" className="py-24 sm:py-28 bg-[#FBFBFA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-14 bg-white border border-[#E0DDD5] rounded-3xl shadow-sm">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.25em] font-bold mb-4">
              Corporate Purpose
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight mb-6">
              Our <span className="font-serif italic text-[#143727] font-normal">Mission</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#2C3E35] leading-relaxed mb-6 font-medium">
              To accelerate the transformation of Nigeria's dairy industry by building a commercially viable, technologically driven, and sustainable livestock ecosystem.
            </p>
            <p className="text-sm sm:text-base text-[#55625B] leading-relaxed mb-8">
              Through strategic genetic improvement, regenerative pasture management, modern ranching systems, and purposeful capacity development, we are committed to raising productivity, creating economic value, and strengthening the future of local dairy production.
            </p>

            {/* Highlight Four Words */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#EAE7DE]">
              <div className="p-4 bg-[#F4F4F0] rounded-xl text-center border border-[#E0DDD5] hover:border-[#143727] transition-colors">
                <span className="font-heading font-bold text-sm text-[#143727] tracking-wider uppercase">
                  Genetics
                </span>
              </div>
              <div className="p-4 bg-[#F4F4F0] rounded-xl text-center border border-[#E0DDD5] hover:border-[#143727] transition-colors">
                <span className="font-heading font-bold text-sm text-[#143727] tracking-wider uppercase">
                  Sustainability
                </span>
              </div>
              <div className="p-4 bg-[#F4F4F0] rounded-xl text-center border border-[#E0DDD5] hover:border-[#143727] transition-colors">
                <span className="font-heading font-bold text-sm text-[#143727] tracking-wider uppercase">
                  Technology
                </span>
              </div>
              <div className="p-4 bg-[#F4F4F0] rounded-xl text-center border border-[#E0DDD5] hover:border-[#143727] transition-colors">
                <span className="font-heading font-bold text-sm text-[#143727] tracking-wider uppercase">
                  Capacity
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12 — VISION
          ========================================================================= */}
      <section id="vision-section" className="py-24 sm:py-28 bg-[#0B2317] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#2D5A42] p-8 sm:p-14 rounded-3xl bg-[#06160F]/80 backdrop-blur-md shadow-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D4B]/15 text-[#C89D4B] text-xs uppercase tracking-[0.25em] font-bold mb-4">
              Strategic Aspiration
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
              Our <span className="font-serif italic text-[#C89D4B] font-normal">Vision</span>
            </h2>
            <p className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-6 font-serif">
              To establish Nigeria's leading model for world-class, self-sustaining commercial dairy ranching and become a premier destination for agribusiness education, innovation, and capacity development in West Africa.
            </p>
            <p className="text-sm sm:text-base text-[#CBDDD2] leading-relaxed pt-6 border-t border-[#234935]">
              Our 60-acre facility in Iseyin, Oyo State, is being developed as more than a dairy farm. It is envisioned as a model center for collaborative dairy development—bringing together production, knowledge, innovation, skills development, and sustainable agricultural practices.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13 — CORE VALUES
          ========================================================================= */}
      <section id="core-values-section" className="py-24 sm:py-32 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Guiding Principles
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              What We <span className="font-serif italic text-[#143727] font-normal">Stand For</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val) => (
              <div
                key={val.title}
                className="bg-white p-8 rounded-2xl border border-[#E0DDD5] shadow-xs hover:shadow-md hover:border-[#143727] transition-all"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#C89D4B] mb-5 shadow-xs" />
                <h3 className="font-heading font-bold text-xl text-[#151A18] mb-3">
                  {val.title}
                </h3>
                <p className="text-xs text-[#525F58] leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 14 — IMPACT
          ========================================================================= */}
      <section id="impact-section" className="py-24 sm:py-32 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Socioeconomic Contribution
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              Growing Beyond <span className="font-serif italic text-[#143727] font-normal">the Farm</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {IMPACT_AREAS.map((item, idx) => (
              <div
                key={item.title}
                className="bg-white p-7 rounded-2xl border border-[#E0DDD5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#C89D4B] block mb-2.5">
                    0{idx + 1}
                  </span>
                  <h3 className="font-heading font-bold text-base text-[#151A18] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#525F58] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 15 — PARTNERSHIPS
          ========================================================================= */}
      <section id="partnerships-section" className="py-24 sm:py-32 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Collaborative Development
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight mb-4">
              Building Through <span className="font-serif italic text-[#143727] font-normal">Collaboration</span>
            </h2>
            <p className="text-base text-[#4A554F] leading-relaxed">
              Transforming Nigeria's dairy sector requires collaboration across farmers, processors, researchers, investors, government institutions, development organizations and agricultural professionals.
            </p>
          </div>

          {/* DDP Reference Card */}
          <div className="bg-[#FAF9F5] border border-[#DDD8CB] p-8 sm:p-12 rounded-3xl shadow-sm max-w-4xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E4D8]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C89D4B] block mb-1">
                  Historical Development Catalyst
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#151A18]">
                  Dairy Development Programme (DDP)
                </h3>
              </div>
              <span className="px-3.5 py-1.5 bg-[#143727] text-white text-xs font-semibold rounded-full shadow-xs">
                Beneficiary 2014
              </span>
            </div>

            <p className="text-sm text-[#525F58] leading-relaxed pt-6">
              Genius Dairy Farms is proud of its milestone participation as a beneficiary of the Dairy Development Programme (DDP) supported by <strong>FrieslandCampina WAMCO Nigeria PLC</strong>. Through technical training, veterinary exposure, and dairy hygiene guidance, this initiative marked a pivotal turning point in our transition to a commercial operation.
            </p>

            <div className="mt-8 pt-5 border-t border-[#E8E4D8] flex flex-wrap items-center justify-between gap-4 text-xs text-[#7A8780]">
              <span className="font-medium">Focused on sustainable local milk sourcing and smallholder farmer empowerment.</span>
              <button
                onClick={onOpenPartnerModal}
                className="font-bold text-[#143727] hover:text-[#C89D4B] uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Inquire About Collaboration</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 16 — LOCATION / CONTACT
          ========================================================================= */}
      <section id="location-contact-section" className="py-24 sm:py-32 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Physical Presence
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              Visit Genius <span className="font-serif italic text-[#143727] font-normal">Dairy Farms</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Information and Quick Buttons */}
            <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-3xl border border-[#E0DDD5] shadow-sm space-y-6">
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-[#151A18] mb-2">
                  Genius Dairy Farms Limited
                </h3>
                <p className="text-sm text-[#55625B] leading-relaxed flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#C89D4B] shrink-0 mt-0.5" />
                  <span>
                    Kilometer 4, Olora Village, along the Iseyin–Ibadan Expressway, Iseyin, Oyo State, Nigeria.
                  </span>
                </p>
              </div>

              <div className="pt-2 space-y-3 text-sm text-[#4A554F]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#143727]" />
                  <span className="font-mono font-medium text-[#151A18]">{COMPANY_DETAILS.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#143727]" />
                  <span>{COMPANY_DETAILS.email}</span>
                </div>
              </div>

              {/* Required Four Contact Buttons */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <a
                  href={COMPANY_DETAILS.phoneTel}
                  className="px-4 py-3.5 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold rounded-xl text-center transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C89D4B]" />
                  <span>Call Us</span>
                </a>
                <a
                  href={COMPANY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl text-center transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="px-4 py-3.5 bg-[#151A18] hover:bg-black text-white text-xs font-bold rounded-xl text-center transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C89D4B]" />
                  <span>Email Us</span>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    COMPANY_DETAILS.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 bg-[#EFECE6] hover:bg-[#E2DFD5] text-[#143727] text-xs font-bold rounded-xl text-center transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5 border border-[#DCD9CE]"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#143727]" />
                  <span>Directions</span>
                </a>
              </div>

              <div className="pt-2 text-xs text-[#7A8780] bg-[#FBFBFA] p-4 rounded-xl border border-[#ECEAE4]">
                <strong>Farm Biosecurity Notice:</strong> All commercial, student, and partnership visits must be scheduled in advance to maintain strict livestock health and sanitation standards.
              </div>
            </div>

            {/* Map representation */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-[#E0DDD5] overflow-hidden shadow-sm h-[380px] sm:h-[430px] relative ring-1 ring-black/5">
              <iframe
                title="Genius Dairy Farms Location Map"
                src="https://maps.google.com/maps?q=Iseyin%2C%20Oyo%20State%2C%20Nigeria&t=&z=12&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#0B2317]/95 text-white text-xs p-3.5 rounded-xl backdrop-blur-md flex items-center justify-between shadow-lg">
                <span>📍 Kilometer 4, Olora Village, Iseyin–Ibadan Expressway</span>
                <span className="font-bold text-[#C89D4B]">Oyo State</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 17 — FINAL CTA
          ========================================================================= */}
      <section id="final-cta-section" className="py-24 sm:py-36 bg-[#081710] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 bg-[#163B29] text-[#C89D4B] text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-6 border border-[#C89D4B]/30">
            Genius Dairy Farms Limited
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Building a Stronger Future for <span className="font-serif italic text-[#C89D4B] font-normal">Dairy in Nigeria</span>
          </h2>

          <p className="text-base sm:text-lg text-[#CBDDD2] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            From five cows in 2009 to a 60-acre modern dairy enterprise today, Genius Dairy Farms Limited continues to demonstrate what is possible when local knowledge, modern technology, professional expertise and a commitment to continuous improvement come together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="final-cta-partner-btn"
              onClick={onOpenPartnerModal}
              className="w-full sm:w-auto px-9 py-4 bg-[#C89D4B] hover:bg-[#B38737] text-[#0D261B] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2.5 group"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="final-cta-contact-btn"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-9 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] cursor-pointer backdrop-blur-md"
            >
              <span>Contact Genius Dairy Farms</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
