import * as KinSdk from '@kinecosystem/kin-sdk-js';
import { SimpleKeystoreProvider } from '@kinecosystem/kin-sdk-js-keystore-providers';

const keystoreProvider = new SimpleKeystoreProvider(KinSdk);
const client = new KinSdk.KinClient(KinSdk.Environment.Testnet, keystoreProvider);

chrome.runtime.onMessageExternal.addListener((request, _, sendResponse) => {
  if (request.message === 'version') {
    sendResponse({ version: 0.1 });
  }
});

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  if (request.message === 'tip') {
    sendResponse({ message: 'tip recived!' });
    console.log(sender);
    chrome.tabs.sendMessage((sender.tab as chrome.tabs.Tab).id || 0, { args: 'tip' }, cb);
  }
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install' || details.reason === 'update') {
    chrome.tabs.create({ url: './setup/index.html' });
  }
});

function cb(response) {
  console.log('message from cs to bg: ' + response);
}
