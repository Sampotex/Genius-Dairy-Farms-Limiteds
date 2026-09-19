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
  Sparkles,
  Sprout,
  Users,
  GraduationCap,
  Bus,
  FileCheck,
  TrendingUp,
  Dna,
  Milk,
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
  const journeyMilestones = [
    {
      period: '2009',
      title: 'The Beginning',
      tag: 'Foundation & Roots',
      description:
        'The journey began when our founder, Moyosore Olatunde Rafiu, developed an early interest in cattle rearing while helping to care for his father’s herd during his secondary school years. In 2009, following his graduation, he established Genius Integrated Farms on five acres of land with just five cows. During its early years, the farm focused primarily on traditional cattle rearing and meat production. Milk yields were approximately 1–1.5 litres per cow daily. The founder also processed and sold traditional dairy products, including nunu and wara, within Iseyin and neighbouring communities.',
      stats: '5 Cows • 5 Acres • 1–1.5 L/day',
    },
    {
      period: '2014',
      title: 'A New Direction',
      tag: 'Strategic Turning Point',
      description:
        'A significant turning point came in 2014, when the farm became a beneficiary of the Dairy Development Programme supported by FrieslandCampina WAMCO Nigeria PLC. Through technical support, training, and exposure to modern dairy production, the farm began transitioning towards a more specialized and commercially driven dairy operation.',
      stats: 'FrieslandCampina WAMCO DDP Beneficiary',
    },
    {
      period: 'Genetic Transformation',
      title: 'Innovation & Improved Productivity',
      tag: 'Biotechnology & Nutrition',
      description:
        'With support from dairy experts, the farm introduced artificial insemination and improved cattle breeding practices, crossing indigenous Fulani cattle with Holstein Friesian genetics. This transformation increased average milk production from approximately one litre to between 10 and 15 litres per cow daily. The farm also continued developing its pasture management, livestock nutrition, animal health, and hygiene practices to support sustainable dairy production.',
      stats: '10–15 L/day average yield • F1 Crossbreds',
    },
    {
      period: 'Today',
      title: 'Growth into a Modern Dairy Enterprise',
      tag: 'Commercial Scale',
      description:
        'Today, Genius Dairy Farms Limited operates from a 60-acre facility in Iseyin, Oyo State, with a commitment to modern dairy production, local milk development, agricultural innovation, and capacity building. Our journey reflects the potential of combining local experience, scientific knowledge, improved livestock genetics, and modern farming practices to strengthen Nigeria’s dairy value chain.',
      stats: '60-Acre Ranch • Integrated Value Chain',
    },
  ];

  const currentOperations = [
    {
      icon: Dna,
      title: 'Selective Bovine Genetics',
      desc: 'Artificial insemination crossing indigenous zebu cows with proven Holstein Friesian sires, producing adapted high-yield dairy stock yielding 10–15 litres daily.',
    },
    {
      icon: Sprout,
      title: 'Year-Round Pasture & Silage',
      desc: 'Regenerative paddock rotation coupled with bunker and pit silage conservation to preserve high-tonnage nutritious fodder through dry seasons.',
    },
    {
      icon: Milk,
      title: 'Mechanized Milking & Hygiene',
      desc: 'Standard operating procedures, closed-system milking, and strict cold-chain handling ensuring premium wholesome raw milk for local food security.',
    },
    {
      icon: Award,
      title: 'Udderfall Value Addition',
      desc: 'In-house dairy processing transforming farm-fresh milk into artisan stirred yogurts, Greek-style yogurts, traditional wara, and specialty cheeses.',
    },
  ];

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-[#081710] text-white py-20 sm:py-28 lg:py-32 border-b border-[#1C3A2B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#163B29] text-[#C89D4B] text-xs font-bold uppercase tracking-widest rounded-full mb-6 border border-[#C89D4B]/25">
            <Logo size="xs" />
            <span>Corporate Heritage &amp; Operations</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
            About Genius Dairy <span className="font-serif italic text-[#C89D4B] font-normal">Farms Limited</span>
          </h1>
          <p className="text-xl sm:text-2xl text-[#C89D4B] font-serif italic mt-3 max-w-3xl">
            From a Humble Beginning to a Modern Dairy Enterprise
          </p>
          <p className="text-base sm:text-lg text-[#CBDDD2] max-w-3xl mt-4 leading-relaxed font-normal">
            Genius Dairy Farms Limited, originally established as Genius Integrated Farms, has evolved from a small family cattle-rearing venture into a pioneering privately owned commercial dairy enterprise in Southwest Nigeria. Located on a 60-acre facility in Iseyin, Oyo State, the farm represents a journey of resilience, innovation, and commitment to transforming Nigeria’s dairy industry through modern agricultural practices.
          </p>

          {/* Quick Service Gateways */}
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-3 text-xs">
            <span className="text-[#8DA396] self-center pr-2 font-medium">Explore Specialized Portals:</span>
            <button
              onClick={() => onNavigate('academy')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 text-[#C89D4B] hover:bg-white/20 transition-colors font-semibold"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Dairy Academy</span>
            </button>
            <button
              onClick={() => onNavigate('excursions')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-semibold"
            >
              <Bus className="w-3.5 h-3.5 text-[#C89D4B]" />
              <span>School Excursions</span>
            </button>
            <button
              onClick={() => onNavigate('internships')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-semibold"
            >
              <FileCheck className="w-3.5 h-3.5 text-[#C89D4B]" />
              <span>Internship Portal</span>
            </button>
            <button
              onClick={() => onNavigate('events')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-semibold"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C89D4B]" />
              <span>Upcoming Events</span>
            </button>
          </div>
        </div>
      </section>

      {/* Founder Story & Heritage */}
      <section className="py-20 sm:py-28 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column with Founder Profile Card */}
            <div className="lg:col-span-5 relative">
              <FounderProfileCard />
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold">
                Our Journey
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight leading-tight">
                From Caring for a Family Herd to Leading <span className="font-serif italic text-[#143727] font-normal">Commercial Change</span>
              </h2>
              <div className="space-y-4 text-base text-[#4A554F] leading-relaxed">
                <p>
                  The journey began with our founder, <strong>Moyosore Olatunde Rafiu</strong>, who developed an early interest in cattle rearing while helping to care for his father’s herd during his secondary school years.
                </p>
                <p>
                  In 2009, following his graduation, he established <strong>Genius Integrated Farms</strong> on five acres of land with just five cows.
                </p>
                <p>
                  During its early years, the farm focused primarily on traditional cattle rearing and meat production. Milk yields were approximately 1–1.5 litres per cow daily. The founder also processed and sold traditional dairy products, including nunu and wara, within Iseyin and neighbouring communities.
                </p>
                <p>
                  A significant turning point came in 2014, when the farm became a beneficiary of the Dairy Development Programme supported by <strong>FrieslandCampina WAMCO Nigeria PLC</strong>. Through technical support, training, and exposure to modern dairy production, the farm began transitioning towards a more specialized and commercially driven dairy operation.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('farm')}
                  className="px-8 py-4 bg-[#143727] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#0D261B] transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                >
                  Explore Current Farm Operations
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

      {/* Chronological Milestones of Our Journey */}
      <section className="py-20 sm:py-28 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Detailed Chronology
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              The Path to <span className="font-serif italic text-[#143727] font-normal">Transformation</span>
            </h2>
            <p className="text-base text-[#55625B] mt-3 leading-relaxed">
              From five cows in 2009 to a 60-acre commercial dairy ranch today, our evolution combines local knowledge with veterinary science and rigorous management.
            </p>
          </div>

          <div className="space-y-6">
            {journeyMilestones.map((item) => (
              <div
                key={item.title}
                className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E0DDD5] shadow-xs hover:shadow-md transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                <div className="md:col-span-3">
                  <div className="inline-block px-3 py-1 bg-[#143727] text-[#C89D4B] text-xs font-bold uppercase tracking-wider rounded-full mb-3 shadow-2xs">
                    {item.tag}
                  </div>
                  <div className="font-heading font-extrabold text-2xl text-[#143727]">
                    {item.period}
                  </div>
                  <div className="text-xs font-semibold text-[#8C9B92] mt-2">
                    {item.stats}
                  </div>
                </div>
                <div className="md:col-span-9 space-y-3">
                  <h3 className="font-heading font-bold text-xl text-[#151A18]">
                    {item.title}
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

      {/* Current Farm Operations Deep Dive */}
      <section className="py-20 sm:py-28 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Iseyin, Oyo State
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              Current <span className="font-serif italic text-[#143727] font-normal">Farm Operations</span>
            </h2>
            <p className="text-base text-[#55625B] mt-3 leading-relaxed">
              Operating on 60 fertile acres along the Iseyin–Ibadan Expressway, our current enterprise integrates biological science, agronomy, and humane herd husbandry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentOperations.map((op) => {
              const Icon = op.icon;
              return (
                <div
                  key={op.title}
                  className="bg-white p-8 rounded-2xl border border-[#E0DDD5] shadow-xs hover:shadow-md hover:border-[#143727] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#151A18] mb-3">
                      {op.title}
                    </h3>
                    <p className="text-xs text-[#525F58] leading-relaxed">
                      {op.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Farm Facilities Banner */}
          <div className="mt-12 p-8 sm:p-10 bg-[#10291D] text-white rounded-3xl border border-[#214935] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Explore the 60-Acre Commercial Dairy Facility
              </h3>
              <p className="text-sm text-[#CBDDD2] leading-relaxed">
                Take an aerial and on-ground tour of our cattle barns, milking parlour, fodder paddocks, and calf nurseries in Iseyin, Oyo State.
              </p>
            </div>
            <button
              onClick={() => onNavigate('farm')}
              className="shrink-0 px-7 py-3.5 bg-[#C89D4B] text-[#0A1C14] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#B58A38] transition-colors shadow-sm cursor-pointer"
            >
              View Farm Details
            </button>
          </div>
        </div>
      </section>

      {/* Our Commitment Beyond Milk Production */}
      <section className="py-20 sm:py-28 bg-[#F4F4F0] border-t border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D4B]/20 text-[#8C6D29] text-xs uppercase tracking-[0.2em] font-bold">
                Capacity Building &amp; Education
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight leading-tight">
                Our Commitment Beyond <span className="font-serif italic text-[#143727] font-normal">Milk Production</span>
              </h2>
              <div className="space-y-4 text-base text-[#4A554F] leading-relaxed">
                <p>
                  At Genius Dairy Farms Limited, we believe that the future of dairy farming depends not only on producing quality milk but also on developing the knowledge, skills, and systems needed to sustain the industry.
                </p>
                <p>
                  Our activities extend beyond dairy production to include agricultural education, practical training, student engagement, and opportunities for aspiring agropreneurs to gain exposure to modern dairy farming.
                </p>
                <p>
                  Through our educational initiatives, we aim to connect practical farm experience with learning, innovation, and entrepreneurship.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('academy')}
                  className="px-6 py-3 bg-[#143727] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#0D261B] transition-colors inline-flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-[#C89D4B]" />
                  <span>Dairy Academy</span>
                </button>
                <button
                  onClick={() => onNavigate('excursions')}
                  className="px-6 py-3 bg-white text-[#143727] border border-[#D5D1C4] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EAE7DE] transition-colors inline-flex items-center gap-2"
                >
                  <Bus className="w-4 h-4 text-[#143727]" />
                  <span>Book an Excursion</span>
                </button>
                <button
                  onClick={() => onNavigate('internships')}
                  className="px-6 py-3 bg-white text-[#143727] border border-[#D5D1C4] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EAE7DE] transition-colors inline-flex items-center gap-2"
                >
                  <FileCheck className="w-4 h-4 text-[#143727]" />
                  <span>Apply for Internship</span>
                </button>
              </div>
            </div>

            {/* Three Educational Pillars Cards */}
            <div className="lg:col-span-6 space-y-4">
              <div
                onClick={() => onNavigate('academy')}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E0DDD5] hover:border-[#143727] shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center shrink-0 group-hover:bg-[#143727] group-hover:text-white transition-colors">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-[#151A18] group-hover:text-[#143727] transition-colors">
                        Genius Dairy Farm Academy
                      </h4>
                      <p className="text-xs text-[#55625B] mt-1">
                        Practical dairy courses, artificial insemination, herd health, and agribusiness entrepreneurship.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#8C9B92] group-hover:text-[#143727] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </div>

              <div
                onClick={() => onNavigate('excursions')}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E0DDD5] hover:border-[#143727] shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center shrink-0 group-hover:bg-[#143727] group-hover:text-white transition-colors">
                      <Bus className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-[#151A18] group-hover:text-[#143727] transition-colors">
                        Educational Excursions &amp; Farm Visits
                      </h4>
                      <p className="text-xs text-[#55625B] mt-1">
                        Guided hands-on farm tours for primary, secondary schools, universities, and agropreneur delegations.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#8C9B92] group-hover:text-[#143727] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </div>

              <div
                onClick={() => onNavigate('internships')}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E0DDD5] hover:border-[#143727] shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center shrink-0 group-hover:bg-[#143727] group-hover:text-white transition-colors">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-[#151A18] group-hover:text-[#143727] transition-colors">
                        Internship &amp; Practical Training (SIWES / IT)
                      </h4>
                      <p className="text-xs text-[#55625B] mt-1">
                        Structured dairy school placement, supervised learning, digital ID tracking, and logbook evaluation.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#8C9B92] group-hover:text-[#143727] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision for the Future */}
      <section className="py-20 sm:py-28 bg-[#091D13] text-white border-t border-[#1C3A2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C89D4B]/15 text-[#C89D4B] text-xs uppercase tracking-[0.2em] font-bold">
              Looking Forward
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Our Vision for the <span className="font-serif italic text-[#C89D4B] font-normal">Future</span>
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-[#CBDDD2] leading-relaxed text-left sm:text-center">
              <p>
                Our ambition extends beyond operating a successful dairy farm. We aspire to contribute to a more productive, sustainable, and knowledge-driven dairy industry in Nigeria.
              </p>
              <p>
                Through modern dairy farming, improved livestock management, local milk production, practical agricultural education, and youth capacity building, Genius Dairy Farms Limited is committed to supporting the growth of the agricultural sector.
              </p>
              <p className="font-semibold text-white">
                From five cows in 2009 to a 60-acre dairy enterprise today, our story continues to be driven by innovation, learning, and the belief that local dairy farming can achieve sustainable commercial growth.
              </p>
            </div>

            {/* Corporate Slogan Lockup */}
            <div className="pt-6 border-t border-white/10">
              <div className="text-xs uppercase tracking-[0.25em] text-[#A3B8AC] font-semibold mb-2">
                Corporate Motto
              </div>
              <div className="font-heading text-xl sm:text-2xl font-extrabold text-[#C89D4B]">
                Genius Dairy Farms Limited — Growing Dairy. Developing Skills. Building the Future.
              </div>
            </div>

            <div className="pt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={onOpenPartnerModal}
                className="px-8 py-4 bg-[#C89D4B] text-[#091D13] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#B58A38] transition-all shadow-md hover:scale-[1.02] cursor-pointer"
              >
                Partner With Genius Dairy Farms
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 bg-transparent border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all cursor-pointer"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 sm:py-28 bg-[#F4F4F0] border-t border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
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
