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
  MapPin,
  Phone,
  Mail,
  Send,
  Download,
  FileCheck,
  Award,
} from 'lucide-react';
import { ACADEMY_PROGRAMS, COMPANY_DETAILS } from '../../data/companyData';
import { useSiteImages } from '../../context/BrandMediaContext';
import { CacRegistrationSection } from '../../components/CacRegistrationSection';
import { ACADEMY_LOGO_BASE64 } from '../../data/academyLogoFallback';
import { useRouter } from '../../context/RouterContext';
import { AcademyHeader } from '../../components/academy/AcademyHeader';
import { AcademyFooter } from '../../components/academy/AcademyFooter';

export const AcademySite: React.FC = () => {
  const images = useSiteImages();
  const { academySubPage, navigate } = useRouter();

  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>(ACADEMY_PROGRAMS[0]?.title || 'Commercial Dairy Management');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const [applicantForm, setApplicantForm] = useState({
    name: '',
    email: '',
    phone: '',
    background: 'Undergraduate / Graduate',
    targetCourse: selectedCourse,
    statement: '',
  });

  const handleEnrollOpen = (courseTitle?: string) => {
    if (courseTitle) {
      setSelectedCourse(courseTitle);
      setApplicantForm((prev) => ({ ...prev, targetCourse: courseTitle }));
    }
    setEnrollModalOpen(true);
  };

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
    <div className="w-full bg-[#FCFCFA] text-[#151A18] min-h-screen flex flex-col font-sans selection:bg-[#C89D4B]/30 selection:text-[#0D261B]">
      {/* Dedicated Independent Academy Header */}
      <AcademyHeader onOpenEnrollModal={handleEnrollOpen} />

      <main className="flex-1">
        {/* =========================================================================
            ACADEMY HERO BANNER
            ========================================================================= */}
        <section className="bg-[#081710] text-white py-20 sm:py-28 border-b border-[#1C3A2B] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Top Emblem Badge & Accreditation Lockup */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center gap-3 p-1.5 pr-4 bg-[#163B29]/90 border border-[#C89D4B]/40 rounded-full shadow-md backdrop-blur-md">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white p-1 shadow-xs overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src={images.academyLogo || '/academy-logo.jpg'}
                    alt="Genius Dairy Academy Limited Logo"
                    onError={(e) => {
                      e.currentTarget.src = ACADEMY_LOGO_BASE64;
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-6">
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  Building Africa's Next Generation of Dairy Leaders.
                </h1>
                <p className="text-base sm:text-xl text-[#CBDDD2] max-w-3xl leading-relaxed font-light">
                  A specialized, hands-on training institution providing vocational certifications, university SIWES internships, and executive masterclasses directly within our operating 60-acre dairy development ranch in Iseyin, Oyo State.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => handleEnrollOpen()}
                    className="px-6 py-3.5 bg-[#C89D4B] hover:bg-[#B38938] text-[#081710] text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Apply for Admission</span>
                  </button>

                  <button
                    onClick={() => navigate('/academy/courses')}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Explore Programmes</span>
                  </button>

                  <button
                    onClick={() => navigate('/academy/admissions')}
                    className="px-6 py-3.5 bg-[#163B29] hover:bg-[#1E4D35] text-[#C89D4B] border border-[#C89D4B]/50 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>SIWES Portal</span>
                  </button>
                </div>
              </div>

              {/* Institution Key Statistics */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                <div className="bg-[#122E21]/80 backdrop-blur-md p-5 rounded-2xl border border-[#234D36] space-y-1">
                  <span className="font-heading text-3xl font-black text-[#C89D4B]">60</span>
                  <span className="text-xs uppercase tracking-wider text-[#A8C5B5] block font-bold">Acres of Living Lab</span>
                  <p className="text-[11px] text-[#7A9887] leading-relaxed">Outdoor dairy training infrastructure in Iseyin.</p>
                </div>

                <div className="bg-[#122E21]/80 backdrop-blur-md p-5 rounded-2xl border border-[#234D36] space-y-1">
                  <span className="font-heading text-3xl font-black text-[#C89D4B]">80%</span>
                  <span className="text-xs uppercase tracking-wider text-[#A8C5B5] block font-bold">Practical Fieldwork</span>
                  <p className="text-[11px] text-[#7A9887] leading-relaxed">Hands-on herd handling, milking, and forage care.</p>
                </div>

                <div className="bg-[#122E21]/80 backdrop-blur-md p-5 rounded-2xl border border-[#234D36] space-y-1">
                  <span className="font-heading text-3xl font-black text-[#C89D4B]">RC</span>
                  <span className="text-xs uppercase tracking-wider text-[#A8C5B5] block font-bold">8888771</span>
                  <p className="text-[11px] text-[#7A9887] leading-relaxed">Incorporated by the Corporate Affairs Commission.</p>
                </div>

                <div className="bg-[#122E21]/80 backdrop-blur-md p-5 rounded-2xl border border-[#234D36] space-y-1">
                  <span className="font-heading text-3xl font-black text-[#C89D4B]">100%</span>
                  <span className="text-xs uppercase tracking-wider text-[#A8C5B5] block font-bold">Industry Relevance</span>
                  <p className="text-[11px] text-[#7A9887] leading-relaxed">Solving Nigeria's $1.5B annual dairy import deficit.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ABOUT ACADEMY VIEW
            ========================================================================= */}
        {academySubPage === 'about' && (
          <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#C89D4B]">
                About the Academy
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                Empowering Nigeria's Agricultural Transformation Through Real Competence.
              </h2>
              <p className="text-base sm:text-lg text-[#55625B] leading-relaxed">
                Founded under the leadership of Moyosore Olatunde Rafiu, Genius Dairy Academy Limited addresses the critical gap between theoretical university agricultural curricula and the practical realities of managing commercial dairy livestock in tropical Nigeria.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-[#EAE7DE] shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#081710] text-[#C89D4B] flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#151A18]">Mission &amp; Purpose</h3>
                <p className="text-sm text-[#55625B] leading-relaxed">
                  To provide structured, science-based dairy farming education combining cattle genetics, veterinary hygiene, pasture management, and value addition to produce self-sufficient agribusiness leaders.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-[#EAE7DE] shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#081710] text-[#C89D4B] flex items-center justify-center">
                  <Dna className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#151A18]">Biotechnology Focus</h3>
                <p className="text-sm text-[#55625B] leading-relaxed">
                  Students learn practical artificial insemination (AI) and crossbreeding protocols that transform indigenous 1–2 litre cattle into 10–15 litre productive dairy cows.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-[#EAE7DE] shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#081710] text-[#C89D4B] flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#151A18]">On-Farm Immersion</h3>
                <p className="text-sm text-[#55625B] leading-relaxed">
                  No simulations or hypothetical textbooks: trainees work directly with live dairy cows, mechanized milking clusters, silage silos, and pasteurization vats.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            PROGRAMMES & COURSES VIEW
            ========================================================================= */}
        {(academySubPage === 'home' || academySubPage === 'courses') && (
          <section id="academy-courses" className="py-16 sm:py-24 bg-white border-b border-[#EAE7DE]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#C89D4B]">
                    Academic Curriculum
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                    Professional Certifications &amp; Courses
                  </h2>
                  <p className="text-sm sm:text-base text-[#55625B] max-w-2xl">
                    Structured modular courses designed for practicing livestock farmers, agricultural graduates, prospective farm managers, and agribusiness investors.
                  </p>
                </div>

                <button
                  onClick={() => handleEnrollOpen()}
                  className="px-5 py-3 rounded-xl bg-[#143727] hover:bg-[#0D261B] text-[#C89D4B] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 self-start md:self-auto"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Download Course Prospectus</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {ACADEMY_PROGRAMS.map((program) => {
                  const IconComponent = getProgramIcon(program.iconName);
                  return (
                    <div
                      key={program.id}
                      className="bg-[#FAF8F3] border border-[#E8E2D4] rounded-2xl p-6 sm:p-8 space-y-6 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-[#143727] text-[#C89D4B] flex items-center justify-center">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-[#143727]/10 text-[#143727] text-xs font-bold">
                            {program.duration}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-[#C89D4B]/20 text-[#B38938] text-xs font-bold">
                            {program.mode}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#151A18]">
                          {program.title}
                        </h3>
                        <p className="text-xs font-semibold text-[#C89D4B]">
                          Target: {program.targetAudience}
                        </p>
                        <p className="text-xs sm:text-sm text-[#55625B] leading-relaxed">
                          {program.description}
                        </p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-[#EAE7DE]">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#143727] block">
                          Core Modules Included:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {program.modules.map((mod, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-[#55625B]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                              <span>{mod}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs text-[#7A9887] font-medium">Includes Certificate of Completion</span>
                        <button
                          onClick={() => handleEnrollOpen(program.title)}
                          className="px-5 py-2.5 rounded-lg bg-[#C89D4B] hover:bg-[#B38938] text-[#081710] text-xs font-extrabold tracking-wide transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                        >
                          <span>Enroll in Course</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            ADMISSIONS & SIWES VIEW
            ========================================================================= */}
        {(academySubPage === 'home' || academySubPage === 'admissions') && (
          <section id="academy-admissions" className="py-16 sm:py-24 bg-[#F4F4F0] border-b border-[#EAE7DE]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-bold tracking-widest uppercase text-[#C89D4B]">
                  Admissions Office
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                  Student Internship, SIWES &amp; Practical Training Entry
                </h2>
                <p className="text-base sm:text-lg text-[#55625B]">
                  We welcome undergraduates from Agriculture, Animal Science, Veterinary Medicine, and Agribusiness departments across Nigerian tertiary institutions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-[#EAE7DE] shadow-xs space-y-4">
                  <span className="w-8 h-8 rounded-full bg-[#143727] text-white flex items-center justify-center font-bold text-xs">1</span>
                  <h3 className="font-heading font-bold text-lg text-[#151A18]">Institutional Letter</h3>
                  <p className="text-xs sm:text-sm text-[#55625B] leading-relaxed">
                    Provide an official letter of introduction from your Dean or Departmental HOD stating your degree programme and required SIWES duration (3–6 months).
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-[#EAE7DE] shadow-xs space-y-4">
                  <span className="w-8 h-8 rounded-full bg-[#143727] text-white flex items-center justify-center font-bold text-xs">2</span>
                  <h3 className="font-heading font-bold text-lg text-[#151A18]">Cohort Placement</h3>
                  <p className="text-xs sm:text-sm text-[#55625B] leading-relaxed">
                    Admissions are scheduled in quarterly cohorts to maintain a low student-to-mentor ratio across milking, breeding, pasture, and veterinary rotations.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-[#EAE7DE] shadow-xs space-y-4">
                  <span className="w-8 h-8 rounded-full bg-[#143727] text-white flex items-center justify-center font-bold text-xs">3</span>
                  <h3 className="font-heading font-bold text-lg text-[#151A18]">On-Site Farm Boarding</h3>
                  <p className="text-xs sm:text-sm text-[#55625B] leading-relaxed">
                    Hostel accommodations, clean amenities, and personal protective biosecurity gear are provided for residential students during their internship in Iseyin.
                  </p>
                </div>
              </div>

              {/* Application Callout */}
              <div className="p-8 sm:p-10 rounded-2xl bg-[#081710] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 max-w-xl text-center md:text-left">
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                    Submit Your Admission or SIWES Application
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CBDDD2]">
                    Seats are limited per cohort. Complete your registration online to reserve your training placement.
                  </p>
                </div>
                <button
                  onClick={() => handleEnrollOpen()}
                  className="px-6 py-3.5 bg-[#C89D4B] hover:bg-[#B38938] text-[#081710] text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Open Application Form
                </button>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            PRACTICAL FARM FACILITIES VIEW
            ========================================================================= */}
        {(academySubPage === 'home' || academySubPage === 'facilities') && (
          <section id="academy-facilities" className="py-16 sm:py-24 bg-white border-b border-[#EAE7DE]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-bold tracking-widest uppercase text-[#C89D4B]">
                  Campus Infrastructure
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                  60-Acre Outdoor Training Laboratory
                </h2>
                <p className="text-base sm:text-lg text-[#55625B]">
                  Training takes place directly inside Nigeria's model modern dairy ecosystem in Iseyin, Oyo State.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="rounded-2xl border border-[#EAE7DE] overflow-hidden bg-[#FAF8F3] space-y-4 p-6">
                  <div className="h-44 rounded-xl overflow-hidden bg-white">
                    <img
                      src={images.corporateFarmFacility || images.crossbreedCattle}
                      alt="Mechanized Milking Parlour"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#151A18]">Mechanized Milking Parlour</h3>
                  <p className="text-xs text-[#55625B] leading-relaxed">
                    Trainees operate vacuum cluster milking machines, in-line milk filtration, and rapid bulk tank chilling systems.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#EAE7DE] overflow-hidden bg-[#FAF8F3] space-y-4 p-6">
                  <div className="h-44 rounded-xl overflow-hidden bg-white">
                    <img
                      src={images.lushPasture}
                      alt="Pasture & Forage Research Station"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#151A18]">Pasture &amp; Silage Fields</h3>
                  <p className="text-xs text-[#55625B] leading-relaxed">
                    Rotational grazing paddocks planted with high-protein Brachiaria and Napier grass with pit silage ensiling methods.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#EAE7DE] overflow-hidden bg-[#FAF8F3] space-y-4 p-6">
                  <div className="h-44 rounded-xl overflow-hidden bg-white">
                    <img
                      src={images.crossbreedCattle || images.trainingField}
                      alt="Veterinary & AI Station"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#151A18]">Veterinary &amp; AI Clinic</h3>
                  <p className="text-xs text-[#55625B] leading-relaxed">
                    Liquid nitrogen cryo-storage, semen evaluation equipment, and bovine pregnancy diagnosis facilities.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            CAC REGISTRATION & LEGAL ACCREDITATION SECTION (On Home & Admissions)
            ========================================================================= */}
        {academySubPage === 'home' && (
          <section className="py-12 bg-[#F4F4F0] border-b border-[#EAE7DE]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CacRegistrationSection />
            </div>
          </section>
        )}

        {/* =========================================================================
            CAMPUS & CONTACT VIEW
            ========================================================================= */}
        {(academySubPage === 'home' || academySubPage === 'contact') && (
          <section id="academy-contact" className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#C89D4B]">
                    Academic Inquiries Desk
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                    Visit Our Campus or Reach Out Today
                  </h2>
                  <p className="text-sm sm:text-base text-[#55625B] leading-relaxed">
                    Our academic admissions staff is available Monday through Friday from 8:00 AM to 5:00 PM to answer inquiries regarding cohort schedules, hostel availability, and tuition fees.
                  </p>

                  <div className="space-y-4 pt-4 border-t border-[#EAE7DE]">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#FAF8F3] border border-[#EAE7DE] flex items-center justify-center shrink-0 text-[#143727]">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#151A18] block">Academy Campus Address</span>
                        <span className="text-xs text-[#55625B]">KM 4, Olora Village, Iseyin–Ibadan Expressway, Iseyin, Oyo State, Nigeria</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#FAF8F3] border border-[#EAE7DE] flex items-center justify-center shrink-0 text-[#143727]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#151A18] block">Admissions Hotline</span>
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
                        <span className="text-xs font-bold text-[#151A18] block">Academic Office Email</span>
                        <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-xs text-[#55625B] hover:underline">
                          {COMPANY_DETAILS.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#FAF8F3] p-8 sm:p-10 rounded-2xl border border-[#E8E2D4] shadow-xs">
                  <h3 className="font-heading font-extrabold text-xl text-[#151A18] mb-2">
                    Send an Inquiry to the Academic Registrar
                  </h3>
                  <p className="text-xs text-[#55625B] mb-6">
                    Interested in training your farm staff, scheduling an educational excursion, or applying for SIWES? Send us a note.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert('Your inquiry has been submitted to the Academic Registrar. We will reach out shortly.');
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-[#151A18] uppercase tracking-wide block mb-1">
                          Applicant / Sponsor Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D1C4] bg-white text-xs text-[#151A18] focus:outline-hidden focus:border-[#143727]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#151A18] uppercase tracking-wide block mb-1">
                          Telephone Number *
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
                        Institution or Organization
                      </label>
                      <input
                        type="text"
                        placeholder="University, Polytechnic, or Farm Enterprise"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D1C4] bg-white text-xs text-[#151A18] focus:outline-hidden focus:border-[#143727]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#151A18] uppercase tracking-wide block mb-1">
                        Training Interest / Inquiry *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Describe your training goals or student cohort size..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D1C4] bg-white text-xs text-[#151A18] focus:outline-hidden focus:border-[#143727]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#081710] hover:bg-[#122E21] text-[#C89D4B] text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Academic Inquiry</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Dedicated Independent Academy Footer */}
      <AcademyFooter onOpenEnrollModal={handleEnrollOpen} />

      {/* =========================================================================
          APPLICATION / ENROLLMENT MODAL
          ========================================================================= */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-[#FAF8F3] border border-[#D5D1C4] max-w-xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-[#151A18]">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE7DE]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white p-1 overflow-hidden shrink-0 border border-[#C89D4B]/40">
                  <img
                    src={images.academyLogo || '/academy-logo.jpg'}
                    alt="Genius Dairy Academy Logo"
                    onError={(e) => {
                      e.currentTarget.src = ACADEMY_LOGO_BASE64;
                    }}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-lg">
                    Genius Dairy Academy Admission
                  </h3>
                  <span className="text-xs text-[#55625B]">
                    Cohort Registration &amp; SIWES Placement
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setEnrollModalOpen(false);
                  setApplicationSubmitted(false);
                }}
                className="text-[#88958E] hover:text-[#151A18] text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {applicationSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#143727]/10 text-[#143727] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-[#C89D4B]" />
                </div>
                <h4 className="font-heading font-extrabold text-xl text-[#151A18]">
                  Application Successfully Registered!
                </h4>
                <p className="text-xs text-[#55625B] max-w-md mx-auto leading-relaxed">
                  Thank you for applying to Genius Dairy Academy Limited. Your application for <strong>{applicantForm.targetCourse}</strong> has been logged. Our admissions officer will review your background and send placement instructions to your email.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setEnrollModalOpen(false);
                      setApplicationSubmitted(false);
                    }}
                    className="px-6 py-2.5 bg-[#081710] text-[#C89D4B] text-xs font-bold uppercase rounded-lg cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="pt-5 space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#151A18] block mb-1">
                    Select Programme / Course *
                  </label>
                  <select
                    value={applicantForm.targetCourse}
                    onChange={(e) => setApplicantForm({ ...applicantForm, targetCourse: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D5D1C4] rounded-lg bg-white"
                  >
                    {ACADEMY_PROGRAMS.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title} ({p.duration})
                      </option>
                    ))}
                    <option value="SIWES Student Internship (3-6 Months)">
                      SIWES Student Internship (3–6 Months)
                    </option>
                    <option value="Corporate Farm Custom Training">
                      Corporate Farm Custom Training
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#151A18] block mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Surname First"
                      value={applicantForm.name}
                      onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
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
                      placeholder="student@example.com"
                      value={applicantForm.email}
                      onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-[#D5D1C4] rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#151A18] block mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234..."
                      value={applicantForm.phone}
                      onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-[#D5D1C4] rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#151A18] block mb-1">
                      Current Academic Background
                    </label>
                    <select
                      value={applicantForm.background}
                      onChange={(e) => setApplicantForm({ ...applicantForm, background: e.target.value })}
                      className="w-full px-3 py-2 border border-[#D5D1C4] rounded-lg bg-white"
                    >
                      <option>Undergraduate Student (SIWES / IT)</option>
                      <option>Fresh Agricultural Graduate</option>
                      <option>Practicing Livestock Farmer</option>
                      <option>Agribusiness Investor / Entrepreneur</option>
                      <option>Veterinary Professional</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#151A18] block mb-1">
                    Statement of Interest &amp; Experience
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your educational background, institution (if applicable), and what you hope to achieve at Genius Dairy Academy..."
                    value={applicantForm.statement}
                    onChange={(e) => setApplicantForm({ ...applicantForm, statement: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D5D1C4] rounded-lg bg-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEnrollModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#55625B] hover:text-[#151A18] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#081710] hover:bg-[#122E21] text-[#C89D4B] font-bold tracking-wide transition-all cursor-pointer shadow-md"
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
