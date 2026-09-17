import { openMediaDatabase, STORES } from './mediaDb';

export interface StoredUserPhoto {
  id: string;
  title: string;
  category: string;
  src: string; // Base64 dataURL
  caption: string;
  location?: string;
  tag?: string;
  createdAt: number;
}

const USER_PHOTOS_STORE = STORES.USER_PHOTOS;
const LOCAL_STORAGE_KEY = 'genius_user_gallery_photos';

function openDatabase(): Promise<IDBDatabase> {
  return openMediaDatabase();
}

/**
 * Broadcasts an update event so any mounted gallery components immediately re-render
 */
export function broadcastGalleryUpdate(detail?: unknown): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('genius-gallery-updated', { detail }));
    window.dispatchEvent(new Event('storage'));
  }
}

/**
 * Optimizes an uploaded image file from the user's gallery/camera roll
 * for crisp rendering and reliable storage.
 */
export function processGalleryImage(file: File): Promise<{
  dataUrl: string;
  title: string;
}> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/') && !/\.(jpe?g|png|webp|gif|bmp|heic|heif|svg)$/i.test(file.name)) {
      reject(new Error('Please select a valid image file from your gallery (JPEG, PNG, WebP, HEIC, etc.)'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read selected image from your gallery.'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => {
        // Fallback: If browser can't decode canvas (e.g. some HEIC variants), use raw dataUrl
        const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const formattedTitle = rawName.charAt(0).toUpperCase() + rawName.slice(1);
        resolve({
          dataUrl: event.target?.result as string,
          title: formattedTitle || 'Farm Photo',
        });
      };
      img.onload = () => {
        const MAX_WIDTH = 1800;
        const MAX_HEIGHT = 1800;
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
          resolve({
            dataUrl: event.target?.result as string,
            title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          });
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        try {
          const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const quality = 0.90;
          const optimizedDataUrl = canvas.toDataURL(mimeType, quality);
          const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          const formattedTitle = rawName.charAt(0).toUpperCase() + rawName.slice(1);
          resolve({
            dataUrl: optimizedDataUrl,
            title: formattedTitle || 'Farm Photo',
          });
        } catch {
          resolve({
            dataUrl: event.target?.result as string,
            title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          });
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Retrieves all custom photos chosen from user's gallery saved in IndexedDB and localStorage
 */
export async function loadUserGalleryPhotos(): Promise<StoredUserPhoto[]> {
  const photoMap = new Map<string, StoredUserPhoto>();

  // 1. Read from localStorage first (very fast, and recovers pre-existing uploads)
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as StoredUserPhoto[];
      if (Array.isArray(parsed)) {
        parsed.forEach((p) => {
          if (p && p.id && p.src) {
            photoMap.set(p.id, p);
          }
        });
      }
    }
  } catch (err) {
    console.warn('Could not parse localStorage photos:', err);
  }

  // 2. Read from IndexedDB and merge
  try {
    const db = await openDatabase();
    const idbPhotos = await new Promise<StoredUserPhoto[]>((resolve) => {
      const tx = db.transaction(USER_PHOTOS_STORE, 'readonly');
      const store = tx.objectStore(USER_PHOTOS_STORE);
      const request = store.getAll();

      request.onsuccess = () => {
        const items = (request.result as StoredUserPhoto[]) || [];
        resolve(items);
      };
      request.onerror = () => resolve([]);
    });

    idbPhotos.forEach((p) => {
      if (p && p.id && p.src) {
        photoMap.set(p.id, p);
      }
    });

    // 3. Backfill any localStorage photos missing from IndexedDB into IndexedDB
    try {
      const idbIds = new Set(idbPhotos.map((p) => p.id));
      const missingInIdb = Array.from(photoMap.values()).filter((p) => !idbIds.has(p.id));
      if (missingInIdb.length > 0) {
        const writeTx = db.transaction(USER_PHOTOS_STORE, 'readwrite');
        const writeStore = writeTx.objectStore(USER_PHOTOS_STORE);
        missingInIdb.forEach((item) => writeStore.put(item));
      }
    } catch {
      // Non-critical background sync
    }
  } catch (err) {
    console.warn('Could not load user photos from IndexedDB:', err);
  }

  const items = Array.from(photoMap.values());
  // Sort newest first
  items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  // Sync back to localStorage as backup if feasible
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Quota might be exceeded with large base64s; safe to ignore
  }

  return items;
}

/**
 * Saves a chosen user gallery photo into IndexedDB and localStorage
 */
export async function saveUserGalleryPhoto(photo: StoredUserPhoto): Promise<void> {
  let savedToIdb = false;

  // 1. Save to IndexedDB
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(USER_PHOTOS_STORE, 'readwrite');
      const store = tx.objectStore(USER_PHOTOS_STORE);
      const req = store.put(photo);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
    savedToIdb = true;
  } catch (err) {
    console.warn('Could not save user photo to IndexedDB:', err);
  }

  // 2. Save to localStorage backup
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: StoredUserPhoto[] = saved ? JSON.parse(saved) : [];
    const filtered = list.filter((p) => p.id !== photo.id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([photo, ...filtered]));
  } catch (err) {
    if (!savedToIdb) {
      console.warn('Failed to save to both IndexedDB and localStorage:', err);
      throw new Error('Unable to store photo. Device storage is full.');
    }
  }

  // 3. Notify any open components to re-render
  broadcastGalleryUpdate(photo);
}

/**
 * Deletes a user gallery photo from IndexedDB and localStorage
 */
export async function deleteUserGalleryPhoto(id: string): Promise<void> {
  // 1. Delete from IndexedDB
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(USER_PHOTOS_STORE, 'readwrite');
      const store = tx.objectStore(USER_PHOTOS_STORE);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not delete photo from IndexedDB:', err);
  }

  // 2. Delete from localStorage
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const list: StoredUserPhoto[] = JSON.parse(saved);
      const updated = list.filter((item) => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch {
    // Ignore
  }

  // 3. Notify any open components to re-render
  broadcastGalleryUpdate({ id, deleted: true });
}
