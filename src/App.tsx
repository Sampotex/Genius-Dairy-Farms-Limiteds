import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PartnerModal } from './components/PartnerModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { OurFarmPage } from './pages/OurFarmPage';
import { ExcursionsPage } from './pages/ExcursionsPage';
import { InternshipsPage } from './pages/InternshipsPage';
import { EventsPage } from './pages/EventsPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { InsightsPage } from './pages/InsightsPage';
import { ContactPage } from './pages/ContactPage';
import { PageId } from './types';
import { ArrowUp, Video } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FounderPhotoProvider } from './context/FounderPhotoContext';
import { BrandMediaProvider, useBrandMedia } from './context/BrandMediaContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ReplaceMediaModal } from './components/ReplaceMediaModal';
import { UploadedImagesGalleryModal } from './components/UploadedImagesGalleryModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { UdderfallSite } from './pages/udderfall/UdderfallSite';
import { AcademySite } from './pages/academy/AcademySite';
import { ErrorBoundary } from './components/ErrorBoundary';

function AppContent() {
  const { siteExperience, geniusPage, navigate } = useRouter();
  const [partnerModalOpen, setPartnerModalOpen] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { isUploadedVaultOpen, closeUploadedVault, openUploadedVault, openReplaceModal } = useBrandMedia();

  // Scroll listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageId | string) => {
    navigate(page);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (geniusPage) {
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
    <div className="min-h-screen flex flex-col bg-[#FCFCFA] text-[#151A18] font-sans antialiased selection:bg-[#C89D4B]/30 selection:text-[#0D261B]">
      {/* =========================================================================
          SITE EXPERIENCES:
          1. UDDERFALL: Dedicated route /udderfall with independent header & footer
          2. ACADEMY: Dedicated route /academy with independent header & footer
          3. GENIUS: Main website with corporate header & footer
          ========================================================================= */}
      {siteExperience === 'udderfall' ? (
        <UdderfallSite />
      ) : siteExperience === 'academy' ? (
        <AcademySite />
      ) : (
        <>
          {/* Main Genius Dairy Farms Header */}
          <Header
            currentPage={geniusPage}
            onNavigate={handleNavigate}
            onOpenPartnerModal={() => setPartnerModalOpen(true)}
            onOpenGallery={openUploadedVault}
          />

          {/* Main Content Area - Renders active Genius page */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={geniusPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderCurrentPage()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Main Genius Dairy Farms Global Footer */}
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {/* Global Partnership Modal */}
      <PartnerModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />

      {/* Floating Action Button: Media Gallery Studio (Left Corner) */}
      <button
        onClick={openUploadedVault}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#143727] text-white hover:bg-[#0D261B] shadow-xl hover:shadow-2xl border border-[#C89D4B]/40 transition-all hover:scale-105 group cursor-pointer"
        title="Open Public Server Media Gallery (Change Images & Videos)"
        aria-label="Open Public Server Media Gallery"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#C89D4B] animate-pulse" />
        <Video className="w-4 h-4 text-[#C89D4B]" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline-block">
          Media Gallery
        </span>
      </button>

      {/* Back to Top Floating Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#143727] text-[#C89D4B] hover:bg-[#0D261B] hover:text-white shadow-xl hover:shadow-2xl border border-[#C89D4B]/40 transition-all hover:-translate-y-0.5 cursor-pointer"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Global Media Vault & Replace Modal */}
      <UploadedImagesGalleryModal
        isOpen={isUploadedVaultOpen}
        onClose={closeUploadedVault}
        onOpenReplaceModal={openReplaceModal}
      />

      <ReplaceMediaModal />
      <ImageLightboxModal />
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <RouterProvider>
        <FounderPhotoProvider>
          <BrandMediaProvider>
            <AppContent />
          </BrandMediaProvider>
        </FounderPhotoProvider>
      </RouterProvider>
    </ErrorBoundary>
  );
}

export default App;
