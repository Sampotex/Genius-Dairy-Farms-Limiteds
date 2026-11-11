import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { PageId } from '../types';

export type SiteExperience = 'genius' | 'udderfall' | 'academy';

export type UdderfallSubPage = 'home' | 'about' | 'yogurt' | 'cheese' | 'wholesale' | 'contact' | 'gallery';
export type AcademySubPage = 'home' | 'about' | 'courses' | 'admissions' | 'facilities' | 'contact';

interface RouterContextType {
  currentPath: string;
  siteExperience: SiteExperience;
  geniusPage: PageId;
  udderfallSubPage: UdderfallSubPage;
  academySubPage: AcademySubPage;
  navigate: (to: string | PageId) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Helper to normalize pathnames
function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '') return '/';
  // Remove trailing slashes (except root)
  const trimmed = rawPath.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  // Handle browser back and forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Determine site experience and subpages
  const siteExperience: SiteExperience = useMemo(() => {
    if (currentPath.startsWith('/udderfall')) return 'udderfall';
    if (currentPath.startsWith('/academy')) return 'academy';
    return 'genius';
  }, [currentPath]);

  const udderfallSubPage: UdderfallSubPage = useMemo(() => {
    const p = currentPath.toLowerCase();
    if (p.includes('/about')) return 'about';
    if (p.includes('/yogurt')) return 'yogurt';
    if (p.includes('/cheese')) return 'cheese';
    if (p.includes('/wholesale') || p.includes('/business') || p.includes('/distributor')) return 'wholesale';
    if (p.includes('/gallery') || p.includes('/products-gallery') || p.includes('/media-gallery')) return 'gallery';
    if (p.includes('/contact')) return 'contact';
    return 'home';
  }, [currentPath]);

  const academySubPage: AcademySubPage = useMemo(() => {
    const p = currentPath.toLowerCase();
    if (p.includes('/about')) return 'about';
    if (p.includes('/courses') || p.includes('/programmes') || p.includes('/curriculum')) return 'courses';
    if (p.includes('/admissions') || p.includes('/siwes') || p.includes('/enroll')) return 'admissions';
    if (p.includes('/facilities') || p.includes('/farm') || p.includes('/lab')) return 'facilities';
    if (p.includes('/contact') || p.includes('/campus')) return 'contact';
    return 'home';
  }, [currentPath]);

  const geniusPage: PageId = useMemo(() => {
    const p = currentPath.toLowerCase().replace(/^\//, '');
    if (!p || p === '') return 'home';
    const validPages: PageId[] = [
      'home',
      'about',
      'farm',
      'udderfall',
      'academy',
      'excursions',
      'internships',
      'events',
      'sustainability',
      'insights',
      'contact',
    ];
    if (validPages.includes(p as PageId)) {
      return p as PageId;
    }
    return 'home';
  }, [currentPath]);

  const navigate = useCallback((to: string | PageId) => {
    let targetPath = to;

    // Convert PageId to route path
    if (to === 'home') targetPath = '/';
    else if (to === 'udderfall') targetPath = '/udderfall';
    else if (to === 'academy') targetPath = '/academy';
    else if (typeof to === 'string' && !to.startsWith('/')) {
      targetPath = '/' + to;
    }

    const normalized = normalizePath(targetPath);

    if (window.location.pathname !== normalized) {
      window.history.pushState({}, '', normalized);
    }
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const value = useMemo(
    () => ({
      currentPath,
      siteExperience,
      geniusPage,
      udderfallSubPage,
      academySubPage,
      navigate,
    }),
    [currentPath, siteExperience, geniusPage, udderfallSubPage, academySubPage, navigate]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
