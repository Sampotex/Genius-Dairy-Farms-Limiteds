import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, Mail, ShieldCheck, MapPin, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { Logo } from './Logo';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenPartnerModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenPartnerModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'farm', label: 'Our Farm' },
    { id: 'udderfall', label: 'Udderfall' },
    { id: 'academy', label: 'Academy' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'insights', label: 'Insights' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDFDFC]/95 backdrop-blur-xl shadow-xs border-b border-[#E8E4DA]'
          : 'bg-[#FDFDFC] border-b border-[#EFECE6]'
      }`}
    >
      {/* Top micro-bar for corporate reassurance */}
      <div className="bg-[#0A1C14] text-white/90 text-xs py-2 px-4 sm:px-8 tracking-wide border-b border-[#1C3A2B]/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C89D4B] animate-pulse"></span>
            <span className="font-medium tracking-wider text-[11px] uppercase text-white/90">
              Commercial Dairy &amp; Livestock Enterprise • Oyo State, Nigeria
            </span>
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#163B29] text-[10px] text-[#C89D4B] font-semibold border border-[#C89D4B]/30">
              <ShieldCheck className="w-3 h-3" />
              <span>RC: 8888771</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-5 text-[11px] text-white/80">
            <a
              href={COMPANY_DETAILS.phoneTel}
              className="flex items-center gap-1.5 hover:text-[#C89D4B] transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-[#C89D4B]" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="flex items-center gap-1.5 hover:text-[#C89D4B] transition-colors font-medium"
            >
              <Mail className="w-3 h-3 text-[#C89D4B]" />
              <span>{COMPANY_DETAILS.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div
              className="cursor-pointer transition-transform hover:scale-103"
              title="Genius Dairy Farms - Return to Home"
            >
              <Logo
                size="sm"
                onLogoClick={() => handleNavClick('home')}
              />
            </div>
            <button
              type="button"
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus:outline-none"
              title="Genius Dairy Farms - Return to Home"
            >
              <div className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-[#151A18] leading-tight group-hover:text-[#143727] transition-colors">
                GENIUS DAIRY FARMS
              </div>
              <div className="text-[10px] tracking-[0.22em] font-bold text-[#75827B] uppercase group-hover:text-[#C89D4B] transition-colors">
                Limited • Established 2009
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-nav-menu"
            className="hidden lg:flex items-center gap-1 xl:gap-1.5"
          >
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 text-[13.5px] font-medium tracking-normal transition-all duration-200 cursor-pointer rounded-full ${
                    isActive
                      ? 'text-[#143727] font-bold bg-[#143727]/8'
                      : 'text-[#4A554F] hover:text-[#143727] hover:bg-[#F4F3EE]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#C89D4B] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button: Partner With Us */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="header-partner-btn"
              onClick={onOpenPartnerModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold tracking-wider uppercase rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group hover:-translate-y-0.5"
            >
              <span>Partner With Us</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C89D4B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu hamburger toggle & quick triggers */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-partner-quick-btn"
              onClick={onOpenPartnerModal}
              className="px-3.5 py-1.5 bg-[#143727] hover:bg-[#0D261B] text-white text-[11px] font-bold tracking-wider uppercase rounded-full shadow-2xs cursor-pointer"
            >
              Partner
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#143727] hover:bg-[#F4F3EE] rounded-lg transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-Over / Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-[#FDFDFC] border-b border-[#E7E5DE] px-5 pt-3 pb-6 shadow-xl overflow-hidden"
          >
            <div className="space-y-1 mb-5">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    id={`mobile-nav-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-xl flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-[#143727] text-white shadow-xs'
                        : 'text-[#151A18] hover:bg-[#F4F3EE]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#C89D4B]" />
                    ) : (
                      <span className="text-xs text-[#9BB0A3]">→</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#E7E5DE] space-y-3">
              <button
                id="mobile-menu-partner-action"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartnerModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold tracking-wider uppercase rounded-xl shadow-md cursor-pointer"
              >
                <span>Partner With Us</span>
                <ArrowUpRight className="w-4 h-4 text-[#C89D4B]" />
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={COMPANY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366]/10 text-[#1B7F43] rounded-xl text-xs font-bold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={COMPANY_DETAILS.phoneTel}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#143727]/10 text-[#143727] rounded-xl text-xs font-bold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us</span>
                </a>
              </div>

              <div className="text-[11px] text-[#667069] pt-2 space-y-1">
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C89D4B] shrink-0 mt-0.5" />
                  <span>{COMPANY_DETAILS.address}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C89D4B] shrink-0" />
                  <span>{COMPANY_DETAILS.email}</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

