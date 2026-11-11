import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FOUNDER_IMAGE_BASE64 } from '../data/founderImageFallback';

const STORAGE_KEY = 'genius_custom_founder_image';
const POSITION_KEY = 'genius_custom_founder_image_position';
export const DEFAULT_FOUNDER_IMAGE = FOUNDER_IMAGE_BASE64;

interface FounderPhotoContextType {
  photoUrl: string;
  isCustom: boolean;
  isUploading: boolean;
  uploadError: string | null;
  objectPosition: string;
  setObjectPosition: (pos: string) => void;
  uploadFromGallery: (file: File) => Promise<boolean>;
  setPhotoFromUrl: (url: string) => void;
  resetToDefault: () => void;
}

const FounderPhotoContext = createContext<FounderPhotoContextType | undefined>(undefined);

/**
 * Compresses and resizes an uploaded user image to prevent localStorage quota exhaustion
 * while keeping crisp visual detail for web displays.
 */
function processAndOptimizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select an image file (JPEG, PNG, WebP, etc.)'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Unable to read selected photo.'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Selected file is not a valid photo.'));
      img.onload = () => {
        const MAX_WIDTH = 1400;
        const MAX_HEIGHT = 1400;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width / height > MAX_WIDTH / MAX_HEIGHT) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        // Clean high quality image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        try {
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          resolve(optimizedDataUrl);
        } catch {
          resolve(event.target?.result as string);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function FounderPhotoProvider({ children }: { children: ReactNode }) {
  const [photoUrl, setPhotoUrl] = useState<string>(DEFAULT_FOUNDER_IMAGE);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [objectPosition, setObjectPositionState] = useState<string>('center 15%');

  // Load custom image from localStorage on mount
  useEffect(() => {
    try {
      const savedImage = localStorage.getItem(STORAGE_KEY);
      const savedPosition = localStorage.getItem(POSITION_KEY);
      if (savedImage && savedImage.trim().length > 0 && !savedImage.includes('1200x794') && !savedImage.includes('founder_md') && savedImage.length < 850000) {
        setPhotoUrl(savedImage);
        setIsCustom(true);
      } else {
        setPhotoUrl('/founder.jpg');
      }
      if (savedPosition) {
        setObjectPositionState(savedPosition);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const uploadFromGallery = async (file: File): Promise<boolean> => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const optimizedUrl = await processAndOptimizeImage(file);
      try {
        localStorage.setItem(STORAGE_KEY, optimizedUrl);
      } catch (err) {
        console.warn('Could not persist to localStorage, using in-memory state:', err);
      }

      setPhotoUrl(optimizedUrl);
      setIsCustom(true);
      setIsUploading(false);
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to process image';
      setUploadError(message);
      setIsUploading(false);
      return false;
    }
  };

  const setPhotoFromUrl = (url: string) => {
    setPhotoUrl(url);
    setIsCustom(true);
    setUploadError(null);
    try {
      localStorage.setItem(STORAGE_KEY, url);
    } catch {
      // Ignore
    }
  };

  const resetToDefault = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(POSITION_KEY);
    } catch {
      // Ignore
    }
    setPhotoUrl(DEFAULT_FOUNDER_IMAGE);
    setObjectPositionState('center 15%');
    setIsCustom(false);
    setUploadError(null);
  };

  const setObjectPosition = (pos: string) => {
    setObjectPositionState(pos);
    try {
      localStorage.setItem(POSITION_KEY, pos);
    } catch {
      // Ignore
    }
  };

  return (
    <FounderPhotoContext.Provider
      value={{
        photoUrl,
        isCustom,
        isUploading,
        uploadError,
        objectPosition,
        setObjectPosition,
        uploadFromGallery,
        setPhotoFromUrl,
        resetToDefault,
      }}
    >
      {children}
    </FounderPhotoContext.Provider>
  );
}

const defaultFounderPhotoContext: FounderPhotoContextType = {
  photoUrl: DEFAULT_FOUNDER_IMAGE,
  isCustom: false,
  isUploading: false,
  uploadError: null,
  objectPosition: 'center 15%',
  setObjectPosition: () => {},
  uploadFromGallery: async () => false,
  setPhotoFromUrl: () => {},
  resetToDefault: () => {},
};

export function useFounderPhoto(): FounderPhotoContextType {
  const context = useContext(FounderPhotoContext);
  if (!context) {
    return defaultFounderPhotoContext;
  }
  return context;
}
