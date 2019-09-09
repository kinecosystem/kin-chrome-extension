import { Network } from '@kinecosystem/kin-sdk';
import * as KinSdk from '@kinecosystem/kin-sdk-js';
import { KeystoreHandler } from '../storage/keystoreStorage';
import { IDataStore } from '../storage/storageProviders';
import { appStorage } from '../utils/storage';

const KIN_VAULT = 'KIN_VAULT';

export class KeyStorage implements KinSdk.KeystoreProvider {
  private secureStorageHandler: KeystoreHandler;

  constructor(private readonly dataStorage: IDataStore) {
    this.secureStorageHandler = new KeystoreHandler(dataStorage, KIN_VAULT);
    this.accounts.then((accounts) => {
      if (!accounts.length) {
        this.generate();
        console.log('new account was generated');
      }
    });
  }

  public async generate() {
    await this.secureStorageHandler.add(KinSdk.KeyPair.generate().seed);
  }

  get accounts(): Promise<string[]> {
    return new Promise(async (resolve) => {
      const seeds: string[] = await this.secureStorageHandler.get();
      const accounts = seeds.map((seed) => KinSdk.KeyPair.fromSeed(seed).publicAddress);
      resolve(accounts);
    });
  }

  public async sign(accountAddress: string, transactionEnvelope: string) {
    const seeds = await this.secureStorageHandler.get();
    const seed = seeds.find((s) => accountAddress === KinSdk.KeyPair.fromSeed(s).publicAddress);
    if (seed != null) {
      Network.use(new Network(await appStorage.environmen));
      const tx = new KinSdk.XdrTransaction(transactionEnvelope);
      const signers = new Array();
      signers.push(KinSdk.BaseKeyPair.fromSecret(seed));
      tx.sign(...signers);
      return Promise.resolve(
        tx
          .toEnvelope()
          .toXDR('base64')
          .toString(),
      );
    } else {
      return Promise.reject('keypair null');
    }
  }
}
