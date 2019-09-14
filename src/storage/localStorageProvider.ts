export interface IDataStore {
  get(key: string, def?: string): Promise<string>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}

export class StorageProvider implements IDataStore {
  /**
   *
   *
   * @param {string} key
   * @returns {Promise<string>}
   * @memberof StorageProvider
   */
  public async get(key: string, def?: string): Promise<string> {
    return new Promise(resolve => {
      chrome.storage.local.get(key, result => {
        if (def && !result[key]) {
          resolve(def);
        } else {
          resolve(result[key]);
        }
      });
    });
  }

  /**
   *
   *
   * @param {string} key
   * @param {string} value
   * @returns {Promise<void>}
   * @memberof StorageProvider
   */
  public async set(key: string, value: string): Promise<void> {
    return new Promise(resolve => {
      const item = {};
      item[key] = value;
      chrome.storage.local.set(item, resolve);
    });
  }

  /**
   *
   *
   * @param {string} key
   * @memberof StorageProvider
   */
  public async remove(key: string) {
    chrome.storage.local.remove(key);
  }
}
