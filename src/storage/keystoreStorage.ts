import { AES, enc, SHA256 } from 'crypto-js';
import { appStorage } from '.';
import { IDataStore } from './LocalStorageProvider';
export class KeystoreHandler {
  constructor(private readonly dataStorage: IDataStore, private readonly storageIndex: string) {}
  /**
   *
   *
   * @returns {Promise<string[]>}
   * @memberof KeystoreHandler
   */
  public async get(): Promise<string[]> {
    const seedsString = await this.dataStorage.get(this.storageIndex);
    const seeds = JSON.parse(seedsString || '[]');
    const decrypted = seeds.map(seed => this.decrypt(seed));
    return Promise.all(decrypted);
  }

  /**
   *
   *
   * @param {string} seed
   * @memberof KeystoreHandler
   */
  public async add(seed: string) {
    const seedsString = await this.dataStorage.get(this.storageIndex);
    const seeds = JSON.parse(seedsString || '[]');
    const encrypted = await this.encrypt(seed);
    seeds.push(encrypted);
    this.dataStorage.set(this.storageIndex, JSON.stringify(seeds));
  }

  private hash(secret: string) {
    return SHA256(secret).toString();
  }

  private async encrypt(value: string) {
    return AES.encrypt(value, this.hash(await appStorage.secret)).toString();
  }

  private async decrypt(value: string) {
    return AES.decrypt(value, this.hash(await appStorage.secret)).toString(enc.Utf8);
  }
}
