import { AppStorage } from './AppStorage';
import { KeyStorage } from './Keystore';
import { StorageProvider } from './LocalStorageProvider';

export const storageProvider = new StorageProvider();
export const appStorage = new AppStorage(storageProvider);
export const keystore = new KeyStorage(storageProvider);
