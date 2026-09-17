import React from 'react';
import {
  MapPin,
  Dna,
  Sprout,
  Activity,
  Camera,
} from 'lucide-react';
import { PageId } from '../types';
import { GALLERY_ITEMS } from '../data/companyData';
import { EagleViewSection } from '../components/EagleViewSection';
import { useBrandMedia, useSiteImages } from '../context/BrandMediaContext';
import { FOUNDER_IMAGE_BASE64 } from '../data/founderImageFallback';
import { CAC_CERTIFICATE_BASE64 } from '../data/cacCertificateFallback';

interface OurFarmPageProps {
  onNavigate: (page: PageId) => void;
  onOpenPartnerModal: () => void;
}

export const OurFarmPage: React.FC<OurFarmPageProps> = ({ onNavigate }) => {
  const { getImage } = useBrandMedia();
  const images = useSiteImages();

  // Resolved farm photos displayed statically
  const farmPhotos = GALLERY_ITEMS.map((item) => {
    const resolved = getImage(item.id) || getImage(item.image) || item.image;
    return {
      id: item.id,
      title: item.title,
      category: item.category,
      image: resolved,
      caption: item.caption,
    };
  });

  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="bg-[#081710] text-white py-24 sm:py-32 border-b border-[#1C3A2B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#163B29] text-[#C89D4B] text-xs font-bold uppercase tracking-widest rounded-full mb-6 border border-[#C89D4B]/25">
            <span>Production &amp; Ranching Hub</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
            Our 60-Acre Dairy Facility in <span className="font-serif italic text-[#C89D4B] font-normal">Iseyin</span>
          </h1>
          <p className="text-base sm:text-xl text-[#CBDDD2] max-w-3xl mt-6 leading-relaxed font-normal">
            A specialized commercial livestock facility designed to demonstrate modern dairy genetics, intensive pasture agronomy, and high-welfare management in Southwest Nigeria.
          </p>
          <div className="flex items-center gap-2.5 mt-8 text-sm text-[#C89D4B] font-medium bg-[#143727]/60 px-4 py-2 rounded-full w-fit border border-[#C89D4B]/30 backdrop-blur-md">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>Kilometer 4, Olora Village, Iseyin–Ibadan Expressway, Oyo State</span>
          </div>
        </div>
      </section>

      {/* 60-Acre Master Layout Overview */}
      <section className="py-24 sm:py-32 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs uppercase tracking-[0.2em] font-bold">
                Facility Overview
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight leading-tight">
                An Integrated Ecosystem for <span className="font-serif italic text-[#143727] font-normal">Modern Dairy</span>
              </h2>
              <p className="text-base text-[#4A554F] leading-relaxed">
                Our 60-acre facility in Iseyin is laid out into specialized operational zones: perimeter-fenced paddocks for rotational grazing, dedicated fodder banks for silage preservation, semi-open loose housing designed for tropical heat mitigation, a hygienic milking parlor, and dedicated quarters for academy trainees.
              </p>
              <p className="text-base text-[#4A554F] leading-relaxed">
                By integrating herd breeding, feed production, hygienic milk collection, and agricultural education in one location, Genius Dairy Farms provides a replicable commercial template for sustainable dairy development.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-6 bg-[#F4F4F0] border border-[#E0DDD5] rounded-2xl shadow-2xs hover:border-[#143727] transition-colors">
                  <div className="font-heading font-extrabold text-3xl text-[#143727]">60 Acres</div>
                  <div className="text-xs text-[#525F58] uppercase tracking-wider font-semibold mt-1">Dedicated Land Base</div>
                </div>
                <div className="p-6 bg-[#F4F4F0] border border-[#E0DDD5] rounded-2xl shadow-2xs hover:border-[#143727] transition-colors">
                  <div className="font-heading font-extrabold text-3xl text-[#143727]">10–15 L</div>
                  <div className="text-xs text-[#525F58] uppercase tracking-wider font-semibold mt-1">Milk / Cow / Day</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#D5D1C4] shadow-lg group/pan">
                <img
                  src={images.farmPanorama}
                  alt="Pasture paddocks at Genius Dairy Farms 60-acre facility"
                  className="w-full h-[460px] object-cover hover:scale-102 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Pillars of Operations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cattle Genetics & AI */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0DDD5] shadow-xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6">
                <Dna className="w-6 h-6 text-[#143727]" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#151A18] mb-3">
                Cattle Genetics &amp; AI
              </h3>
              <p className="text-sm text-[#55625B] leading-relaxed mb-6">
                Crossbreeding indigenous zebu cows with proven Holstein Friesian genetics via artificial insemination. This combines local environmental resilience with high-lactation genetic potential.
              </p>
              <ul className="text-xs text-[#2D6A4F] space-y-2 font-semibold border-t border-[#EAE7DE] pt-4">
                <li className="flex items-center gap-2"><span>•</span> <span>Cryopreserved high-index semen lines</span></li>
                <li className="flex items-center gap-2"><span>•</span> <span>Estrus synchronization protocols</span></li>
                <li className="flex items-center gap-2"><span>•</span> <span>Optimized hybrid vigor (heterosis)</span></li>
              </ul>
            </div>

            {/* Pasture & Silage Management */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0DDD5] shadow-xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6">
                <Sprout className="w-6 h-6 text-[#143727]" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#151A18] mb-3">
                Pasture Management
              </h3>
              <p className="text-sm text-[#55625B] leading-relaxed mb-6">
                Intensive paddock rotational grazing paired with dedicated fodder banks. We harvest and ensile tropical forages to guarantee dry-season nutritional equilibrium without animal migration.
              </p>
              <ul className="text-xs text-[#2D6A4F] space-y-2 font-semibold border-t border-[#EAE7DE] pt-4">
                <li className="flex items-center gap-2"><span>•</span> <span>High-biomass perennial grasses</span></li>
                <li className="flex items-center gap-2"><span>•</span> <span>Rotational resting cycles to preserve root systems</span></li>
                <li className="flex items-center gap-2"><span>•</span> <span>Bunker and pit silage fermentation</span></li>
              </ul>
            </div>

            {/* Nutrition & Herd Health */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0DDD5] shadow-xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-[#143727]" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#151A18] mb-3">
                Nutrition &amp; Herd Health
              </h3>
              <p className="text-sm text-[#55625B] leading-relaxed mb-6">
                Total Mixed Rations (TMR) balanced for crude protein, energy, macro-minerals, and water access. Routine biosecurity, scheduled vaccinations, and mastitis monitoring maintain animal welfare.
              </p>
              <ul className="text-xs text-[#2D6A4F] space-y-2 font-semibold border-t border-[#EAE7DE] pt-4">
                <li className="flex items-center gap-2"><span>•</span> <span>Continuous veterinary health supervision</span></li>
                <li className="flex items-center gap-2"><span>•</span> <span>Strict pre- and post-milking teat sanitization</span></li>
                <li className="flex items-center gap-2"><span>•</span> <span>Preventative health and clean water ad libitum</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Eagle View Drone Aerial Tour Section */}
      <EagleViewSection />

      {/* Farm Operations & Visual Documentation Section */}
      <section id="farm-documentation-section" className="py-24 sm:py-32 bg-[#F4F4F0] border-t border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#143727]/10 text-[#143727] text-xs font-bold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Facility Documentation</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight">
              Farm Facility &amp; <span className="font-serif italic text-[#143727] font-normal">Operational Overview</span>
            </h2>
            <p className="text-base text-[#55625B] mt-3 max-w-2xl leading-relaxed">
              Photographic documentation of our daily ranching operations, dairy cattle herd, pasture paddocks, and infrastructure in Iseyin, Oyo State.
            </p>
          </div>

          {/* Photo Grid - Displayed normally without lightbox or image buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {farmPhotos.map((photo) => (
              <div
                key={photo.id}
                id={`farm-photo-${photo.id}`}
                className="bg-white rounded-2xl border border-[#E0DDD5] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="h-64 overflow-hidden relative bg-[#EAE7DE]">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (photo.id === 'founder-portrait' || photo.id === 'founder') {
                        if (target.src !== FOUNDER_IMAGE_BASE64) {
                          target.src = FOUNDER_IMAGE_BASE64;
                        }
                      } else if (photo.id === 'cac-certificate' || photo.id === 'cacCertificate') {
                        if (target.src !== CAC_CERTIFICATE_BASE64) {
                          target.src = CAC_CERTIFICATE_BASE64;
                        }
                      }
                    }}
                  />

                  {/* Category Tag */}
                  <div className="absolute top-3.5 left-3.5">
                    <div className="bg-[#143727]/90 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-md backdrop-blur-xs">
                      {photo.category}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#151A18] mb-1.5">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-[#66726B] leading-relaxed line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule a Visit Notice */}
          <div className="mt-16 p-8 sm:p-12 bg-white border border-[#E0DDD5] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div>
              <h3 className="font-heading font-bold text-2xl text-[#151A18]">
                Request an Official Farm Tour or Technical Delegation
              </h3>
              <p className="text-base text-[#55625B] mt-2">
                Commercial producers, investors, and agricultural institutions are welcome to schedule guided facility walkthroughs.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] shrink-0 cursor-pointer"
            >
              Schedule Farm Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
