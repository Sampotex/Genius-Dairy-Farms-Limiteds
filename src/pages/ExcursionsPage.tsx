import React, { useState } from 'react';
import {
  Bus,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Phone,
  Mail,
  Sparkles,
  BookOpen,
  Coffee,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import { PageId } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { Logo } from '../components/Logo';

interface ExcursionsPageProps {
  onNavigate: (page: PageId) => void;
}

export const ExcursionsPage: React.FC<ExcursionsPageProps> = ({ onNavigate }) => {
  const [groupCategory, setGroupCategory] = useState<'schools' | 'tertiary' | 'private'>('schools');
  const [visitorCount, setVisitorCount] = useState<number>(30);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [bookingForm, setBookingForm] = useState({
    institutionName: '',
    contactName: '',
    phone: '',
    email: '',
    gradeLevel: 'Secondary School (JSS/SSS)',
    notes: '',
  });
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);

  const packages = [
    {
      id: 'schools',
      name: 'Primary & Secondary Schools',
      badge: 'Discovery Tour',
      tagline: 'Inspiring young minds with agricultural science & livestock care',
      duration: '3.5 Hours',
      minGroup: '20 Students',
      highlights: [
        'Guided walking tour of the 60-acre dairy paddocks and cattle barns',
        'Observation of modern milking parlour and milk cooling systems',
        'Interactive calf feeding and animal welfare demonstration',
        'Introduction to the dairy lifecycle and milk nutrition science',
        'Complimentary chilled Udderfall yogurt tasting session',
      ],
    },
    {
      id: 'tertiary',
      name: 'Tertiary & Agricultural Students',
      badge: 'Technical Field Study',
      tagline: 'In-depth exposure to tropical dairy science, genetics & agronomy',
      duration: '5 Hours',
      minGroup: '15 Participants',
      highlights: [
        'Detailed briefing on artificial insemination & Holstein crossbreeding',
        'Pasture agronomy, fodder banks, and pit silage fermentation science',
        'Cold-chain hygiene, mastitis testing, and quality control protocols',
        'Dairy enterprise financial modeling and agribusiness viability Q&A',
        'Technical interaction with farm veterinary and livestock supervisors',
      ],
    },
    {
      id: 'private',
      name: 'Agropreneurs & Corporate Delegations',
      badge: 'Executive Ranch Tour',
      tagline: 'Commercial ranching insights, investments, and feasibility',
      duration: 'Half Day',
      minGroup: '5 Participants',
      highlights: [
        'Executive walk-through with senior farm management and founder',
        'Commercial dairy investment breakdown, capital expenditure & yield analysis',
        'Equipment inspection (milking lines, feed grinders, tractor implements)',
        'Value addition and dairy processing infrastructure review',
        'Private briefing on collaborative supply and corporate partnerships',
      ],
    },
  ];

  const itinerarySteps = [
    {
      time: '09:30 AM',
      title: 'Arrival & Welcome Orientation',
      desc: 'Reception at the administrative hub, safety briefing, biosecurity boot-wash, and distribution of visitor badges.',
    },
    {
      time: '10:15 AM',
      title: 'Paddocks & Dairy Herd Inspection',
      desc: 'Guided tour of the shaded resting barns, crossbred Holstein-Fulani dairy cows, feeding mangers, and calf nurseries.',
    },
    {
      time: '11:15 AM',
      title: 'Modern Milking & Milk Quality Demo',
      desc: 'Observation of automated milking extraction, inline filtration, refrigerated bulk milk chillers, and hygiene testing.',
    },
    {
      time: '12:00 PM',
      title: 'Pasture Agronomy & Silage Banks',
      desc: 'Inspection of high-tonnage forage plots, pit silage conservation, and nutrition ration mixing machinery.',
    },
    {
      time: '12:45 PM',
      title: 'Udderfall Tasting & Q&A Session',
      desc: 'Refreshing sampling of fresh artisan yogurt and traditional wara, certificate presentation, and group photograph.',
    },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-[#081710] text-white py-20 sm:py-28 border-b border-[#1C3A2B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#163B29] text-[#C89D4B] text-xs font-bold uppercase tracking-widest rounded-full mb-6 border border-[#C89D4B]/25">
            <Bus className="w-3.5 h-3.5 text-[#C89D4B]" />
            <span>Learning Through Experience</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
            Educational Excursions &amp; <span className="font-serif italic text-[#C89D4B] font-normal">Farm Visits</span>
          </h1>
          <p className="text-base sm:text-xl text-[#CBDDD2] max-w-3xl mt-6 leading-relaxed font-normal">
            Genius Dairy Farms provides opportunities for schools, students, and visitors to experience dairy farming through educational excursions and farm visits. These experiences introduce participants to livestock management, dairy production, and the practical operations of a modern commercial dairy enterprise.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#booking-portal"
              className="px-8 py-4 bg-[#C89D4B] text-[#081710] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#B58A38] transition-all shadow-md font-sans"
            >
              Book an Excursion
            </a>
            <button
              onClick={() => onNavigate('academy')}
              className="px-8 py-4 bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              Explore Dairy Academy
            </button>
          </div>
        </div>
      </section>

      {/* Package Selection */}
      <section className="py-20 sm:py-28 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Tailored Programs
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              Excursion <span className="font-serif italic text-[#143727] font-normal">Packages</span>
            </h2>
            <p className="text-base text-[#55625B] mt-3 leading-relaxed">
              Choose the program that best matches your institution’s educational objectives, curriculum, or delegation focus.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white p-8 rounded-3xl border transition-all flex flex-col justify-between ${
                  groupCategory === pkg.id
                    ? 'border-[#143727] shadow-lg ring-2 ring-[#143727]/10'
                    : 'border-[#E0DDD5] shadow-xs hover:border-[#143727]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-[#143727]/10 text-[#143727] text-xs font-bold uppercase tracking-wider rounded-md">
                      {pkg.badge}
                    </span>
                    <span className="text-xs font-medium text-[#7A8780] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-[#151A18] mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#525F58] leading-relaxed mb-6">
                    {pkg.tagline}
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C9B92]">
                      What’s Included:
                    </div>
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#3E4A44]">
                        <CheckCircle className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="pt-6 border-t border-[#EAE7DE] flex items-center justify-between">
                    <span className="text-xs text-[#7A8780]">Min. {pkg.minGroup}</span>
                    <button
                      onClick={() => {
                        setGroupCategory(pkg.id as any);
                        const el = document.getElementById('booking-portal');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        groupCategory === pkg.id
                          ? 'bg-[#143727] text-white'
                          : 'bg-[#F4F4F0] text-[#143727] hover:bg-[#E8E8E2]'
                      }`}
                    >
                      {groupCategory === pkg.id ? 'Selected' : 'Select Package'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typical Excursion Itinerary */}
      <section className="py-20 sm:py-28 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Standard Schedule
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              A Day on the <span className="font-serif italic text-[#143727] font-normal">Dairy Ranch</span>
            </h2>
            <p className="text-base text-[#55625B] mt-3 leading-relaxed">
              Every excursion follows an organized sequence combining biological observation, mechanical demonstration, and interactive discussion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {itinerarySteps.map((step, idx) => (
              <div
                key={step.title}
                className="bg-white p-6 rounded-2xl border border-[#E0DDD5] shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-[#C89D4B] bg-[#0A1C14] px-2.5 py-1 rounded-md inline-block mb-3">
                    {step.time}
                  </div>
                  <h4 className="font-heading font-bold text-base text-[#151A18] mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#525F58] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#F0ECE4] text-[11px] font-semibold text-[#8C9B92]">
                  Step {idx + 1} of 5
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Booking Platform Portal */}
      <section id="booking-portal" className="py-20 sm:py-28 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Info & Reassurance */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D4B]/20 text-[#8C6D29] text-xs uppercase tracking-[0.2em] font-bold">
                Online Reservation
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight leading-tight">
                Organize Your <span className="font-serif italic text-[#143727] font-normal">Farm Experience</span>
              </h2>
              <p className="text-base text-[#4A554F] leading-relaxed">
                Our digital excursion management system allows schools, universities, and group coordinators to reserve tour dates, register participants, and streamline logistics for a seamless visit to our 60-acre facility in Iseyin, Oyo State.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#EAE7DE]">
                <div className="flex items-start gap-3 text-xs text-[#4A554F]">
                  <MapPin className="w-4 h-4 text-[#143727] shrink-0 mt-0.5" />
                  <div>
                    <strong>Location:</strong> {COMPANY_DETAILS.address}
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-[#4A554F]">
                  <Phone className="w-4 h-4 text-[#143727] shrink-0 mt-0.5" />
                  <div>
                    <strong>Direct Excursion Desk:</strong> {COMPANY_DETAILS.phone}
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-[#4A554F]">
                  <Mail className="w-4 h-4 text-[#143727] shrink-0 mt-0.5" />
                  <div>
                    <strong>Email Inquiries:</strong> {COMPANY_DETAILS.email}
                  </div>
                </div>
              </div>

              {/* Safety Reassurance Card */}
              <div className="p-6 bg-[#0D261B] text-white rounded-2xl border border-[#1C3A2B] space-y-2">
                <div className="flex items-center gap-2 text-[#C89D4B] text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Biosecurity &amp; Safety First</span>
                </div>
                <p className="text-xs text-[#CBDDD2] leading-relaxed">
                  All visitors must follow our veterinary sanitation protocols, wear enclosed footwear, and remain with designated farm guides during herd inspections.
                </p>
              </div>
            </div>

            {/* Right: Booking Form Container */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0DDD5] shadow-lg">
                {bookingSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-[#143727]/10 text-[#143727] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10 text-[#143727]" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-[#151A18]">
                      Excursion Booking Request Received!
                    </h3>
                    <p className="text-sm text-[#525F58] max-w-md mx-auto leading-relaxed">
                      Thank you for scheduling a visit with Genius Dairy Farms Limited. Our excursions coordinator will review your requested date (<strong>{selectedDate || 'Upcoming'}</strong>) and contact <strong>{bookingForm.contactName}</strong> at <strong>{bookingForm.phone}</strong> with schedule confirmation and itinerary preparation.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setBookingSubmitted(false)}
                        className="px-6 py-2.5 bg-[#143727] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                      >
                        Submit Another Booking
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-[#151A18] mb-1">
                        Excursion Reservation Form
                      </h3>
                      <p className="text-xs text-[#7A8780]">
                        Fill out the details below to submit your reservation request to our farm administration desk.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                          School / Institution Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingForm.institutionName}
                          onChange={(e) => setBookingForm({ ...bookingForm, institutionName: e.target.value })}
                          placeholder="e.g. Divine Grace College"
                          className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                          Contact Coordinator Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingForm.contactName}
                          onChange={(e) => setBookingForm({ ...bookingForm, contactName: e.target.value })}
                          placeholder="e.g. Mr. Oladele Johnson"
                          className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          placeholder="+234 800 000 0000"
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
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          placeholder="school@domain.com"
                          className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                          Package Type
                        </label>
                        <select
                          value={groupCategory}
                          onChange={(e) => setGroupCategory(e.target.value as any)}
                          className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                        >
                          <option value="schools">Primary / Secondary</option>
                          <option value="tertiary">Tertiary / Agricultural</option>
                          <option value="private">Corporate / Agropreneur</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                          Est. Number of Visitors
                        </label>
                        <input
                          type="number"
                          min="5"
                          max="200"
                          value={visitorCount}
                          onChange={(e) => setVisitorCount(parseInt(e.target.value) || 10)}
                          className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1.5">
                        Special Learning Objectives or Notes
                      </label>
                      <textarea
                        rows={3}
                        value={bookingForm.notes}
                        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                        placeholder="Specify if you require focus on cattle genetics, milking demonstration, or have dietary notes for yogurt tasting..."
                        className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#143727] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#0D261B] transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Bus className="w-4 h-4 text-[#C89D4B]" />
                      <span>Submit Excursion Reservation</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
