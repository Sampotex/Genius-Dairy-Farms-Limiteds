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
  academyLogo: ACADEMY_LOGO_BASE64, // Official Genius Dairy Farms Academy circular emblem logo

  // Hero & Overview
  heroDairyCattle:
    'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=2000&q=85', // Healthy dairy cattle in green field
  corporateFarmFacility:
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=80', // Vast green pasture landscape
  farmPanorama:
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1600&q=80', // Cattle grazing in sunlight

  // Cattle & Genetics
  crossbreedCattle: '/1200x794.jpg', // High-yield dairy cow at Iseyin farm
  defaultInsightFallback: '/1200x794.jpg', // Guaranteed local fallback image for insights
  grazingHerd:
    'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=1200&q=80', // Pastoral livestock
  cattleCare:
    'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=1200&q=80', // Farmer caring for cattle

  // Operations & Milking
  modernMilking:
    'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=1200&q=80', // Farm production
  freshMilkPour:
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=80', // Fresh wholesome milk
  hygienicFacility:
    'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80', // Clean production facility

  // Pasture & Land
  lushPasture:
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80', // Rolling green farmland
  pastureManagement:
    'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80', // Fodder and grasses

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
  trainingField:
    'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80', // Agricultural instruction
  studentGroup:
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80', // Young African professionals learning
  handsOnDemonstration:
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80', // Field demonstration

  // Sustainability & Ecosystem
  sustainabilityLandscape:
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=80', // Natural ecosystem & trees
  solarAndCleanWater:
    'https://images.unsplash.com/photo-1508873696983-2df570364425?auto=format&fit=crop&w=1200&q=80', // Clean agricultural stewardship

  // Founder & Leadership Representation
  founderPortrait: FOUNDER_IMAGE_BASE64, // Founder & Managing Director Moyosore Olatunde Rafiu at the dairy farm

  // Drone & Aerial "Eagle View"
  eagleViewFarm: '/eagle-view-farm.jpg', // Eagle aerial drone view of Genius Dairy Farm in Iseyin, Oyo State
  dairyBarnAerial: '/dairy-barn-aerial.jpg', // High angle aerial of cattle barn & paddocks

  // Legal & Corporate Affairs Commission (CAC) Registration
  cacCertificate: CAC_CERTIFICATE_BASE64, // Official CAC Certificate of Incorporation
};
