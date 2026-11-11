import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Package,
  Award,
  ArrowRight,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/companyData';
import { Logo } from '../Logo';
import { useRouter } from '../../context/RouterContext';

interface UdderfallFooterProps {
  onOpenWholesaleModal: () => void;
  onOpenDistributorModal: () => void;
}

export const UdderfallFooter: React.FC<UdderfallFooterProps> = ({
  onOpenWholesaleModal,
  onOpenDistributorModal,
}) => {
  const { navigate } = useRouter();

  return (
    <footer className="bg-[#091B13] text-white border-t border-[#163B29] pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#143727]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C89D4B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <Logo size="sm" className="bg-white/10 p-0.5 rounded-full ring-1 ring-[#C89D4B]/40" />
              <div>
                <h3 className="font-heading font-extrabold text-xl tracking-tight text-white">
                  UDDERFALL
                </h3>
                <span className="text-xs tracking-wider text-[#C89D4B] font-bold uppercase block">
                  Yogurt &amp; Cheese
                </span>
              </div>
            </div>

            <div className="text-xs text-[#9EB6A8] leading-relaxed space-y-2">
              <span className="text-[#E0BA6E] font-medium block">
                A Genius Dairy Farms Brand
              </span>
              <p>
                Pure Goodness, Naturally. Made with fresh milk from our 60-acre dairy development facility in Iseyin, Oyo State. Transforming local dairy production into premium stirred yogurts, Greek yogurts, fresh wara, and low-moisture mozzarella.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#143323] rounded-full border border-[#234D36] text-[#C89D4B] text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Whole Milk Source</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#143323] rounded-full border border-[#234D36] text-[#9EB6A8] text-[11px]">
                <Award className="w-3.5 h-3.5 text-[#C89D4B]" />
                <span>Cold-Chain Tested</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D4B]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CBDDD2]">
              <li>
                <button
                  onClick={() => navigate('/udderfall')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home (Udderfall)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/udderfall/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Udderfall &amp; Farm Source
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/udderfall/yogurt')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Fresh &amp; Greek Yogurt Range
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/udderfall/cheese')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Artisan Cheese &amp; Mozzarella
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/udderfall/wholesale')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Markets We Serve &amp; B2B
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/udderfall/contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Direct Depot Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Business & Distributor Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D4B]">
              Business
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CBDDD2]">
              <li>
                <button
                  onClick={onOpenDistributorModal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Become a Distributor
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWholesaleModal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Wholesale Milk &amp; Yogurt
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWholesaleModal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  B2B Mozzarella Supply
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/udderfall/wholesale')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Distribution &amp; Cold Chain
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D4B]">
              Depot Contact
            </h4>
            <div className="space-y-2.5 text-xs text-[#CBDDD2]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C89D4B] shrink-0 mt-0.5" />
                <span>60-Acre Dairy Facility, Iseyin, Oyo State, Nigeria</span>
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
                <span>Wholesale WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Corporate Portal Return */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A9385] gap-4">
          <p>© {new Date().getFullYear()} Udderfall Yogurt &amp; Cheese • A Genius Dairy Farms Brand. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-[#C89D4B] hover:text-white font-semibold transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Genius Dairy Farms Corporate Portal</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Headquarters Desk
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
