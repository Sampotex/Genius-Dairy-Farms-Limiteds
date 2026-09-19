import {
  TimelineMilestone,
  PlatformInfo,
  ProductItem,
  AcademyProgram,
  InsightArticle,
  GalleryPhoto,
} from '../types';
import { IMAGES } from './images';

export const COMPANY_DETAILS = {
  name: 'Genius Dairy Farms Limited',
  formerName: 'Genius Integrated Farms',
  founder: 'Moyosore Olatunde Rafiu',
  email: 'genuisdairies@gmail.com',
  phone: '+234 803 580 5908',
  phoneTel: 'tel:+2348035805908',
  whatsappUrl: 'https://wa.me/2348035805908',
  address: 'Kilometer 4, Olora Village, along the Iseyin–Ibadan Expressway, Iseyin, Oyo State, Nigeria.',
  facilitySize: '60-Acre Dairy Development Facility',
  state: 'Oyo State',
  country: 'Nigeria',
  coordinates: { lat: 7.9625, lng: 3.5936 }, // Iseyin region
};

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '2009',
    title: 'The Beginning',
    subtitle: 'From Family Herd to Formal Enterprise',
    description:
      "The journey began when our founder, Moyosore Olatunde Rafiu, started rearing cattle after gaining experience caring for his father's herd during his secondary school years. Shortly after graduating, he established Genius Integrated Farms on five acres of land with five cows.",
    badge: 'Foundation',
  },
  {
    year: 'Early Years',
    title: 'Traditional Livestock Production',
    subtitle: 'Local Meat & Dairy Realities',
    description:
      'The farm initially focused largely on traditional livestock practices and cattle fattening for meat. Milk production averaged approximately 1–1.5 litres per cow per day. The farm also processed and sold traditional dairy products such as nunu and wara within Iseyin and surrounding communities.',
    badge: 'Initial Operations',
  },
  {
    year: '2014',
    title: 'The Turning Point',
    subtitle: 'Dairy Development Programme (DDP)',
    description:
      'The farm became a beneficiary of the Dairy Development Programme (DDP) supported by FrieslandCampina WAMCO Nigeria PLC. Through technical support, training and exposure to modern dairy practices, the farm began transitioning from traditional cattle rearing toward a more specialized and commercially focused dairy operation.',
    badge: 'Strategic Pivot',
  },
  {
    year: 'Genetic Transformation',
    title: 'Improving Dairy Productivity',
    subtitle: 'Artificial Insemination & Crossbreeding',
    description:
      'One of the most significant developments was the introduction of artificial insemination and improved cattle genetics. The farm began crossbreeding indigenous cattle with Holstein Friesian genetics to produce animals better suited for higher milk production.',
    badge: 'Biotechnology',
  },
  {
    year: 'Today',
    title: 'A Modern Dairy Enterprise',
    subtitle: '60-Acre Integrated Ecosystem',
    description:
      'Today, Genius Dairy Farms Limited operates from a 60-acre facility dedicated to sustainable livestock and dairy development. The company continues to invest in improved animal nutrition, pasture management, herd health, hygiene and modern dairy production systems.',
    badge: 'Commercial Scale',
  },
];

export const THREE_PLATFORMS: PlatformInfo[] = [
  {
    id: 'farms',
    name: 'Genius Dairy Farms',
    tagline: 'Commercial Dairy & Livestock Development',
    description:
      'Developing a sustainable model for modern commercial dairy ranching in Nigeria through genetic improvement, structured pasture management, and high-standard herd care.',
    highlights: [
      'Crossbred dairy herd adapted to Nigerian ecology',
      'Regenerative pasture and forage production systems',
      'Modern mechanized milking and strict hygiene protocols',
      'Veterinary herd management and preventive nutrition',
    ],
    ctaText: 'Explore Our Farm',
    targetPage: 'farm',
    badge: 'Production & Genetics',
  },
  {
    id: 'udderfall',
    name: 'Udderfall Yogurt & Cheese',
    tagline: 'From Quality Milk to Quality Products',
    description:
      'Transforming quality milk into nutritious and enjoyable yogurt and cheese for consumers and the wider dairy market, setting benchmark standards for local value addition.',
    highlights: [
      'Pure fresh whole milk source from our own facility',
      'Artisanal stirred & Greek-style yogurts',
      'Fresh farm wara and matured artisanal cheese varieties',
      'Transparent dairy cold-chain and distribution network',
    ],
    ctaText: 'Discover Udderfall',
    targetPage: 'udderfall',
    badge: 'Consumer Brand',
  },
  {
    id: 'academy',
    name: 'Genius Dairy Farm Academy',
    tagline: 'Knowledge. Skills. Opportunity.',
    description:
      'Providing practical dairy and agribusiness education for farmers, students, entrepreneurs and agricultural professionals seeking actionable livestock expertise.',
    highlights: [
      'Hands-on field training in commercial dairy operations',
      'Artificial insemination and herd genetics clinics',
      'Pasture agronomy and silage conservation courses',
      'Structured internships and young agropreneur bootcamps',
    ],
    ctaText: 'Explore the Academy',
    targetPage: 'academy',
    badge: 'Capacity Building',
  },
];

export const CORE_VALUES = [
  {
    title: 'Innovation & Excellence',
    description:
      'Pioneering the commercialization of dairy farming in Southwest Nigeria through improved genetics, technology and continuous improvement.',
  },
  {
    title: 'Empowerment & Education',
    description:
      'Equipping next-generation farmers, students and agropreneurs with modern livestock management and agribusiness skills.',
  },
  {
    title: 'Sustainability & Partnership',
    description:
      'Strengthening Nigeria’s local dairy ecosystem through responsible production and strategic long-term partnerships.',
  },
  {
    title: 'Integrity & Hospitality',
    description:
      'Maintaining an open-door approach to agricultural development through professional, transparent and welcoming engagement.',
  },
];

export const IMPACT_AREAS = [
  {
    title: 'Local Dairy Production',
    description:
      'Strengthening domestic milk production to reduce reliance on imported dairy powder and revitalize regional supply.',
  },
  {
    title: 'Employment',
    description:
      'Creating meaningful agricultural and economic opportunities for rural communities, farm technicians, and dairy specialists.',
  },
  {
    title: 'Skills Development',
    description:
      'Building local expertise and practical agricultural knowledge through hands-on apprenticeships and academy training.',
  },
  {
    title: 'Innovation',
    description:
      'Demonstrating modern dairy technologies, artificial insemination, and optimized forage production suited to tropical climates.',
  },
  {
    title: 'Food Security',
    description:
      'Contributing to Nigeria’s long-term food and economic security through sustainable, nutrient-dense animal protein.',
  },
];

export const UDDERFALL_PRODUCTS: ProductItem[] = [
  {
    id: 'premium-stirred-yogurt',
    name: 'Udderfall Fresh Stirred Yogurt',
    category: 'yogurt',
    subtitle: 'Naturally Cultured Whole Milk Yogurt',
    description:
      'Crafted entirely from fresh farm milk sourced right at our Iseyin facility. Rich, velvety, and naturally packed with gut-healthy live probiotic cultures.',
    features: ['100% Fresh Farm Milk', 'No Artificial Preservatives', 'Plain Unsweetened & Lightly Sweetened', 'Rich in Calcium & Live Cultures'],
    packaging: 'Available in 500ml bottles and 1L family tubs',
    image: IMAGES.udderfallYogurtHero,
  },
  {
    id: 'greek-style-yogurt',
    name: 'Udderfall High-Protein Greek Yogurt',
    category: 'yogurt',
    subtitle: 'Thick, Creamy & Protein-Dense',
    description:
      'Slow-strained for luxurious thickness and exceptional nutritional density. Ideal for breakfast bowls, smoothies, culinary dips, and fitness-conscious lifestyles.',
    features: ['Triple-Strained Density', 'High Natural Protein Content', 'Smooth Velvety Texture', 'Zero Added Starch or Thickeners'],
    packaging: 'Available in 250g and 500g tubs',
    image: IMAGES.greekYogurtBowl,
  },
  {
    id: 'fresh-farm-wara',
    name: 'Udderfall Artisan Fresh Cheese (Wara)',
    category: 'cheese',
    subtitle: 'The Nigerian Heritage Cheese Perfected',
    description:
      'A refined, hygienic evolution of traditional wara made from pure fresh milk. Mild, creamy, and versatile for grilling, stews, salads, or snacking.',
    features: ['Made from 100% Whole Milk', 'Hygienically Crafted', 'Firm Structure Suitable for Cooking', 'Natural Protein Source'],
    packaging: 'Vacuum-sealed in 200g and 400g packs',
    image: IMAGES.freshWaraCheese,
  },
  {
    id: 'farmstead-semi-hard-cheese',
    name: 'Udderfall Farmstead Aged Cheese',
    category: 'cheese',
    subtitle: 'Locally Aged Semi-Hard Cheese',
    description:
      'Carefully cured under controlled conditions, developing an earthy, buttery depth of flavor suitable for slicing, charcuterie boards, and melting.',
    features: ['Aged Naturally', 'Distinct Savory Nuance', 'Rich Golden Hue', 'Small-Batch Handcrafted'],
    packaging: 'Available in 150g wedges and whole wheels upon institutional order',
    image: IMAGES.udderfallCheeseHero,
  },
];

export const ACADEMY_PROGRAMS: AcademyProgram[] = [
  {
    id: 'dairy-ranching-masterclass',
    title: 'Modern Commercial Dairy Ranching Masterclass',
    targetAudience: 'Farm owners, agropreneurs, commercial livestock managers',
    duration: '4 Weeks (Practical Intensive)',
    mode: 'On-Farm Residential & Weekend Executive',
    description:
      'Comprehensive immersion in establishing and running a profitable dairy unit in West Africa, covering infrastructure, animal genetics, daily operations, and financial planning.',
    modules: [
      'Commercial Dairy Facility Design & Shed Engineering',
      'Cattle Breeds, Selection & Crossbreeding Dynamics',
      'Daily Dairy Operations, Milking Routines & Milk Hygiene',
      'Enterprise Budgeting, Cold-Chain Logistics & Farm Record-Keeping',
    ],
    iconName: 'Building2',
  },
  {
    id: 'ai-genetics-clinic',
    title: 'Artificial Insemination & Bovine Genetics Clinic',
    targetAudience: 'Veterinary students, animal scientists, artificial insemination technicians',
    duration: '2 Weeks (Laboratory & Field Work)',
    mode: 'Hands-on Clinical Training',
    description:
      'Technical certification covering bovine reproductive anatomy, semen handling and liquid nitrogen storage, heat synchronization protocols, and successful insemination execution.',
    modules: [
      'Reproductive Anatomy & Estrus Synchronization Protocols',
      'Liquid Nitrogen & Cryopreserved Semen Management',
      'Step-by-Step Transcervical Insemination Practice',
      'Pregnancy Diagnosis & Post-Insemination Herd Care',
    ],
    iconName: 'Dna',
  },
  {
    id: 'pasture-agronomy',
    title: 'Pasture Agronomy, Fodder & Silage Systems',
    targetAudience: 'Forage managers, livestock farmers, agricultural extension officers',
    duration: '10 Days (Field Demonstration)',
    mode: 'Field Demonstration & Workshop',
    description:
      'Learn how to establish high-yielding forage banks, rotational grazing paddocks, and year-round nutritional security through proper silage production.',
    modules: [
      'Selection of High-Biomass Tropical Grasses & Legumes',
      'Paddock Layout, Fencing & Rotational Grazing Design',
      'Hay Baling & Anaerobic Silage Fermentation Techniques',
      'Dry-Season Total Mixed Ration (TMR) Formulations',
    ],
    iconName: 'Sprout',
  },
  {
    id: 'youth-agropreneur',
    title: 'Youth Agropreneurship & Dairy Value Addition',
    targetAudience: 'Graduates, youth agri-innovators, food processing startups',
    duration: '3 Weeks (Incubation Style)',
    mode: 'Practicum & Dairy Processing Lab',
    description:
      'Bridging the gap between raw milk production and consumer retail products with hands-on yogurt preparation, cheese making, packaging hygiene, and branding.',
    modules: [
      'Milk Testing, Acidity Measurement & Pasteurization',
      'Yogurt Inoculation, Incubation & Flavor Chemistry',
      'Curd Formation & Artisan Cheese Techniques',
      'Packaging Compliance, Branding & Route-to-Market',
    ],
    iconName: 'GraduationCap',
  },
];

export const INSIGHTS_POSTS: InsightArticle[] = [
  {
    id: 'yield-transformation-nigeria',
    title: 'Transforming Dairy Yields: Lessons from Moving from 1.5L to 15L Daily',
    category: 'Agricultural Education',
    date: 'February 2026',
    readTime: '6 min read',
    excerpt:
      'How strategic crossbreeding of indigenous cows with Holstein genetics, combined with structured nutrition, transforms dairy economics in Southwest Nigeria.',
    content: [
      'Indigenous cattle across West Africa have adapted over centuries to resist heat stress and local endemic challenges, but their genetic potential for milk production typically tops out at 1 to 2 litres per day.',
      'Through selective crossbreeding using artificial insemination with proven Holstein Friesian genetics, Genius Dairy Farms developed F1 and upgraded crossbreds that produce between 10 to 15 litres per day under our carefully managed environmental and nutritional regimes.',
      'Crucially, genetic improvement must be matched by high-protein forage, mineral supplementation, clean water ad libitum, and stress-free housing. When genetics and feed science align, commercial dairy in Nigeria becomes an exceptionally viable enterprise.',
    ],
    image: '/1200x794.jpg',
  },
  {
    id: 'silage-pasture-dry-season',
    title: 'Tackling the Dry Season: Year-Round Forage Strategies in Oyo State',
    category: 'Farm Updates',
    date: 'January 2026',
    readTime: '5 min read',
    excerpt:
      'How our 60-acre facility utilizes intensive paddock rotation and pit silage to maintain milk consistency through Nigeria’s dry months.',
    content: [
      'The single greatest obstacle facing Nigerian pastoralists has historically been seasonal forage depletion during dry periods, leading to cattle migration and production drop-offs.',
      'At Genius Dairy Farms in Iseyin, we established designated fodder banks featuring high-tonnage grasses and legumes harvested at peak nutritional maturity and preserved in bunker and pit silos.',
      'This guarantees that our milking herd receives consistent total mixed rations regardless of rainfall patterns, keeping yields stable and animals healthy all year round.',
    ],
    image: '/dairy-barn-aerial.jpg',
  },
  {
    id: 'ddp-frieslandcampina-turning-point',
    title: 'The Dairy Development Programme: A Benchmark for Commercial Transition',
    category: 'Milestones',
    date: 'November 2025',
    readTime: '7 min read',
    excerpt:
      'Reflecting on our 2014 turning point with the Dairy Development Programme supported by FrieslandCampina WAMCO Nigeria PLC.',
    content: [
      'When Genius Integrated Farms was selected as a beneficiary of the Dairy Development Programme (DDP) supported by FrieslandCampina WAMCO Nigeria PLC in 2014, the farm was operating as a smallholder setup.',
      'The technical training in hygienic milk handling, cold chain preservation, routine veterinary care, and genetic advancement laid the foundation for our evolution into today’s 60-acre corporate facility.',
      'Public-private collaborations and industry knowledge exchange remain crucial catalysts for scaling sustainable dairy across Nigeria.',
    ],
    image: '/founder-portrait.jpg',
  },
  {
    id: 'academy-empowering-youth',
    title: 'Why West Africa Needs a New Generation of Dairy Professionals',
    category: 'Agricultural Education',
    date: 'October 2025',
    readTime: '4 min read',
    excerpt:
      'Practical agriculture must replace purely theoretical education if we are to solve food security and dairy importation deficits.',
    content: [
      'Nigeria currently spends significant foreign exchange on importing dairy products, representing an enormous untapped market opportunity for domestic commercial operators.',
      'Through Genius Dairy Farm Academy, our mission is to empower young agropreneurs and animal science students with actual hands-on skills—from handling liquid nitrogen tanks to managing automated milking lines.',
      'When skilled youth enter modern agriculture, productivity expands and sustainable rural economies flourish.',
    ],
    image: '/eagle-view-farm.jpg',
  },
];

export const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    id: 'g-0',
    title: 'Eagle View of Genius Dairy Farm, Iseyin',
    category: 'Pasture & Facility',
    image: IMAGES.eagleViewFarm,
    caption: 'Aerial drone perspective surveying the expansive ranch paddocks, cattle barns, and savanna landscape in Oyo State.',
  },
  {
    id: 'g-0b',
    title: 'Covered Dairy Barn & Corral Paddocks',
    category: 'Pasture & Facility',
    image: IMAGES.dairyBarnAerial,
    caption: 'High-angle aerial capture of the sheltered housing, feed mangers, and shaded resting paddocks for the dairy herd.',
  },
  {
    id: 'g-1',
    title: 'Crossbred Dairy Cattle in Green Pasture',
    category: 'Livestock & Genetics',
    image: IMAGES.crossbreedCattle,
    caption: 'Adapted Holstein-cross cattle enjoying rotational grazing at our 60-acre Iseyin farm.',
  },
  {
    id: 'g-2',
    title: '60-Acre Dairy Development Facility',
    category: 'Pasture & Facility',
    image: IMAGES.corporateFarmFacility,
    caption: 'Vast, well-fenced paddocks designed for regenerative grazing and animal welfare.',
  },
  {
    id: 'g-3',
    title: 'Modern Milking & Milk Quality Protocols',
    category: 'Milking & Operations',
    image: IMAGES.freshMilkPour,
    caption: 'Hygienic collection of fresh whole milk following strict standards.',
  },
  {
    id: 'g-4',
    title: 'Hands-on Dairy Academy Cohort',
    category: 'Academy & Training',
    image: IMAGES.studentGroup,
    caption: 'Next-generation farmers and students gaining real-world commercial dairy experience.',
  },
  {
    id: 'g-5',
    title: 'Healthy Grazing Herd at Sunrise',
    category: 'Livestock & Genetics',
    image: IMAGES.grazingHerd,
    caption: 'Our herd represents years of disciplined genetic improvement and nutrition.',
  },
  {
    id: 'g-6',
    title: 'Udderfall Dairy Value Addition',
    category: 'Milking & Operations',
    image: IMAGES.udderfallYogurtHero,
    caption: 'Turning farm-fresh milk into wholesome yogurt and artisanal cheeses.',
  },
];
