import {
  KeyPair,
  KeystoreProvider,
  Network,
  XdrTransaction
} from '@kinecosystem/kin-sdk-js-common';
import { BaseSdk } from '@kinecosystem/kin-sdk-js-web';
import { appStorage } from '.';
import { KeystoreHandler } from './KeystoreStorage';
import { IDataStore } from './LocalStorageProvider';

const KIN_VAULT = 'KIN_VAULT';

export class KeyStorage implements KeystoreProvider {
  private secureStorageHandler: KeystoreHandler;

  constructor(private readonly dataStorage: IDataStore) {
    this.secureStorageHandler = new KeystoreHandler(dataStorage, KIN_VAULT);
    this.publicAddresses.then(accounts => {
      if (!accounts.length) {
        this.generate();
        console.log('new account was generated');
      }
    });
  }

  public async generate() {
    await this.secureStorageHandler.add(KeyPair.generate().seed);
  }

  get publicAddresses(): Promise<string[]> {
    return new Promise(async resolve => {
      const seeds: string[] = await this.secureStorageHandler.get();
      const accounts = seeds.map(seed => KeyPair.fromSeed(seed).publicAddress);
      resolve(accounts);
    });
  }

  public async sign(accountAddress: string, transactionEnvelope: string) {
    const seeds = await this.secureStorageHandler.get();
    const seed = seeds.find(s => accountAddress === KeyPair.fromSeed(s).publicAddress);
    if (seed != null) {
      Network.use(new Network(await appStorage.environmen));
      const tx = new XdrTransaction(transactionEnvelope);
      const signers = new Array();
      signers.push(BaseSdk.Keypair.fromSecret(seed));
      tx.sign(...signers);
      return Promise.resolve(
        tx
          .toEnvelope()
          .toXDR('base64')
          .toString()
      );
    } else {
      return Promise.reject('keypair null');
    }
  }
}
