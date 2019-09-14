import { InternalAction } from '../background/InternalMessages';

(() => {
  const btn = document.querySelector('#btn') as HTMLButtonElement;
  btn.onclick = () => {
    console.log('Session popup -> Button Clicked');
    const url = new URL(window.location.href);
    const tabid = Number(url.searchParams.get('tabid') || '0');
    chrome.tabs.sendMessage(tabid, {
      action: InternalAction.SESSION_ALLOW
    });
    chrome.runtime.sendMessage({ action: InternalAction.ACTIVATE_SESSION });
  };
})();
