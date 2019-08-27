import * as KinSdk from '@kinecosystem/kin-sdk-js';
import { SimpleKeystoreProvider } from '@kinecosystem/kin-sdk-js-keystore-providers';

const keystoreProvider = new SimpleKeystoreProvider(KinSdk);
const client = new KinSdk.KinClient(KinSdk.Environment.Testnet, keystoreProvider);

chrome.runtime.onMessageExternal.addListener(function(request, _, sendResponse) {
  if (request.message == 'version') sendResponse({ version: 0.1 });
});

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install' || details.reason === 'update') {
    chrome.tabs.create({ url: './app/index.html' });
  }
});
