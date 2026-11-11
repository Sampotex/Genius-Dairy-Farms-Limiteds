import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { PageId } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleLink = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="site-footer" className="bg-[#0A1811] text-white pt-20 pb-12 border-t border-[#1C3A2B] relative overflow-hidden">
      {/* Background ambient accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#143727]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C89D4B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#1E3A2B]">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <Logo size="sm" className="bg-white/10 p-0.5 rounded-full ring-1 ring-[#C89D4B]/30" />
              <div>
                <h3 className="font-heading font-extrabold text-lg tracking-tight text-white">
                  GENIUS DAIRY FARMS
                </h3>
                <span className="text-[10px] tracking-[0.25em] font-bold text-[#C89D4B] uppercase block">
                  Limited • RC: 8888771
                </span>
              </div>
            </div>
            <p className="text-sm text-[#9BB0A3] leading-relaxed max-w-sm">
              Building a commercially viable, technologically driven and sustainable dairy ecosystem for the future of Nigeria.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#143323] rounded-full border border-[#234D36] text-[#C89D4B] text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CAC Registered &amp; Verified</span>
              </span>
              <span className="inline-block px-3 py-1 bg-[#143323] rounded-full border border-[#234D36] text-[#A9BCB0] text-[11px]">
                60-Acre Facility in Iseyin
              </span>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-[#C89D4B] font-bold">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A9BCB0]">
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('farm')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Farm (60-Acre)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mission &amp; Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Core Values
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('sustainability')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sustainability &amp; Welfare
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Platforms & Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-[#C89D4B] font-bold">
              Platforms &amp; Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A9BCB0]">
              <li>
                <button
                  onClick={() => handleLink('farm')}
                  className="text-left group cursor-pointer"
                >
                  <div className="text-white font-medium group-hover:text-[#C89D4B] transition-colors flex items-center gap-1.5 text-xs">
                    Commercial Dairy &amp; Ranch
                    <ArrowUpRight className="w-3 h-3 text-[#C89D4B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('udderfall')}
                  className="text-left group cursor-pointer"
                >
                  <div className="text-white font-medium group-hover:text-[#C89D4B] transition-colors flex items-center gap-1.5 text-xs">
                    Udderfall Yogurt &amp; Cheese
                    <ArrowUpRight className="w-3 h-3 text-[#C89D4B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('academy')}
                  className="text-left group cursor-pointer"
                >
                  <div className="text-white font-medium group-hover:text-[#C89D4B] transition-colors flex items-center gap-1.5 text-xs">
                    Genius Dairy Academy Limited
                    <ArrowUpRight className="w-3 h-3 text-[#C89D4B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('excursions')}
                  className="text-left group cursor-pointer"
                >
                  <div className="text-white font-medium group-hover:text-[#C89D4B] transition-colors flex items-center gap-1.5 text-xs">
                    Educational Excursions
                    <ArrowUpRight className="w-3 h-3 text-[#C89D4B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('internships')}
                  className="text-left group cursor-pointer"
                >
                  <div className="text-white font-medium group-hover:text-[#C89D4B] transition-colors flex items-center gap-1.5 text-xs">
                    Internship &amp; SIWES Portal
                    <ArrowUpRight className="w-3 h-3 text-[#C89D4B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('events')}
                  className="text-left group cursor-pointer"
                >
                  <div className="text-white font-medium group-hover:text-[#C89D4B] transition-colors flex items-center gap-1.5 text-xs">
                    Upcoming Events &amp; Field Days
                    <ArrowUpRight className="w-3 h-3 text-[#C89D4B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-[#C89D4B] font-bold">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm text-[#A9BCB0]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C89D4B] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  {COMPANY_DETAILS.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C89D4B] shrink-0" />
                <a
                  href={COMPANY_DETAILS.phoneTel}
                  className="text-xs font-mono text-white hover:text-[#C89D4B] transition-colors"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C89D4B] shrink-0" />
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="text-xs text-white hover:text-[#C89D4B] transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={COMPANY_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-semibold rounded-lg border border-[#25D366]/40 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A9385] gap-4">
          <p>© {new Date().getFullYear()} Genius Dairy Farms Limited. All Rights Reserved. RC: 8888771.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-[#0F241A] border border-[#234D36] max-w-xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E3A2B]">
              <div className="flex items-center gap-3">
                {legalModal === 'privacy' ? (
                  <ShieldCheck className="w-5 h-5 text-[#C89D4B]" />
                ) : (
                  <FileText className="w-5 h-5 text-[#C89D4B]" />
                )}
                <h3 className="font-heading font-bold text-lg">
                  {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                </h3>
              </div>
              <button
                onClick={() => setLegalModal(null)}
                className="text-[#9BB0A3] hover:text-white text-sm px-2 py-1 cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <div className="pt-4 text-sm text-[#A9BCB0] space-y-3 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    Genius Dairy Farms Limited is committed to protecting the privacy of our partners, students, distributors, and visitors.
                  </p>
                  <p>
                    Information collected via enquiry forms, registration portals, or communications is strictly utilized for agricultural business correspondence, training logistics, and order fulfillment. We do not sell or transfer private information to unauthorized third parties.
                  </p>
                  <p>
                    For inquiries concerning your data, please contact genuisdairies@gmail.com.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    All materials, proprietary curriculum details, and corporate trademarks appearing on this platform are property of Genius Dairy Farms Limited.
                  </p>
                  <p>
                    Commercial farm visits must be scheduled in advance to adhere to strict biosecurity and herd health protocols in effect across our 60-acre facility in Iseyin, Oyo State.
                  </p>
                  <p>
                    Official business inquiries and wholesale distribution terms are governed under Nigerian commercial law.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
