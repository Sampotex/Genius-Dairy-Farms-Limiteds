import React from 'react';
import {
  Leaf,
  HeartHandshake,
  Sun,
  Droplets,
  ShieldCheck,
  TreeDeciduous,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { PageId } from '../types';
import { useSiteImages } from '../context/BrandMediaContext';

interface SustainabilityPageProps {
  onNavigate: (page: PageId) => void;
  onOpenPartnerModal: () => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({
  onNavigate,
  onOpenPartnerModal,
}) => {
  const images = useSiteImages();
  return (
    <div className="w-full">
      {/* Sustainability Header */}
      <section className="bg-[#0D261B] text-white py-20 sm:py-24 border-b border-[#1C3A2B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block px-3 py-1 bg-[#163B29] text-[#C89D4B] text-xs font-semibold uppercase tracking-widest rounded-xs mb-4">
            Environmental Stewardship
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
            Sustainability, Pasture Ecology & Animal Welfare
          </h1>
          <p className="text-base sm:text-lg text-[#CBDDD2] max-w-2xl mt-4 leading-relaxed">
            Pioneering a regenerative model for African commercial dairy ranching where livestock health, soil fertility, community harmony, and economic viability thrive together.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 sm:py-28 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#2D6A4F] font-bold block">
                Regenerative Ranching
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight leading-tight">
                Responsible Dairy for a Changing Climate
              </h2>
              <p className="text-base text-[#4A554F] leading-relaxed">
                Traditional open nomadic grazing across West Africa faces mounting environmental constraints, dry-season desertification, and land-use conflicts. At Genius Dairy Farms, we demonstrate that sedentary commercial ranching on designated facilities is not only ecologically superior, but dramatically more productive.
              </p>
              <p className="text-base text-[#4A554F] leading-relaxed">
                Our 60-acre facility in Iseyin utilizes regenerative pasture management, where cattle manure naturally recycles vital soil micronutrients back into the root zone of perennial forage grasses. This maintains robust topsoil, sequesters carbon, and ensures dependable fodder year after year.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-xs overflow-hidden border border-[#D5D1C4] shadow-md group/sust">
                <img
                  src={images.sustainabilityLandscape}
                  alt="Regenerative green pasture at Genius Dairy Farms"
                  className="w-full h-[420px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Core Pillars */}
      <section className="py-20 sm:py-28 bg-[#F4F4F0] border-y border-[#EAE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2D6A4F] font-bold block mb-2">
              Actionable Framework
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight">
              Our Sustainability Pillars
            </h2>
            <p className="text-sm text-[#55625B] mt-2">
              Every practice across our facility is guided by measurable commitments to land, animals, and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Pasture Development */}
            <div className="bg-white p-8 rounded-xs border border-[#E0DDD5] shadow-xs">
              <div className="w-10 h-10 rounded-xs bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-5">
                <TreeDeciduous className="w-5 h-5 text-[#143727]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#151A18] mb-2">
                Pasture Development
              </h3>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Cultivating resilient tropical grass varieties and leguminous plants that fix nitrogen, enhance root aeration, prevent soil erosion, and eliminate the need for chemical fertilizers.
              </p>
            </div>

            {/* 2. Animal Welfare */}
            <div className="bg-white p-8 rounded-xs border border-[#E0DDD5] shadow-xs">
              <div className="w-10 h-10 rounded-xs bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-5">
                <HeartHandshake className="w-5 h-5 text-[#143727]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#151A18] mb-2">
                Animal Welfare First
              </h3>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Healthy, stress-free dairy cows produce superior milk. Our herd enjoys well-ventilated open-span housing, continuous shade, comfortable bedding, soft footing, and respectful low-stress handling.
              </p>
            </div>

            {/* 3. Resource Management */}
            <div className="bg-white p-8 rounded-xs border border-[#E0DDD5] shadow-xs">
              <div className="w-10 h-10 rounded-xs bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-5">
                <Droplets className="w-5 h-5 text-[#143727]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#151A18] mb-2">
                Resource & Water Conservation
              </h3>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Deep groundwater extraction paired with gravity troughs and water recycling in cleaning loops. Farm manure is composted into organic fertilizer for our forage plots.
              </p>
            </div>

            {/* 4. Community Development */}
            <div className="bg-white p-8 rounded-xs border border-[#E0DDD5] shadow-xs">
              <div className="w-10 h-10 rounded-xs bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-5">
                <Users className="w-5 h-5 text-[#143727]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#151A18] mb-2">
                Community Integration
              </h3>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Located in Olora Village, Iseyin, we prioritize hiring and upskilling local youth, purchasing crop residues from nearby crop farmers, and maintaining harmonious neighborly relations.
              </p>
            </div>

            {/* 5. Environmental Responsibility */}
            <div className="bg-white p-8 rounded-xs border border-[#E0DDD5] shadow-xs">
              <div className="w-10 h-10 rounded-xs bg-[#143727]/10 text-[#143727] flex items-center justify-center mb-5">
                <ShieldCheck className="w-5 h-5 text-[#143727]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#151A18] mb-2">
                Environmental Responsibility
              </h3>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Zero open burning on the farm, integrated shade-tree windbreaks, and continuous biological monitoring to safeguard local flora and waterways from runoff.
              </p>
            </div>

            {/* 6. Sustainable Ranching Model */}
            <div className="bg-[#143727] text-white p-8 rounded-xs border border-[#234D37] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C89D4B] font-bold block mb-2">
                  National Significance
                </span>
                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  Peaceful Ranching Benchmark
                </h3>
                <p className="text-xs text-[#CBDDD2] leading-relaxed">
                  By demonstrating the viability of fenced, intensive ranching, Genius Dairy Farms provides a proven pathway toward resolving pasture land friction across Nigeria.
                </p>
              </div>
              <div className="pt-4 border-t border-white/20">
                <button
                  onClick={onOpenPartnerModal}
                  className="text-xs font-bold uppercase tracking-wider text-[#C89D4B] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Inquire on Sustainability Partnerships</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
