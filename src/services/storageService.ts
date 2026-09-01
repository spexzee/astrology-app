import type { BirthDetails, SavedProfileRecord } from '../astrology/types/chart';

declare global {
  interface Window {
    electronAPI?: {
      appVersion: string;
      db: {
        saveProfile: (profile: BirthDetails) => Promise<{ success: boolean; data?: SavedProfileRecord; error?: string }>;
        getProfiles: (query?: string) => Promise<{ success: boolean; data?: SavedProfileRecord[]; error?: string }>;
        getProfileById: (id: string) => Promise<{ success: boolean; data?: SavedProfileRecord; error?: string }>;
        deleteProfile: (id: string) => Promise<{ success: boolean; data?: boolean; error?: string }>;
      };
      dialog: {
        savePdf: (options: { defaultName: string; pdfBase64: string }) => Promise<{ success: boolean; filePath?: string; canceled?: boolean; error?: string }>;
      };
    };
  }
}

const LOCAL_STORAGE_KEY = 'vedic_astrology_saved_profiles';

export async function saveProfileToStorage(profile: BirthDetails): Promise<SavedProfileRecord> {
  if (window.electronAPI?.db?.saveProfile) {
    try {
      const res = await window.electronAPI.db.saveProfile(profile);
      if (res && res.success && res.data) {
        return res.data;
      }
    } catch (err) {
      console.warn('Electron SQLite IPC save failed, using local persistence fallback:', err);
    }
  }

  // Fallback to localStorage for browser preview or standalone
  const saved = getProfilesFromLocalStorage();
  const now = new Date().toISOString();
  const id = profile.id || `profile_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const record: SavedProfileRecord = {
    ...profile,
    id,
    createdAt: profile.createdAt || now,
    updatedAt: now,
  };

  const existingIdx = saved.findIndex((p) => p.id === id);
  if (existingIdx >= 0) {
    saved[existingIdx] = record;
  } else {
    saved.unshift(record);
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saved));
  return record;
}

export async function getProfilesFromStorage(query = ''): Promise<SavedProfileRecord[]> {
  if (window.electronAPI?.db?.getProfiles) {
    try {
      const res = await window.electronAPI.db.getProfiles(query);
      if (res && res.success && res.data) {
        return res.data;
      }
    } catch (err) {
      console.warn('Electron SQLite IPC getProfiles failed, using local persistence fallback:', err);
    }
  }

  // Fallback
  let list = getProfilesFromLocalStorage();
  if (query && query.trim().length > 0) {
    const q = query.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.placeOfBirth.toLowerCase().includes(q)
    );
  }
  return list;
}

export async function getProfileByIdFromStorage(id: string): Promise<SavedProfileRecord | null> {
  if (window.electronAPI?.db?.getProfileById) {
    try {
      const res = await window.electronAPI.db.getProfileById(id);
      if (res && res.success) {
        return res.data || null;
      }
    } catch (err) {
      console.warn('Electron SQLite IPC getProfileById failed, using local persistence fallback:', err);
    }
  }

  const list = getProfilesFromLocalStorage();
  return list.find((p) => p.id === id) || null;
}

export async function deleteProfileFromStorage(id: string): Promise<boolean> {
  if (window.electronAPI?.db?.deleteProfile) {
    try {
      const res = await window.electronAPI.db.deleteProfile(id);
      if (res && res.success) {
        return !!res.data;
      }
    } catch (err) {
      console.warn('Electron SQLite IPC deleteProfile failed, using local persistence fallback:', err);
    }
  }

  const list = getProfilesFromLocalStorage().filter((p) => p.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  return true;
}

function getProfilesFromLocalStorage(): SavedProfileRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
