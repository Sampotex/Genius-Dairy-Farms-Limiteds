import React, { useState } from 'react';
import {
  FileCheck,
  GraduationCap,
  Users,
  Calendar,
  Building2,
  CheckCircle,
  Award,
  IdCard,
  Search,
  ArrowRight,
  Sparkles,
  ClipboardList,
  ShieldCheck,
  Clock,
  Dna,
  Sprout,
  Milk,
  FileText,
} from 'lucide-react';
import { PageId } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { Logo } from '../components/Logo';

interface InternshipsPageProps {
  onNavigate: (page: PageId) => void;
}

export const InternshipsPage: React.FC<InternshipsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'track' | 'schools'>('apply');
  const [searchTrackingCode, setSearchTrackingCode] = useState('GDF-INT-2026-409');
  const [trackerResult, setTrackerResult] = useState<any>(null);

  const [internForm, setInternForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    courseOfStudy: 'Animal Science & Production',
    degreeType: 'B.Sc. / B.Agric.',
    internshipDuration: '6 Months (SIWES / IT)',
    preferredSchool: 'school-1',
    motivation: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedAppCode, setGeneratedAppCode] = useState('');

  const dairySchools = [
    {
      id: 'school-1',
      number: 'Dairy School 01',
      title: 'Livestock Genetics, Breeding & Cattle Healthcare',
      icon: Dna,
      supervisor: 'Senior Livestock Veterinarian',
      focus:
        'Hands-on immersion in artificial insemination, heat detection protocols, Fulani-Holstein F1 crossbred management, vaccination schedules, and calf nursery biosecurity.',
      skills: [
        'Artificial Insemination (AI) techniques',
        'Cattle vital signs & prophylactic treatments',
        'Neonatal calf nursing & colostrum management',
        'Ear-tagging, record keeping & herd pedigree',
      ],
    },
    {
      id: 'school-2',
      number: 'Dairy School 02',
      title: 'Milking Operations, Parlour Mechanics & Cold Chain',
      icon: Milk,
      supervisor: 'Milking Systems Operations Lead',
      focus:
        'Daily operation of mechanized vacuum milking machinery, teat preparation, post-milking teat dipping, bulk milk chilling tanks, and hygiene laboratory testing.',
      skills: [
        'Milking cluster assembly & sanitization',
        'California Mastitis Test (CMT) diagnosis',
        'Bulk cooling tank temperature maintenance',
        'CIP (Clean-in-Place) sterilization routines',
      ],
    },
    {
      id: 'school-3',
      number: 'Dairy School 03',
      title: 'Pasture Agronomy, Fodder Banks & Pit Silage',
      icon: Sprout,
      supervisor: 'Pasture Agronomist & Feed Manager',
      focus:
        'Intensive paddock management, cultivation of high-protein tropical forage (Brachiaria, Panicum, Napier), bunker/pit silage fermentation, and Total Mixed Ration (TMR) formulation.',
      skills: [
        'Forage harvesting at peak dry-matter nutrient stage',
        'Pit silage packing, molasses inoculant & sealing',
        'Electric fencing & rotational grazing layout',
        'Dry season nutritional feed budgeting',
      ],
    },
    {
      id: 'school-4',
      number: 'Dairy School 04',
      title: 'Udderfall Processing, Fermentation & Quality Control',
      icon: Building2,
      supervisor: 'Dairy Food Processing Specialist',
      focus:
        'Value-addition protocols transforming raw milk into pasteurized products, artisan whole milk stirred yogurts, traditional and modern wara curd cheese, and packaging logistics.',
      skills: [
        'Batch pasteurization & thermophilic incubation',
        'Artisan cheese curd coagulation & pressing',
        'Food safety, HACCP & sanitary packaging',
        'Cold-chain supply storage & inventory dispatch',
      ],
    },
  ];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `GDF-INT-2026-${Math.floor(100 + Math.random() * 900)}`;
    setGeneratedAppCode(code);
    setIsSubmitted(true);
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackerResult({
      code: searchTrackingCode || 'GDF-INT-2026-409',
      name: 'Adebayo Samuel O.',
      institution: 'Federal University of Agriculture, Abeokuta (FUNAAB)',
      program: 'SIWES Industrial Attachment (6 Months)',
      assignedSchool: 'Dairy School 01: Livestock Genetics & Cattle Healthcare',
      supervisor: 'Dr. K. Babatunde (Lead Veterinary Officer)',
      status: 'Admitted & Assigned',
      commencementDate: 'October 15, 2026',
      station: '60-Acre Dairy Development Facility, Iseyin, Oyo State',
      digitalIdIssued: true,
      logbookVerified: 'Approved for Induction',
    });
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-[#081710] text-white py-20 sm:py-28 border-b border-[#1C3A2B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#163B29] text-[#C89D4B] text-xs font-bold uppercase tracking-widest rounded-full mb-6 border border-[#C89D4B]/25">
            <FileCheck className="w-3.5 h-3.5 text-[#C89D4B]" />
            <span>Practical Capacity Building</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
            Internship &amp; <span className="font-serif italic text-[#C89D4B] font-normal">Practical Training</span>
          </h1>
          <p className="text-base sm:text-xl text-[#CBDDD2] max-w-3xl mt-6 leading-relaxed font-normal">
            We are committed to supporting practical agricultural learning through structured internship opportunities. Our digital internship management system enables students to apply online, track their status, manage payments, access digital ID cards, and view their assigned dairy school under experienced farm supervisors.
          </p>

          {/* Tab Navigation */}
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('apply')}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'apply'
                  ? 'bg-[#C89D4B] text-[#081710] shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Apply for Internship</span>
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'track'
                  ? 'bg-[#C89D4B] text-[#081710] shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <IdCard className="w-4 h-4" />
              <span>Track Application &amp; Digital ID</span>
            </button>
            <button
              onClick={() => setActiveTab('schools')}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'schools'
                  ? 'bg-[#C89D4B] text-[#081710] shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Dairy Schools &amp; Supervision</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Areas based on Active Tab */}
      {activeTab === 'apply' && (
        <section className="py-20 sm:py-28 bg-[#FBFBFA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Eligibility & Workflow */}
              <div className="lg:col-span-5 space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold">
                  Structured Learning
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight leading-tight">
                  Bridge Classroom Theory with <span className="font-serif italic text-[#143727] font-normal">Real Dairy Operations</span>
                </h2>
                <p className="text-base text-[#4A554F] leading-relaxed">
                  Our internship and SIWES program places university, polytechnic, and college students into real commercial dairy shifts across our 60-acre facility in Iseyin, Oyo State. Interns gain direct experience with modern genetics, milking parlours, silage pits, and value-added dairy manufacturing.
                </p>

                <div className="space-y-4 pt-4 border-t border-[#EAE7DE]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#151A18]">
                    Eligible Disciplines:
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#525F58]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>Animal Science</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>Veterinary Medicine</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>Agronomy / Crops</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>Agric Economics</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>Food Technology</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>Agric Extension</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-[#F4F4F0] rounded-2xl border border-[#E0DDD5] space-y-3">
                  <div className="flex items-center gap-2 text-[#143727] text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#C89D4B]" />
                    <span>Supervised Accountability</span>
                  </div>
                  <p className="text-xs text-[#55625B] leading-relaxed">
                    Interns receive logbook verification, continuous performance tracking, weekly supervisor assessments, and an official Certificate of Practical Dairy Competence upon completion.
                  </p>
                </div>
              </div>

              {/* Right Column: Application Form */}
              <div className="lg:col-span-7">
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0DDD5] shadow-lg">
                  {isSubmitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 bg-[#143727]/10 text-[#143727] rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-[#143727]" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-[#151A18]">
                        Internship Application Submitted!
                      </h3>
                      <div className="p-4 bg-[#F4F4F0] rounded-xl inline-block font-mono text-sm font-bold text-[#143727]">
                        Application Tracking ID: {generatedAppCode}
                      </div>
                      <p className="text-sm text-[#525F58] max-w-md mx-auto leading-relaxed">
                        We have received your practical training application for <strong>{internForm.fullName}</strong>. An email confirmation has been dispatched. Use your tracking ID anytime to monitor your dairy school assignment and supervisor review.
                      </p>
                      <div className="pt-4 flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setSearchTrackingCode(generatedAppCode);
                            setActiveTab('track');
                          }}
                          className="px-6 py-2.5 bg-[#143727] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                        >
                          Check Status Now
                        </button>
                        <button
                          onClick={() => setIsSubmitted(false)}
                          className="px-6 py-2.5 bg-[#F4F4F0] text-[#143727] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                        >
                          New Application
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleApplySubmit} className="space-y-5">
                      <div>
                        <h3 className="font-heading text-xl font-bold text-[#151A18] mb-1">
                          Online Internship Application
                        </h3>
                        <p className="text-xs text-[#7A8780]">
                          Complete this form to apply for SIWES, University IT, or graduate dairy attachments.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                            Full Legal Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={internForm.fullName}
                            onChange={(e) => setInternForm({ ...internForm, fullName: e.target.value })}
                            placeholder="e.g. Oluwaseun Adeleke"
                            className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={internForm.email}
                            onChange={(e) => setInternForm({ ...internForm, email: e.target.value })}
                            placeholder="student@univ.edu.ng"
                            className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                            Phone (WhatsApp) *
                          </label>
                          <input
                            type="tel"
                            required
                            value={internForm.phone}
                            onChange={(e) => setInternForm({ ...internForm, phone: e.target.value })}
                            placeholder="+234 800 000 0000"
                            className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                            Institution / College *
                          </label>
                          <input
                            type="text"
                            required
                            value={internForm.institution}
                            onChange={(e) => setInternForm({ ...internForm, institution: e.target.value })}
                            placeholder="e.g. University of Ibadan / FUNAAB"
                            className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                            Course of Study
                          </label>
                          <input
                            type="text"
                            value={internForm.courseOfStudy}
                            onChange={(e) => setInternForm({ ...internForm, courseOfStudy: e.target.value })}
                            className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                            Internship Duration
                          </label>
                          <select
                            value={internForm.internshipDuration}
                            onChange={(e) => setInternForm({ ...internForm, internshipDuration: e.target.value })}
                            className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                          >
                            <option value="3 Months (IT)">3 Months (IT / Pre-Degree)</option>
                            <option value="6 Months (SIWES / IT)">6 Months (SIWES / University IT)</option>
                            <option value="12 Months (Graduate / NYSC)">12 Months (Graduate / NYSC)</option>
                            <option value="Custom Duration">Custom Intensive Attachment</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                          Preferred Dairy School Track
                        </label>
                        <select
                          value={internForm.preferredSchool}
                          onChange={(e) => setInternForm({ ...internForm, preferredSchool: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                        >
                          {dairySchools.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.number}: {s.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                          Brief Statement of Interest
                        </label>
                        <textarea
                          rows={3}
                          value={internForm.motivation}
                          onChange={(e) => setInternForm({ ...internForm, motivation: e.target.value })}
                          placeholder="Why do you wish to train at Genius Dairy Farms? Mention any specific goals for your logbook or research..."
                          className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-[#143727] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#0D261B] transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                      >
                        <FileCheck className="w-4 h-4 text-[#C89D4B]" />
                        <span>Submit Application Online</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tracker & Digital ID Preview Tab */}
      {activeTab === 'track' && (
        <section className="py-20 sm:py-28 bg-[#FBFBFA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
                Real-Time Portal
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
                Intern Application Tracking &amp; <span className="font-serif italic text-[#143727] font-normal">Digital ID</span>
              </h2>
              <p className="text-base text-[#55625B] mt-3 leading-relaxed">
                Enter your application tracking code below to check verification progress, view your assigned dairy school, supervisor details, and access your digital intern pass.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleTrackSearch} className="mt-6 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={searchTrackingCode}
                  onChange={(e) => setSearchTrackingCode(e.target.value)}
                  placeholder="e.g. GDF-INT-2026-409"
                  className="flex-1 px-5 py-3.5 bg-white border border-[#D5D1C4] rounded-xl text-sm font-mono focus:outline-none focus:border-[#143727] shadow-xs"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#143727] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#0D261B] transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Verify Status</span>
                </button>
              </form>
            </div>

            {/* Simulated Live Record Display */}
            {trackerResult ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Status Summary */}
                <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#E0DDD5] shadow-md space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAE7DE]">
                    <div>
                      <span className="text-xs text-[#7A8780] block font-medium">Tracking Code</span>
                      <span className="font-mono text-base font-bold text-[#143727]">
                        {trackerResult.code}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#143727]/10 text-[#143727] text-xs font-bold uppercase tracking-wider rounded-full">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>{trackerResult.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#8C9B92] block mb-1">Intern Full Name:</span>
                      <strong className="text-sm text-[#151A18]">{trackerResult.name}</strong>
                    </div>
                    <div>
                      <span className="text-[#8C9B92] block mb-1">Academic Institution:</span>
                      <strong className="text-sm text-[#151A18]">{trackerResult.institution}</strong>
                    </div>
                    <div>
                      <span className="text-[#8C9B92] block mb-1">Assigned Dairy School:</span>
                      <strong className="text-sm text-[#143727]">{trackerResult.assignedSchool}</strong>
                    </div>
                    <div>
                      <span className="text-[#8C9B92] block mb-1">Supervisor in Charge:</span>
                      <strong className="text-sm text-[#151A18]">{trackerResult.supervisor}</strong>
                    </div>
                    <div>
                      <span className="text-[#8C9B92] block mb-1">Commencement Date:</span>
                      <strong className="text-sm text-[#151A18]">{trackerResult.commencementDate}</strong>
                    </div>
                    <div>
                      <span className="text-[#8C9B92] block mb-1">Operating Station:</span>
                      <strong className="text-sm text-[#151A18]">{trackerResult.station}</strong>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F4F4F0] rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#143727]" />
                      <div>
                        <span className="text-xs font-bold text-[#151A18] block">
                          Official Admission &amp; Logbook Kit
                        </span>
                        <span className="text-[11px] text-[#7A8780]">
                          Includes farm safety code, shift roster, and evaluation rubric
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert('Official Admission Kit ready for pickup upon physical induction in Iseyin.')}
                      className="px-4 py-2 bg-[#143727] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg cursor-pointer"
                    >
                      Download Kit
                    </button>
                  </div>
                </div>

                {/* Digital ID Card Preview */}
                <div className="lg:col-span-5">
                  <div className="bg-[#0A1C14] text-white p-6 sm:p-7 rounded-3xl border border-[#C89D4B]/40 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C89D4B]/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Logo size="xs" />
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#C89D4B] block leading-none">
                            Genius Dairy Farms
                          </span>
                          <span className="text-[9px] text-[#A8C5B5] block leading-none mt-0.5">
                            Dairy Farm Academy Intern
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#163B29] text-[#C89D4B] font-bold border border-[#C89D4B]/30">
                        VERIFIED ID
                      </span>
                    </div>

                    <div className="my-6 flex items-center gap-4">
                      <div className="w-16 h-20 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center justify-center text-center p-2 shrink-0">
                        <Users className="w-8 h-8 text-[#C89D4B]" />
                        <span className="text-[8px] text-[#CBDDD2] uppercase mt-1">Photo ID</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <h4 className="font-heading font-bold text-base text-white">
                          {trackerResult.name}
                        </h4>
                        <div className="text-[#C89D4B] text-[11px] font-mono">
                          ID: {trackerResult.code}
                        </div>
                        <div className="text-[10px] text-[#CBDDD2]">
                          Track: {trackerResult.assignedSchool.split(':')[0]}
                        </div>
                        <div className="text-[9px] text-[#8DA396]">
                          Validity: 2026 Academic Session
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-[#CBDDD2]">
                      <span>60-Acre Dairy Facility • Iseyin, Oyo</span>
                      <span className="font-mono text-[#C89D4B]">Active Logbook</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-white rounded-3xl border border-[#E0DDD5] text-center text-[#7A8780]">
                Click "Verify Status" to view sample intern admission record and digital ID badge.
              </div>
            )}
          </div>
        </section>
      )}

      {/* Dairy Schools & Supervision Structure Tab */}
      {activeTab === 'schools' && (
        <section className="py-20 sm:py-28 bg-[#FBFBFA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
                Dairy School Management Initiative
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
                Supervised Learning &amp; <span className="font-serif italic text-[#143727] font-normal">Accountability</span>
              </h2>
              <p className="text-base text-[#55625B] mt-3 leading-relaxed">
                Through our dairy school management initiative, Genius Dairy Farms aims to strengthen the organization and supervision of practical learning activities. The system enables administrators to manage dairy schools, assign interns, and coordinate learning activities, while supervisors monitor progress and submit weekly evaluations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dairySchools.map((school) => {
                const Icon = school.icon;
                return (
                  <div
                    key={school.id}
                    className="bg-white p-8 rounded-3xl border border-[#E0DDD5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-block px-3 py-1 bg-[#143727] text-[#C89D4B] text-xs font-bold uppercase tracking-wider rounded-md">
                          {school.number}
                        </span>
                        <span className="text-xs text-[#7A8780]">Supervised Unit</span>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-[#151A18]">
                          {school.title}
                        </h3>
                      </div>

                      <p className="text-xs text-[#525F58] leading-relaxed mb-6">
                        {school.focus}
                      </p>

                      <div className="space-y-2 mb-6">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C9B92]">
                          Key Practical Competencies:
                        </div>
                        {school.skills.map((s, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#3E4A44]">
                            <CheckCircle className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#EAE7DE] flex items-center justify-between text-xs">
                      <span className="text-[#7A8780]">Supervisor: <strong>{school.supervisor}</strong></span>
                      <button
                        onClick={() => {
                          setInternForm({ ...internForm, preferredSchool: school.id });
                          setActiveTab('apply');
                        }}
                        className="px-4 py-2 bg-[#F4F4F0] text-[#143727] font-bold uppercase tracking-wider rounded-lg hover:bg-[#EAE7DE] transition-colors"
                      >
                        Enroll Here
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
