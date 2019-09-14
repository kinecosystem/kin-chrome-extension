import { InternalAction } from '../background/InternalMessages';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === InternalAction.ACTIVATE_SESSION) {
    console.log('content scriot -> injected: ACTIVATE_SESSION popup');

    const anchor = document.createElement('div') as HTMLDivElement;
    anchor.id = 'session-popup';
    anchor.style.cssText =
      'position: fixed !important; z-index: 2147483647 !important; display: block !important; width: 100% !important; height: 100% !important; top: 10px !important; right: 10px !important; max-height: 182px !important; max-width: 368px !important;';

    const iframe = document.createElement('iframe') as HTMLIFrameElement;
    iframe.src = 'chrome-extension://ajibgglefmgckbegajkboddpjkokdkae/session-popup/index.html';
    iframe.scrolling = 'no';
    iframe.style.cssText =
      'border: 1px solid; background: white; position: relative !important; top: 0px !important; right: 0px !important; bottom: 0px !important; left: 0px !important; height: 100% !important; width: 100% !important; visibility: visible !important; display: block !important;';

    anchor.appendChild(iframe);
    document.body.appendChild(anchor);

    const callback = (request, sender, _) => {
      if (request.action === InternalAction.SESSION_ALLOW) {
        console.log('Extension -> InternalAction.SESSION_ALLOW');
        chrome.runtime.onMessage.removeListener(callback);
        const elm = document.querySelector('#session-popup') as HTMLDivElement;
        (elm.parentNode as HTMLBodyElement).removeChild(elm);
        sendResponse(InternalAction.SESSION_ALLOW);
      }
    };
    chrome.runtime.onMessage.addListener(callback);
    return true;
  }
});
