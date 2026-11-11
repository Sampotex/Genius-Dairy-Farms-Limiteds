import { openMediaDatabase, STORES } from './mediaDb';

const STORAGE_KEY = 'genius_insights_custom_images';

// In-memory cache for fast, synchronous rendering
let memoryCache: Record<string, string> = {};

/**
 * Built-in farm gallery images available as reliable options
 */
export const BUILT_IN_FARM_IMAGES = [
  {
    id: 'farm-cow-1200',
    title: 'Crossbred Dairy Cattle in Pasture',
    url: '/1200x794.jpg',
    description: '1264x848 high-yield crossbreed cow at Iseyin farm',
  },
  {
    id: 'farm-dairy-barn',
    title: 'Covered Dairy Barn & Corral',
    url: '/dairy-barn-aerial.jpg',
    description: 'Sheltered housing & feed mangers',
  },
  {
    id: 'farm-eagle-view',
    title: 'Eagle View of Genius Dairy Ranch',
    url: '/eagle-view-farm.jpg',
    description: 'Expansive 60-acre aerial drone view',
  },
  {
    id: 'farm-founder',
    title: 'Founder & MD Moyosore Rafiu',
    url: '/founder.jpg',
    description: 'On-site leadership and farm management',
  },
];

/**
 * Loads custom insight images synchronously from memory/localStorage
 */
export function getCustomInsightImages(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  if (Object.keys(memoryCache).length > 0) {
    return { ...memoryCache };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'object' && parsed !== null) {
        // Sanitize: ensure no invalid or expired blob: URLs cause broken image icons
        const sanitized: Record<string, string> = {};
        for (const [k, v] of Object.entries(parsed)) {
          if (
            typeof v === 'string' &&
            (v.startsWith('data:image/') || v.startsWith('http://') || v.startsWith('https://') || v.startsWith('/'))
          ) {
            sanitized[k] = v;
          }
        }
        memoryCache = sanitized;
        return { ...memoryCache };
      }
    }
  } catch (err) {
    console.warn('localStorage read warning in getCustomInsightImages:', err);
  }
  return {};
}

/**
 * Loads custom insight images asynchronously from IndexedDB and merges with localStorage
 */
export async function loadCustomInsightImagesAsync(): Promise<Record<string, string>> {
  const images: Record<string, string> = getCustomInsightImages();

  try {
    const db = await openMediaDatabase();
    if (db.objectStoreNames.contains(STORES.BRAND_MEDIA)) {
      const tx = db.transaction(STORES.BRAND_MEDIA, 'readonly');
      const store = tx.objectStore(STORES.BRAND_MEDIA);

      // Read all keys starting with 'insight_'
      const req = store.getAllKeys ? store.getAllKeys() : null;
      if (req) {
        await new Promise<void>((resolve) => {
          req.onsuccess = () => {
            const keys = (req.result as IDBValidKey[]) || [];
            const insightKeys = keys.filter(
              (k) => typeof k === 'string' && k.startsWith('insight_')
            );

            if (insightKeys.length === 0) {
              resolve();
              return;
            }

            let pending = insightKeys.length;
            insightKeys.forEach((key) => {
              const getReq = store.get(key);
              getReq.onsuccess = () => {
                const articleId = (key as string).replace('insight_', '');
                if (getReq.result && typeof getReq.result === 'string') {
                  const val = getReq.result;
                  if (val.startsWith('data:image/') || val.startsWith('http') || val.startsWith('/')) {
                    images[articleId] = val;
                  }
                }
                pending -= 1;
                if (pending === 0) resolve();
              };
              getReq.onerror = () => {
                pending -= 1;
                if (pending === 0) resolve();
              };
            });
          };
          req.onerror = () => resolve();
        });
      }
    }
  } catch (err) {
    console.warn('IndexedDB read warning for insights:', err);
  }

  // Also query server permanent insight images
  try {
    const res = await fetch('/api/insight-images');
    if (res.ok) {
      const serverMap = await res.json();
      for (const [artId, serverUrl] of Object.entries(serverMap)) {
        if (!images[artId] && typeof serverUrl === 'string') {
          images[artId] = serverUrl;
        }
      }
    }
  } catch {
    // non-critical
  }

  memoryCache = { ...images };

  // Auto-sync all valid custom insight images to server disk permanently
  for (const [articleId, dataUrl] of Object.entries(images)) {
    if (dataUrl && dataUrl.startsWith('data:image/')) {
      try {
        fetch('/api/upload-media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slotKey: articleId, dataUrl }),
        }).catch(() => {});
      } catch {
        // non-critical
      }
    }
  }

  return { ...memoryCache };
}

/**
 * Optimizes a phone gallery file into a high-quality, lightweight JPEG data URL
 * Uses createImageBitmap when available for maximum speed and HEIC compatibility.
 */
export async function compressGalleryImage(file: File): Promise<string> {
  const MAX_WIDTH = 1280;
  const MAX_HEIGHT = 850;
  const QUALITY = 0.82;

  // Method 1: Try createImageBitmap (hardware-accelerated, handles many formats natively)
  if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
    try {
      const bitmap = await createImageBitmap(file);
      let { width, height } = bitmap;

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
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(bitmap, 0, 0, width, height);
        bitmap.close();
        const dataUrl = canvas.toDataURL('image/jpeg', QUALITY);
        if (dataUrl && dataUrl.startsWith('data:image/jpeg')) {
          return dataUrl;
        }
      }
    } catch {
      // Fallback to Image loading if createImageBitmap fails
    }
  }

  // Method 2: Fallback with Image element
  return new Promise<string>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;
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
        URL.revokeObjectURL(objectUrl);
        // Fall back to reading raw dataUrl
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = () => reject(new Error('Failed to read image.'));
        reader.readAsDataURL(file);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(objectUrl);

      try {
        const dataUrl = canvas.toDataURL('image/jpeg', QUALITY);
        resolve(dataUrl);
      } catch {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = () => reject(new Error('Failed to convert image.'));
        reader.readAsDataURL(file);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // Final attempt: read directly as DataURL
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(new Error('Browser could not render this photo format.'));
      reader.readAsDataURL(file);
    };

    img.src = objectUrl;
  });
}

/**
 * Saves custom insight image from phone gallery file or data URL
 */
export async function saveCustomInsightImage(
  articleId: string,
  source: File | string
): Promise<string> {
  let finalDataUrl: string;

  if (typeof source === 'string') {
    finalDataUrl = source;
  } else {
    finalDataUrl = await compressGalleryImage(source);
  }

  // 1. Update in-memory cache immediately
  memoryCache[articleId] = finalDataUrl;

  // 2. Save to localStorage safely
  try {
    const current = getCustomInsightImages();
    current[articleId] = finalDataUrl;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.warn('localStorage quota warning while saving insight image:', err);
  }

  // 3. Save to IndexedDB brand media store for durability
  try {
    const db = await openMediaDatabase();
    if (db.objectStoreNames.contains(STORES.BRAND_MEDIA)) {
      const tx = db.transaction(STORES.BRAND_MEDIA, 'readwrite');
      tx.objectStore(STORES.BRAND_MEDIA).put(finalDataUrl, `insight_${articleId}`);
    }
  } catch (err) {
    console.warn('Could not save insight image to IndexedDB:', err);
  }

  // 4. Dispatch event so other components or open views update
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('genius-insights-image-updated', {
        detail: { articleId, dataUrl: finalDataUrl },
      })
    );
  }

  // 5. Sync to server disk permanently for published deployments
  try {
    fetch('/api/upload-media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slotKey: articleId, dataUrl: finalDataUrl }),
    }).catch(() => {});
  } catch {
    // non-critical
  }

  return finalDataUrl;
}

/**
 * Manually or automatically synchronizes all local/browser insight images directly
 * to the permanent server filesystem (/public and /dist).
 */
export async function syncAllInsightImagesToServer(): Promise<{ success: boolean; count: number; savedFiles?: string[] }> {
  const images = getCustomInsightImages();
  const entries = Object.entries(images).filter(([_, v]) => typeof v === 'string' && v.startsWith('data:image/'));

  if (entries.length === 0) {
    return { success: true, count: 0 };
  }

  try {
    const payload = Object.fromEntries(entries);
    const res = await fetch('/api/save-all-insight-images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: payload }),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, count: entries.length, savedFiles: data.savedFiles };
    }
  } catch (err) {
    console.warn('Bulk insight sync to server failed:', err);
  }

  return { success: false, count: entries.length };
}

/**
 * Resets custom photo for a specific article
 */
export async function resetCustomInsightImage(articleId: string): Promise<void> {
  delete memoryCache[articleId];

  try {
    const current = getCustomInsightImages();
    delete current[articleId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.warn('Could not reset insight image in localStorage:', err);
  }

  try {
    const db = await openMediaDatabase();
    if (db.objectStoreNames.contains(STORES.BRAND_MEDIA)) {
      const tx = db.transaction(STORES.BRAND_MEDIA, 'readwrite');
      tx.objectStore(STORES.BRAND_MEDIA).delete(`insight_${articleId}`);
    }
  } catch {
    // ignore
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('genius-insights-image-updated', {
        detail: { articleId, dataUrl: null },
      })
    );
  }
}

/**
 * Resets all insight custom photos
 */
export async function resetAllCustomInsightImages(): Promise<void> {
  memoryCache = {};

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }

  try {
    const db = await openMediaDatabase();
    if (db.objectStoreNames.contains(STORES.BRAND_MEDIA)) {
      const tx = db.transaction(STORES.BRAND_MEDIA, 'readwrite');
      const store = tx.objectStore(STORES.BRAND_MEDIA);
      const req = store.getAllKeys ? store.getAllKeys() : null;
      if (req) {
        req.onsuccess = () => {
          const keys = (req.result as IDBValidKey[]) || [];
          keys
            .filter((k) => typeof k === 'string' && k.startsWith('insight_'))
            .forEach((k) => store.delete(k));
        };
      }
    }
  } catch {
    // ignore
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('genius-insights-image-updated', {
        detail: { all: true },
      })
    );
  }
}
