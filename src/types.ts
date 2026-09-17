export type PageId =
  | 'home'
  | 'about'
  | 'farm'
  | 'udderfall'
  | 'academy'
  | 'sustainability'
  | 'insights'
  | 'contact';

export interface TimelineMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
}

export interface PlatformInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  ctaText: string;
  targetPage: PageId;
  badge: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'yogurt' | 'cheese';
  subtitle: string;
  description: string;
  features: string[];
  packaging: string;
  image: string;
}

export interface AcademyProgram {
  id: string;
  title: string;
  targetAudience: string;
  duration: string;
  mode: string;
  description: string;
  modules: string[];
  iconName: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: 'Farm Updates' | 'Industry News' | 'Agricultural Education' | 'Milestones';
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Livestock & Genetics' | 'Pasture & Facility' | 'Milking & Operations' | 'Academy & Training';
  image: string;
  caption: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  enquiryType: EnquiryType;
  message: string;
}

export type EnquiryType =
  | 'General Enquiry'
  | 'Farm Visit'
  | 'Partnership'
  | 'Investment'
  | 'Udderfall Distribution'
  | 'Academy Training'
  | 'Media'
  | 'Other';
