import React from 'react';
import {
  History,
  Target,
  Compass,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  MapPin,
  Calendar,
} from 'lucide-react';
import { PageId } from '../types';
import { COMPANY_DETAILS, TIMELINE_MILESTONES, CORE_VALUES } from '../data/companyData';
import { Logo } from '../components/Logo';
import { FounderProfileCard } from '../components/FounderProfileCard';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenPartnerModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenPartnerModal }) => {
  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-[#081710] text-white py-24 sm:py-32 border-b border-[#1C3A2B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#163B29] text-[#C89D4B] text-xs font-bold uppercase tracking-widest rounded-full mb-6 border border-[#C89D4B]/25">
            <Logo size="xs" />
            <span>Corporate Profile</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
            About Genius Dairy <span className="font-serif italic text-[#C89D4B] font-normal">Farms Limited</span>
          </h1>
          <p className="text-base sm:text-xl text-[#CBDDD2] max-w-3xl mt-6 leading-relaxed font-normal">
            The evolution of a pioneering commercial dairy and livestock development enterprise in Southwest Nigeria, committed to transforming domestic dairy production through genetics, science, and education.
          </p>
        </div>
      </section>

      {/* Founder Story & Heritage */}
      <section className="py-24 sm:py-32 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column with Founder Profile Card */}
            <div className="lg:col-span-5 relative">
              <FounderProfileCard />
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold">
                Founder's Journey &amp; Roots
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight leading-tight">
                From Caring for a Family Herd to Leading <span className="font-serif italic text-[#143727] font-normal">Commercial Change</span>
              </h2>
              <div className="space-y-4 text-base text-[#4A554F] leading-relaxed">
                <p>
                  The journey of Genius Dairy Farms Limited began when our founder, <strong>Moyosore Olatunde Rafiu</strong>, started rearing cattle after gaining invaluable experience caring for his father's herd during his secondary school years in Oyo State.
                </p>
                <p>
                  Shortly after graduating, driven by a deep conviction in the untapped potential of Nigerian livestock, he formally established <strong>Genius Integrated Farms</strong> on five acres of land in Iseyin with just five cows.
                </p>
                <p>
                  The early operations confronted the harsh realities shared by smallholder cattle rearers across West Africa: indigenous breeds producing barely 1 to 1.5 litres of milk per cow daily, traditional cattle fattening for meat, and informal distribution of local nunu and wara within Iseyin and surrounding communities.
                </p>
                <p>
                  Rather than accepting low yields as an unchangeable constraint of the African climate, Moyosore pursued modern livestock practices, nutrition formulation, and genetic transformation. Today, as <strong>Genius Dairy Farms Limited</strong>, that initial five-cow herd has transformed into an integrated 60-acre dairy development facility that sets standards for commercial dairy in Southwest Nigeria.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('farm')}
                  className="px-8 py-4 bg-[#143727] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#0D261B] transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                >
                  Explore Our 60-Acre Farm
                </button>
                <button
                  onClick={onOpenPartnerModal}
                  className="px-8 py-4 bg-white text-[#143727] border border-[#143727] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#F4F4F0] transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Partner With Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Timeline Deep Dive */}
      <section className="py-24 sm:py-32 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Corporate Chronology
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              Company <span className="font-serif italic text-[#143727] font-normal">Milestones</span>
            </h2>
            <p className="text-base text-[#55625B] mt-3 leading-relaxed">
              Every stage of our evolution reflects rigorous commitment to livestock health, scientific breeding, and commercial viability.
            </p>
          </div>

          <div className="space-y-6">
            {TIMELINE_MILESTONES.map((item) => (
              <div
                key={item.year}
                className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E0DDD5] shadow-xs hover:shadow-md transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                <div className="md:col-span-3">
                  <div className="inline-block px-3 py-1 bg-[#143727] text-[#C89D4B] text-xs font-bold uppercase tracking-wider rounded-full mb-3 shadow-2xs">
                    {item.badge}
                  </div>
                  <div className="font-heading font-extrabold text-3xl text-[#143727]">
                    {item.year}
                  </div>
                </div>
                <div className="md:col-span-9 space-y-2.5">
                  <h3 className="font-heading font-bold text-xl text-[#151A18]">
                    {item.title} — <span className="text-[#2D6A4F] font-semibold text-lg">{item.subtitle}</span>
                  </h3>
                  <p className="text-sm sm:text-base text-[#4A554F] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 sm:py-32 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E0DDD5] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-[#143727]" />
                </div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
                  Our Purpose
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#151A18] mb-4">
                  Our <span className="font-serif italic text-[#143727] font-normal">Mission</span>
                </h3>
                <p className="text-base text-[#4A554F] leading-relaxed mb-4">
                  To accelerate the transformation of Nigeria's dairy industry by building a commercially viable, technologically driven, and sustainable livestock ecosystem.
                </p>
                <p className="text-sm text-[#55625B] leading-relaxed">
                  Through strategic genetic improvement, regenerative pasture management, modern ranching systems, and purposeful capacity development, we are committed to raising productivity, creating economic value, and strengthening the future of local dairy production.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-[#0B2317] text-white p-8 sm:p-12 rounded-3xl border border-[#264D3A] shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 text-[#C89D4B] flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6 text-[#C89D4B]" />
                </div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D4B]/15 text-[#C89D4B] text-xs uppercase tracking-[0.2em] font-bold mb-3">
                  Our Destination
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  Our <span className="font-serif italic text-[#C89D4B] font-normal">Vision</span>
                </h3>
                <p className="text-base text-[#CBDDD2] leading-relaxed mb-4">
                  To establish Nigeria's leading model for world-class, self-sustaining commercial dairy ranching and become a premier destination for agribusiness education, innovation, and capacity development in West Africa.
                </p>
                <p className="text-sm text-[#9BB0A3] leading-relaxed">
                  Our 60-acre facility in Iseyin, Oyo State, is being developed as a model center for collaborative dairy development—bringing together production, knowledge, innovation, skills development, and sustainable agricultural practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 sm:py-32 bg-[#F4F4F0] border-t border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Foundational Standards
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
    </div>
  );
};
