/**
 * Unified IndexedDB Manager for Genius Dairy Farms Media
 * 
 * Provides a resilient, version-resilient database connection for:
 * - Brand media custom image slots ('brand_media_slots')
 * - Drone surveillance videos and metadata ('videos')
 * - User gallery photos ('user_gallery_photos')
 * 
 * Automatically ensures all object stores exist regardless of whether
 * the database was previously opened at version 2, 4, or higher.
 */

export const DB_NAME = 'GeniusDairyMediaDB';
export const CURRENT_DB_VERSION = 6; // Set above previous versions (2, 4)

export const STORES = {
  BRAND_MEDIA: 'brand_media_slots',
  VIDEOS: 'videos',
  USER_PHOTOS: 'user_gallery_photos',
} as const;

/**
 * Ensures all required object stores exist in the database instance.
 */
function ensureObjectStores(db: IDBDatabase) {
  if (!db.objectStoreNames.contains(STORES.BRAND_MEDIA)) {
    db.createObjectStore(STORES.BRAND_MEDIA);
  }
  if (!db.objectStoreNames.contains(STORES.VIDEOS)) {
    db.createObjectStore(STORES.VIDEOS);
  }
  if (!db.objectStoreNames.contains(STORES.USER_PHOTOS)) {
    db.createObjectStore(STORES.USER_PHOTOS, { keyPath: 'id' });
  }
}

/**
 * Opens the Genius Dairy media database with automatic version management,
 * upgrade handling, and VersionError fallback recovery.
 */
export function openMediaDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported on this browser.'));
      return;
    }

    function tryOpen(targetVersion?: number) {
      try {
        const request = targetVersion !== undefined
          ? window.indexedDB.open(DB_NAME, targetVersion)
          : window.indexedDB.open(DB_NAME);

        request.onupgradeneeded = () => {
          const db = request.result;
          ensureObjectStores(db);
        };

        request.onsuccess = () => {
          const db = request.result;

          // Verify all needed object stores exist
          const hasAllStores =
            db.objectStoreNames.contains(STORES.BRAND_MEDIA) &&
            db.objectStoreNames.contains(STORES.VIDEOS) &&
            db.objectStoreNames.contains(STORES.USER_PHOTOS);

          if (!hasAllStores) {
            // Need an upgrade to create missing stores
            const nextVersion = db.version + 1;
            db.close();
            tryOpen(nextVersion);
            return;
          }

          resolve(db);
        };

        request.onerror = () => {
          const error = request.error;
          // If error is VersionError (requested version is less than existing version in browser)
          if (error && error.name === 'VersionError' && targetVersion !== undefined) {
            // Open without specifying version; IndexedDB will open at whatever version exists
            tryOpen(undefined);
            return;
          }
          reject(error || new Error('Failed to open Genius Dairy media database.'));
        };

        request.onblocked = () => {
          console.warn('GeniusDairyMediaDB open request is blocked by another open tab.');
        };
      } catch (err: unknown) {
        const error = err as DOMException;
        if (error && error.name === 'VersionError' && targetVersion !== undefined) {
          tryOpen(undefined);
        } else {
          reject(err);
        }
      }
    }

    tryOpen(CURRENT_DB_VERSION);
  });
}
