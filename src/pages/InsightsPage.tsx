import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  X,
} from 'lucide-react';
import { PageId, InsightArticle } from '../types';
import { INSIGHTS_POSTS } from '../data/companyData';
import {
  getCustomInsightImages,
  loadCustomInsightImagesAsync,
} from '../utils/insightsImageStorage';

interface InsightsPageProps {
  onNavigate: (page: PageId) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate: _onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});

  // Load custom insight images on mount and listen for any updates
  // Keeps the user's uploaded images fully intact and preserved
  useEffect(() => {
    // 1. Initial fast sync read from localStorage
    setCustomImages(getCustomInsightImages());

    // 2. Async read from IndexedDB to ensure durable images are retrieved
    loadCustomInsightImagesAsync().then((imgs) => {
      if (imgs && Object.keys(imgs).length > 0) {
        setCustomImages((prev) => ({ ...prev, ...imgs }));
      }
    });

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.all) {
        setCustomImages({});
      } else if (customEvent.detail?.articleId && customEvent.detail?.dataUrl) {
        const { articleId, dataUrl } = customEvent.detail;
        setCustomImages((prev) => ({ ...prev, [articleId]: dataUrl }));
      } else if (customEvent.detail?.articleId) {
        setCustomImages(getCustomInsightImages());
      }
    };

    window.addEventListener('genius-insights-image-updated', handleUpdate);
    return () => {
      window.removeEventListener('genius-insights-image-updated', handleUpdate);
    };
  }, []);

  const categories = [
    'All',
    'Farm Updates',
    'Industry News',
    'Agricultural Education',
    'Milestones',
  ];

  const filteredPosts = INSIGHTS_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Resolves the current image (defaulting reliably to 1200x794.jpg)
  const getArticleImage = (post: InsightArticle): string => {
    const custom = customImages[post.id];
    if (custom && (custom.startsWith('data:image/') || custom.startsWith('http') || custom.startsWith('/'))) {
      return custom;
    }
    return post.image || '/1200x794.jpg';
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-[#0D261B] text-white py-20 sm:py-24 border-b border-[#1C3A2B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-4">
            <div className="inline-block px-3 py-1 bg-[#163B29] text-[#C89D4B] text-xs font-semibold uppercase tracking-widest rounded-xs">
              Knowledge & Updates
            </div>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
            Genius Dairy Farms Insights
          </h1>
          <p className="text-base sm:text-lg text-[#CBDDD2] max-w-2xl mt-4 leading-relaxed">
            Technical perspectives on commercial dairy ranching, cattle breeding breakthroughs, forage science, and agribusiness education in Nigeria.
          </p>
        </div>
      </section>

      {/* Main Content & Controls */}
      <section className="py-16 sm:py-24 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter and Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-10 mb-10 border-b border-[#EAE7DE]">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#143727] text-white shadow-xs'
                      : 'bg-white text-[#525F58] hover:bg-[#EAE7DE] border border-[#D5D1C4]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-[#8A968F] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles & updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
              />
            </div>
          </div>

          {/* Article Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                const currentImg = getArticleImage(post);

                return (
                  <article
                    key={post.id}
                    onClick={() => setActiveArticle(post)}
                    className="bg-white rounded-2xl border border-[#E0DDD5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer relative"
                  >
                    <div>
                      <div className="h-56 overflow-hidden relative bg-[#0D261B]/10">
                        <img
                          src={currentImg}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Guaranteed fallback to local farm photo if an external link fails
                            const target = e.currentTarget;
                            if (target.src !== window.location.origin + '/1200x794.jpg') {
                              target.src = '/1200x794.jpg';
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 z-10 bg-[#143727]/90 text-[#C89D4B] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                          {post.category}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 text-[11px] text-[#7A8780] mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-lg text-[#151A18] group-hover:text-[#143727] transition-colors line-clamp-2 mb-2 leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-xs text-[#525F58] leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#143727] group-hover:text-[#C89D4B] transition-colors inline-flex items-center gap-1.5">
                        <span>Read Full Insight</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center text-[#7A8780] bg-white rounded-2xl border border-[#E0DDD5]">
              <p className="text-sm">No insights found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-bold text-[#143727] uppercase tracking-wider underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white border border-[#D5D1C4] max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="bg-[#143727] text-white p-6 relative shrink-0">
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-5 right-5 text-white/70 hover:text-white p-1 cursor-pointer"
                aria-label="Close article reader"
              >
                <X className="w-6 h-6" />
              </button>
              <span className="inline-block px-2.5 py-0.5 bg-[#C89D4B] text-[#0D261B] text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">
                {activeArticle.category}
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-white leading-snug">
                {activeArticle.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-[#CBDDD2] mt-3 font-mono">
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm text-[#4A554F] leading-relaxed">
              {/* Article Image Container */}
              <div className="relative rounded-xl overflow-hidden mb-6">
                <img
                  src={getArticleImage(activeArticle)}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + '/1200x794.jpg') {
                      target.src = '/1200x794.jpg';
                    }
                  }}
                  className="w-full h-72 sm:h-80 object-cover"
                />
              </div>

              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx} className="text-base text-[#2D3732] leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="pt-6 border-t border-[#EAE7DE] flex items-center justify-between text-xs text-[#7A8780]">
                <span>Genius Dairy Farms Limited • Iseyin, Oyo State</span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 bg-[#143727] text-white font-semibold uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
