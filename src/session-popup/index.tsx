import { MessageExternalActions } from '../background/ExternalMessages';

export enum SignVerificationAction {
  REJECT = 'REJECT',
  OK = 'OK'
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === MessageExternalActions.SIGN) {
    console.log('injected: SIGN Action verify');
    const anchor = document.createElement('div');
    document.body.prepend(anchor);

    const verify = function() {
      sendResponse(SignVerificationAction.OK);
      console.log('injected: verify -> called!');
    };

    const TIMEOUT = 10000;
    setTimeout(() => {
      sendResponse(SignVerificationAction.REJECT);
    }, TIMEOUT);

    return true;
  }
});
