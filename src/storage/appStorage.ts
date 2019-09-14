import { Environment } from '@kinecosystem/kin-sdk-js';
import { IDataStore } from './LocalStorageProvider';

const ENVIRONMENT = 'ENVIRONMENT';
const SECRET = 'SECRET';

export class AppStorage {
  constructor(private readonly dataStorage: IDataStore) {}

  public get environmen(): Promise<string> {
    return new Promise(async resolve => {
      const defaultEnv = Environment.Testnet;
      // process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Testnet;
      resolve(await this.dataStorage.get(ENVIRONMENT, defaultEnv.passphrase));
    });
  }

  public set environmen(value: Promise<string>) {
    this.environmen = value;
  }

  public get secret(): Promise<string> {
    return new Promise(async resolve => {
      resolve(await this.dataStorage.get(SECRET));
    });
  }

  public set secret(value: Promise<string>) {
    this.secret = value;
  }
}
