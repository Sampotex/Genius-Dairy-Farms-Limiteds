import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  Car,
  Truck,
  Layers,
  Phone,
  MessageCircle,
  Building2,
  Wheat,
  ThermometerSnowflake,
  GraduationCap,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';

interface IseyinSiteLocationHighlightProps {
  className?: string;
}

export const IseyinSiteLocationHighlight: React.FC<IseyinSiteLocationHighlightProps> = ({
  className = '',
}) => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [mapView, setMapView] = useState<'standard' | 'satellite' | 'corridor'>('standard');
  const [activeTab, setActiveTab] = useState<'directions' | 'infrastructure' | 'protocols'>('directions');

  const fullAddress = COMPANY_DETAILS.address;
  const coordsText = `${COMPANY_DETAILS.coordinates.lat}, ${COMPANY_DETAILS.coordinates.lng}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Genius Dairy Farms, Kilometer 4, Olora Village, Iseyin-Ibadan Expressway, Iseyin, Oyo State, Nigeria'
  )}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Kilometer 4, Olora Village, Iseyin-Ibadan Expressway, Iseyin, Oyo State, Nigeria'
  )}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(coordsText);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  // Build iframe src based on view
  const mapSrc = (() => {
    const baseQuery = encodeURIComponent('Olora Village, Iseyin-Ibadan Expressway, Iseyin, Oyo State, Nigeria');
    if (mapView === 'satellite') {
      return `https://maps.google.com/maps?q=${baseQuery}&t=k&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    if (mapView === 'corridor') {
      return `https://maps.google.com/maps?q=Iseyin%20Oyo%20State%20Nigeria&t=&z=11&ie=UTF8&iwloc=&output=embed`;
    }
    return `https://maps.google.com/maps?q=${baseQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  })();

  return (
    <section
      id="iseyin-site-location-highlight"
      aria-label="Iseyin Site Location and Map Highlight"
      className={`bg-white rounded-xs border border-[#DCD9CE] shadow-sm overflow-hidden ${className}`}
    >
      {/* Header bar */}
      <div className="p-6 sm:p-8 bg-[#143727] text-white border-b border-[#234D37]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/10 rounded-xs text-[#C89D4B] text-[11px] font-bold tracking-[0.2em] uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>Operational Site & Farm Complex</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Genius Dairy Farms — Iseyin Site
            </h2>
            <p className="text-sm text-[#C8DBD0] max-w-2xl leading-relaxed">
              Our 60-acre integrated dairy development and animal genetics facility is situated in Olora Village, strategic to the newly reconstructed Ibadan–Iseyin transit corridor.
            </p>
          </div>

          {/* Quick status & coordinate chip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="bg-[#0D2419] px-4 py-3 rounded-xs border border-[#234D37] text-xs space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Facility & Training Farm</span>
              </div>
              <div className="text-[11px] text-[#A6BFB0] font-mono flex items-center justify-between gap-3">
                <span>GPS: 7.9625° N, 3.5936° E</span>
                <button
                  id="copy-coords-btn"
                  onClick={handleCopyCoords}
                  type="button"
                  title="Copy GPS coordinates"
                  className="text-[#C89D4B] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 text-[10px] uppercase font-bold"
                >
                  {copiedCoords ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Address Card Strip */}
        <div className="mt-6 pt-6 border-t border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#C89D4B] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#C89D4B] block">
                Official Farm Address
              </span>
              <p className="text-sm font-medium text-white leading-snug">
                {fullAddress}
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <button
              id="copy-address-button"
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer border border-white/20"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Address Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              id="open-directions-button"
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C89D4B] hover:bg-[#B38938] text-[#143727] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>

            <a
              id="open-google-maps-button"
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#F4F4F0] text-[#143727] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative bg-[#EDEAE2]">
        {/* Map View Switcher Controls */}
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-xs p-1 rounded-xs border border-[#D5D2C8] shadow-md flex items-center gap-1">
          <button
            id="map-view-standard"
            type="button"
            onClick={() => setMapView('standard')}
            className={`px-3 py-1.5 text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center gap-1.5 ${
              mapView === 'standard'
                ? 'bg-[#143727] text-white shadow-2xs'
                : 'text-[#4A554F] hover:text-[#151A18] hover:bg-neutral-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Facility View</span>
          </button>
          <button
            id="map-view-satellite"
            type="button"
            onClick={() => setMapView('satellite')}
            className={`px-3 py-1.5 text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center gap-1.5 ${
              mapView === 'satellite'
                ? 'bg-[#143727] text-white shadow-2xs'
                : 'text-[#4A554F] hover:text-[#151A18] hover:bg-neutral-100'
            }`}
          >
            <span>Satellite</span>
          </button>
          <button
            id="map-view-corridor"
            type="button"
            onClick={() => setMapView('corridor')}
            className={`px-3 py-1.5 text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center gap-1.5 ${
              mapView === 'corridor'
                ? 'bg-[#143727] text-white shadow-2xs'
                : 'text-[#4A554F] hover:text-[#151A18] hover:bg-neutral-100'
            }`}
          >
            <span>Expressway Corridor</span>
          </button>
        </div>

        {/* Floating Facility Info Overlay (Desktop) */}
        <div className="hidden md:block absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-xs p-4 rounded-xs border border-[#D5D2C8] shadow-lg max-w-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span className="font-heading font-bold text-sm text-[#143727]">
              Genius Dairy Farms Entrance
            </span>
          </div>
          <p className="text-xs text-[#525F58] leading-relaxed mb-2.5">
            Kilometer 4, Olora Village. Clearly signposted with private perimeter fence and vehicle disinfection bay.
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-[#4A554F] pt-2 border-t border-[#E5E2D9]">
            <div>
              <span className="text-[#84928A] block">Expressway</span>
              <span className="font-semibold text-[#151A18]">Iseyin–Ibadan Rd</span>
            </div>
            <div>
              <span className="text-[#84928A] block">Acreage</span>
              <span className="font-semibold text-[#151A18]">60 Acres</span>
            </div>
          </div>
        </div>

        {/* Embedded Map iframe */}
        <div className="w-full h-[360px] sm:h-[420px] relative">
          <iframe
            title="Genius Dairy Farms Iseyin Site Map"
            src={mapSrc}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen={false}
          />
        </div>
      </div>

      {/* Detail Tabs & Site Information */}
      <div className="p-6 sm:p-8 bg-[#FAF9F5]">
        {/* Tab selection */}
        <div className="flex items-center border-b border-[#DCD9CE] mb-6 gap-2 overflow-x-auto pb-0.5">
          <button
            id="tab-btn-directions"
            type="button"
            onClick={() => setActiveTab('directions')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'directions'
                ? 'border-[#143727] text-[#143727]'
                : 'border-transparent text-[#66726B] hover:text-[#151A18]'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Transit & Driving Directions</span>
          </button>
          <button
            id="tab-btn-infrastructure"
            type="button"
            onClick={() => setActiveTab('infrastructure')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'infrastructure'
                ? 'border-[#143727] text-[#143727]'
                : 'border-transparent text-[#66726B] hover:text-[#151A18]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>60-Acre Site Specifications</span>
          </button>
          <button
            id="tab-btn-protocols"
            type="button"
            onClick={() => setActiveTab('protocols')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'protocols'
                ? 'border-[#143727] text-[#143727]'
                : 'border-transparent text-[#66726B] hover:text-[#151A18]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Biosecurity & Visiting Hours</span>
          </button>
        </div>

        {/* Tab 1: Transit & Directions */}
        {activeTab === 'directions' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            <div className="bg-white p-5 rounded-xs border border-[#E2DFD6] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#143727]">
                <Navigation className="w-4 h-4 text-[#C89D4B]" />
                <span>From Ibadan / Moniya</span>
              </div>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Depart via the Moniya Expressway onto the newly reconstructed dualized Ibadan–Iseyin corridor. Journey is approximately 50–60 minutes (55 km). At Kilometer 4 milestone before reaching Iseyin town center, the Genius Dairy Farms signpost is clearly visible on the right at Olora Village.
              </p>
              <div className="pt-2 border-t border-[#EDEAE2] flex justify-between text-[11px] text-[#7A8780]">
                <span>Distance: ~55 km</span>
                <span className="font-semibold text-[#143727]">50 mins drive</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xs border border-[#E2DFD6] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#143727]">
                <Car className="w-4 h-4 text-[#C89D4B]" />
                <span>From Oyo Town / Ogbomoso</span>
              </div>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Connect through the Oyo–Iseyin road westward into Iseyin, then join the southbound Ibadan Expressway corridor. The farm entrance is located 4 kilometers from the Iseyin town boundary at Olora Village on the left-hand flank.
              </p>
              <div className="pt-2 border-t border-[#EDEAE2] flex justify-between text-[11px] text-[#7A8780]">
                <span>Distance: ~42 km</span>
                <span className="font-semibold text-[#143727]">40 mins drive</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xs border border-[#E2DFD6] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#143727]">
                <Truck className="w-4 h-4 text-[#C89D4B]" />
                <span>Commercial & Cold-Chain Logistics</span>
              </div>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Heavy articulated feed trucks, livestock haulers, and insulated milk tankers have direct asphalt access with wide gate turn-radii and a concrete loading apron directly adjacent to the bulk milk cooling bay.
              </p>
              <div className="pt-2 border-t border-[#EDEAE2] flex justify-between text-[11px] text-[#7A8780]">
                <span>Road Surface: Smooth Asphalt</span>
                <span className="font-semibold text-[#143727]">Tanker Ready</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 60-Acre Site Specifications */}
        {activeTab === 'infrastructure' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
            <div className="bg-white p-4 rounded-xs border border-[#E2DFD6] space-y-2">
              <div className="w-8 h-8 rounded-2xs bg-[#E8F0EC] text-[#143727] flex items-center justify-center">
                <Wheat className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#151A18] uppercase tracking-wider">
                60-Acre Total Estate
              </h4>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Dedicated landholding for rotational grazing, silage production, and zero-grazing housing.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xs border border-[#E2DFD6] space-y-2">
              <div className="w-8 h-8 rounded-2xs bg-[#E8F0EC] text-[#143727] flex items-center justify-center">
                <ThermometerSnowflake className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#151A18] uppercase tracking-wider">
                Cold-Chain Milk Storage
              </h4>
              <p className="text-xs text-[#525F58] leading-relaxed">
                On-site bulk cooling tanks chilling raw milk to 4°C within two hours of milking to lock in freshness.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xs border border-[#E2DFD6] space-y-2">
              <div className="w-8 h-8 rounded-2xs bg-[#E8F0EC] text-[#143727] flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#151A18] uppercase tracking-wider">
                Genius Academy Wing
              </h4>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Practical demonstration plots, silage making trenches, and lecture facilities for dairy trainees.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xs border border-[#E2DFD6] space-y-2">
              <div className="w-8 h-8 rounded-2xs bg-[#E8F0EC] text-[#143727] flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#151A18] uppercase tracking-wider">
                Zero-Grazing Pens
              </h4>
              <p className="text-xs text-[#525F58] leading-relaxed">
                Ventilated, clean free-stall housing protecting crossbred cows from tropical midday heat and tsetse flies.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Biosecurity & Visiting Hours */}
        {activeTab === 'protocols' && (
          <div className="bg-white p-6 rounded-xs border border-[#E2DFD6] space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#143727]">
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
              <span>Mandatory Farm Biosecurity Protocol</span>
            </div>
            <p className="text-xs text-[#525F58] leading-relaxed">
              In accordance with commercial dairy best practice and FrieslandCampina WAMCO DDP standards, all visitors and vehicles must undergo sanitization prior to entering the herd pens. Footbaths with biodegradable disinfectant and tire wash bays operate 24/7.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#EDEAE2]">
              <div>
                <span className="text-[11px] text-[#7A8780] block">Administrative Visiting Hours</span>
                <span className="text-xs font-bold text-[#151A18]">Mon – Sat: 8:00 AM – 5:00 PM</span>
              </div>
              <div>
                <span className="text-[11px] text-[#7A8780] block">Appointment Requirement</span>
                <span className="text-xs font-bold text-[#151A18]">48h Advance Notice for Groups</span>
              </div>
              <div>
                <span className="text-[11px] text-[#7A8780] block">Gatehouse Direct Line</span>
                <a
                  href={COMPANY_DETAILS.phoneTel}
                  className="text-xs font-bold text-[#143727] hover:underline"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Help Desk & Contact Bar */}
        <div className="mt-6 pt-6 border-t border-[#DCD9CE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#525F58]">
            <Clock className="w-4 h-4 text-[#C89D4B]" />
            <span>Need assistance navigating to Olora Village? Our security desk is on standby.</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              id="gate-call-link"
              href={COMPANY_DETAILS.phoneTel}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#143727] text-white text-xs font-semibold rounded-xs hover:bg-[#0D261B] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Farm Desk</span>
            </a>
            <a
              id="gate-whatsapp-link"
              href={COMPANY_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#25D366] text-white text-xs font-semibold rounded-xs hover:bg-[#1EBE5D] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Gatehouse</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
