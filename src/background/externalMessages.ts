import { keystore } from '../Storage';
import { InternalAction } from './InternalMessages';
const version = require('../../package.json').version;

export enum ExternalActions {
  IS_INSTALLED = 'IS_INSTALLED',
  ACCOUNTS = 'ACCOUNTS',
  SIGN = 'SIGN',
  ACTIVE_SESSINO = 'ACTIVE_SESSINO'
}

export const echo = (request, sender, sendResponse) => {
  console.log({ request, sender, sendResponse });
};

export const activateSession = (request, sender, sendResponse) => {
  if (request.action === ExternalActions.ACTIVE_SESSINO) {
    console.log('extension : tip -> ACTIVE_SESSINO');
    chrome.tabs.sendMessage(
      (sender.tab as chrome.tabs.Tab).id || 0,
      { action: InternalAction.ACTIVATE_SESSION, tabid: sender.tab.id },
      respons => {
        if (respons) {
          console.log('extension : tip -> ACTIVE_SESSINO Done!');
          console.log(respons);
          sendResponse('Extension: ACTIVE_SESSINO respons');
        }
      }
    );

    return true;
  }
};

export const sign = (request, sender, sendResponse) => {
  if (request.action === ExternalActions.SIGN) {
    keystore.sign(request.data.accountAddress, request.data.transactionEnvelpoe).then(signedTx => {
      console.log('extension: SIGN Action -> signed! ' + signedTx);
      sendResponse(signedTx);
    });
    return true;
  }
};

export const isInstalled = (request, _, sendResponse) => {
  if (request.action === ExternalActions.IS_INSTALLED) {
    sendResponse({ version });
  }
};

export const getAccounts = async(request, _, sendResponse) => {
  if (request.action === ExternalActions.ACCOUNTS) {
    const accounts = await keystore.accounts;
    sendResponse(accounts);
    return true;
  }
};
