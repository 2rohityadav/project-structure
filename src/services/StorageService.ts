import { STORAGE_CONFIG } from "../constants/storage";

class StorageService {
  private pendingSave: ReturnType<typeof setTimeout> | null = null;

  /**
   * Check if localStorage is available
   */
  public isAvailable(): boolean {
    const test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Calculate the size of data in bytes
   * @param data
   * @returns number
   */
  public getDataSize(data: unknown): number {
    const stringify = JSON.stringify(data);
    return new Blob([stringify]).size;
  }

  /**
   * Load data from localStorage with version check
   * @param defaultData
   * @returns T
   */
  public load<T>(defaultData: T): T {
    try {
      if (!this.isAvailable()) {
        console.warn("localStorage is not available");
        return defaultData;
      }

      const saved: string | null = localStorage.getItem(STORAGE_CONFIG.KEY);

      if (!saved) return defaultData;

      const parsed = JSON.parse(saved);

      // Version check
      if (parsed.version !== STORAGE_CONFIG.VERSION) {
        console.warn("Storage version mismatch, resetting to default");
        this.save(defaultData);
        return defaultData;
      }

      return parsed.data as T;
    } catch (error) {
      console.error("Error loading from storage:", error);
      return defaultData;
    }
  }

  /**
   * Save data to localStorage with debouncing
   * @param data
   * @returns Promise<boolean>
   */
  public save<T>(data: T): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable()) {
        console.warn("localStorage is not available");
        resolve(false);
        return;
      }

      // Clear any pending save
      if (this.pendingSave) {
        clearTimeout(this.pendingSave);
      }

      // Debounce the save operation
      this.pendingSave = setTimeout(() => {
        try {
          const saveData = {
            version: STORAGE_CONFIG.VERSION,
            timestamp: new Date().toISOString(),
            data: data,
          };

          // Check data size
          const dataSize = this.getDataSize(saveData);
          if (dataSize > STORAGE_CONFIG.MAX_SIZE) {
            throw new Error("Data size exceeds storage limit");
          }

          localStorage.setItem(STORAGE_CONFIG.KEY, JSON.stringify(saveData));
          resolve(true);
        } catch (error) {
          console.error("Error saving to storage:", error);
          reject(error);
        }
      }, STORAGE_CONFIG.DEBOUNCE_DELAY);
    });
  }

  /**
   * Clear stored data
   */
  public clear(): void {
    try {
      if (this.isAvailable()) {
        localStorage.removeItem(STORAGE_CONFIG.KEY);
      }
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  }
}

export const storageService = new StorageService();
