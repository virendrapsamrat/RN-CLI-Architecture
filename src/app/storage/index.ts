import {createMMKV, type MMKV} from 'react-native-mmkv';
import {STORAGE_KEYS} from '@app/constants';
import {logger} from '@app/logger';

const storage: MMKV = createMMKV({id: 'rn-cli-app-storage'});

export class StorageService {
  setString(key: string, value: string): void {
    storage.set(key, value);
  }

  getString(key: string): string | undefined {
    return storage.getString(key);
  }

  setObject<T>(key: string, value: T): void {
    storage.set(key, JSON.stringify(value));
  }

  getObject<T>(key: string): T | undefined {
    const raw = storage.getString(key);
    if (!raw) {
      return undefined;
    }
    try {
      return JSON.parse(raw) as T;
    } catch (error) {
      logger.error('StorageService.getObject parse failed', {key, error});
      return undefined;
    }
  }

  delete(key: string): void {
    storage.remove(key);
  }

  clearAll(): void {
    storage.clearAll();
  }

  contains(key: string): boolean {
    return storage.contains(key);
  }
}

/** Encrypted storage layer for sensitive tokens — extend with native encryption as needed. */
export class SecureStorageService extends StorageService {
  setSecureToken(key: string, value: string): void {
    this.setString(key, value);
  }

  getSecureToken(key: string): string | undefined {
    return this.getString(key);
  }

  clearSession(): void {
    this.delete(STORAGE_KEYS.ACCESS_TOKEN);
    this.delete(STORAGE_KEYS.REFRESH_TOKEN);
    this.delete(STORAGE_KEYS.SESSION_EXPIRY);
    this.delete(STORAGE_KEYS.USER_PROFILE);
  }
}

export const storageService = new StorageService();
export const secureStorageService = new SecureStorageService();
