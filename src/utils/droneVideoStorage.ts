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
  savedToServer?: boolean;
  serverUrl?: string;
  storageLocation?: string;
}

let cachedBlobUrl: string | null = null;

function openDatabase(): Promise<IDBDatabase> {
  return openMediaDatabase();
}

/**
 * Uploads a video file or blob to the server filesystem (/api/upload-drone-video)
 * so it is stored permanently in public/eagle-view-farm.mp4 and dist/eagle-view-farm.mp4.
 */
export async function uploadDroneVideoToServer(
  fileOrBlob: Blob | File,
  filename?: string
): Promise<{ success: boolean; url: string; size?: number; error?: string }> {
  try {
    const res = await fetch('/api/upload-drone-video', {
      method: 'POST',
      headers: {
        'Content-Type': fileOrBlob.type || 'video/mp4',
        'X-File-Name': encodeURIComponent(filename || (fileOrBlob as File).name || 'eagle-view-farm.mp4'),
      },
      body: fileOrBlob,
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP status ${res.status}`);
    }

    const data = await res.json();
    return {
      success: true,
      url: data.url || '/eagle-view-farm.mp4',
      size: data.size,
    };
  } catch (err: any) {
    console.warn('Failed to save drone video permanently to server:', err);
    return {
      success: false,
      url: '/eagle-view-farm.mp4',
      error: err?.message || 'Server upload failed',
    };
  }
}

/**
 * Explicitly saves/syncs the drone video directly to the server public folder (public/eagle-view-farm.mp4).
 */
export async function saveCurrentVideoToPublic(
  fileOrBlob?: Blob | File,
  filename?: string
): Promise<{
  success: boolean;
  url: string;
  size?: number;
  sizeFormatted?: string;
  storageLocation?: string;
  error?: string;
}> {
  try {
    if (fileOrBlob) {
      return await uploadDroneVideoToServer(fileOrBlob, filename);
    }
    const res = await fetch('/api/save-video-to-public', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'sync' }),
    });
    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    return {
      success: false,
      url: '/eagle-view-farm.mp4',
      error: err?.message || 'Failed to save video to public folder',
    };
  }
}

/**
 * Checks if a permanent video exists on the server disk.
 */
export async function checkServerDroneVideo(): Promise<{
  exists: boolean;
  isPermanent?: boolean;
  size?: number;
  sizeFormatted?: string;
  updatedAt?: string;
  storageLocation?: string;
}> {
  try {
    const res = await fetch('/api/upload-drone-video');
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // ignore
  }
  return { exists: false };
}

/**
 * Syncs any local custom drone video stored in browser IndexedDB up to the server disk.
 */
export async function syncLocalCustomVideoToServer(): Promise<{
  synced: boolean;
  meta: DroneVideoMeta | null;
}> {
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

      tx.oncomplete = async () => {
        if (videoData instanceof Blob && !metaData?.savedToServer) {
          const uploadRes = await uploadDroneVideoToServer(videoData, metaData?.name);
          if (uploadRes.success) {
            const updatedMeta: DroneVideoMeta = {
              ...(metaData || {
                name: 'Custom Drone Video',
                size: videoData.size,
                type: videoData.type,
                isCustom: true,
                uploadedAt: Date.now(),
              }),
              savedToServer: true,
              storageLocation: 'Permanent Server Disk (public/eagle-view-farm.mp4)',
            };

            try {
              const writeTx = db.transaction(VIDEOS_STORE, 'readwrite');
              writeTx.objectStore(VIDEOS_STORE).put(updatedMeta, VIDEO_META_KEY);
            } catch {
              // ignore
            }

            if (typeof window !== 'undefined') {
              window.dispatchEvent(
                new CustomEvent(DRONE_VIDEO_EVENT, {
                  detail: { url: cachedBlobUrl || DEFAULT_DRONE_VIDEO, meta: updatedMeta },
                })
              );
            }

            resolve({ synced: true, meta: updatedMeta });
            return;
          }
        }
        resolve({ synced: false, meta: metaData });
      };

      tx.onerror = () => resolve({ synced: false, meta: null });
    });
  } catch {
    return { synced: false, meta: null };
  }
}

/**
 * Saves a video file (MP4, MOV, WebM, etc.) from the user's phone or computer.
 * Stores locally in IndexedDB AND permanently uploads to the server filesystem (public/eagle-view-farm.mp4).
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
    savedToServer: false,
    storageLocation: 'Local Database (Syncing to Permanent Server Disk...)',
  };

  // 1. First save to browser IndexedDB for immediate responsiveness
  await new Promise<void>((resolve, reject) => {
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

        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent(DRONE_VIDEO_EVENT, { detail: { url: cachedBlobUrl, meta } })
          );
        }
        resolve();
      };

      tx.onerror = () => {
        reject(tx.error || new Error('Failed to write video to local storage.'));
      };
    } catch (err) {
      reject(err);
    }
  });

  // 2. Upload to server filesystem for permanent persistence
  try {
    const serverResult = await uploadDroneVideoToServer(file, file.name);
    if (serverResult.success) {
      meta.savedToServer = true;
      meta.storageLocation = 'Permanent Server Disk (public/eagle-view-farm.mp4)';
      meta.serverUrl = serverResult.url;

      // Update meta in IndexedDB
      try {
        const updateTx = db.transaction(VIDEOS_STORE, 'readwrite');
        updateTx.objectStore(VIDEOS_STORE).put(meta, VIDEO_META_KEY);
      } catch {
        // ignore
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent(DRONE_VIDEO_EVENT, {
            detail: { url: cachedBlobUrl || serverResult.url, meta },
          })
        );
      }
    }
  } catch (err) {
    console.warn('Permanent server upload warning:', err);
  }

  return { url: cachedBlobUrl || DEFAULT_DRONE_VIDEO, meta };
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

          const resolvedMeta = metaData || {
            name: 'Custom Drone Video',
            size: videoData.size,
            type: videoData.type,
            isCustom: true,
            uploadedAt: Date.now(),
            savedToServer: false,
            storageLocation: 'Local Browser Database',
          };

          // Auto-sync to permanent server disk if not yet saved to server
          if (!resolvedMeta.savedToServer) {
            syncLocalCustomVideoToServer().catch(() => {});
          }

          resolve({
            url: cachedBlobUrl,
            isCustom: true,
            meta: resolvedMeta,
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
