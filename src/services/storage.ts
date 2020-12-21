export enum StorageTypes {
  LOCAL_STORAGE = 'localStorage',
  COOKIES = 'cookies',
}

class StorageService {
  private static _instance: StorageService

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  // remove comment when cookies will be introduced
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  set(storage: StorageTypes, name: string, data: any, ...other: any[]): void {
    if (storage === StorageTypes.LOCAL_STORAGE) {
      localStorage.setItem(name, JSON.stringify(data))
    }
  }

  get(storage: StorageTypes, name: string): any {
    if (storage === StorageTypes.LOCAL_STORAGE) {
      const dataFromStorage = localStorage.getItem(name)
      if (dataFromStorage) {
        return JSON.parse(dataFromStorage)
      }
    }
  }

  remove(storage: StorageTypes, name: string): void {
    if (storage === StorageTypes.LOCAL_STORAGE) {
      localStorage.removeItem(name)
    }
  }
}

export default StorageService
