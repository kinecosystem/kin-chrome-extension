import * as KinSdk from '@kinecosystem/kin-sdk-js';
import { SimpleKeystoreProvider } from '@kinecosystem/kin-sdk-js-keystore-providers'

const keystoreProvider = new SimpleKeystoreProvider(KinSdk);
const client = new KinSdk.KinClient(KinSdk.Environment.Testnet, keystoreProvider);

console.log(keystoreProvider);
console.log(client);

chrome.runtime.onMessageExternal.addListener(
    function (request, _, sendResponse) {
        if (request.message == 'version')
            sendResponse({ version: 0.1 });
    });


chrome.runtime.onInstalled.addListener(function (details) {
    if ((details.reason === 'install') || (details.reason === 'update')) {
        chrome.tabs.create({ url: "./post_install/index.html" }, function (tab) {
            console.log("New tab launched with ./post_install/index.html");
        });
    }
}); 
