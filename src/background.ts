import * as onMessageExternalActions from './messageExternalActions';
import './utils/storage';

// initialize onMessageExternal listeners
Object.values(onMessageExternalActions).forEach((action) => {
  chrome.runtime.onMessageExternal.addListener((msg, sender, cb) => action(msg, sender, cb));
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install' || details.reason === 'update') {
    // chrome.tabs.create({ url: './setup/index.html' });
  }
});
