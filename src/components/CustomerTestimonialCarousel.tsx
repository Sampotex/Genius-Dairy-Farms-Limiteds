import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  Building2,
  MapPin,
  Sparkles,
} from 'lucide-react';

export interface TestimonialReview {
  id: string;
  author: string;
  role: string;
  company: string;
  location: string;
  category: 'Pizzerias & Restaurants' | 'Retail & Supermarkets' | 'Hotels & Caterers' | 'Consumers';
  product: string;
  rating: number;
  reviewTitle: string;
  comment: string;
  date: string;
  verified: boolean;
}

const TESTIMONIALS_DATA: TestimonialReview[] = [
  {
    id: 'rev-1',
    author: 'Chef Tunde Balogun',
    role: 'Head Pizzaiolo & Co-Owner',
    company: 'Napoli Wood-Fired Pizzeria',
    location: 'Victoria Island, Lagos',
    category: 'Pizzerias & Restaurants',
    product: 'Udderfall Commercial Mozzarella (Block & Shred)',
    rating: 5,
    reviewTitle: 'Exceptional stretch and blister without excessive oil pooling',
    comment:
      'We tested Udderfall Mozzarella against expensive European imports for our 450°C wood stone oven. The blistering is golden, the moisture balance is spot on, and the stretch is phenomenal. Our customers noticed the fresher dairy sweetness immediately.',
    date: 'February 2026',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Mrs. Folashade Adeyemi',
    role: 'Category Procurement Director',
    company: 'PrimeMart Supermarket Chain',
    location: 'Ibadan & Abeokuta',
    category: 'Retail & Supermarkets',
    product: 'Udderfall Natural Greek & Sweetened Yogurt',
    rating: 5,
    reviewTitle: 'Fastest sell-through rate in our dairy chillers',
    comment:
      'Stocking Udderfall yogurt has been a game-changer. The clean label with zero gelatin thickeners speaks directly to our health-conscious shoppers. Restocking is dependable thanks to their dedicated cold-chain deliveries directly from Iseyin.',
    date: 'January 2026',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Executive Chef David Okon',
    role: 'Director of Food & Beverage',
    company: 'Grand Horizon Luxury Hotel',
    location: 'Ikoyi, Lagos',
    category: 'Hotels & Caterers',
    product: 'Udderfall Artisan Fresh Cheese & Whole Milk Yogurt',
    rating: 5,
    reviewTitle: 'Our breakfast buffet favorite and salad bar centerpiece',
    comment:
      'The fresh wara curds and Greek yogurt at our daily breakfast buffet receive constant guest compliments. The velvety texture and authentic farm-fresh taste prove that Nigeria can produce world-class dairy right here in Oyo State.',
    date: 'February 2026',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Amina Bello',
    role: 'Mother of Three & Food Blogger',
    company: 'CleanEatingNigeria',
    location: 'Abuja FCT',
    category: 'Consumers',
    product: 'Udderfall Real Strawberry & Madagascar Vanilla Yogurt',
    rating: 5,
    reviewTitle: 'Real fruit flavor and thick texture that my kids love',
    comment:
      'Most supermarket yogurts are loaded with cornstarch and synthetic flavorings. Udderfall tastes like authentic strained whole milk with real strawberries. It has become a permanent staple in our home refrigerator.',
    date: 'March 2026',
    verified: true,
  },
  {
    id: 'rev-5',
    author: 'Babajide Alabi',
    role: 'Operations Director',
    company: 'Sizzler Fast-Casual Chain',
    location: 'Lekki & Ikeja, Lagos',
    category: 'Pizzerias & Restaurants',
    product: 'Udderfall Shredded Mozzarella (2kg Foodservice Pack)',
    rating: 5,
    reviewTitle: 'Reliable melt time and significant cost savings over imported cheese',
    comment:
      'Switching to Udderfall reduced our cheese input costs by nearly 25% while improving consistency across all 6 branch locations. The pre-shredded packs save kitchen prep time, and customer feedback on our cheese melts has been 100% positive.',
    date: 'January 2026',
    verified: true,
  },
  {
    id: 'rev-6',
    author: 'Dr. (Mrs.) Yinka Olufemi',
    role: 'Nutritionist & Wellness Consultant',
    company: 'Vitality Health Clinic',
    location: 'Bodija, Ibadan',
    category: 'Consumers',
    product: 'Udderfall Pure Unsweetened Greek-Style Yogurt',
    rating: 5,
    reviewTitle: 'Gut-friendly probiotics and zero added sugar',
    comment:
      'I routinely recommend Udderfall plain yogurt to patients managing metabolic health and digestive wellbeing. The active live cultures and pure cow milk protein profile provide genuine nourishment without hidden additives.',
    date: 'February 2026',
    verified: true,
  },
];

const CATEGORIES = [
  'All Reviews',
  'Pizzerias & Restaurants',
  'Retail & Supermarkets',
  'Hotels & Caterers',
  'Consumers',
] as const;

type CategoryFilter = typeof CATEGORIES[number];

export const CustomerTestimonialCarousel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All Reviews');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const filteredReviews =
    selectedCategory === 'All Reviews'
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((item) => item.category === selectedCategory);

  // Reset index if out of bounds after filtering
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredReviews.length);
  }, [filteredReviews.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length);
  }, [filteredReviews.length]);

  // Auto-play carousel every 6 seconds unless paused
  useEffect(() => {
    if (isPaused || filteredReviews.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, filteredReviews.length, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const currentReview = filteredReviews[currentIndex] || filteredReviews[0];

  return (
    <section
      id="customer-reviews-carousel"
      className="py-20 sm:py-28 bg-[#FBFBFA] border-t border-[#E5E2D9] relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#143727_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#143727]/10 text-[#143727] text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-[#C89D4B] text-[#C89D4B]" />
              <span>Customer Reviews & Case Studies</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A18] tracking-tight leading-tight">
              What Chefs, Retailers & Families Say
            </h2>
            <p className="text-sm sm:text-base text-[#525F58] mt-3 max-w-2xl leading-relaxed">
              Real feedback from commercial kitchens, procurement directors, and households across Nigeria experiencing Udderfall pure dairy products.
            </p>
          </div>

          {/* Quick Rating Summary */}
          <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-[#D5D2C8] shadow-sm shrink-0">
            <div className="text-center border-r border-[#E5E2D9] pr-5">
              <div className="font-heading font-extrabold text-2xl text-[#143727]">4.9 / 5</div>
              <div className="flex items-center gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C89D4B] text-[#C89D4B]" />
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#151A18]">98% Recommend</div>
              <div className="text-xs text-[#66726B] mt-0.5">Based on 120+ wholesale & retail clients</div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#143727] text-white shadow-sm'
                    : 'bg-white text-[#525F58] hover:bg-[#F2EFE9] border border-[#D5D2C8]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Carousel Viewport Box */}
        <div
          className="relative bg-white rounded-3xl border border-[#D5D2C8] shadow-md p-6 sm:p-10 lg:p-12 transition-all"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Top Review Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E2D9] pb-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C89D4B] text-[#C89D4B]" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#143727] bg-[#143727]/10 px-3 py-1 rounded-full border border-[#143727]/20">
                    {currentReview.rating}.0 • Outstanding
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#4A554F] bg-[#F2EFE9] px-3.5 py-1.5 rounded-xl border border-[#D5D2C8]">
                    {currentReview.product}
                  </span>
                  {currentReview.verified && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D6A4F] bg-[#2D6A4F]/10 px-3 py-1.5 rounded-xl border border-[#2D6A4F]/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Review</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Quote & Review Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <Quote className="w-10 h-10 text-[#C89D4B]/30" />
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#151A18] leading-snug">
                    “{currentReview.reviewTitle}”
                  </h3>
                  <p className="text-base sm:text-lg text-[#4A554F] leading-relaxed italic font-serif">
                    “{currentReview.comment}”
                  </p>
                </div>

                {/* Author Profile Information */}
                <div className="lg:col-span-4 bg-[#FBFBFA] p-6 sm:p-7 rounded-2xl border border-[#D5D2C8] space-y-4 shadow-sm">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-[#143727] text-[#C89D4B] font-heading font-extrabold text-xl flex items-center justify-center shrink-0 border border-[#2D6A4F] shadow-sm">
                      {currentReview.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base sm:text-lg text-[#151A18]">
                        {currentReview.author}
                      </h4>
                      <p className="text-xs font-semibold text-[#2D6A4F]">
                        {currentReview.role}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5E2D9] space-y-2 text-xs text-[#525F58]">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#143727] shrink-0" />
                      <span className="font-bold text-[#151A18]">{currentReview.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C89D4B] shrink-0" />
                      <span>{currentReview.location}</span>
                    </div>
                    <div className="text-[11px] text-[#7A8881] pt-1">
                      Reviewed: {currentReview.date}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Carousel Controls & Pagination */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-[#E5E2D9]">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {filteredReviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  title={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 bg-[#143727]'
                      : 'w-2 bg-[#D5D2C8] hover:bg-[#8FA397]'
                  }`}
                />
              ))}
              <span className="text-xs font-medium text-[#7A8881] ml-3">
                {currentIndex + 1} of {filteredReviews.length}
              </span>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                title="Previous Review"
                aria-label="Previous Review"
                className="p-3 rounded-xl bg-[#F2EFE9] hover:bg-[#143727] text-[#143727] hover:text-white border border-[#D5D2C8] hover:border-[#143727] transition-all cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                title="Next Review"
                aria-label="Next Review"
                className="p-3 rounded-xl bg-[#F2EFE9] hover:bg-[#143727] text-[#143727] hover:text-white border border-[#D5D2C8] hover:border-[#143727] transition-all cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Small Trust Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-4 border-t border-[#E5E2D9] text-center">
          <div className="p-4 bg-white rounded-2xl border border-[#D5D2C8] shadow-xs">
            <div className="text-xs font-bold text-[#143727] uppercase tracking-wider">100% Whole Milk</div>
            <div className="text-xs text-[#66726B] mt-1">Directly from Iseyin dairy herd</div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-[#D5D2C8] shadow-xs">
            <div className="text-xs font-bold text-[#143727] uppercase tracking-wider">Zero Artificial Thickeners</div>
            <div className="text-xs text-[#66726B] mt-1">Clean food label & live probiotics</div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-[#D5D2C8] shadow-xs">
            <div className="text-xs font-bold text-[#143727] uppercase tracking-wider">Foodservice Mozzarella</div>
            <div className="text-xs text-[#66726B] mt-1">Engineered for high-heat pizza ovens</div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-[#D5D2C8] shadow-xs">
            <div className="text-xs font-bold text-[#143727] uppercase tracking-wider">Cold-Chain Delivery</div>
            <div className="text-xs text-[#66726B] mt-1">Reliable refrigerated logistics</div>
          </div>
        </div>
      </div>
    </section>
  );
};
