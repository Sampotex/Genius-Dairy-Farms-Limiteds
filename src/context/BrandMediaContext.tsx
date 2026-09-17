import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { IMAGES } from '../data/images';
import { FOUNDER_IMAGE_BASE64 } from '../data/founderImageFallback';
import { CAC_CERTIFICATE_BASE64 } from '../data/cacCertificateFallback';
import { ACADEMY_LOGO_BASE64 } from '../data/academyLogoFallback';
import { useFounderPhoto } from './FounderPhotoContext';
import { saveUserGalleryPhoto } from '../utils/userPhotoStorage';
import { openMediaDatabase, STORES } from '../utils/mediaDb';

export type MediaCategory =
  | 'Brand & Identity'
  | 'Home & Facilities'
  | 'Livestock & Operations'
  | 'Pasture & Agronomy'
  | 'Udderfall Dairy Foods'
  | 'Academy & Training'
  | 'Sustainability';

export type MediaSlotKey =
  // Brand & Leadership
  | 'logo'
  | 'academyLogo'
  | 'founder'
  | 'cacCertificate'
  // Home & Aerials
  | 'hero'
  | 'corporateFarmFacility'
  | 'farmPanorama'
  | 'eagleViewFarm'
  | 'dairyBarnAerial'
  // Livestock & Operations
  | 'crossbreedCattle'
  | 'grazingHerd'
  | 'cattleCare'
  | 'modernMilking'
  | 'freshMilkPour'
  | 'hygienicFacility'
  // Pasture & Land
  | 'lushPasture'
  | 'pastureManagement'
  // Udderfall Dairy Foods
  | 'udderfallYogurtHero'
  | 'udderfallCheeseHero'
  | 'greekYogurtBowl'
  | 'freshWaraCheese'
  | 'commercialMozzarella'
  | 'mozzarellaBlock'
  | 'strawberryYogurt'
  | 'vanillaYogurt'
  | 'foodServiceKitchen'
  // Academy & Training
  | 'trainingField'
  | 'studentGroup'
  | 'handsOnDemonstration'
  // Sustainability & Environment
  | 'sustainabilityLandscape'
  | 'solarAndCleanWater'
  // Aliases for backwards compatibility
  | 'farm'
  | 'product';

export interface MediaSlotDefinition {
  key: MediaSlotKey;
  name: string;
  shortLabel: string;
  category: MediaCategory;
  defaultUrl: string;
  aspectRatioLabel: string;
  description: string;
  locationUsed: string;
  recommendedResolution: string;
}

export const MEDIA_SLOTS: Record<string, MediaSlotDefinition> = {
  // Brand & Leadership
  logo: {
    key: 'logo',
    name: 'Official Company Logo',
    shortLabel: 'Company Logo',
    category: 'Brand & Identity',
    defaultUrl: '/genius-dairy-logo.jpg',
    aspectRatioLabel: '1:1 Square / Circle',
    description: 'The circular registered emblem of Genius Dairy Farms Limited.',
    locationUsed: 'Header navigation, footer, partner modals, certification badges, and official documents.',
    recommendedResolution: '500 × 500 px (PNG or JPG)',
  },
  academyLogo: {
    key: 'academyLogo',
    name: 'Genius Dairy Farm Academy Official Logo',
    shortLabel: 'Academy Logo',
    category: 'Brand & Identity',
    defaultUrl: ACADEMY_LOGO_BASE64,
    aspectRatioLabel: '1:1 Square / Circle',
    description: 'The official circular crest of Genius Dairy Farm Academy featuring the dairy herd, milk vessel, and motto Learn • Grow • Lead.',
    locationUsed: 'Top of Genius Dairy Farm Academy section, Academy header, and training accreditation.',
    recommendedResolution: '800 × 800 px (PNG or JPG)',
  },
  founder: {
    key: 'founder',
    name: 'Founder Portrait (Moyosore Olatunde Rafiu)',
    shortLabel: 'Founder Photo',
    category: 'Brand & Identity',
    defaultUrl: FOUNDER_IMAGE_BASE64,
    aspectRatioLabel: '3:4 or 4:5 Portrait',
    description: 'Portrait of Founder and Managing Director Moyosore Olatunde Rafiu at the dairy farm.',
    locationUsed: 'About page leadership profile, Founder card, and executive message.',
    recommendedResolution: '1000 × 1250 px',
  },
  cacCertificate: {
    key: 'cacCertificate',
    name: 'Official CAC Certificate of Incorporation',
    shortLabel: 'CAC Certificate',
    category: 'Brand & Identity',
    defaultUrl: CAC_CERTIFICATE_BASE64,
    aspectRatioLabel: '3:4 Portrait',
    description: 'Official CAC business registration evidence (RC: 8888771, TIN: 33588943-0001) for Genius Dairy Academy Ltd / Genius Dairy Farms Limited.',
    locationUsed: 'Udderfall section CAC Registration & Business Verification, legal compliance showcase.',
    recommendedResolution: '1200 × 1600 px',
  },

  // Home & Aerial Facilities
  hero: {
    key: 'hero',
    name: 'Home Hero Pasture Banner',
    shortLabel: 'Hero Banner',
    category: 'Home & Facilities',
    defaultUrl: IMAGES.heroDairyCattle,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Full-width cinematic background welcoming visitors on the home page.',
    locationUsed: 'Home page header hero banner.',
    recommendedResolution: '1920 × 1080 px or wide phone landscape',
  },
  corporateFarmFacility: {
    key: 'corporateFarmFacility',
    name: '60-Acre Farm Facility & Headquarters',
    shortLabel: 'Farm Facility',
    category: 'Home & Facilities',
    defaultUrl: IMAGES.corporateFarmFacility,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Overview of the 60-acre dairy complex located along Iseyin–Ibadan Expressway, Oyo State.',
    locationUsed: 'Home page commercial overview & About page facility showcase.',
    recommendedResolution: '1600 × 900 px',
  },
  farmPanorama: {
    key: 'farmPanorama',
    name: 'Vast Farmland Landscape Panorama',
    shortLabel: 'Farm Panorama',
    category: 'Home & Facilities',
    defaultUrl: IMAGES.farmPanorama,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Wide scenic panoramic view of green grazing savanna and cattle in sunlight.',
    locationUsed: 'Our Farm page header and landscape gallery.',
    recommendedResolution: '1600 × 900 px',
  },
  eagleViewFarm: {
    key: 'eagleViewFarm',
    name: 'Eagle Aerial Drone View of 60-Acre Farm',
    shortLabel: 'Drone Aerial Farm',
    category: 'Home & Facilities',
    defaultUrl: IMAGES.eagleViewFarm,
    aspectRatioLabel: '16:9 Landscape',
    description: 'High-altitude drone aerial perspective capturing paddocks, barns, and perimeter ranch fencing.',
    locationUsed: 'Eagle View interactive drone section and Home page facility tour.',
    recommendedResolution: '1920 × 1080 px',
  },
  dairyBarnAerial: {
    key: 'dairyBarnAerial',
    name: 'Dairy Barn & Corral Paddocks Aerial',
    shortLabel: 'Barn Aerial',
    category: 'Home & Facilities',
    defaultUrl: IMAGES.dairyBarnAerial,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Aerial drone capture of sheltered housing, feed troughs, and corral paddocks.',
    locationUsed: 'Eagle View aerial inspection tour and Our Farm gallery.',
    recommendedResolution: '1600 × 900 px',
  },

  // Livestock & Operations
  crossbreedCattle: {
    key: 'crossbreedCattle',
    name: 'High-Yield Dairy Crossbreed Cattle',
    shortLabel: 'Dairy Cow Genetics',
    category: 'Livestock & Operations',
    defaultUrl: IMAGES.crossbreedCattle,
    aspectRatioLabel: '4:3 or 16:9 Landscape',
    description: 'F1 crossbreed dairy cow selected for tropical heat tolerance and high milk production.',
    locationUsed: 'Cattle genetics milestone, livestock platform card, and photo gallery.',
    recommendedResolution: '1200 × 800 px',
  },
  grazingHerd: {
    key: 'grazingHerd',
    name: 'Pastoral Livestock Grazing Herd',
    shortLabel: 'Grazing Herd',
    category: 'Livestock & Operations',
    defaultUrl: IMAGES.grazingHerd,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Rotational pasture grazing herd in lush Nigerian savanna.',
    locationUsed: 'Livestock operations, grazing strategy section, and gallery.',
    recommendedResolution: '1200 × 800 px',
  },
  cattleCare: {
    key: 'cattleCare',
    name: 'Cattle Care & Veterinary Monitoring',
    shortLabel: 'Cattle Care',
    category: 'Livestock & Operations',
    defaultUrl: IMAGES.cattleCare,
    aspectRatioLabel: '4:3 Landscape',
    description: 'Hands-on veterinary inspection, health records, and compassionate animal welfare.',
    locationUsed: 'Herd health protocols, veterinary services, and gallery.',
    recommendedResolution: '1200 × 900 px',
  },
  modernMilking: {
    key: 'modernMilking',
    name: 'Modern Milking Operations',
    shortLabel: 'Milking Parlor',
    category: 'Livestock & Operations',
    defaultUrl: IMAGES.modernMilking,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Hygienic milking station with rapid chilling pipeline.',
    locationUsed: 'Daily milking schedule and processing operations.',
    recommendedResolution: '1200 × 800 px',
  },
  freshMilkPour: {
    key: 'freshMilkPour',
    name: 'Fresh Wholesome Milk Pour',
    shortLabel: 'Fresh Milk',
    category: 'Livestock & Operations',
    defaultUrl: IMAGES.freshMilkPour,
    aspectRatioLabel: '4:3 or 1:1',
    description: 'Rich, pure, natural whole dairy milk fresh from the milking parlor.',
    locationUsed: 'Udderfall fresh milk feature, nutritional purity banner, and gallery.',
    recommendedResolution: '1200 × 900 px',
  },
  hygienicFacility: {
    key: 'hygienicFacility',
    name: 'Clean Dairy Processing Facility',
    shortLabel: 'Processing Plant',
    category: 'Livestock & Operations',
    defaultUrl: IMAGES.hygienicFacility,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Stainless-steel sanitary pasteurization and packaging environment.',
    locationUsed: 'Udderfall quality control, cold chain standards, and gallery.',
    recommendedResolution: '1200 × 800 px',
  },

  // Pasture & Agronomy
  lushPasture: {
    key: 'lushPasture',
    name: 'Lush Green Pasture & Forage',
    shortLabel: 'Green Pasture',
    category: 'Pasture & Agronomy',
    defaultUrl: IMAGES.lushPasture,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Cultivated Brachiaria, Napier, and high-protein pasture legumes.',
    locationUsed: 'Agronomy platform, forage feed security, and gallery.',
    recommendedResolution: '1400 × 800 px',
  },
  pastureManagement: {
    key: 'pastureManagement',
    name: 'Pasture Management & Silage Conservation',
    shortLabel: 'Silage & Irrigation',
    category: 'Pasture & Agronomy',
    defaultUrl: IMAGES.pastureManagement,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Irrigated paddocks, silage pits, and year-round dry season fodder stockpiles.',
    locationUsed: 'Fodder conservation milestones and agronomy platform.',
    recommendedResolution: '1200 × 800 px',
  },

  // Udderfall Dairy Foods
  udderfallYogurtHero: {
    key: 'udderfallYogurtHero',
    name: 'Udderfall Premium Artisan Yogurt',
    shortLabel: 'Artisan Yogurt',
    category: 'Udderfall Dairy Foods',
    defaultUrl: IMAGES.udderfallYogurtHero,
    aspectRatioLabel: '4:3 or 16:9',
    description: 'Thick, creamy artisan yogurt made from 100% natural Nigerian whole milk.',
    locationUsed: 'Udderfall page hero, product showcase cards, and wholesale catalog.',
    recommendedResolution: '1200 × 900 px',
  },
  udderfallCheeseHero: {
    key: 'udderfallCheeseHero',
    name: 'Udderfall Artisan Cheese & Curds',
    shortLabel: 'Cheese & Curds',
    category: 'Udderfall Dairy Foods',
    defaultUrl: IMAGES.udderfallCheeseHero,
    aspectRatioLabel: '4:3 Landscape',
    description: 'Handcrafted artisan cheese wheels, curds, and specialty dairy.',
    locationUsed: 'Udderfall cheese section and home page product preview.',
    recommendedResolution: '1200 × 900 px',
  },
  greekYogurtBowl: {
    key: 'greekYogurtBowl',
    name: 'Greek Style Strained Yogurt Bowl',
    shortLabel: 'Greek Yogurt',
    category: 'Udderfall Dairy Foods',
    defaultUrl: IMAGES.greekYogurtBowl,
    aspectRatioLabel: '1:1 Square or 4:3',
    description: 'High-protein, velvety strained Greek yogurt served with natural fruits.',
    locationUsed: 'Udderfall product catalog and nutrition guide.',
    recommendedResolution: '1000 × 1000 px',
  },
  freshWaraCheese: {
    key: 'freshWaraCheese',
    name: 'Fresh Traditional Wara Soft Cheese',
    shortLabel: 'Fresh Wara',
    category: 'Udderfall Dairy Foods',
    defaultUrl: IMAGES.freshWaraCheese,
    aspectRatioLabel: '4:3 Landscape',
    description: 'Locally cherished soft wara cheese curds prepared under hygienic modern standards.',
    locationUsed: 'Udderfall traditional products and regional distribution.',
    recommendedResolution: '1000 × 800 px',
  },
  commercialMozzarella: {
    key: 'commercialMozzarella',
    name: 'Commercial Mozzarella Pizza Melt & Stretch',
    shortLabel: 'Mozzarella Melt',
    category: 'Udderfall Dairy Foods',
    defaultUrl: IMAGES.commercialMozzarella,
    aspectRatioLabel: '16:9 Landscape',
    description: 'High-stretch, golden melt pizza mozzarella formulated for pizzerias and hotels.',
    locationUsed: 'Commercial cheese wholesale, HORECA section, and pizza melt display.',
    recommendedResolution: '1200 × 800 px',
  },
  mozzarellaBlock: {
    key: 'mozzarellaBlock',
    name: 'Mozzarella Cheese Blocks & Shreds',
    shortLabel: 'Mozzarella Block',
    category: 'Udderfall Dairy Foods',
    defaultUrl: IMAGES.mozzarellaBlock,
    aspectRatioLabel: '4:3 Landscape',
    description: 'Vacuum-sealed food service mozzarella blocks ready for culinary shredding.',
    locationUsed: 'Wholesale specification sheet and foodservice packaging.',
    recommendedResolution: '1000 × 800 px',
  },
  strawberryYogurt: {
    key: 'strawberryYogurt',
    name: 'Refreshing Strawberry Dairy Yogurt',
    shortLabel: 'Strawberry Yogurt',
    category: 'Udderfall Dairy Foods',
    defaultUrl: IMAGES.strawberryYogurt,
    aspectRatioLabel: '1:1 or 4:3',
    description: 'Naturally flavored strawberry stirred yogurt cups.',
    locationUsed: 'Udderfall flavors collection and retail pack lineup.',
    recommendedResolution: '1000 × 1000 px',
  },
  vanillaYogurt: {
    key: 'vanillaYogurt',
    name: 'Natural Sweet Vanilla Dairy Yogurt',
    shortLabel: 'Vanilla Yogurt',
    category: 'Udderfall Dairy Foods',
    defaultUrl: IMAGES.vanillaYogurt,
    aspectRatioLabel: '1:1 or 4:3',
    description: 'Aromatic Bourbon vanilla yogurt cups with silky texture.',
    locationUsed: 'Udderfall retail flavor lineup and gallery.',
    recommendedResolution: '1000 × 1000 px',
  },
  foodServiceKitchen: {
    key: 'foodServiceKitchen',
    name: 'Commercial Kitchen & Culinary Application',
    shortLabel: 'Food Service Kitchen',
    category: 'Udderfall Dairy Foods',
    defaultUrl: IMAGES.foodServiceKitchen,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Professional chef kitchen utilizing Udderfall cheese and butter.',
    locationUsed: 'HORECA hospitality supply, wholesale quote modal, and culinary partnerships.',
    recommendedResolution: '1200 × 800 px',
  },

  // Academy & Training
  studentGroup: {
    key: 'studentGroup',
    name: 'Academy Students & Trainees',
    shortLabel: 'Academy Trainees',
    category: 'Academy & Training',
    defaultUrl: IMAGES.studentGroup,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Youth and women agricultural scholars undergoing intensive dairy training in Oyo State.',
    locationUsed: 'Academy page header, youth empowerment milestones, and graduation records.',
    recommendedResolution: '1200 × 800 px',
  },
  trainingField: {
    key: 'trainingField',
    name: 'Agricultural Training Field & Agronomy',
    shortLabel: 'Training Field',
    category: 'Academy & Training',
    defaultUrl: IMAGES.trainingField,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Practical field instruction in pasture establishment, seed drills, and feed compounding.',
    locationUsed: 'Practical curriculum highlights, field days, and gallery.',
    recommendedResolution: '1200 × 800 px',
  },
  handsOnDemonstration: {
    key: 'handsOnDemonstration',
    name: 'Hands-On Demonstration & Clinical Practice',
    shortLabel: 'Field Demonstration',
    category: 'Academy & Training',
    defaultUrl: IMAGES.handsOnDemonstration,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Veterinary health checks, artificial insemination, and milking sanitation training.',
    locationUsed: 'Academy curriculum details, technical training modules.',
    recommendedResolution: '1200 × 800 px',
  },

  // Sustainability & Environment
  sustainabilityLandscape: {
    key: 'sustainabilityLandscape',
    name: 'Agroforestry & Environmental Stewardship',
    shortLabel: 'Sustainability Landscape',
    category: 'Sustainability',
    defaultUrl: IMAGES.sustainabilityLandscape,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Integrated tree planting, windbreaks, soil moisture retention, and biodiversity.',
    locationUsed: 'Sustainability page header, circular economy overview, and green pasture gallery.',
    recommendedResolution: '1400 × 800 px',
  },
  solarAndCleanWater: {
    key: 'solarAndCleanWater',
    name: 'Solar Power & Deep Borehole Water',
    shortLabel: 'Solar & Water',
    category: 'Sustainability',
    defaultUrl: IMAGES.solarAndCleanWater,
    aspectRatioLabel: '16:9 Landscape',
    description: 'Off-grid solar photovoltaic pumping system providing continuous clean water.',
    locationUsed: 'Resource conservation, sustainability metrics, and gallery.',
    recommendedResolution: '1200 × 800 px',
  },
};

// Aliases mapping
const ALIAS_MAP: Record<string, string> = {
  farm: 'corporateFarmFacility',
  product: 'commercialMozzarella',
  heroDairyCattle: 'hero',
  founderPortrait: 'founder',
  academyLogo: 'academyLogo',
};

export const GALLERY_ID_TO_SLOT: Record<string, string> = {
  'genius-logo': 'logo',
  'academy-logo': 'academyLogo',
  'genius-academy-logo': 'academyLogo',
  'founder-portrait': 'founder',
  'eagle-view-drone': 'eagleViewFarm',
  'dairy-barn-aerial': 'dairyBarnAerial',
  'hero-dairy-cattle': 'hero',
  'corporate-facility': 'corporateFarmFacility',
  'farm-panorama': 'farmPanorama',
  'crossbreed-cattle': 'crossbreedCattle',
  'grazing-herd': 'grazingHerd',
  'cattle-care': 'cattleCare',
  'modern-milking': 'modernMilking',
  'fresh-milk-pour': 'freshMilkPour',
  'hygienic-facility': 'hygienicFacility',
  'lush-pasture': 'lushPasture',
  'pasture-management': 'pastureManagement',
  'udderfall-yogurt-hero': 'udderfallYogurtHero',
  'udderfall-cheese-hero': 'udderfallCheeseHero',
  'greek-yogurt-bowl': 'greekYogurtBowl',
  'fresh-wara-cheese': 'freshWaraCheese',
  'commercial-mozzarella': 'commercialMozzarella',
  'mozzarella-block': 'mozzarellaBlock',
  'strawberry-yogurt': 'strawberryYogurt',
  'vanilla-yogurt': 'vanillaYogurt',
  'food-service-kitchen': 'foodServiceKitchen',
  'training-field': 'trainingField',
  'student-group': 'studentGroup',
  'hands-on-demonstration': 'handsOnDemonstration',
  'sustainability-landscape': 'sustainabilityLandscape',
  'solar-clean-water': 'solarAndCleanWater',
  // Farm Gallery item IDs from companyData.ts
  'g-0': 'eagleViewFarm',
  'g-0b': 'dairyBarnAerial',
  'g-1': 'crossbreedCattle',
  'g-2': 'corporateFarmFacility',
  'g-3': 'freshMilkPour',
  'g-4': 'studentGroup',
  'g-5': 'grazingHerd',
  'g-6': 'udderfallYogurtHero',
};

export const DEFAULT_URL_TO_SLOT: Record<string, string> = {
  '/genius-dairy-logo.jpg': 'logo',
  '/founder.jpg': 'founder',
  '/eagle-view-farm.jpg': 'eagleViewFarm',
  '/dairy-barn-aerial.jpg': 'dairyBarnAerial',
};

Object.entries(MEDIA_SLOTS).forEach(([slotKey, def]) => {
  if (def.defaultUrl) {
    DEFAULT_URL_TO_SLOT[def.defaultUrl] = slotKey;
  }
});

// Canonical slot keys
export const ALL_CANONICAL_SLOT_KEYS = Object.keys(MEDIA_SLOTS).filter(
  (k) => !['farm', 'product'].includes(k)
) as MediaSlotKey[];

const STORAGE_PREFIX = 'genius_media_slot_';
const BRAND_MEDIA_STORE = STORES.BRAND_MEDIA;

/**
 * Open or create IndexedDB store for brand media using the unified manager
 */
function openBrandMediaDB(): Promise<IDBDatabase> {
  return openMediaDatabase();
}

/**
 * Optimizes an uploaded image from phone gallery/camera for fast web rendering & durable storage
 */
export function optimizeImageFromPhone(
  file: File,
  slotKey: string
): Promise<{ dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    // Tolerant check for mobile gallery files
    const isImage =
      file.type.startsWith('image/') ||
      /\.(jpe?g|png|webp|gif|bmp|heic|heif|svg)$/i.test(file.name) ||
      file.type === '' ||
      file.type === 'application/octet-stream';

    if (!isImage) {
      reject(new Error('Please select a valid image file from your gallery (JPEG, PNG, WebP, etc.)'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read photo from phone gallery.'));
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      if (!rawDataUrl) {
        reject(new Error('Empty photo data received.'));
        return;
      }

      const img = new Image();
      img.onerror = () => {
        // If image object fails (e.g. non-standard mobile raw header), still resolve raw dataUrl
        resolve({ dataUrl: rawDataUrl, width: 1200, height: 800 });
      };
      img.onload = () => {
        const isLogo = slotKey === 'logo';
        const MAX_DIMENSION = isLogo ? 800 : 1800;

        let width = img.width || 1200;
        let height = img.height || 800;

        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve({
            dataUrl: rawDataUrl,
            width: img.width,
            height: img.height,
          });
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        try {
          const isPng = file.type === 'image/png' && isLogo;
          const mime = isPng ? 'image/png' : 'image/jpeg';
          const quality = isLogo ? 0.94 : 0.88;
          const optimizedDataUrl = canvas.toDataURL(mime, quality);
          resolve({ dataUrl: optimizedDataUrl, width, height });
        } catch {
          resolve({
            dataUrl: rawDataUrl,
            width: img.width,
            height: img.height,
          });
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  });
}

interface BrandMediaContextType {
  // Current active URLs for legacy direct access
  logoUrl: string;
  academyLogoUrl: string;
  heroUrl: string;
  founderUrl: string;
  farmUrl: string;
  productUrl: string;

  // Dictionary of all URLs
  mediaUrls: Record<string, string>;

  // Dynamic image retriever for any slot or image key
  getImage: (slotOrKey: string) => string;

  // Status flags
  isCustomLogo: boolean;
  customSlots: Record<string, boolean>;
  customSlotsCount: number;
  totalSlotsCount: number;

  // Replacement operations
  replaceMediaFromFile: (slotKey: MediaSlotKey | string, file: File) => Promise<string>;
  replaceMediaFromDataUrl: (slotKey: MediaSlotKey | string, dataUrl: string) => Promise<void>;
  batchReplaceMedia: (
    items: Array<{ slotKey: MediaSlotKey | string; file?: File; dataUrl?: string }>
  ) => Promise<{ successCount: number }>;
  resetMediaSlot: (slotKey: MediaSlotKey | string) => Promise<void>;
  resetAllMedia: () => Promise<void>;

  // Backup & Restore
  exportImageBackup: () => string;
  importImageBackup: (jsonString: string) => Promise<number>;

  // Modal controls
  isReplaceModalOpen: boolean;
  activeModalSlot: MediaSlotKey;
  openReplaceModal: (slotKey?: MediaSlotKey) => void;
  closeReplaceModal: () => void;
}

const BrandMediaContext = createContext<BrandMediaContextType | undefined>(undefined);

export const BrandMediaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize default URLs map for all canonical slots
  const initialUrls = useMemo(() => {
    const map: Record<string, string> = {};
    ALL_CANONICAL_SLOT_KEYS.forEach((key) => {
      map[key] = MEDIA_SLOTS[key]?.defaultUrl || '';
    });
    return map;
  }, []);

  const [urls, setUrls] = useState<Record<string, string>>(initialUrls);
  const [customSlots, setCustomSlots] = useState<Record<string, boolean>>({});
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [activeModalSlot, setActiveModalSlot] = useState<MediaSlotKey>('logo');

  // Connect with FounderPhotoContext if available
  const { setPhotoFromUrl: setFounderPhotoFromUrl, resetToDefault: resetFounderContext } =
    useFounderPhoto();

  // Load saved custom media on mount
  useEffect(() => {
    let isMounted = true;
    const loadSavedMedia = async () => {
      try {
        const db = await openBrandMediaDB();
        const tx = db.transaction(BRAND_MEDIA_STORE, 'readonly');
        const store = tx.objectStore(BRAND_MEDIA_STORE);

        const loadedUrls: Record<string, string> = {};
        const loadedCustom: Record<string, boolean> = {};

        for (const key of ALL_CANONICAL_SLOT_KEYS) {
          const req = store.get(key);
          await new Promise<void>((resolve) => {
            req.onsuccess = () => {
              if (req.result && typeof req.result === 'string') {
                loadedUrls[key] = req.result;
                loadedCustom[key] = true;
              }
              resolve();
            };
            req.onerror = () => resolve();
          });

          // Fallback to localStorage
          if (!loadedUrls[key]) {
            try {
              const localVal = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
              if (localVal) {
                loadedUrls[key] = localVal;
                loadedCustom[key] = true;
              }
            } catch {
              // ignore
            }
          }
        }

        // Check legacy aliases
        try {
          const legacyFounder = localStorage.getItem('genius_custom_founder_image');
          if (legacyFounder && !loadedUrls.founder) {
            loadedUrls.founder = legacyFounder;
            loadedCustom.founder = true;
          }
          const legacyFarm = localStorage.getItem(`${STORAGE_PREFIX}farm`);
          if (legacyFarm && !loadedUrls.corporateFarmFacility) {
            loadedUrls.corporateFarmFacility = legacyFarm;
            loadedCustom.corporateFarmFacility = true;
          }
          const legacyProduct = localStorage.getItem(`${STORAGE_PREFIX}product`);
          if (legacyProduct && !loadedUrls.commercialMozzarella) {
            loadedUrls.commercialMozzarella = legacyProduct;
            loadedCustom.commercialMozzarella = true;
          }
        } catch {
          // ignore
        }

        if (isMounted) {
          setUrls((prev) => ({
            ...prev,
            ...loadedUrls,
          }));

          setCustomSlots((prev) => ({
            ...prev,
            ...loadedCustom,
          }));

          if (loadedUrls.founder) {
            setFounderPhotoFromUrl(loadedUrls.founder);
          }
        }
      } catch (err) {
        console.warn('Could not load brand media from IndexedDB:', err);
      }
    };

    loadSavedMedia();
    return () => {
      isMounted = false;
    };
  }, [setFounderPhotoFromUrl]);

  // Resolve canonical key
  const resolveKey = useCallback((key: string): string => {
    if (!key) return 'hero';
    if (GALLERY_ID_TO_SLOT[key]) return GALLERY_ID_TO_SLOT[key];
    if (DEFAULT_URL_TO_SLOT[key]) return DEFAULT_URL_TO_SLOT[key];
    if (ALIAS_MAP[key]) return ALIAS_MAP[key];
    return key;
  }, []);

  /**
   * Dynamic image getter: accepts slot key, gallery ID, default URL, or IMAGES key
   */
  const getImage = useCallback(
    (slotOrKey: string): string => {
      if (!slotOrKey) return '/genius-dairy-logo.jpg';
      const canonical = resolveKey(slotOrKey);
      if (urls[canonical]) {
        return urls[canonical];
      }
      if (MEDIA_SLOTS[canonical]) {
        return MEDIA_SLOTS[canonical].defaultUrl;
      }
      // If found in IMAGES dictionary
      const imageDict = IMAGES as Record<string, string>;
      if (imageDict[slotOrKey]) {
        return imageDict[slotOrKey];
      }
      return slotOrKey;
    },
    [urls, resolveKey]
  );

  /**
   * Save a single slot to storage
   */
  const saveSlotToStorage = async (canonicalKey: string, dataUrl: string) => {
    // IndexedDB
    try {
      const db = await openBrandMediaDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(BRAND_MEDIA_STORE, 'readwrite');
        const store = tx.objectStore(BRAND_MEDIA_STORE);
        const req = store.put(dataUrl, canonicalKey);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('Failed saving to IndexedDB:', err);
    }

    // localStorage
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${canonicalKey}`, dataUrl);
      if (canonicalKey === 'founder') {
        localStorage.setItem('genius_custom_founder_image', dataUrl);
      }
    } catch {
      // LocalStorage quota may be exceeded on large sets
    }
  };

  /**
   * Replaces a specific media slot with a file from phone gallery or disk
   */
  const replaceMediaFromFile = useCallback(
    async (slotKey: MediaSlotKey | string, file: File): Promise<string> => {
      const canonical = resolveKey(slotKey);
      const { dataUrl } = await optimizeImageFromPhone(file, canonical);

      await saveSlotToStorage(canonical, dataUrl);

      setUrls((prev) => ({
        ...prev,
        [canonical]: dataUrl,
      }));
      setCustomSlots((prev) => ({
        ...prev,
        [canonical]: true,
      }));

      if (canonical === 'founder') {
        setFounderPhotoFromUrl(dataUrl);
      }

      // Also add to user's gallery catalog
      try {
        await saveUserGalleryPhoto({
          id: `custom-slot-${canonical}-${Date.now()}`,
          title: MEDIA_SLOTS[canonical]?.name || file.name,
          category: 'My Gallery',
          src: dataUrl,
          caption: `Custom photo uploaded for ${MEDIA_SLOTS[canonical]?.shortLabel || canonical}`,
          location: 'Uploaded from Device Gallery',
          tag: 'Custom Media',
          createdAt: Date.now(),
        });
      } catch {
        // non-critical
      }

      return dataUrl;
    },
    [resolveKey, setFounderPhotoFromUrl]
  );

  /**
   * Replaces a specific media slot with an existing dataUrl or cloud URL
   */
  const replaceMediaFromDataUrl = useCallback(
    async (slotKey: MediaSlotKey | string, dataUrl: string): Promise<void> => {
      const canonical = resolveKey(slotKey);
      await saveSlotToStorage(canonical, dataUrl);

      setUrls((prev) => ({
        ...prev,
        [canonical]: dataUrl,
      }));
      setCustomSlots((prev) => ({
        ...prev,
        [canonical]: true,
      }));

      if (canonical === 'founder') {
        setFounderPhotoFromUrl(dataUrl);
      }
    },
    [resolveKey, setFounderPhotoFromUrl]
  );

  /**
   * Batch replaces multiple slots at once
   */
  const batchReplaceMedia = useCallback(
    async (
      items: Array<{ slotKey: MediaSlotKey | string; file?: File; dataUrl?: string }>
    ): Promise<{ successCount: number }> => {
      let count = 0;
      const updatedUrls: Record<string, string> = {};
      const updatedCustom: Record<string, boolean> = {};

      for (const item of items) {
        const canonical = resolveKey(item.slotKey);
        let finalUrl = item.dataUrl;

        if (item.file) {
          try {
            const res = await optimizeImageFromPhone(item.file, canonical);
            finalUrl = res.dataUrl;
          } catch (e) {
            console.warn('Could not optimize file for', canonical, e);
          }
        }

        if (finalUrl) {
          await saveSlotToStorage(canonical, finalUrl);
          updatedUrls[canonical] = finalUrl;
          updatedCustom[canonical] = true;
          count++;

          if (canonical === 'founder') {
            setFounderPhotoFromUrl(finalUrl);
          }
        }
      }

      setUrls((prev) => ({ ...prev, ...updatedUrls }));
      setCustomSlots((prev) => ({ ...prev, ...updatedCustom }));

      return { successCount: count };
    },
    [resolveKey, setFounderPhotoFromUrl]
  );

  /**
   * Resets a specific slot back to default
   */
  const resetMediaSlot = useCallback(
    async (slotKey: MediaSlotKey | string): Promise<void> => {
      const canonical = resolveKey(slotKey);

      try {
        const db = await openBrandMediaDB();
        const tx = db.transaction(BRAND_MEDIA_STORE, 'readwrite');
        tx.objectStore(BRAND_MEDIA_STORE).delete(canonical);
      } catch (err) {
        console.warn('Error clearing IndexedDB:', err);
      }

      try {
        localStorage.removeItem(`${STORAGE_PREFIX}${canonical}`);
        if (canonical === 'founder') {
          localStorage.removeItem('genius_custom_founder_image');
          resetFounderContext();
        }
      } catch {
        // ignore
      }

      const defaultUrl = MEDIA_SLOTS[canonical]?.defaultUrl || '';
      setUrls((prev) => ({
        ...prev,
        [canonical]: defaultUrl,
      }));

      setCustomSlots((prev) => ({
        ...prev,
        [canonical]: false,
      }));
    },
    [resolveKey, resetFounderContext]
  );

  /**
   * Resets all media back to original defaults
   */
  const resetAllMedia = useCallback(async (): Promise<void> => {
    try {
      const db = await openBrandMediaDB();
      const tx = db.transaction(BRAND_MEDIA_STORE, 'readwrite');
      tx.objectStore(BRAND_MEDIA_STORE).clear();
    } catch {
      // ignore
    }

    try {
      ALL_CANONICAL_SLOT_KEYS.forEach((k) => {
        localStorage.removeItem(`${STORAGE_PREFIX}${k}`);
      });
      localStorage.removeItem('genius_custom_founder_image');
      resetFounderContext();
    } catch {
      // ignore
    }

    const resetMap: Record<string, string> = {};
    const resetCustom: Record<string, boolean> = {};
    ALL_CANONICAL_SLOT_KEYS.forEach((k) => {
      resetMap[k] = MEDIA_SLOTS[k]?.defaultUrl || '';
      resetCustom[k] = false;
    });

    setUrls(resetMap);
    setCustomSlots(resetCustom);
  }, [resetFounderContext]);

  /**
   * Export all custom replaced images as a JSON package
   */
  const exportImageBackup = useCallback((): string => {
    const exportData: {
      exportedAt: string;
      customImages: Record<string, string>;
    } = {
      exportedAt: new Date().toISOString(),
      customImages: {},
    };

    Object.keys(customSlots).forEach((k) => {
      if (customSlots[k] && urls[k]) {
        exportData.customImages[k] = urls[k];
      }
    });

    return JSON.stringify(exportData, null, 2);
  }, [customSlots, urls]);

  /**
   * Import previously exported image package
   */
  const importImageBackup = useCallback(
    async (jsonString: string): Promise<number> => {
      const parsed = JSON.parse(jsonString);
      const customImages = parsed.customImages || parsed;
      if (!customImages || typeof customImages !== 'object') {
        throw new Error('Invalid backup file format.');
      }

      const items: Array<{ slotKey: string; dataUrl: string }> = [];
      Object.keys(customImages).forEach((k) => {
        if (typeof customImages[k] === 'string') {
          items.push({ slotKey: k, dataUrl: customImages[k] });
        }
      });

      const { successCount } = await batchReplaceMedia(items);
      return successCount;
    },
    [batchReplaceMedia]
  );

  const openReplaceModal = useCallback((slotKey: MediaSlotKey = 'logo') => {
    setActiveModalSlot(slotKey);
    setIsReplaceModalOpen(true);
  }, []);

  const closeReplaceModal = useCallback(() => {
    setIsReplaceModalOpen(false);
  }, []);

  const customSlotsCount = useMemo(() => {
    return Object.values(customSlots).filter(Boolean).length;
  }, [customSlots]);

  const totalSlotsCount = ALL_CANONICAL_SLOT_KEYS.length;

  return (
    <BrandMediaContext.Provider
      value={{
        logoUrl: urls.logo || MEDIA_SLOTS.logo.defaultUrl,
        academyLogoUrl: urls.academyLogo || MEDIA_SLOTS.academyLogo.defaultUrl,
        heroUrl: urls.hero || MEDIA_SLOTS.hero.defaultUrl,
        founderUrl: urls.founder || MEDIA_SLOTS.founder.defaultUrl,
        farmUrl: urls.corporateFarmFacility || MEDIA_SLOTS.corporateFarmFacility.defaultUrl,
        productUrl: urls.commercialMozzarella || MEDIA_SLOTS.commercialMozzarella.defaultUrl,
        mediaUrls: urls,
        getImage,
        isCustomLogo: Boolean(customSlots.logo),
        customSlots,
        customSlotsCount,
        totalSlotsCount,
        replaceMediaFromFile,
        replaceMediaFromDataUrl,
        batchReplaceMedia,
        resetMediaSlot,
        resetAllMedia,
        exportImageBackup,
        importImageBackup,
        isReplaceModalOpen,
        activeModalSlot,
        openReplaceModal,
        closeReplaceModal,
      }}
    >
      {children}
    </BrandMediaContext.Provider>
  );
};

export function useBrandMedia(): BrandMediaContextType {
  const context = useContext(BrandMediaContext);
  if (!context) {
    throw new Error('useBrandMedia must be used within a BrandMediaProvider');
  }
  return context;
}

/**
 * Returns an reactive dictionary of all site images, where any customized/uploaded image
 * replaces the default stock image automatically.
 */
export function useSiteImages(): typeof IMAGES & { getImage: (key: string) => string } {
  const { getImage, mediaUrls } = useBrandMedia();
  return useMemo(() => {
    const dynamicImages: Record<string, string> = { ...IMAGES };
    Object.keys(IMAGES).forEach((key) => {
      dynamicImages[key] = getImage(key);
    });
    return Object.assign(dynamicImages, { getImage }) as unknown as typeof IMAGES & {
      getImage: (key: string) => string;
    };
  }, [getImage, mediaUrls]);
}
