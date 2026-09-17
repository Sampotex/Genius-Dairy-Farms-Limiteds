import { openMediaDatabase, STORES } from './mediaDb';

/**
 * Drone Video Storage Utility for Genius Dairy Farms Eagle View Section
 * Persists custom user-uploaded aerial videos in browser IndexedDB.
 */

const VIDEOS_STORE = STORES.VIDEOS;
const VIDEO_KEY = 'inserted_drone_video';
const VIDEO_META_KEY = 'inserted_drone_video_meta';

export const DEFAULT_DRONE_VIDEO = '/eagle-view-farm.mp4';
export const DRONE_VIDEO_EVENT = 'genius-dairy-drone-video-updated';

export interface DroneVideoMeta {
  name: string;
  size: number;
  type: string;
  isCustom: boolean;
  uploadedAt: number;
}

let cachedBlobUrl: string | null = null;

function openDatabase(): Promise<IDBDatabase> {
  return openMediaDatabase();
}

/**
 * Saves a video file (MP4, MOV, WebM, etc.) from the user's phone or computer to IndexedDB.
 */
export async function saveDroneVideoFile(file: File): Promise<{ url: string; meta: DroneVideoMeta }> {
  // Validate format
  const isVideo =
    file.type.startsWith('video/') ||
    /\.(mp4|webm|mov|m4v|ogg|ogv|mkv|3gp)$/i.test(file.name) ||
    file.type === '' ||
    file.type === 'application/octet-stream';

  if (!isVideo) {
    throw new Error('Please select a valid video file (MP4, MOV, WebM, or M4V).');
  }

  // Check 500MB safety ceiling for browser memory
  const MAX_SIZE_BYTES = 500 * 1024 * 1024;
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error('Video file size exceeds 500MB. Please select a shorter or compressed clip.');
  }

  const db = await openDatabase();

  const meta: DroneVideoMeta = {
    name: file.name || 'Uploaded Drone Footage',
    size: file.size,
    type: file.type || 'video/mp4',
    isCustom: true,
    uploadedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(VIDEOS_STORE, 'readwrite');
      const store = tx.objectStore(VIDEOS_STORE);

      store.put(file, VIDEO_KEY);
      store.put(meta, VIDEO_META_KEY);

      tx.oncomplete = () => {
        if (cachedBlobUrl) {
          URL.revokeObjectURL(cachedBlobUrl);
        }
        cachedBlobUrl = URL.createObjectURL(file);

        // Notify app components
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent(DRONE_VIDEO_EVENT, { detail: { url: cachedBlobUrl, meta } }));
        }

        resolve({ url: cachedBlobUrl, meta });
      };

      tx.onerror = () => {
        reject(tx.error || new Error('Failed to write video to local storage.'));
      };
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Saves an external video stream/direct link as custom Eagle View video.
 */
export async function saveDroneVideoUrl(url: string, label?: string): Promise<{ url: string; meta: DroneVideoMeta }> {
  if (!url || !url.trim().startsWith('http')) {
    throw new Error('Please enter a valid video URL starting with http:// or https://');
  }

  const cleanUrl = url.trim();
  const db = await openDatabase();

  const meta: DroneVideoMeta = {
    name: label || cleanUrl.split('/').pop() || 'Web Drone Video Stream',
    size: 0,
    type: 'video/url',
    isCustom: true,
    uploadedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(VIDEOS_STORE, 'readwrite');
      const store = tx.objectStore(VIDEOS_STORE);

      // Store url string directly in place of blob
      store.put(cleanUrl, VIDEO_KEY);
      store.put(meta, VIDEO_META_KEY);

      tx.oncomplete = () => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent(DRONE_VIDEO_EVENT, { detail: { url: cleanUrl, meta } }));
        }
        resolve({ url: cleanUrl, meta });
      };

      tx.onerror = () => reject(tx.error || new Error('Failed to save video URL.'));
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Loads the currently configured Eagle View video (custom or default fallback).
 */
export async function loadDroneVideo(): Promise<{ url: string; isCustom: boolean; meta: DroneVideoMeta | null }> {
  try {
    const db = await openDatabase();

    return new Promise((resolve) => {
      const tx = db.transaction(VIDEOS_STORE, 'readonly');
      const store = tx.objectStore(VIDEOS_STORE);

      const videoReq = store.get(VIDEO_KEY);
      const metaReq = store.get(VIDEO_META_KEY);

      let videoData: Blob | string | null = null;
      let metaData: DroneVideoMeta | null = null;

      videoReq.onsuccess = () => {
        videoData = videoReq.result;
      };

      metaReq.onsuccess = () => {
        metaData = metaReq.result;
      };

      tx.oncomplete = () => {
        if (videoData instanceof Blob) {
          if (cachedBlobUrl) {
            URL.revokeObjectURL(cachedBlobUrl);
          }
          cachedBlobUrl = URL.createObjectURL(videoData);
          resolve({
            url: cachedBlobUrl,
            isCustom: true,
            meta: metaData || {
              name: 'Custom Drone Video',
              size: videoData.size,
              type: videoData.type,
              isCustom: true,
              uploadedAt: Date.now(),
            },
          });
        } else if (typeof videoData === 'string' && videoData.length > 0) {
          resolve({
            url: videoData,
            isCustom: true,
            meta: metaData || {
              name: 'External Drone Video',
              size: 0,
              type: 'video/url',
              isCustom: true,
              uploadedAt: Date.now(),
            },
          });
        } else {
          resolve({
            url: DEFAULT_DRONE_VIDEO,
            isCustom: false,
            meta: null,
          });
        }
      };

      tx.onerror = () => {
        resolve({
          url: DEFAULT_DRONE_VIDEO,
          isCustom: false,
          meta: null,
        });
      };
    });
  } catch {
    return {
      url: DEFAULT_DRONE_VIDEO,
      isCustom: false,
      meta: null,
    };
  }
}

/**
 * Resets the Eagle View section back to the original default farm footage.
 */
export async function resetDroneVideo(): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(VIDEOS_STORE, 'readwrite');
      const store = tx.objectStore(VIDEOS_STORE);
      store.delete(VIDEO_KEY);
      store.delete(VIDEO_META_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    if (cachedBlobUrl) {
      URL.revokeObjectURL(cachedBlobUrl);
      cachedBlobUrl = null;
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(DRONE_VIDEO_EVENT, {
          detail: { url: DEFAULT_DRONE_VIDEO, meta: null, isReset: true },
        })
      );
    }
  } catch (err) {
    console.error('Error resetting drone video:', err);
  }
}
