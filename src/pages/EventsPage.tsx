import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Tag,
  Share2,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Bus,
  FileCheck,
} from 'lucide-react';
import { PageId } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { Logo } from '../components/Logo';

interface EventsPageProps {
  onNavigate: (page: PageId) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    ticketCount: 1,
  });

  const events = [
    {
      id: 'field-day-2026',
      title: 'Southwest Dairy Farmers’ Field Day & Bovine AI Clinic',
      category: 'Farmers & Agropreneurs',
      date: 'November 14, 2026',
      time: '09:00 AM – 03:30 PM WAT',
      venue: '60-Acre Dairy Development Facility, Iseyin, Oyo State',
      badge: 'Annual Flagship',
      spotsAvailable: '65 Seats Remaining',
      description:
        'A comprehensive practical field workshop demonstrating artificial insemination in Fulani-Holstein crosses, mastitis prevention, modern calf rearing, and practical feeding strategies for high-tonnage dry-season milk production.',
      speakers: ['Moyosore Olatunde Rafiu (Founder)', 'Senior Veterinary Officers', 'Pasture Agronomists'],
      highlights: [
        'Live artificial insemination & ultrasound demonstration',
        'Inspection of F1 Holstein heifers producing 10–15L/day',
        'Direct consultation with breeding & nutritional specialists',
        'Networking with commercial dairy milk off-takers',
      ],
    },
    {
      id: 'silage-masterclass',
      title: 'Dry Season Forage & Bunker Silage Masterclass',
      category: 'Technical Training',
      date: 'December 05, 2026',
      time: '10:00 AM – 02:00 PM WAT',
      venue: 'Pasture Management Complex, Iseyin Farm',
      badge: 'Capacity Workshop',
      spotsAvailable: '40 Seats Remaining',
      description:
        'Practical step-by-step masterclass on cultivating high-protein tropical grasses (Brachiaria, Panicum, Napier), mechanical harvesting, inoculant mixing, and airtight pit silage compaction to beat dry season feed drought.',
      speakers: ['Genius Dairy Agronomy Unit Lead'],
      highlights: [
        'Evaluation of pit silage fermentation & quality indicators',
        'Feed budget calculation per dairy cow per day',
        'Silage machinery maintenance and safety training',
      ],
    },
    {
      id: 'academy-orientation-cohort4',
      title: 'Genius Dairy Academy Limited: Cohort 4 Induction & Roster',
      category: 'Academy & Students',
      date: 'January 18, 2027',
      time: '09:30 AM – 01:00 PM WAT',
      venue: 'Genius Dairy Academy Limited Lecture Hall, Iseyin',
      badge: 'Academic Milestone',
      spotsAvailable: 'Open to Admitted Students',
      description:
        'Official welcome and biosecurity induction for admitted SIWES, University IT, and agribusiness certificate trainees across the four specialized Dairy Schools.',
      speakers: ['Academy Director & School Supervisors'],
      highlights: [
        'Issuance of official digital intern ID cards and logbooks',
        'Allocation to specialized dairy operational rotations',
        'Tour of facilities and equipment safety orientation',
      ],
    },
    {
      id: 'schools-excursion-symposium',
      title: 'Agricultural Education & Youth Dairy Excursion Day',
      category: 'Schools & Youth',
      date: 'February 12, 2027',
      time: '10:00 AM – 02:30 PM WAT',
      venue: 'Main Ranch Paddocks, Iseyin',
      badge: 'School Special',
      spotsAvailable: 'Reserved for Registered Schools',
      description:
        'Specially curated hands-on educational tour for primary and secondary school delegations exploring the science of milk, cattle welfare, veterinary biology, and food processing.',
      speakers: ['Farm Education Guides'],
      highlights: [
        'Interactive cattle petting and calf feeding',
        'Automated milking viewing',
        'Udderfall yogurt tasting session & certificates of participation',
      ],
    },
  ];

  const digitalPillars = [
    {
      icon: Calendar,
      title: 'Events & Registration',
      desc: 'Centralized calendar for technical seminars, farmer field days, and symposium reservations.',
    },
    {
      icon: Bus,
      title: 'Excursion Bookings',
      desc: 'Streamlined online reservation and scheduling for schools, colleges, and agropreneurs.',
    },
    {
      icon: FileCheck,
      title: 'Internship Management',
      desc: 'Online application submissions, status tracking, and digital verification passes.',
    },
    {
      icon: GraduationCap,
      title: 'Dairy School Coordination',
      desc: 'Supervised student allocations, weekly logbook reviews, and performance evaluations.',
    },
  ];

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSuccess(true);
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-[#081710] text-white py-20 sm:py-28 border-b border-[#1C3A2B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#163B29] text-[#C89D4B] text-xs font-bold uppercase tracking-widest rounded-full mb-6 border border-[#C89D4B]/25">
            <Calendar className="w-3.5 h-3.5 text-[#C89D4B]" />
            <span>Digital Platform &amp; Engagement</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
            Company Information &amp; <span className="font-serif italic text-[#C89D4B] font-normal">Upcoming Events</span>
          </h1>
          <p className="text-base sm:text-xl text-[#CBDDD2] max-w-3xl mt-6 leading-relaxed font-normal">
            Genius Dairy Farms is developing a unified digital platform to bring company information, educational activities, and operational services together in one accessible environment. Explore our upcoming field days, training workshops, and academic events below.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#upcoming-events"
              className="px-8 py-4 bg-[#C89D4B] text-[#081710] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#B58A38] transition-all shadow-md font-sans"
            >
              Browse Event Calendar
            </a>
            <button
              onClick={() => onNavigate('excursions')}
              className="px-8 py-4 bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              Book an Excursion
            </button>
          </div>
        </div>
      </section>

      {/* Digital Transformation Banner */}
      <section className="py-16 bg-[#0D261B] text-white border-b border-[#1C3A2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C89D4B] block mb-2">
              Our Digital Transformation
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Connecting Dairy Farming, Education &amp; Technology
            </h2>
            <p className="text-sm text-[#CBDDD2] mt-2 leading-relaxed">
              By integrating company news, educational excursions, internship workflows, and dairy school evaluations into one portal, we improve accessibility, simplify administration, and strengthen engagement across our ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-[#143727]/60 p-6 rounded-2xl border border-[#264D3A] backdrop-blur-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C89D4B]/20 text-[#C89D4B] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-white mb-1.5">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#CBDDD2] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Lineup */}
      <section id="upcoming-events" className="py-20 sm:py-28 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              Schedule of Gatherings
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              Upcoming <span className="font-serif italic text-[#143727] font-normal">Farm Events</span>
            </h2>
            <p className="text-base text-[#55625B] mt-3 leading-relaxed">
              Join us in Iseyin, Oyo State, for our signature events bringing together farmers, veterinary specialists, students, and agribusiness leaders.
            </p>
          </div>

          <div className="space-y-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0DDD5] shadow-xs hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Date & Time Column */}
                <div className="lg:col-span-3 space-y-3">
                  <div className="inline-block px-3 py-1 bg-[#143727] text-[#C89D4B] text-xs font-bold uppercase tracking-wider rounded-md">
                    {event.badge}
                  </div>
                  <div className="font-heading font-extrabold text-2xl text-[#143727]">
                    {event.date}
                  </div>
                  <div className="text-xs text-[#7A8780] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{event.time}</span>
                  </div>
                  <div className="text-xs text-[#7A8780] flex items-start gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#143727] shrink-0 mt-0.5" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="pt-2 text-[11px] font-semibold text-[#C89D4B]">
                    {event.spotsAvailable}
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C9B92] block mb-1">
                      {event.category}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-[#151A18]">
                      {event.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#4A554F] leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#151A18]">
                      Event Highlights:
                    </div>
                    {event.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#525F58]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RSVP / Registration Column */}
                <div className="lg:col-span-3 flex flex-col justify-between h-full pt-4 lg:pt-0 lg:border-l lg:border-[#EAE7DE] lg:pl-8">
                  <div className="space-y-2 mb-6">
                    <span className="text-xs text-[#8C9B92] block">Admission Status</span>
                    <div className="text-sm font-bold text-[#143727]">
                      Registration Open
                    </div>
                    <p className="text-[11px] text-[#7A8780] leading-relaxed">
                      Complimentary entry with advance online registration for certified farmers and students.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setRsvpSuccess(false);
                    }}
                    className="w-full py-3.5 bg-[#143727] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#0D261B] transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Register to Attend</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Modal Dialog */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl border border-[#E0DDD5]">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 text-[#8C9B92] hover:text-[#151A18] text-xl font-bold"
            >
              ✕
            </button>

            {rsvpSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#143727]/10 text-[#143727] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-[#143727]" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#151A18]">
                  Registration Confirmed!
                </h3>
                <p className="text-xs text-[#525F58] leading-relaxed">
                  We have reserved your seat for <strong>{selectedEvent.title}</strong> on <strong>{selectedEvent.date}</strong> in Iseyin, Oyo State. An admission barcode has been registered for <strong>{rsvpForm.name}</strong>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-6 py-2.5 bg-[#143727] text-white text-xs font-bold uppercase tracking-wider rounded-xl"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C89D4B] bg-[#0A1C14] px-2.5 py-1 rounded-md inline-block mb-2">
                    Event Registration
                  </span>
                  <h3 className="font-heading text-xl font-bold text-[#151A18]">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-xs text-[#7A8780] mt-1">
                    {selectedEvent.date} • {selectedEvent.venue}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="e.g. Dr. Akinola Adeleke"
                    className="w-full px-4 py-2.5 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={rsvpForm.email}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full px-4 py-2.5 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={rsvpForm.phone}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                      placeholder="+234 800 000 0000"
                      className="w-full px-4 py-2.5 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1">
                    Organization / Farm / University
                  </label>
                  <input
                    type="text"
                    value={rsvpForm.organization}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, organization: e.target.value })}
                    placeholder="e.g. Oyo State Dairy Farmers Association"
                    className="w-full px-4 py-2.5 bg-[#FBFBFA] border border-[#D5D1C4] rounded-xl text-sm focus:outline-none focus:border-[#143727]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#143727] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#0D261B] transition-colors shadow-md cursor-pointer mt-2"
                >
                  Confirm Event Attendance
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
