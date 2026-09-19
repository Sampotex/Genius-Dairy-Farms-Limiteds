import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PartnerModal } from './components/PartnerModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { OurFarmPage } from './pages/OurFarmPage';
import { UdderfallPage } from './pages/UdderfallPage';
import { AcademyPage } from './pages/AcademyPage';
import { ExcursionsPage } from './pages/ExcursionsPage';
import { InternshipsPage } from './pages/InternshipsPage';
import { EventsPage } from './pages/EventsPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { InsightsPage } from './pages/InsightsPage';
import { ContactPage } from './pages/ContactPage';
import { PageId } from './types';
import { COMPANY_DETAILS } from './data/companyData';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FounderPhotoProvider } from './context/FounderPhotoContext';
import { BrandMediaProvider } from './context/BrandMediaContext';
import { ReplaceMediaModal } from './components/ReplaceMediaModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [partnerModalOpen, setPartnerModalOpen] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenPartnerModal={() => setPartnerModalOpen(true)}
          />
        );
      case 'about':
        return (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenPartnerModal={() => setPartnerModalOpen(true)}
          />
        );
      case 'farm':
        return (
          <OurFarmPage
            onNavigate={handleNavigate}
            onOpenPartnerModal={() => setPartnerModalOpen(true)}
          />
        );
      case 'udderfall':
        return <UdderfallPage onNavigate={handleNavigate} />;
      case 'academy':
        return <AcademyPage onNavigate={handleNavigate} />;
      case 'excursions':
        return <ExcursionsPage onNavigate={handleNavigate} />;
      case 'internships':
        return <InternshipsPage onNavigate={handleNavigate} />;
      case 'events':
        return <EventsPage onNavigate={handleNavigate} />;
      case 'sustainability':
        return (
          <SustainabilityPage
            onNavigate={handleNavigate}
            onOpenPartnerModal={() => setPartnerModalOpen(true)}
          />
        );
      case 'insights':
        return <InsightsPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenPartnerModal={() => setPartnerModalOpen(true)}
          />
        );
    }
  };

  return (
    <FounderPhotoProvider>
      <BrandMediaProvider>
        <div className="min-h-screen flex flex-col bg-[#FCFCFA] text-[#151A18] font-sans antialiased selection:bg-[#C89D4B]/30 selection:text-[#0D261B]">
          {/* Header with page routing */}
          <Header
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onOpenPartnerModal={() => setPartnerModalOpen(true)}
          />

          {/* Main Content Area - Renders active page */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderCurrentPage()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Global Footer */}
          <Footer onNavigate={handleNavigate} />

          {/* Global Partnership Modal */}
          <PartnerModal
            isOpen={partnerModalOpen}
            onClose={() => setPartnerModalOpen(false)}
          />

          {/* Floating Action Elements (WhatsApp & Back-to-Top) */}
          <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
            <AnimatePresence>
              {showBackToTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToTop}
                  aria-label="Back to top"
                  className="w-11 h-11 rounded-full bg-white text-[#143727] border border-[#D5D1C4] shadow-md flex items-center justify-center hover:bg-[#F4F4F0] hover:border-[#143727] transition-all cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* WhatsApp Direct Floating Button */}
            <a
              href={COMPANY_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp with Genius Dairy Farms Limited"
              className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-103"
            >
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span className="text-xs font-bold tracking-wide hidden sm:inline-block">
                Chat on WhatsApp
              </span>
            </a>
          </div>

          {/* Global Replace Media Modal */}
          <ReplaceMediaModal />
        </div>
      </BrandMediaProvider>
    </FounderPhotoProvider>
  );
}
