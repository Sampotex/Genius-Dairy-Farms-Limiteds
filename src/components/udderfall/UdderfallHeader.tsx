import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Phone,
  Mail,
  ArrowLeft,
  MessageCircle,
  Package,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/companyData';
import { Logo } from '../Logo';
import { useRouter, UdderfallSubPage } from '../../context/RouterContext';

interface UdderfallHeaderProps {
  onOpenWholesaleModal: () => void;
  onOpenDistributorModal: () => void;
}

export const UdderfallHeader: React.FC<UdderfallHeaderProps> = ({
  onOpenWholesaleModal,
  onOpenDistributorModal,
}) => {
  const { udderfallSubPage, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: UdderfallSubPage; label: string; path: string }[] = [
    { id: 'home', label: 'Home', path: '/udderfall' },
    { id: 'about', label: 'About Udderfall', path: '/udderfall/about' },
    { id: 'yogurt', label: 'Fresh Yogurt', path: '/udderfall/yogurt' },
    { id: 'cheese', label: 'Artisan Cheese', path: '/udderfall/cheese' },
    { id: 'gallery', label: 'Media Gallery', path: '/udderfall/gallery' },
    { id: 'wholesale', label: 'Wholesale & B2B', path: '/udderfall/wholesale' },
    { id: 'contact', label: 'Contact & Distribution', path: '/udderfall/contact' },
  ];

  const handleNav = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header
      id="udderfall-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B2519]/95 backdrop-blur-md shadow-lg border-b border-[#1E4D35]'
          : 'bg-[#0B2519] border-b border-[#163C29]'
      } text-white`}
    >
      {/* Top Brand Reassurance Bar */}
      <div className="bg-[#06170F] text-xs py-2 px-4 sm:px-8 border-b border-[#163B29]/70">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#163B29] hover:bg-[#1E4D35] text-[#C89D4B] hover:text-white transition-all text-[11px] font-bold tracking-wider cursor-pointer border border-[#C89D4B]/30 group"
              title="Return to Genius Dairy Farms main website"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Genius Dairy Farms (Corporate Portal)</span>
            </button>
            <span className="hidden lg:inline-block text-[#8EA99A] text-[11px]">
              • 60-Acre Dairy Development Facility, Iseyin, Oyo State
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#A6C0B2]">
            <a
              href={COMPANY_DETAILS.phoneTel}
              className="hidden sm:flex items-center gap-1.5 hover:text-[#C89D4B] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C89D4B]" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <a
              href={COMPANY_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#25D366] hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Wholesale Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Udderfall Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Udderfall Brand Identity */}
          <div
            onClick={() => handleNav('/udderfall')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <Logo size="sm" className="bg-white/10 p-0.5 rounded-full ring-2 ring-[#C89D4B]/40 group-hover:ring-[#C89D4B] transition-all" />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#C89D4B] flex items-center justify-center text-[8px] font-extrabold text-[#0B2519]">
                ✓
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-heading font-black text-xl sm:text-2xl tracking-tight text-white group-hover:text-[#F3E5C8] transition-colors">
                  UDDERFALL
                </h1>
                <span className="px-1.5 py-0.5 rounded-sm bg-[#C89D4B]/20 border border-[#C89D4B]/50 text-[#C89D4B] text-[9px] font-extrabold uppercase tracking-widest hidden sm:inline-block">
                  Yogurt &amp; Cheese
                </span>
              </div>
              <p className="text-[10px] tracking-[0.2em] font-semibold text-[#8EA99A] uppercase">
                Pure Goodness, Naturally • Dairy Products Brand
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = udderfallSubPage === item.id;
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

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenDistributorModal}
              className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold tracking-wide transition-all border border-white/20 cursor-pointer"
            >
              Distributor Form
            </button>
            <button
              onClick={onOpenWholesaleModal}
              className="px-4 py-2 rounded-lg bg-[#C89D4B] hover:bg-[#B38938] text-[#0B2519] text-xs font-extrabold tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Wholesale Quote</span>
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

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A2015] border-t border-[#1C4731] px-4 pt-4 pb-6 space-y-3">
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
              Udderfall Menu
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = udderfallSubPage === item.id;
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

          <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDistributorModal();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-white/10 text-white text-xs font-bold text-center border border-white/20"
            >
              Become Distributor
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWholesaleModal();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-[#C89D4B] text-[#0B2519] text-xs font-bold text-center"
            >
              Wholesale Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
