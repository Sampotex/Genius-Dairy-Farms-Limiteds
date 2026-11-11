import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  Building2,
  Dna,
  Sprout,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import { PageId, AcademyProgram } from '../types';
import { ACADEMY_PROGRAMS, COMPANY_DETAILS } from '../data/companyData';
import { useSiteImages } from '../context/BrandMediaContext';
import { CacRegistrationSection } from '../components/CacRegistrationSection';
import { ACADEMY_LOGO_BASE64 } from '../data/academyLogoFallback';

interface AcademyPageProps {
  onNavigate: (page: PageId) => void;
}

export const AcademyPage: React.FC<AcademyPageProps> = ({ onNavigate }) => {
  const images = useSiteImages();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>(
    ACADEMY_PROGRAMS[0].title
  );
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicantForm, setApplicantForm] = useState({
    name: '',
    email: '',
    phone: '',
    background: 'Undergraduate / Graduate',
    statement: '',
  });

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
  };

  const getProgramIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return Building2;
      case 'Dna':
        return Dna;
      case 'Sprout':
        return Sprout;
      default:
        return GraduationCap;
    }
  };

  return (
    <div className="w-full">
      {/* Academy Header with Official Academy Logo at the Top */}
      <section className="bg-[#081710] text-white py-20 sm:py-28 lg:py-32 border-b border-[#1C3A2B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Emblem Badge & Accreditation Lockup */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex items-center gap-3 p-1.5 pr-4 bg-[#163B29]/90 border border-[#C89D4B]/40 rounded-full shadow-md backdrop-blur-md">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white p-1 shadow-xs overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={images.academyLogo || '/academy-logo.jpg'}
                  alt="Genius Dairy Academy Limited Logo"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = ACADEMY_LOGO_BASE64;
                  }}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#C89D4B] block leading-tight">
                  Genius Dairy Academy Limited
                </span>
                <span className="text-[10px] text-[#A8C5B5] block leading-tight font-medium">
                  Official Registered Crest • RC: 8888771
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#163B29] border border-[#2D6A4F]/50 text-[#C89D4B] text-xs font-bold uppercase tracking-widest rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#C89D4B]" />
              <span>Agricultural Education &amp; Training Hub</span>
            </div>
          </div>

          {/* Main Grid: Left Narrative & Right High-Resolution Logo Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Genius Dairy <span className="font-serif italic text-[#C89D4B] font-normal">Academy Limited</span>
              </h1>
              <p className="text-base sm:text-xl text-[#CBDDD2] max-w-2xl leading-relaxed font-normal">
                Knowledge. Skills. Opportunity. Bridging the agricultural talent gap in West Africa through immersive, hands-on dairy and livestock business education on our 60-acre commercial farm complex.
              </p>

              {/* Key Credentials Badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#143727] text-white/95 border border-white/10 text-xs font-medium rounded-full shadow-2xs">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C89D4B]" />
                  SIWES &amp; IT Practical Training
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#143727] text-white/95 border border-white/10 text-xs font-medium rounded-full shadow-2xs">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C89D4B]" />
                  Livestock Genetics &amp; Management
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#143727] text-white/95 border border-white/10 text-xs font-medium rounded-full shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C89D4B]" />
                  RC: 8888771 Registered Entity
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setSelectedCourse(ACADEMY_PROGRAMS[0].title);
                    setEnrollModalOpen(true);
                  }}
                  className="px-7 py-3.5 bg-[#C89D4B] hover:bg-[#D9AC59] text-[#081710] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer flex items-center gap-2"
                >
                  <span>Apply for Academy Course</span>
                  <ArrowRight className="w-4 h-4 text-[#081710]" />
                </button>
                <button
                  onClick={() => onNavigate('internships')}
                  className="px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Apply for SIWES / Internship
                </button>
                <button
                  onClick={() => onNavigate('excursions')}
                  className="px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Book School Excursion
                </button>
              </div>
            </div>

            {/* Right Column: Dedicated Academy Logo Showcase Card */}
            <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
              <div className="relative group w-full max-w-xs sm:max-w-sm">
                {/* Ambient aura glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#C89D4B]/40 via-[#E2C37E]/30 to-[#2D6A4F]/40 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative bg-[#0F2F21] border border-[#2D6A4F]/80 rounded-3xl p-7 sm:p-8 shadow-2xl text-center space-y-5">
                  {/* High-res Academy Logo Frame */}
                  <div
                    className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full bg-white p-3 shadow-inner border-4 border-[#C89D4B]/50 flex items-center justify-center overflow-hidden group-hover:scale-103 transition-transform"
                  >
                    <img
                      src={images.academyLogo || '/academy-logo.jpg'}
                      alt="Genius Dairy Academy Limited Official Logo"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = ACADEMY_LOGO_BASE64;
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-lg text-white tracking-wide uppercase">
                      Genius Dairy Academy Limited
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C89D4B] mt-1">
                      Learn • Grow • Lead
                    </p>
                    <p className="text-xs text-[#A3B8AD] mt-2.5 leading-relaxed">
                      Official institutional emblem of the dairy education, SIWES training, and agricultural capacity division of Genius Dairy Farms.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1C3A2B] flex items-center justify-between text-xs">
                    <span className="text-[#A3B8AD] flex items-center gap-1.5 font-medium">
                      <GraduationCap className="w-4 h-4 text-[#C89D4B]" />
                      <span>Capacity Building</span>
                    </span>
                    <span className="text-[#C89D4B] font-bold">
                      RC: 8888771
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Overview */}
      <section className="py-24 sm:py-32 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold">
                Educational Philosophy
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight leading-tight">
                Developing the Next Generation of <span className="font-serif italic text-[#143727] font-normal">Dairy Leaders</span>
              </h2>
              <p className="text-base text-[#4A554F] leading-relaxed">
                Genius Dairy Farm Academy was established because theoretical knowledge alone cannot build a commercially viable livestock enterprise. Operating on our 60-acre production site in Iseyin, participants learn directly alongside practicing farm managers, veterinary surgeons, and dairy technicians.
              </p>
              <p className="text-base text-[#4A554F] leading-relaxed">
                Whether you are an aspiring agropreneur establishing your first commercial dairy herd, a practicing farmer transitioning to artificial insemination, or an animal science student seeking verifiable field competence, our structured curriculum provides immediate practical value.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#EAE7DE]">
                <div className="p-5 bg-white rounded-2xl border border-[#E0DDD5] shadow-2xs flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#151A18]">
                      Field-First Immersion
                    </h4>
                    <p className="text-xs text-[#66726B] mt-1">
                      Over 70% of course hours spent in pens, pastures, and labs.
                    </p>
                  </div>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-[#E0DDD5] shadow-2xs flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#151A18]">
                      Practical Economics
                    </h4>
                    <p className="text-xs text-[#66726B] mt-1">
                      Actual cashflow modeling, feed conversion, and milk margin calculations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#C89D4B]/30 shadow-2xl bg-gradient-to-br from-[#06180E] via-[#0E2C1E] to-[#081810] p-8 sm:p-12 flex flex-col items-center justify-center text-center group">
                <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
                <div className="relative z-10 space-y-6">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full bg-white p-3 shadow-2xl border-4 border-[#C89D4B]/60 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={images.academyLogo || '/academy-logo.jpg'}
                      alt="Genius Dairy Academy Limited Official Logo"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = ACADEMY_LOGO_BASE64;
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-white tracking-wide uppercase">
                      Genius Dairy Academy Limited
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D4B] mt-1.5">
                      Learn • Grow • Lead
                    </p>
                    <p className="text-xs text-[#CBDDD2] max-w-sm mx-auto mt-2 leading-relaxed">
                      Accredited agricultural education, bovine genetics, and practical livestock capacity building (RC: 8888771).
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#143727] text-[#C89D4B] text-xs font-bold rounded-full border border-[#C89D4B]/40">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Official Institutional Crest</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Are Bringing Genius Dairy Academy on Board */}
      <section
        id="why-academy-section"
        className="py-24 sm:py-32 bg-white border-t border-[#ECE8DE]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-14">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#143727]/10 text-[#143727] text-xs font-bold uppercase tracking-[0.2em] rounded-full">
                <Lightbulb className="w-4 h-4 text-[#C89D4B]" />
                <span>Vision &amp; Strategic Purpose</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF9F5] border border-[#E0DDD5] rounded-full text-xs font-semibold text-[#143727]">
                <div className="w-4 h-4 rounded-full overflow-hidden bg-white shrink-0">
                  <img
                    src={images.academyLogo || '/academy-logo.jpg'}
                    alt="Genius Dairy Academy Limited Crest"
                    onError={(e) => {
                      e.currentTarget.src = ACADEMY_LOGO_BASE64;
                    }}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>Genius Dairy Academy Limited (RC: 8888771)</span>
              </div>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight leading-tight">
              Why We Are Bringing Genius Dairy Academy Limited <span className="font-serif italic text-[#143727] font-normal">on Board</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#4A554F] leading-relaxed">
              Addressing the critical human capacity gap to safeguard livestock investments and build lasting agricultural enterprises.
            </p>
          </div>

          {/* Key Observation / The Challenge Banner */}
          <div className="bg-[#FAF9F5] border-l-4 border-[#C89D4B] p-8 sm:p-10 rounded-2xl border-y border-r border-[#E8E4D8] mb-12 shadow-xs">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#C89D4B]/15 text-[#8D6B26] flex items-center justify-center shrink-0 mt-1">
                <AlertTriangle className="w-6 h-6 text-[#8D6B26]" />
              </div>
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-xl text-[#151A18]">
                  The 2-to-5-Year Livestock Sustainability Challenge
                </h3>
                <p className="text-base text-[#4A554F] leading-relaxed">
                  The reason we are establishing Genius Dairy Academy Limited is based on an important challenge we have observed in the livestock sector. Many people are investing in improved genetics of indigenous animals, importing quality breeds, developing pastures and establishing modern farms. However, after two to five years, some of these farms eventually fold up or become unproductive due to poor management, inadequate technical capacity and lack of continuity.
                </p>
              </div>
            </div>
          </div>

          {/* Core Philosophy Callout */}
          <div className="p-8 sm:p-12 bg-[#0E2C1E] text-white rounded-3xl border border-[#234D37] shadow-xl mb-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-[#C89D4B]/10 rounded-full blur-2xl pointer-events-none" />
            <p className="font-heading text-xl sm:text-2xl font-medium text-[#E4ECE7] leading-relaxed italic text-center max-w-3xl mx-auto">
              &ldquo;At Genius Dairy Farms, we believe that sustainable livestock development is not only about animals, genetics and infrastructure; it is also about developing the right people to manage them.&rdquo;
            </p>
          </div>

          {/* Two-Column Process Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            {/* Practical Discovery Track */}
            <div className="bg-[#FBFBFA] p-8 sm:p-10 rounded-3xl border border-[#E0DDD5] flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-[#143727]" />
                </div>
                <h4 className="font-heading font-bold text-xl text-[#151A18] mb-3">
                  Rooted in Real Field Observation (IT &amp; SIWES)
                </h4>
                <p className="text-sm sm:text-base text-[#4A554F] leading-relaxed mb-6">
                  We therefore started by accepting students from different colleges and institutions for Industrial Training (IT) and SIWES programmes. During their period of practical training, we observe their commitment, discipline, passion and willingness to learn. From these students, we identify those who demonstrate genuine interest and potential in livestock and dairy farming.
                </p>
              </div>
              <div className="pt-5 border-t border-[#EAE7DE] flex items-center gap-2.5 text-xs font-bold text-[#2D6A4F]">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>Merit &amp; Passion-Based Selection</span>
              </div>
            </div>

            {/* Systematic Academy Development */}
            <div className="bg-[#FBFBFA] p-8 sm:p-10 rounded-3xl border border-[#E0DDD5] flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6 text-[#143727]" />
                </div>
                <h4 className="font-heading font-bold text-xl text-[#151A18] mb-3">
                  Deliberate Leadership Development
                </h4>
                <p className="text-sm sm:text-base text-[#4A554F] leading-relaxed mb-6">
                  Genius Dairy Academy Limited is designed to build on this approach by deliberately identifying, training and developing young people into competent livestock and dairy farm managers, entrepreneurs and future industry leaders.
                </p>
              </div>
              <div className="pt-5 border-t border-[#EAE7DE] flex items-center gap-2.5 text-xs font-bold text-[#2D6A4F]">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>From Classroom Theory to Operating Manager</span>
              </div>
            </div>
          </div>

          {/* Long-Term Goal Banner */}
          <div className="bg-[#FAF9F5] p-8 sm:p-10 rounded-3xl border border-[#E0DDD5] mb-12 shadow-xs">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#143727] text-[#C89D4B] flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <Target className="w-6 h-6 text-[#C89D4B]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xl text-[#151A18] mb-2">
                  Our Strategic Goal
                </h4>
                <p className="text-base text-[#4A554F] leading-relaxed">
                  Our goal is to create a pool of well-trained and passionate professionals who can sustain farms beyond the establishment stage, manage modern livestock enterprises effectively, and contribute to the long-term growth of Nigeria&apos;s dairy and livestock sector.
                </p>
              </div>
            </div>
          </div>

          {/* Concluding Belief Quote Card */}
          <div className="bg-gradient-to-br from-[#143727] via-[#0E291C] to-[#081710] text-white p-10 sm:p-14 rounded-3xl border border-[#C89D4B]/30 shadow-2xl text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C89D4B] font-bold block mb-4">
              Guiding Conviction
            </span>
            <blockquote className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white max-w-3xl mx-auto leading-relaxed">
              &ldquo;Our belief is simple: improved genetics and modern infrastructure can build a farm, but competent people and good management are what sustain it.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Courses & Training Programmes */}
      <section className="py-24 sm:py-32 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Curriculum &amp; Certifications
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              Training Programmes &amp; <span className="font-serif italic text-[#143727] font-normal">Courses</span>
            </h2>
            <p className="text-base text-[#55625B] mt-3 leading-relaxed">
              Structured modules for farmers, entrepreneurs, veterinary professionals, and university cohorts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ACADEMY_PROGRAMS.map((prog) => {
              const IconComp = getProgramIcon(prog.iconName);
              return (
                <div
                  key={prog.id}
                  className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0DDD5] shadow-xs hover:shadow-xl hover:border-[#143727] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center shrink-0 group-hover:bg-[#143727] group-hover:text-white transition-colors">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="px-3.5 py-1.5 bg-[#F4F4F0] text-[#143727] font-mono text-xs font-bold rounded-full border border-[#E0DDD5]">
                        {prog.duration}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-2xl text-[#151A18] mb-3 group-hover:text-[#143727] transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-sm text-[#525F58] leading-relaxed mb-6">
                      {prog.description}
                    </p>

                    <div className="text-xs text-[#7A8780] mb-6 space-y-1.5 bg-[#FBFBFA] p-4 rounded-xl border border-[#EAE7DE]">
                      <div>
                        <strong className="text-[#151A18]">Target Audience:</strong> {prog.targetAudience}
                      </div>
                      <div>
                        <strong className="text-[#151A18]">Mode:</strong> {prog.mode}
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-[#EAE7DE] mb-8">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block">
                        Core Modules:
                      </span>
                      {prog.modules.map((mod, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A554F]">
                          <span className="text-[#C89D4B] font-bold">•</span>
                          <span>{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCourse(prog.title);
                      setEnrollModalOpen(true);
                    }}
                    className="w-full py-4 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer text-center"
                  >
                    Apply for this Course
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Farm Visits & Student Agropreneurs */}
      <section className="py-24 sm:py-32 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E0DDD5] shadow-xs flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
                  Educational Excursions
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#151A18] mb-4">
                  Academic &amp; Institution <span className="font-serif italic text-[#143727] font-normal">Farm Visits</span>
                </h3>
                <p className="text-base text-[#55625B] leading-relaxed mb-6">
                  We host university agricultural science departments, secondary school clubs, research fellows, and development agencies for tailored single-day or multi-day study tours of our 60-acre facility.
                </p>
                <ul className="text-xs sm:text-sm text-[#4A554F] space-y-3 mb-8">
                  <li className="flex items-center gap-2.5"><span className="text-[#2D6A4F] font-bold">•</span> <span>Live demonstration of artificial insemination equipment</span></li>
                  <li className="flex items-center gap-2.5"><span className="text-[#2D6A4F] font-bold">•</span> <span>Walkthrough of forage species and pit silage preparation</span></li>
                  <li className="flex items-center gap-2.5"><span className="text-[#2D6A4F] font-bold">•</span> <span>Mechanized milking routine and cooling tank inspection</span></li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="text-xs font-bold uppercase tracking-wider text-[#143727] hover:text-[#C89D4B] transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Book an Institutional Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#0B2317] text-white p-8 sm:p-12 rounded-3xl border border-[#234D37] shadow-xl flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D4B]/15 text-[#C89D4B] text-xs uppercase tracking-[0.2em] font-bold mb-3">
                  Agropreneur Incubator
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-4">
                  Youth Agropreneur <span className="font-serif italic text-[#C89D4B] font-normal">Mentorship</span>
                </h3>
                <p className="text-base text-[#CBDDD2] leading-relaxed mb-6 font-normal">
                  Graduates of our Academy receive continued access to technical backstopping, semen access programs, and mentorship to successfully launch their own commercial herds and dairy value-addition enterprises.
                </p>
              </div>
              <div className="pt-6 border-t border-white/15">
                <button
                  onClick={() => {
                    setSelectedCourse('Youth Agropreneurship & Mentorship');
                    setEnrollModalOpen(true);
                  }}
                  className="px-8 py-4 bg-[#C89D4B] hover:bg-[#D9AC59] text-[#081710] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                >
                  Join Mentorship Track
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official CAC Registration & Regulatory Compliance Section */}
      <CacRegistrationSection />

      {/* Course Application Modal */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="bg-white border border-[#D5D1C4] max-w-xl w-full rounded-3xl shadow-2xl p-6 sm:p-8 relative">
            <div className="flex items-center justify-between pb-5 border-b border-[#EAE7DE]">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C89D4B] font-bold block mb-1">
                  Genius Dairy Farm Academy
                </span>
                <h3 className="font-heading font-bold text-2xl text-[#151A18]">
                  Cohort Application
                </h3>
              </div>
              <button
                onClick={() => {
                  setEnrollModalOpen(false);
                  setApplicationSubmitted(false);
                }}
                className="text-[#66726B] hover:text-[#151A18] text-lg p-2 cursor-pointer rounded-full hover:bg-[#F4F4F0] transition-colors"
              >
                ✕
              </button>
            </div>

            {applicationSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#143727]/10 text-[#143727] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-[#143727]" />
                </div>
                <h4 className="font-heading font-bold text-xl text-[#151A18]">
                  Application Successfully Received
                </h4>
                <p className="text-sm text-[#55625B] leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{applicantForm.name}</strong>. Your enrollment registration for <strong>{selectedCourse}</strong> has been received. Our admissions coordinator will reach out with the cohort schedule and logistics.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setApplicationSubmitted(false);
                      setEnrollModalOpen(false);
                    }}
                    className="px-8 py-3.5 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="pt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A554F] mb-1.5">
                    Selected Course / Track *
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-white border border-[#D5D2C8] rounded-xl focus:border-[#143727] focus:ring-1 focus:ring-[#143727] focus:outline-none"
                  >
                    {ACADEMY_PROGRAMS.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title} ({p.duration})
                      </option>
                    ))}
                    <option value="Institutional Delegation / Tailored Group">
                      Institutional Delegation / Tailored Group
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A554F] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oluwaseun Adeyemi"
                    value={applicantForm.name}
                    onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-white border border-[#D5D2C8] rounded-xl focus:border-[#143727] focus:ring-1 focus:ring-[#143727] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A554F] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={applicantForm.email}
                      onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-white border border-[#D5D2C8] rounded-xl focus:border-[#143727] focus:ring-1 focus:ring-[#143727] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A554F] mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234..."
                      value={applicantForm.phone}
                      onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-white border border-[#D5D2C8] rounded-xl focus:border-[#143727] focus:ring-1 focus:ring-[#143727] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A554F] mb-1.5">
                    Current Professional Background
                  </label>
                  <select
                    value={applicantForm.background}
                    onChange={(e) => setApplicantForm({ ...applicantForm, background: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-white border border-[#D5D2C8] rounded-xl focus:border-[#143727] focus:ring-1 focus:ring-[#143727] focus:outline-none"
                  >
                    <option>Undergraduate / Agricultural Student</option>
                    <option>Veterinary / Animal Health Technician</option>
                    <option>Commercial Livestock Farmer</option>
                    <option>Aspiring Agribusiness Entrepreneur</option>
                    <option>Extension Officer / Development Agent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A554F] mb-1.5">
                    Learning Objectives
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what practical skills you want to gain from this programme..."
                    value={applicantForm.statement}
                    onChange={(e) => setApplicantForm({ ...applicantForm, statement: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-white border border-[#D5D2C8] rounded-xl focus:border-[#143727] focus:ring-1 focus:ring-[#143727] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEnrollModalOpen(false)}
                    className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#66726B] hover:text-[#151A18] rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
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
