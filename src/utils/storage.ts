import { AppStorage } from '../storage/appStorage';
import { KeyStorage } from '../storage/Keystore';
import { StorageProvider } from '../storage/StorageProviders';

export const storageProvider = new StorageProvider();
export const appStorage = new AppStorage(storageProvider);
export const keystore = new KeyStorage(storageProvider);
