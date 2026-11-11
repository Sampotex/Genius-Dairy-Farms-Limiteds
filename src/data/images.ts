/**
 * Image Registry for Genius Dairy Farms Limited
 * High-resolution imagery representing commercial dairy farming, pasture,
 * cattle genetics, Udderfall dairy foods, and agricultural training.
 * To replace with verified company media, simply update these URLs.
 */
import { FOUNDER_IMAGE_BASE64 } from './founderImageFallback';
import { CAC_CERTIFICATE_BASE64 } from './cacCertificateFallback';
import { ACADEMY_LOGO_BASE64 } from './academyLogoFallback';

export const IMAGES = {
  // Brand & Identity
  logo: '/logo.jpg', // Official Genius Dairy Farms Limited circular emblem logo
  geniusDairyLogo: '/genius-dairy-logo.jpg',
  academyLogo: '/academy-logo.jpg', // Official Genius Dairy Academy Limited circular emblem logo
  academyLogoFallback: ACADEMY_LOGO_BASE64,

  // Hero & Overview
  heroDairyCattle: '/hero.jpg', // Official Farm Pasture and herd hero
  corporateFarmFacility: '/corporateFarmFacility.jpg', // 60-Acre Dairy Complex headquarters
  farmPanorama: '/farmPanorama.jpg', // Cattle grazing in sunlight panorama

  // Cattle & Genetics
  crossbreedCattle: '/1200x794.jpg', // High-yield dairy cow at Iseyin farm
  defaultInsightFallback: '/insight-yield-transformation.jpg', // Guaranteed local fallback image for insights

  // Insights & Technical News Articles (Permanently stored)
  insightYield: '/insight-yield-transformation.jpg',
  insightSilage: '/insight-silage-pasture.jpg',
  insightMilestone: '/insight-ddp-milestone.jpg',
  insightEducation: '/insight-youth-education.jpg',
  insightPolicy: '/insight-dairy-policy.jpg',
  grazingHerd: '/grazingHerd.jpg', // Pastoral livestock grazing herd in lush savanna
  cattleCare: '/cattleCare.jpg', // Herd health care & veterinary monitoring

  // Operations & Milking
  modernMilking: '/hygienicFacility.jpg', // Sanitary production facility
  freshMilkPour:
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=80', // Wholesome fresh farm dairy production
  hygienicFacility: '/hygienicFacility.jpg', // Clean production facility

  // Pasture & Land
  lushPasture: '/lushPasture.jpg', // Lush Nigerian savanna pasture and high-tonnage forage
  pastureManagement: '/pastureManagement.jpg', // Intensive pasture & silage conservation

  // Udderfall Products
  udderfallYogurtHero:
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80', // Premium artisan yogurt
  udderfallCheeseHero:
    'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1200&q=80', // Fresh artisanal cheese & curds
  greekYogurtBowl:
    'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=1000&q=80', // Nutritious yogurt
  freshWaraCheese:
    'https://images.unsplash.com/photo-1634487359989-3e90c9432133?auto=format&fit=crop&w=1000&q=80', // Fresh curd cheese blocks
  commercialMozzarella:
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80', // Perfect Mozzarella melt and stretch on pizza
  mozzarellaBlock:
    'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&w=1000&q=80', // Fresh mozzarella cheese blocks & shreds
  strawberryYogurt:
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1000&q=80', // Refreshing strawberry dairy yogurt
  vanillaYogurt:
    'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1000&q=80', // Natural aromatic vanilla dairy
  foodServiceKitchen:
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', // Restaurant and food service commercial application

  // Academy & Capacity Development
  trainingField: '/insight-youth-education.jpg', // Agricultural training field
  studentGroup: '/academy-logo.jpg', // Official Genius Dairy Academy Limited emblem logo
  handsOnDemonstration: '/insight-youth-education.jpg', // Practical field demonstration & artificial insemination

  // Sustainability & Ecosystem
  sustainabilityLandscape: '/sustainabilityLandscape.jpg', // Natural agro-ecological landscape
  solarAndCleanWater: '/solarAndCleanWater.jpg', // Clean solar and borehole water infrastructure

  // Founder & Leadership Representation
  founderPortrait: '/founder.jpg', // Founder & Managing Director Moyosore Olatunde Rafiu at the dairy farm

  // Drone & Aerial "Eagle View"
  eagleViewFarm: '/eagle-view-farm.jpg', // Eagle aerial drone view of Genius Dairy Farm in Iseyin, Oyo State
  dairyBarnAerial: '/dairy-barn-aerial.jpg', // High angle aerial of cattle barn & paddocks

  // Legal & Corporate Affairs Commission (CAC) Registration
  cacCertificate: '/cac-certificate.jpg', // Official CAC Certificate of Incorporation
};
