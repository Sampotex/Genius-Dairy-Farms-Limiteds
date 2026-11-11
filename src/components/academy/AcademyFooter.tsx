import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  GraduationCap,
  Award,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/companyData';
import { useSiteImages } from '../../context/BrandMediaContext';
import { ACADEMY_LOGO_BASE64 } from '../../data/academyLogoFallback';
import { useRouter } from '../../context/RouterContext';

interface AcademyFooterProps {
  onOpenEnrollModal: (courseTitle?: string) => void;
}

export const AcademyFooter: React.FC<AcademyFooterProps> = ({ onOpenEnrollModal }) => {
  const { navigate } = useRouter();
  const images = useSiteImages();

  return (
    <footer className="bg-[#05110A] text-white border-t border-[#163B29] pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#143727]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C89D4B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Brand & Accreditation Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-1 overflow-hidden shrink-0 ring-1 ring-[#C89D4B]/40">
                <img
                  src={images.academyLogo || '/academy-logo.jpg'}
                  alt="Genius Dairy Academy Limited Crest"
                  onError={(e) => {
                    e.currentTarget.src = ACADEMY_LOGO_BASE64;
                  }}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg tracking-tight text-white">
                  GENIUS DAIRY ACADEMY
                </h3>
                <span className="text-[10px] tracking-widest text-[#C89D4B] font-bold uppercase block">
                  Limited • RC: 8888771
                </span>
              </div>
            </div>

            <div className="text-xs text-[#9EB6A8] leading-relaxed space-y-2">
              <span className="text-[#E0BA6E] font-medium block">
                Agricultural Training &amp; Human Capital Development
              </span>
              <p>
                Genius Dairy Academy Limited is dedicated to equipping the next generation of Nigerian farmers, veterinary students, and agribusiness entrepreneurs with modern, practical, hands-on skills across our 60-acre living laboratory in Iseyin, Oyo State.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#102D1E] rounded-full border border-[#234D36] text-[#C89D4B] text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CAC Incorporated: RC 8888771</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#102D1E] rounded-full border border-[#234D36] text-[#9EB6A8] text-[11px]">
                <GraduationCap className="w-3.5 h-3.5 text-[#C89D4B]" />
                <span>SIWES &amp; Practical Accredited</span>
              </span>
            </div>
          </div>

          {/* Academic Programmes */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D4B]">
              Training Programmes
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CBDDD2]">
              <li>
                <button
                  onClick={() => {
                    navigate('/academy/courses');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Commercial Dairy Herd Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/academy/courses');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Artificial Insemination &amp; Genetics
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/academy/courses');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Forage Production &amp; Pasture Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/academy/courses');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Dairy Processing (Yogurt &amp; Cheese)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/academy/courses');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Executive Farm Masterclasses
                </button>
              </li>
            </ul>
          </div>

          {/* Admissions & Student Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D4B]">
              Admissions
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CBDDD2]">
              <li>
                <button
                  onClick={() => onOpenEnrollModal()}
                  className="hover:text-white transition-colors cursor-pointer text-left font-bold text-[#E0BA6E]"
                >
                  Online Application Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/academy/admissions')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  SIWES Placement Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/academy/admissions')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Eligibility &amp; Entry Requirements
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/academy/facilities')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Practical 60-Acre Farm Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Campus & Admissions Desk */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D4B]">
              Campus Office
            </h4>
            <div className="space-y-2.5 text-xs text-[#CBDDD2]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C89D4B] shrink-0 mt-0.5" />
                <span>KM 4, Olora Village, Iseyin–Ibadan Expressway, Iseyin, Oyo State</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                <a href={COMPANY_DETAILS.phoneTel} className="font-mono text-[#E0BA6E] hover:underline">
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-[#E0BA6E] hover:underline">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={COMPANY_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-semibold rounded-md border border-[#25D366]/40 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Admissions WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Parent Enterprise Return */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A9385] gap-4">
          <p>© {new Date().getFullYear()} Genius Dairy Academy Limited • RC: 8888771. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-[#C89D4B] hover:text-white font-semibold transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Genius Dairy Farms (Parent Enterprise)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Corporate Office
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
