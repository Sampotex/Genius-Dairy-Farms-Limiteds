import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Phone,
  Mail,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/companyData';
import { useSiteImages } from '../../context/BrandMediaContext';
import { ACADEMY_LOGO_BASE64 } from '../../data/academyLogoFallback';
import { useRouter, AcademySubPage } from '../../context/RouterContext';

interface AcademyHeaderProps {
  onOpenEnrollModal: (courseTitle?: string) => void;
}

export const AcademyHeader: React.FC<AcademyHeaderProps> = ({ onOpenEnrollModal }) => {
  const { academySubPage, navigate } = useRouter();
  const images = useSiteImages();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: AcademySubPage; label: string; path: string }[] = [
    { id: 'home', label: 'Home', path: '/academy' },
    { id: 'about', label: 'About Academy', path: '/academy/about' },
    { id: 'courses', label: 'Courses & Programs', path: '/academy/courses' },
    { id: 'admissions', label: 'Admissions & SIWES', path: '/academy/admissions' },
    { id: 'facilities', label: 'Farm Laboratory', path: '/academy/facilities' },
    { id: 'contact', label: 'Campus & Contact', path: '/academy/contact' },
  ];

  const handleNav = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header
      id="academy-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#081710]/95 backdrop-blur-md shadow-lg border-b border-[#1E4D35]'
          : 'bg-[#081710] border-b border-[#163C29]'
      } text-white`}
    >
      {/* Top Academic Credential Reassurance Bar */}
      <div className="bg-[#040C08] text-xs py-2 px-4 sm:px-8 border-b border-[#163B29]/70">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#163B29] hover:bg-[#1E4D35] text-[#C89D4B] hover:text-white transition-all text-[11px] font-bold tracking-wider cursor-pointer border border-[#C89D4B]/30 group"
              title="Return to Genius Dairy Farms parent enterprise"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Genius Dairy Farms (Parent Enterprise)</span>
            </button>
            <span className="hidden lg:inline-flex items-center gap-1 text-[#8EA99A] text-[11px]">
              <ShieldCheck className="w-3 h-3 text-[#C89D4B]" />
              <span>Official Registered Academic Enterprise • RC: 8888771</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#A6C0B2]">
            <a
              href={COMPANY_DETAILS.phoneTel}
              className="hidden sm:flex items-center gap-1.5 hover:text-[#C89D4B] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C89D4B]" />
              <span>Admissions: {COMPANY_DETAILS.phone}</span>
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="flex items-center gap-1 text-[#8EA99A] hover:text-[#C89D4B]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden md:inline">academicdesk@geniusdairies.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Academy Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Academy Official Crest & Identity */}
          <div
            onClick={() => handleNav('/academy')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white p-1 shadow-md overflow-hidden flex items-center justify-center shrink-0 ring-2 ring-[#C89D4B]/50 group-hover:ring-[#C89D4B] transition-all">
              <img
                src={images.academyLogo || '/academy-logo.jpg'}
                alt="Genius Dairy Academy Limited Official Crest"
                onError={(e) => {
                  e.currentTarget.src = ACADEMY_LOGO_BASE64;
                }}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-[#F3E5C8] transition-colors">
                  GENIUS DAIRY ACADEMY
                </h1>
                <span className="px-1.5 py-0.5 rounded-sm bg-[#C89D4B]/20 border border-[#C89D4B]/50 text-[#C89D4B] text-[9px] font-bold uppercase tracking-wider hidden sm:inline-block">
                  LIMITED
                </span>
              </div>
              <p className="text-[10px] tracking-[0.18em] font-semibold text-[#8EA99A] uppercase">
                Vocational &amp; Professional Agricultural Training • RC: 8888771
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = academySubPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.path)}
                  className={`px-3 py-2 text-xs font-semibold tracking-wide transition-all rounded-md cursor-pointer ${
                    isActive
                      ? 'text-[#C89D4B] bg-[#163B29] font-bold shadow-xs'
                      : 'text-[#D0DFD7] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenEnrollModal()}
              className="px-4 py-2.5 rounded-lg bg-[#C89D4B] hover:bg-[#B38938] text-[#081710] text-xs font-extrabold tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply / Enroll Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-[#163B29] text-[#C89D4B] hover:text-white focus:outline-hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#06140D] border-t border-[#1C4731] px-4 pt-4 pb-6 space-y-3">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/');
              }}
              className="flex items-center gap-1.5 text-xs text-[#C89D4B] font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Genius Dairy Farms</span>
            </button>
            <span className="text-[10px] uppercase font-bold text-[#7A9887]">
              Academy Menu
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = academySubPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.path)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-[#163B29] text-[#C89D4B] font-bold'
                      : 'text-[#D0DFD7] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C89D4B]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnrollModal();
              }}
              className="w-full py-3 px-4 rounded-lg bg-[#C89D4B] text-[#081710] text-xs font-bold text-center flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply for Admission / SIWES</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
