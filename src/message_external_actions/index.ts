import { keystore } from '../utils/storage';
import { MessageExternalActions } from './actions_consts';
const version = require('../../package.json').version;

export const sign = (request, sender, sendResponse) => {
  if (request.action === MessageExternalActions.SIGN) {
    chrome.tabs.sendMessage(
      (sender.tab as chrome.tabs.Tab).id || 0,
      { action: MessageExternalActions.SIGN },
      async(respons) => {
        if (respons === 'ok') {
          const signedTx = await keystore.sign(
            request.data.accountAddress,
            request.data.transactionEnvelpoe,
          );
          sendResponse(signedTx);
        }
      },
    );
    return true;
  }
};

export const isInstalled = (request, _, sendResponse) => {
  if (request.action === MessageExternalActions.IS_INSTALLED) {
    sendResponse({ version });
  }
};

export const getAccounts = async(request, _, sendResponse) => {
  if (request.action === MessageExternalActions.ACCOUNTS) {
    const accounts = await keystore.accounts;
    sendResponse(accounts);
  }
  return true;
};
