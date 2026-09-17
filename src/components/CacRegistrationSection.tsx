import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  BadgeCheck,
  Building2,
  Hash,
} from 'lucide-react';
import { CAC_CERTIFICATE_BASE64 } from '../data/cacCertificateFallback';
import { useBrandMedia } from '../context/BrandMediaContext';

interface CacRegistrationSectionProps {
  className?: string;
}

export const CacRegistrationSection: React.FC<CacRegistrationSectionProps> = ({
  className = '',
}) => {
  const { getImage } = useBrandMedia();
  const certificateUrl = getImage('cacCertificate') || CAC_CERTIFICATE_BASE64;

  return (
    <section
      id="cac-registration"
      className={`py-16 sm:py-24 bg-[#FBFBFA] border-t border-[#ECE8DE] ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#143727]/10 text-[#143727] text-xs font-bold uppercase tracking-[0.2em] rounded-xs mb-4">
            <ShieldCheck className="w-4 h-4 text-[#C89D4B]" />
            <span>Official Regulatory Compliance</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#151A18] tracking-tight leading-tight">
            CAC Registration &amp; Business Verification
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#4A554F] font-medium leading-relaxed">
            Genius Dairy Academy Ltd is an officially incorporated entity under Genius Dairy Farms Limited, certified by the Corporate Affairs Commission (CAC).
          </p>
        </div>

        {/* Verification Credentials Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 max-w-4xl mx-auto">
          <div className="bg-white p-4 rounded-xs border border-[#E0DDD5] shadow-2xs">
            <div className="text-[11px] font-bold text-[#75827B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-[#C89D4B]" />
              <span>Company Reg No.</span>
            </div>
            <div className="font-heading font-extrabold text-base sm:text-lg text-[#143727] tracking-tight">
              RC 8888771
            </div>
            <div className="text-[11px] text-[#2D6A4F] font-semibold mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Official CAC Registry</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xs border border-[#E0DDD5] shadow-2xs">
            <div className="text-[11px] font-bold text-[#75827B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#C89D4B]" />
              <span>Tax Identification</span>
            </div>
            <div className="font-heading font-extrabold text-base sm:text-lg text-[#143727] tracking-tight">
              33588943-0001
            </div>
            <div className="text-[11px] text-[#2D6A4F] font-semibold mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Taxpayer</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xs border border-[#E0DDD5] shadow-2xs">
            <div className="text-[11px] font-bold text-[#75827B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#C89D4B]" />
              <span>Incorporated Entity</span>
            </div>
            <div className="font-heading font-bold text-xs sm:text-sm text-[#143727] leading-snug">
              Genius Dairy Academy Ltd
            </div>
            <div className="text-[11px] text-[#75827B] mt-0.5">
              Genius Dairy Farms Group
            </div>
          </div>

          <div className="bg-white p-4 rounded-xs border border-[#E0DDD5] shadow-2xs">
            <div className="text-[11px] font-bold text-[#75827B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <BadgeCheck className="w-3.5 h-3.5 text-[#C89D4B]" />
              <span>Legal Authority</span>
            </div>
            <div className="font-heading font-bold text-xs sm:text-sm text-[#143727] leading-snug">
              CAMA Act 2020
            </div>
            <div className="text-[11px] text-[#75827B] mt-0.5">
              Federal Republic of Nigeria
            </div>
          </div>
        </div>

        {/* Subheading & Notice Block */}
        <div className="text-center mb-6">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#143727]">
            Certificate of Registration
          </h3>
          <p className="text-xs sm:text-sm text-[#55625B] mt-1">
            Official CAC certificate provided as evidence of registration.
          </p>
        </div>

        {/* Prominently Centered CAC Certificate Image Container */}
        <div className="flex flex-col items-center justify-center">
          <div
            id="cac-certificate-card"
            className="relative max-w-md sm:max-w-lg w-full bg-white p-3 sm:p-5 rounded-xs border-2 border-[#D5D1C4] shadow-md transition-all duration-300"
          >
            {/* Security watermark badge */}
            <div className="absolute top-5 right-5 z-10 opacity-90 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#143727] text-[#C89D4B] text-[11px] font-bold rounded-xs shadow-sm border border-[#C89D4B]/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Official Record</span>
              </span>
            </div>

            {/* Certificate Image Frame */}
            <div className="relative overflow-hidden bg-[#FAFAF8] rounded-xs border border-[#ECE8DE] flex items-center justify-center">
              <img
                id="cac-certificate-image"
                src={certificateUrl}
                alt="Official CAC Certificate of Incorporation for Genius Dairy Academy Ltd / Genius Dairy Farms Limited (RC: 8888771)"
                className="w-full h-auto object-contain"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== CAC_CERTIFICATE_BASE64) {
                    target.src = CAC_CERTIFICATE_BASE64;
                  }
                }}
              />
            </div>

            {/* Small Caption Required by Specification */}
            <div className="pt-3 pb-1 text-center">
              <p className="text-xs sm:text-sm font-semibold text-[#143727] tracking-tight">
                Official CAC Certificate — Evidence of Business Registration
              </p>
              <p className="text-[11px] text-[#75827B] mt-0.5">
                Corporate Affairs Commission • Federal Republic of Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
